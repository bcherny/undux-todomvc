import { mapValues } from 'lodash'

export function fromLocalStorage<T extends object>(object: T): T {
  return mapValues(object, keyFromLocalStorage)
}

function keyFromLocalStorage<T>(or: T, key: string): T {
  let value = localStorage.getItem(key)
  if (value !== null) {
    return JSON.parse(value)
  }
  return or
}

export function pluralize(count: number, word: string) {
  return count === 1 ? word : word + 's'
}

export function replace<T>(array: T[], item: T, replacement: T): T[] {
  let index = array.indexOf(item)
  if (index < 0) {
    return array
  }
  return [
    ...array.slice(0, index),
    replacement,
    ...array.slice(index + 1)
  ]
}
