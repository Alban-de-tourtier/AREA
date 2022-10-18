//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R   S C H E M A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Model, model, Schema, Types } from 'mongoose'

import IArea from '../Interfaces/IArea'
import ITokens from '../Interfaces/ITokens'
import IUser from '../Interfaces/IUser'
import Area from './Area'

// ─────────────────────────────────────────────────────────────────────────────

const Tokens: Schema<ITokens> = new Schema<ITokens>({
  service: { type: String, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true }
})

// TMethodsAndOverrides
type UserDocumentProps = {
  tokens: Types.DocumentArray<ITokens>
  areas: Types.DocumentArray<IArea>
}
type UserModelType = Model<IUser, {}, UserDocumentProps>

const User: Schema<IUser, UserModelType> = new Schema<IUser, UserModelType>({
  email: { type: String, required: true, unique: true },
  password: String,
  googleUID: String,
  isLoggedInWithGoogle: { type: Boolean, required: true, default: false },
  tokens: [Tokens],
  areas: [Area]
})

export default model<IUser, UserModelType>('User', User)

// ─────────────────────────────────────────────────────────────────────────────
