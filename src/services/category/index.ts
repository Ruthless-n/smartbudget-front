import { useQuery } from '@tanstack/react-query'
import { keyListCategories } from './keys'
import { Category } from './types'
import { api } from '@/lib/axios'
import { RawResponse } from '@entities/response'
import parseResponseData from '@utils/parse-response-data'

export const useListCategories = () => {
  const queryResult = useQuery({
    queryKey: keyListCategories(),
    queryFn: () =>
      api
        .get<RawResponse<Category[]>>('/category/')
        .then((response) => parseResponseData(response) as Category[]),
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
