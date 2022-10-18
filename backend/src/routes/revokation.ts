//
// ──────────────────────────────────────────────────────────────────────────────────────── IV ──────────
//   :::::: T O K E N S   R E V O K A T I O N   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import axios, { AxiosResponse } from 'axios'
import { Application, NextFunction, Response } from 'express'

import Request from '../Interfaces/IEnrichedRequest'
import ITokens from '../Interfaces/ITokens'
import checkJWT from '../middlewares/checkJWT'
import User from '../Schemas/User'
import ExpressError from '../Classes/ExpressError'

// ─────────────────────────────────────────────────────────────────────────────

export default (app: Application) => {
  app.delete('/tokens/youtube', checkJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) throw new ExpressError(400)

      // ─── Get Tokens From The DB ───────────────────────────────────

      const user = await User.findById(req.user.id, 'tokens')
      if (!user) throw new ExpressError(409, 'User not found.')

      const youtubeTokens: ITokens | undefined = user.tokens.find(tokens => tokens.service === 'youtube')
      if (!youtubeTokens) throw new ExpressError(409, 'No YouTube tokens stored.')

      // ─── Revoke The Access Token ──────────────────────────────────

      const response: AxiosResponse = await axios.post('https://oauth2.googleapis.com/revoke', new URLSearchParams({ token: youtubeTokens.accessToken }))

      if (response.status !== 200) throw new ExpressError(500, 'Failed to revoke tokens.')

      // ─── Remove Tokens From The DB ────────────────────────────────

      const tokens = user.tokens.id(youtubeTokens._id)

      if (!tokens) throw new ExpressError(409, 'Cannot find YouTube tokens.')
      tokens.remove()
      await user.save()

      // ──────────────────────────────────────────────────────────────

      res.send({
        success: true,
        message: 'YouTube tokens revoked'
      })

      // ──────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      next(err)
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
