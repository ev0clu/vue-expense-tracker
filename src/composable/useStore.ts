import { computed, ref } from 'vue'
import type { History } from '../types'
import { restoreStorage, saveStorage } from '../localstorage'

const history = ref<History[]>([
  { id: '1a', name: 'shopping', amount: -15, createdAt: new Date(), updatedAt: new Date() },
  { id: '2b', name: 'selling', amount: 100, createdAt: new Date(), updatedAt: new Date() },
  { id: '3c', name: 'car', amount: 30, createdAt: new Date(), updatedAt: new Date() },
])

export function useStore() {
  ;(() => {
    const balance = restoreStorage()
    if (!balance) saveStorage(history.value)
    else history.value = balance
  })()

  const addItem = (id: string, name: string, amount: number) => {
    const date = new Date()
    history.value.push({ id, name, amount, createdAt: date, updatedAt: date })
    saveStorage(history.value)
  }

  const updateItem = (id: string, name: string, amount: number) => {
    const index = history.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      const updatedAt = new Date()

      history.value[index].name = name
      history.value[index].amount = amount
      history.value[index].updatedAt = updatedAt

      saveStorage(history.value)
      return history.value[index].name
    }
    return null
  }

  const removeItem = (id: string): null | string => {
    const index = history.value.findIndex((item) => item.id === id)
    const name = history.value[index].name

    if (index === -1) {
      return null
    } else {
      history.value.splice(index, 1)
      saveStorage(history.value)
      return name
    }
  }

  const calculatedBalance = computed(() =>
    history.value.reduce((acc, curr) => acc + curr.amount, 0),
  )

  const calculatedIncome = computed(() =>
    history.value.reduce((acc, curr) => {
      if (curr.amount > 0) return acc + curr.amount
      return acc
    }, 0),
  )

  const calculatedExpense = computed(() =>
    history.value.reduce((acc, curr) => {
      if (curr.amount < 0) return acc - curr.amount
      return acc
    }, 0),
  )

  return {
    history,
    addItem,
    updateItem,
    removeItem,
    calculatedBalance,
    calculatedIncome,
    calculatedExpense,
  }
}
