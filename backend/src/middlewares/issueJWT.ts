//
// ──────────────────────────────────────────────────────────── I ──────────
//   :::::: J W T   I S S U E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { NextFunction, Response } from 'express'
import { SignJWT } from 'jose'

import ExpressError from '../Classes/ExpressError'
import Request from '../Interfaces/IEnrichedRequest'

// ─────────────────────────────────────────────────────────────────────────────

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ─── Check Requirements ───────────────────────────────────────

    if (!req.user?.id) throw new ExpressError(400, 'User ID missing.')

    // ─── Misc ─────────────────────────────────────────────────────

    const thirtyDays: number = 30 * (24 * 60 * 60 * 1000)
    const thirtyDaysLater: Function = (): Date => {
      return new Date(Date.now() + thirtyDays)
    }

    // ─── Create A JWT ─────────────────────────────────────────────

    const jwt: string = await new SignJWT({ iss: 'AREA', aud: req.user.id.toString() })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(String(process.env.JWT_SECRET)))

    // ─── Add The JWT To A Cookie ──────────────────────────────────

    res.cookie('jwt', jwt, {
      expires: thirtyDaysLater(),
      httpOnly: true,
      maxAge: thirtyDays,
      sameSite: 'lax'
    })

    // ─── Respond ──────────────────────────────────────────────────

    if (req.user.redirection) {
      res.redirect(req.user.redirection)
      return
    }
    res.status(req.user.newUser ? 201 : 200).send({
      success: true,
      needLogin: false
    })

    // ──────────────────────────────────────────────────────────────
  } catch (err: unknown) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
