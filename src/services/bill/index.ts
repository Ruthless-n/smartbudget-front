/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import parseResponseData from '@utils/parse-response-data'
import { BillFormPayload } from './types'



export const useCreateBill = () => {
  return useMutation<any, AxiosError, BillFormPayload>({
    mutationFn: (payload: BillFormPayload) => {
      return api.post('/bills/', payload).then((response) => parseResponseData(response) as any);
    }
  })
}





