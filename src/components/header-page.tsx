import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '@services/user/index';
import { useAuth } from '@/auth/contexts/auth-provider'
import useAuthCookies from '@/auth/hooks/use-auth-cookies'
import { queryClient } from '@/lib/react-query'
import { keyCurrentUser } from '@services/user/keys'
import { User } from '@/services/user/types';
import { useQuery } from '@tanstack/react-query';


export function HeaderPage() {
  const { mutate: mutateLogout } = useLogout() 
  const { setTokens } = useAuth()
  const { removeAuthCookies } = useAuthCookies()
  const navigate = useNavigate()
  
  const { data: user } = useQuery<User>({
    queryKey: keyCurrentUser(),
    staleTime: Infinity,
  })
  

  const handleSignOut = () => {
    mutateLogout({})
    removeAuthCookies()
    setTokens(undefined)
    queryClient.invalidateQueries({ queryKey: keyCurrentUser() })
    navigate('/')
  }

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between w-full max-w-[1300px]">
      <div className="flex items-center">
        <div className="text-2xl">Smart&Budget</div>
      </div>
      <nav className="flex space-x-4">
        <Link to="/home" className="hover:text-gray-400">Minha área</Link>
        <Link to="/" className="hover:text-gray-400">Contas</Link>
        <Link to="/users" className="hover:text-gray-400">Usuários</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <CircleUserRound size="1.5em" />
        <span>{user?.first_name}</span>
        <Button className="flex items-center space-x-2 bg-white text-gray-700 px-3 py-2 rounded" onClick={handleSignOut}>
          <LogOut size="1.2em" />
          <span>Sair</span>
        </Button>
      </div>
    </header>
  );
}