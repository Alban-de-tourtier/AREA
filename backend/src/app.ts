//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   B A C K E N D   E N T R Y   P O I N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { debug } from 'console'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { connect } from 'mongoose'

import errorHandler from './middlewares/errorHandler'
import about from './routes/about'
import area from './routes/area'
import authentication from './routes/authentication'
import authorization from './routes/authorization'
import callbacks from './routes/callbacks'
import revokation from './routes/revokation'

// ─────────────────────────────────────────────────────────────────────────────

dotenv.config()

async function main (): Promise<void> {
  const app: Application = express()
  const port: number = Number(process.env.PORT)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(cors({ origin: String(process.env.FRONTEND_HOST), credentials: true }))

  // ─── Connection To The Database ──────────────────────────────────────────────

  await connect(String(process.env.CONNECTION_STRING))
  console.log('Successfully connected to the DB')

  // ─── Routes ──────────────────────────────────────────────────────────────────

  about(app)
  authentication(app)
  authorization(app)
  revokation(app)
  callbacks(app)
  area(app)

  // ─── Error Handler ───────────────────────────────────────────────────────────

  app.use(errorHandler)

  // ─── Start The Server ────────────────────────────────────────────────────────

  const server = app.listen(port, (): void => {
    console.log('Backend listening on port:', port)
  })

  // ─── Graceful Shutdown ───────────────────────────────────────────────────────

  process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server.')
    server.close(() => {
      debug('HTTP sever closed.')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
}

// ─── Call To The Main Function ───────────────────────────────────────────────

try {
  main()
} catch (err: unknown) {
  console.error(err)
}

// ─────────────────────────────────────────────────────────────────────────────
