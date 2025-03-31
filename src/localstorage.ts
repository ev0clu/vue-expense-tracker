import type { History } from './types'

export function saveStorage(arr: History[]) {
  localStorage.setItem('vue-balance', JSON.stringify(arr))
}

export function restoreStorage(): History[] | null {
  const restoredData = localStorage.getItem('vue-balance')
  if (!restoredData) return null
  else return JSON.parse(restoredData)
}
