import { HeaderPage } from "@/components/header-page";
import Text from '@/components/text'
import WelcomeHeader from "@/components/welcome-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BillModalForm } from "@/components/new-bill-modal-form";
import { keyCurrentUser } from "@/services/user/keys";
import { User } from "@/services/user/types";
import { useQuery } from "@tanstack/react-query";
import BillTable from "@/components/bills-table";
import { useListBills } from "@/services/bill";


export function HomePage() {
  const [isNewBillOpen, setIsNewBillOpen] = useState(false);
  const { data: user } = useQuery<User>({
    queryKey: keyCurrentUser(),
    // staleTime: Infinity,
  });

  const userId = user?.id;
  const { data: bills } = useListBills(userId ? userId : -1);
  function openNewBillModal() {
    console.log(isNewBillOpen);
    setIsNewBillOpen(true);
  }

  function closeNewBillModal() {
    setIsNewBillOpen(false);
  }

  return (
    <div className="h-screen flex py-40 justify-center w-full">
      <div className="w-full fixed top-0 flex items-center justify-center">
        <HeaderPage />
      </div>
      <main className="w-full flex flex-col max-w-[1100px] gap-20">
        <div className="text-3xl text-gray-300">
          <WelcomeHeader />
        </div>
        <div>
          <section
            className="w-full flex flex-col  justify-start gap-5
          "
          >
            <div className="flex w-full justify-between">
              <div className="text-2xl text-gray-300">
                <span>Histórico de contas</span>
              </div>
              <Button
                className="flex items-center space-x-2 bg-white text-gray-700 px-3 py-2 rounded"
                onClick={openNewBillModal}
              >
                <Plus size="1.2em" />
                <span>Adicionar nova conta</span>
              </Button>
            </div>

            <div>
              <BillTable bills={bills} user_id={user?.id}/>
            </div>
            <div>
              <Text className="text-2xl font-medium text-gray-400">Gasto total: {user?.total_spent}</Text>

            </div>
          </section>
        </div>

        {isNewBillOpen && (
          <BillModalForm closeNewBillModal={closeNewBillModal} />
        )}
      </main>
    </div>
  );
}
