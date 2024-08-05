/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import parseResponseData from '@utils/parse-response-data'
import { Bill, BillFormPayload } from './types'
import { RawResponse } from '@/entities/response'
import { keyGetTotal, keyListBills } from './keys'



export const useCreateBill = () => {
  return useMutation<any, AxiosError, BillFormPayload>({
    mutationFn: (payload: BillFormPayload) => {
      return api.post('/bills/', payload).then((response) => parseResponseData(response) as any);
    }
  })
}

export const useListBills = (id: number) => {
  const queryResult = useQuery({
    queryKey: keyListBills(id),
    queryFn: () =>
      api
        .get<RawResponse<Bill[]>>(`/bills/user/${id}`)
        .then((response) => parseResponseData(response) as Bill[]),
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}


export const useDeleteBill = () => {
  return useMutation<any, AxiosError, number>({
    mutationFn: (id: number) => {
      return api.delete(`/bills/${id}`).then((response) => parseResponseData(response) as any);
    },
  });
};



export const useGetTotalSpent = () => {
  const queryResult = useQuery({
    queryKey: keyGetTotal(),
    queryFn: () =>
      api
        .get<RawResponse<any>>(`/bills/total/`)
        .then((response) => parseResponseData(response)),
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}



