//
// ────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: C A L L B A C K   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Application, NextFunction, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'

import googleSecrets from '../../secrets/client_secret.json'
import Request from '../Interfaces/IEnrichedRequest'
import checkJWT from '../middlewares/checkJWT'
import User from '../Schemas/User'
import ExpressError from '../Classes/ExpressError'

// ─────────────────────────────────────────────────────────────────────────────

export default (app: Application): void => {
  // ─── YouTube Authorization ───────────────────────────────────────────────────

  app.get('/authorize/youtube/callback', checkJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ExpressError(400)

      // ─── Create The OAuth2Client ──────────────────────────────────

      const oauth2Client: OAuth2Client = new google.auth.OAuth2(
        googleSecrets.web.client_id,
        googleSecrets.web.client_secret,
        googleSecrets.web.redirect_uris[2]
      )

      // ─── Retrieve The Code And Get Tokens ─────────────────────────

      const code: string = req.query.code as string
      const { tokens } = await oauth2Client.getToken(code)

      if (!tokens.access_token || !tokens.refresh_token) throw new ExpressError(400, 'Failed to retrieve tokens.')

      // ─── Push Tokens In A Subdocument ─────────────────────────────

      const user = await User.findById(req.user.id)
      if (!user) throw new ExpressError(500, 'User not found.')
      user.tokens.push({
        service: 'youtube',
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      })

      // ─── Save Tokens In The DB And Redirect The User ──────────────

      user.save()
      res.redirect(String(process.env.FRONTEND_HOST) + '/link')

      // ──────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      next(err)
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
