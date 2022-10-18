//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V I C E   M O D E L   A N D   S C H E M A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Action, Reaction } from './Area'
import IService from '../Interfaces/IService'
import { Schema, Types, Model, model } from 'mongoose'
import { IAction, IReaction } from '../Interfaces/IArea'

// ─────────────────────────────────────────────────────────────────────────────

// TMethodsAndOverrides
type ServiceDocumentProps = {
  actions: Types.DocumentArray<IAction>
  reactions: Types.DocumentArray<IReaction>
}
type ServiceModelType = Model<IService, {}, ServiceDocumentProps>

const Service: Schema<IService, ServiceModelType> = new Schema<IService, ServiceModelType>({
  name: { type: String, required: true },
  actions: [Action],
  reactions: [Reaction]
})

export default model<IService, ServiceModelType>('Service', Service)

// ─────────────────────────────────────────────────────────────────────────────
