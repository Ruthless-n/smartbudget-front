import { QueryKey } from '@tanstack/react-query'

export const keyListBills = (id: number | null | undefined): QueryKey => ['bills','user', id]
export const keyGetTotal = (): QueryKey => ['bills','total']

