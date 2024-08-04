import { QueryKey } from '@tanstack/react-query'
import axios from 'axios'
import parseResponseData from '@utils/parse-response-data'
import { Color } from '@entities/color'
import { User } from '@user/services/types'

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (!parts) return

  if (!value) return

  if (parts.length === 2) return parts.pop()?.split(';')?.shift()
}

export const queryKeyToUrl = (queryKey: QueryKey): string => {
  if (!Array.isArray(queryKey)) {
    throw new Error('queryKey deve ser um array')
  }

  const pathParts: string[] = []
  const queryParams: string[] = []

  queryKey.forEach((key) => {
    if (typeof key === 'string' && key.includes('=')) {
      // É uma query string, adicionar ao array de queryParams
      queryParams.push(key)
    } else {
      // Não é uma query string, adicionar ao array de pathParts
      pathParts.push(encodeURIComponent(key.toString()))
    }
  })

  const path = pathParts.join('/')
  const query = queryParams.join('&')

  return query ? `/${path}/?${query}` : `/${path}/`
}

export const normalizedFilename = (filename: string): string => {
  const filenameWithoutPath = filename.split('files/')[1]

  const hyphenIndex = filenameWithoutPath.indexOf('-')

  if (hyphenIndex === -1) return filenameWithoutPath

  return filenameWithoutPath.substring(hyphenIndex + 1)
}

export const getParamsFromURL = (): Record<string, string> => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return Object.fromEntries(urlSearchParams.entries())
}

export const validateCEP = (cep: string): boolean => {
  return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ''))
}

export const CEPMask = (cep: string): string => {
  if (!cep) return ''

  cep = cep.replace(/\D/g, '')
  cep = cep.replace(/(\d{5})(\d)/, '$1-$2')

  return cep
}

export const moneyMask = (value: string): string => {
  if (!value) return 'R$ 0,00'

  const numericValue = value.replace(/\D/g, '')

  const numberValue = parseInt(numericValue, 10) / 100

  const formattedValue = numberValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return 'R$ ' + formattedValue
}

export async function useGetCep<T>(cep: string) {
  const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)

  return parseResponseData<T>(response)
}

export function abbreviateName(str1: string, str2?: string): string {
  if (str2 === undefined) {
    const words = str1.trim().split(/\s+/)
    if (words.length >= 2) {
      return `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`
    } else if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    } else {
      return ''
    }
  } else {
    const firstName = str1.trim().split(/\s+/)[0]
    const lastName = str2.trim().split(/\s+/).pop()!
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  }
}

const colors: Color[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

export function hashStringToIndex(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % colors.length
}

export function colorForAvatar(name: string): Color {
  const index = hashStringToIndex(name)
  return colors[index]
}

export const resolveUserAreaAccess = (user: User, areaName: string) => {
  if (user.is_staff) return true

  if (user.area.name === areaName) return true
}
