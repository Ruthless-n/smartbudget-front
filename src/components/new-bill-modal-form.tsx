import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListCategories } from "@/services/category";
// import { useCreateBill } from '@/services/bill';
// import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillFormPayload } from "@/services/bill/types";
import { keyCurrentUser } from "@/services/user/keys";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/services/user/types";
import { LoaderCircle, X } from "lucide-react";
import { useListStatus } from "@/services/status";
import { useCreateBill } from "@/services/bill";
import { toast } from "sonner";
import MoneyInput from "./money-input";
import { queryClient } from "@/lib/react-query";
import { keyGetTotal, keyListBills } from "@/services/bill/keys";
// import { LoaderCircle } from 'lucide-react';


interface InviteGuestsModalProps {
  closeNewBillModal: () => void
}

export function BillModalForm(props:InviteGuestsModalProps) {
  const { closeNewBillModal } = props

  const { data: categories } = useListCategories();
  const { data: status_available } = useListStatus();
  const { data: user } = useQuery<User>({
    queryKey: keyCurrentUser(),
    staleTime: Infinity,
  })
  const { mutate: createBill, isPending: isCreateBillPending } = useCreateBill();

  const [billName, setBillName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    const payload: BillFormPayload = {
      bill_name: billName,
      due_date: new Date(dueDate),
      responsible_id: user?.id,
      category_id:
        categories.find(
          (category_obj) => category_obj.category_name === category
        )?.id_category || null,
      status_id: status_available.find(
        (status_obj) => status_obj.status_name === status
      )?.id_status || null,
      amount: parseFloat(amount)
    };
    
    createBill(payload, {
      onSuccess: (response) => {
        console.log(response.data);
        toast.success("Conta criada com sucesso!");
        queryClient.invalidateQueries({
          queryKey: keyListBills(user?.id)
        })

        queryClient.invalidateQueries({
          queryKey: keyGetTotal()
        })

        queryClient.invalidateQueries({
          queryKey: keyCurrentUser()
        })
      },
      onError: () => {
        toast.error("Ops! Algo deu errado.");
      },
    });
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black/20">
      <div className="w-[640px] rounded-xl py-5 px-6 items-center justify-center  flex-col  bg-gray-950 shadow">
        <section className="w-full justify-center">
          <Card className="bg-transparent text-white border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Criar Conta</CardTitle>
              <Button onClick={closeNewBillModal}>
                <X className="size-5 text-zinc-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <Label className="text-gray-300">Nome da Conta</Label>
                  <Input
                    className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="text"
                    placeholder="Informe o nome da conta"
                    value={billName}
                    onChange={(e) => setBillName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-gray-300">Data de Vencimento</Label>
                  <Input
                    className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="date"
                    placeholder="Informe a data de vencimento"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-gray-300">Categoria</Label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger
                      id="category"
                      className="ring-0 focus:ring-0 bg-transparent border-gray-400 text-gray-400 data-[placeholder]:text-gray-500 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0"
                    >
                      <SelectValue
                        placeholder="Informe a Categoria"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-400 text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0">
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id_category}
                          value={category.category_name}
                        >
                          {capitalizeFirstLetter(category.category_name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-gray-300">Situação</Label>
                  <Select onValueChange={setStatus}>
                    <SelectTrigger
                      id="category"
                      className="ring-0 focus:ring-0 bg-transparent border-gray-400 text-gray-400 data-[placeholder]:text-gray-500 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0"
                    >
                      <SelectValue
                        placeholder="Informe a Categoria"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-400 text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0">
                      {status_available?.map((status) => (
                        <SelectItem
                          key={status.id_status}
                          value={status.status_name}
                        >
                          {capitalizeFirstLetter(status.status_name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-gray-300">Valor</Label>
                  <MoneyInput
                    value={amount}
                    onChange={setAmount}
                  />
                </div>
                <div>
                  <Button
                    className="bg-white text-gray-700 w-full"
                    type="submit"
                  >
                    Finalizar
                    {isCreateBillPending && <LoaderCircle className="h-4 w-4 animate-spin ml-2" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
