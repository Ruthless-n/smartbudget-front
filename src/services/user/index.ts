/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { keyCurrentUser, keyListUsers } from './keys'
import { RawResponse } from '@entities/response'
import parseResponseData from '@utils/parse-response-data'
import { User, UserFormPayload } from './types'




interface LoginProps {
    email: string
    password: string
  }

export const useLogin = () => {
    return useMutation<any, AxiosError, LoginProps>({
        mutationFn: ({ email, password }: LoginProps) => {
            return api.post('/user/auth/', { email, password })
    },
})
}

export const useLogout = () => {
    const refreshToken = Cookies.get('refresh')
  
    return useMutation<any, AxiosError, object>({
      mutationFn: () => {
        return api.post('/user/logout/', {
          refresh: refreshToken,
        })
      },
    })
  }


export const useCreateUser = () => {
  return useMutation<any, AxiosError, UserFormPayload>({
    mutationFn: (payload: UserFormPayload) => {
      return api.post('/user/', payload).then((response) => parseResponseData(response) as any);
    }
  })
}



export const useCurrentUser = () => {
    const queryResult = useQuery({
      queryKey: keyCurrentUser(),
      queryFn: () =>
        api.get<RawResponse<any>>('/user/me/').then((response) => parseResponseData(response) as any),
    })
  
    return {
      ...queryResult,
      data: queryResult.data,
    }
}


export const useGetUsers = () => {
  const queryResult = useQuery({
    queryKey: keyListUsers(),
    queryFn: () =>
      api.get<RawResponse<User[]>>('/user/').then((response) => parseResponseData(response) as User[]),
  })

  return {
    ...queryResult,
    data: queryResult.data,
  }
}


export const useDeleteUser = () => {
  return useMutation<any, AxiosError, number>({
    mutationFn: (id: number) => {
      return api.delete(`/user/${id}`).then((response) => parseResponseData(response) as any);
    },
  });
};

