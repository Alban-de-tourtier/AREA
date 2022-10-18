//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: E R R O R   H A N D L E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { NextFunction, Response } from 'express'

import ExpressError from '../Classes/ExpressError'
import Request from '../Interfaces/IEnrichedRequest'

// ─────────────────────────────────────────────────────────────────────────────

export default (err: ExpressError, req: Request, res: Response, next: NextFunction): void => {
  // ─── Use Default Status Message If No Custom Message Is Provided ─────────────

  if (res.headersSent || !err.statusMessage) res.sendStatus(err.statusCode)
  console.error(err.message)

  // ─── Set The HTTP Response Status Code ───────────────────────────────────────

  res.status(err.statusCode)

  // ─── Send Error With Message ─────────────────────────────────────────────────

  res.send({
    success: false,
    message: err.statusMessage
  })
}

// ─────────────────────────────────────────────────────────────────────────────
