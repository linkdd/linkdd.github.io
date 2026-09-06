import type { Bounds, DesktopWindowState } from './DesktopWindow/types'

export type WindowAction =
  | { type: 'open'; id: string; bounds: Bounds }
  | { type: 'focus' | 'minimize' | 'maximize' | 'close'; id: string }
  | { type: 'bounds'; id: string; bounds: Bounds }

export function fitBounds(
  bounds: Bounds,
  width: number,
  height: number,
): Bounds {
  const w = Math.min(bounds.width, width)
  const h = Math.min(bounds.height, height)

  return {
    width: w,
    height: h,
    x: Math.max(0, Math.min(bounds.x, width - w)),
    y: Math.max(0, Math.min(bounds.y, height - h)),
  }
}

// Array order is the stacking order; the last visible window is active.
export function windowReducer(
  state: DesktopWindowState[],
  action: WindowAction,
): DesktopWindowState[] {
  const window = state.find(item => item.id === action.id)

  if (action.type === 'open' || action.type === 'focus') {
    if (!window) {
      if (action.type !== 'open') {
        return state
      }

      return [
        ...state,
        {
          id: action.id,
          taskbarOrder: Math.max(-1, ...state.map(item => item.taskbarOrder)) + 1,
          bounds: action.bounds,
          minimized: false,
          maximized: false,
        },
      ]
    }

    const next = { ...window, minimized: false }

    return [...state.filter(item => item.id !== action.id), next]
  }

  if (action.type === 'close') {
    return state.filter(item => item.id !== action.id)
  }

  return state.map(item => {
    if (item.id !== action.id) {
      return item
    }

    if (action.type === 'minimize') {
      return { ...item, minimized: true }
    }

    if (action.type === 'maximize') {
      return { ...item, maximized: !item.maximized }
    }

    return action.type === 'bounds' ? { ...item, bounds: action.bounds } : item
  })
}
