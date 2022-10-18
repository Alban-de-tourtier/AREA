//
// ────────────────────────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: S E R V I C E S   A U T H O R I Z A T I O N   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Application, NextFunction, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'

import googleSecrets from '../../secrets/client_secret.json'
import Request from '../Interfaces/IEnrichedRequest'
import checkJWT from '../middlewares/checkJWT'
import User from '../Schemas/User'

// ─────────────────────────────────────────────────────────────────────────────

export default (app: Application): void => {
  // ─── Youtube ─────────────────────────────────────────────────────────────────

  app.post('/authorize/youtube', checkJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // ─── Generate Authorization URL ───────────────────────────────

      const oauth2Client: OAuth2Client = new google.auth.OAuth2(
        googleSecrets.web.client_id,
        googleSecrets.web.client_secret,
        googleSecrets.web.redirect_uris[2]
      )
      const scopes: Array<string> = [
        'https://www.googleapis.com/auth/youtube'
      ]
      const authorizationURL: string = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        login_hint: (await User.findById(req.user?.id))?.email
      })

      // ─── Send Authorization URL To The Client ─────────────────────

      res.status(200).send({
        success: true,
        authorizationURL
      })

      // ──────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      next(err)
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
