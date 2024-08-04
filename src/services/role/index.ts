import { useQuery } from '@tanstack/react-query'
import { keyListRoles } from './keys'
import { Role } from './types'
import { api } from '@/lib/axios'
import { RawResponse } from '@entities/response'
import parseResponseData from '@utils/parse-response-data'

export const useListRoles = () => {
  const queryResult = useQuery({
    queryKey: keyListRoles(),
    queryFn: () =>
      api
        .get<RawResponse<Role[]>>('/role/')
        .then((response) => parseResponseData(response) as Role[]),
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
