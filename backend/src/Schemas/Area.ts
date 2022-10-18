//
// ────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   S U D O C U M E N T   S C H E M A S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import IArea, { IAction, IReaction } from '../Interfaces/IArea'
import { Schema } from 'mongoose'

// ─────────────────────────────────────────────────────────────────────────────

// ─── Action Schema ───────────────────────────────────────────────────────────

export const Action: Schema<IAction> = new Schema<IAction>({
  service: { type: String, required: true },
  name: { type: String, required: true },
  description: String
})

// ─── Reaction Schema ─────────────────────────────────────────────────────────

export const Reaction: Schema<IReaction> = new Schema<IReaction>({
  service: String,
  name: String,
  description: String
})

// ─── AREA Schema ─────────────────────────────────────────────────────────────

export default new Schema<IArea>({
  action: { type: Action, required: true },
  reaction: { type: Reaction, required: true }
})

// ─────────────────────────────────────────────────────────────────────────────
