import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { useDeleteBill } from "@/services/bill";
import { keyListBills } from "@/services/bill/keys"
import { Bill } from "@services/bill/types";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

interface BillTableProps {
  bills: Bill[];
  user_id: number | undefined | null;
}

export function BillTable(props: BillTableProps) {
  const { bills, user_id } = props;
  const { mutate: deleteBill } = useDeleteBill()
  function handleDeleteBill(id_bill: number) {
    console.log(id_bill);

    deleteBill(id_bill, {
      onSuccess: () => {
        toast.success("Conta deletada com sucesso.")
        queryClient.invalidateQueries({
          queryKey: keyListBills(user_id)
        })
      },
      onError: () => {
        toast.error("Ops ! Algo deu errado.")
      }
    });
    
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="rounded-md border">
      
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableHead>Nome da Conta</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-200 font-medium">
          {bills.map((bill) => (
            <TableRow key={bill.id_bill}>
              <TableCell>{bill.bill_name}</TableCell>
              <TableCell>R$ {bill.amount}</TableCell>
              <TableCell>
                {new Date(bill.due_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {bill.payday
                  ? new Date(bill.payday).toLocaleDateString()
                  : "Não paga"}
              </TableCell>
              <TableCell>
                {capitalizeFirstLetter(bill.responsible.first_name)}
              </TableCell>
              <TableCell>
                {capitalizeFirstLetter(bill.category.category_name)}
              </TableCell>
              <TableCell>
                {capitalizeFirstLetter(bill.status.status_name)}
              </TableCell>
              <TableCell>
                  <div className="w-full flex items-center gap-2">
                    <button onClick={() => handleDeleteBill(bill.id_bill)}>
                      <Trash className="size-5 bg-red-600 rounded-sm p-0.5"/>
                    </button>
                    <Pencil  className="size-5 bg-blue-600 rounded-sm p-0.5"  />
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BillTable;
