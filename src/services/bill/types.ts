import { Category } from "../category/types"
import { Status } from "../status/types"
import { User } from "../user/types"

export type Bill = {
    id_bill: number
    due_date: string  
    payday: string    
    bill_name: string
    responsible: User
    category: Category
    status: Status
    amount: number
  }


export type BillFormPayload  = {
    due_date: Date
    bill_name: string
    responsible_id: number | null | undefined
    category_id: number | null
    status_id: number | null
    amount: number
}


