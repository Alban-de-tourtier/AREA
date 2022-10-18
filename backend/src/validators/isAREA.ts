//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   V A L I D A T O R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import ExpressError from '../Classes/ExpressError'
import { IAction, IReaction } from '../Interfaces/IArea'
import Service from '../Schemas/Service'

// ─────────────────────────────────────────────────────────────────────────────

// ─── Action Validator ────────────────────────────────────────────────────────

export async function isAction (action: IAction): Promise<void> {
  const service = await Service.findOne({ name: action.service })

  if (!service) throw new ExpressError(400, 'Invalid service.', 'Invalid Service.')
  if (!service.actions.find(element => element.name === action.name)) throw new ExpressError(400, 'Invalid action.', 'Invalid action.')
}

// ─── Reaction Validator ──────────────────────────────────────────────────────

export async function isReaction (reaction: IReaction): Promise<void> {
  const service = await Service.findOne({ name: reaction.service })

  if (!service) throw new ExpressError(400, 'Invalid service.', 'Invalid service.')
  if (!service.reactions.find(element => element.name === reaction.name)) throw new ExpressError(400, 'Invalid reaction.', 'Invalid reaction.')
}

// ─────────────────────────────────────────────────────────────────────────────
