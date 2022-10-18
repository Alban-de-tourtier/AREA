//
// ──────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A S   R E L A T E D   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Application, NextFunction, Response } from 'express'
import { body, param, Result, ValidationError, validationResult } from 'express-validator'

import ExpressError from '../Classes/ExpressError'
import { IAction, IReaction } from '../Interfaces/IArea'
import Request from '../Interfaces/IEnrichedRequest'
import checkJWT from '../middlewares/checkJWT'
import User from '../Schemas/User'
import { isAction, isReaction } from '../validators/isAREA'

// ─────────────────────────────────────────────────────────────────────────────

export default async (app: Application) => {
  // ─── List All AREAs Of A User ────────────────────────────────────────────────

  app.get('/area', checkJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ─── Error Handling ───────────────────────────────────────────

      if (!req.user) throw new ExpressError(400)
      const user = await User.findById(req.user.id, 'areas')
      if (!user) throw new ExpressError(500, 'User not found.')

      // ──────────────────────────────────────────────────────────────

      const listArea = user.areas

      res.send({
        success: true,
        listArea
      })

      // ──────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      next(err)
    }
  })

  // ─── Create A New AREA ───────────────────────────────────────────────────────

  app.post('/area',

    // ─── Request Validation ───────────────────────────────────────

    checkJWT,
    body('action').custom(isAction),
    body('reaction').custom(isReaction),

    // ──────────────────────────────────────────────────────────────

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)
        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
        if (!req.user?.id) throw new ExpressError(400)
        const user = await User.findById(req.user.id, 'areas')
        if (!user) throw new ExpressError(500, 'User not found.')
        //
        // CREATE AREA
        //
        const action: IAction = req.body.action
        const reaction: IReaction = req.body.reaction
        const area = user.areas.create({
          action,
          reaction
        })

        user.areas.push(area)
        await user.save()

        // • • • • •

        res.send({
          success: true,
          message: 'AREA created.'
        })

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    })

  // ─── Update An Area ──────────────────────────────────────────────────────────

  app.put('/area/:id',

    // ─── Request Validation ───────────────────────────────────────

    checkJWT,
    param('id').isString(),
    body('action').custom(isAction),
    body('reaction').custom(isReaction),

    // ──────────────────────────────────────────────────────────────

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)
        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
        if (!req.user) throw new ExpressError(400)
        const user = await User.findById(req.user.id, 'areas')
        if (!user) throw new ExpressError(500, 'User not found.')
        //
        // CREATE AREA
        //
        const area = user.areas.id(req.params.id)
        if (!area) throw new ExpressError(400, 'AREA not found.')
        const action: IAction = req.body.action
        const reaction: IReaction = req.body.reaction
        area.action = action
        area.reaction = reaction
        await user.save()

        // • • • • •

        res.send({
          success: true,
          message: 'AREA updated.'
        })

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    })

  // ─── Delete An Area ──────────────────────────────────────────────────────────

  app.delete('/area/:id', checkJWT,

    // ─── Request Validation ───────────────────────────────────────

    param('id').isString(),

    // ──────────────────────────────────────────────────────────────

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //
        // ERROR HANDLING
        //
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
        if (!req.user) throw new ExpressError(400)

        const user = await User.findById(req.user.id, 'areas._id')
        if (!user) throw new ExpressError(500, 'User not found.')
        const area = user.areas.id(req.params.id)
        if (!area) throw new ExpressError(400, 'AREA not found.')
        //
        // REMOVE AREA
        //
        area.remove()
        await user.save()

        // • • • • •

        res.send({
          sucess: true,
          message: 'AREA removed.'
        })

        // • • • • •
      } catch (err: unknown) {
        next(err)
      }
    })
}

// ─────────────────────────────────────────────────────────────────────────────
