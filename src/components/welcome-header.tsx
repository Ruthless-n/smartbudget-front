import Text from '@/components/text'
import { keyCurrentUser } from '@services/user/keys'
import { User } from '@services/user/types'
import { useQuery } from '@tanstack/react-query'
import { forwardRef, HTMLAttributes } from 'react'

interface WelcomeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const WelcomeHeader = forwardRef<HTMLDivElement, WelcomeHeaderProps>((props, ref) => {
  const { data: user, status: statusUser } = useQuery<User>({
    queryKey: keyCurrentUser(),
    staleTime: Infinity,
  })

  if (statusUser === 'error') {
    return <Text tag="h1">Erro ao carregar usuário</Text>
  }

  return (
    <div ref={ref} {...props} className="flex w-full items-center justify-between md:mt-8">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <Text tag="h1" className="h1">
          Olá, {user?.first_name}
        </Text>
      </div>
    </div>
  )
})

export default WelcomeHeader
