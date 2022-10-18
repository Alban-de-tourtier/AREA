//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   I N T E R F A C E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

// ─── Action Interface ────────────────────────────────────────────────────────

export interface IAction {
    service: string
    name: string
    description?: string
}

// ─── Reaction Interface ──────────────────────────────────────────────────────

export interface IReaction {
    service: string
    name: string
    description?: string
}

// ─── AREA Interface ──────────────────────────────────────────────────────────

export default interface IArea {
    action: IAction
    reaction: IReaction
}

// ─────────────────────────────────────────────────────────────────────────────
