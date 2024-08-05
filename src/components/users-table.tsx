import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Pencil, Trash } from "lucide-react";
import BillTable from "./bills-table";
import { useDeleteUser, useGetUsers } from "@/services/user";
import { formatCPF } from "@/utils/helpers";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { keyListUsers } from "@/services/user/keys";


export function UsersTable(){
  // const { users, user_id } = props;
  const { data: users } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser()

  function handleDeleteUser(id_user: number) {
    deleteUser(id_user, {
      onSuccess: () => {
        toast.success("Conta deletada com sucesso.")
        queryClient.invalidateQueries({
          queryKey: keyListUsers()
        })
      },
      onError: () => {
        toast.error("Ops ! Algo deu errado.")
      }
    });
    
  }

  // function capitalizeFirstLetter(str: string) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }
  return (
    <div className="rounded-md border">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Gasto</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-200 font-medium">
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{formatCPF(user?.cpf)}</TableCell>
              <TableCell>
                {user.role.role_name}
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell>
                R$ {user.total_spent}
              </TableCell>
              <TableCell>
                  <div className="w-full flex items-center gap-2">
                    <button onClick={() => handleDeleteUser(user.id)}>
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
