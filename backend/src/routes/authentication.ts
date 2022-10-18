//
// ────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A U T H E N T I C A T I O N   R E L A T E D   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import bcrypt from 'bcrypt'
import { Application, NextFunction, Response } from 'express'
import { body, cookie, Result, ValidationError, validationResult } from 'express-validator'
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library'
import { HydratedDocument } from 'mongoose'

import ExpressError from '../Classes/ExpressError'
import Request from '../Interfaces/IEnrichedRequest'
import IUser from '../Interfaces/IUser'
import issueJWT from '../middlewares/issueJWT'
import User from '../Schemas/User'

// ─────────────────────────────────────────────────────────────────────────────

export default (app: Application): void => {
  // ─── Registration ────────────────────────────────────────────────────────────

  app.post('/auth/register',

    // ─── Request Validation ───────────────────────────────────────

    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isString(), // CHANGE TO isStrongPassword() IN PRODUCTION

    // ──────────────────────────────────────────────────────────────

    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
        //
        // CHECK IF THE USER IS NOT YET IN THE DB
        //
        if (await User.findOne({ email: req.body.email })) {
          throw new ExpressError(409, 'E-mail already in use.')
        }
        //
        // CREATE AND ADD THE NEW USER TO THE DB
        //
        const newUser: HydratedDocument<IUser> = new User({
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10)
        })

        await newUser.save()
        //
        // ISSUE A JWT
        //
        req.user = {
          id: newUser._id,
          newUser: true
        }
        next()

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    }, issueJWT)

  // ─── Login ───────────────────────────────────────────────────────────────────

  app.post('/auth/login',
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isString(), // CHANGE TO isStrongPassword() IN PRODUCTION
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)
        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())

        const user = await User.findOne({ email: req.body.email })

        if (!user) throw new ExpressError(400, 'User not found.')
        if (!user.password) throw new ExpressError(403, 'Email previously registered with Google.')
        //
        // CHECK CREDENTIALS
        //
        if (!await bcrypt.compare(req.body.password, user.password)) throw new ExpressError(400, 'Wrong credentials.')

        if (user.googleUID && !user.isLoggedInWithGoogle) {
          user.isLoggedInWithGoogle = true
          user.save()
        }
        //
        // ISSUE A JWT
        //
        req.user = { id: user._id }
        next()

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    }, issueJWT)

  // ─── Sign In With Google Callback ────────────────────────────────────────────

  app.post('/auth/google',
    cookie('g_csrf_token').isString().withMessage('No CSRF token in Cookie.'),
    body('g_csrf_token')
      .isString().withMessage('No CSRF token in post body.')
      .custom((value, { req }) => {
        if (req.cookies !== req.body.g_csrf_token) {
          throw new ExpressError(
            400,
            'Failed to verify double submit cookie.',
            'Failed to verify double submit cookie.'
          )
        }
      }),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)
        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
        //
        // VERIFY THE ID TOKEN
        //
        const client: OAuth2Client = new OAuth2Client(process.env.CLIENT_ID)
        const ticket: LoginTicket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: process.env.CLIENT_ID
        })
        const payload: TokenPayload | undefined = ticket.getPayload()
        const userid: string | undefined = payload?.sub
        if (!payload || !userid) throw new ExpressError()
        //
        // ADD THE USER TO THE DB OR ASK TO LINK ACCOUNTS
        //
        const user = await User.findOne({ email: payload.email })
        if (user) {
          if (!user.isLoggedInWithGoogle) {
            res.redirect(String(process.env.FRONTEND_HOST) + '/signin?email=' + user.email)
            return
          }
          req.user = {
            id: user._id,
            redirection: String(process.env.FRONTEND_HOST) + '/'
          }
        } else {
          const newUser = new User({
            email: payload.email,
            googleUID: userid,
            isLoggedInWithGoogle: true
          })
          await newUser.save()
          req.user = {
            id: newUser._id,
            redirection: String(process.env.FRONTEND_HOST) + '/'
          }
        }
        //
        // ISSUE A JWT
        //
        next()

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    }, issueJWT)
}

// ─────────────────────────────────────────────────────────────────────────────
