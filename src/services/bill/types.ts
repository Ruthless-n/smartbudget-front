export type Bill = {
    id_bill: number
    due_date: string  
    payday: string    
    bill_name: string
    responsible: number
    category: number
    status: number
  }


export type BillFormPayload  = {
    due_date: Date
    bill_name: string
    responsible: number | null | undefined
    category: number | null
    status: number | null
}


