import { useQuery } from '@tanstack/react-query'
import { keyListStatus } from './keys'
import { Status } from './types'
import { api } from '@/lib/axios'
import { RawResponse } from '@entities/response'
import parseResponseData from '@utils/parse-response-data'

export const useListStatus = () => {
  const queryResult = useQuery({
    queryKey: keyListStatus(),
    queryFn: () =>
      api
        .get<RawResponse<Status[]>>('/status/')
        .then((response) => parseResponseData(response) as Status[]),
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
