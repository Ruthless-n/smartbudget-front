import { Role } from "@/services/role/types"

export type Auth = {
  access: string
  refresh: string
}

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_superuser: boolean
  cpf: string
  role: Role
}

