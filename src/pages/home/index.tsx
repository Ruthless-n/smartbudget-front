import { HeaderPage } from "@/components/header-page";
import WelcomeHeader from "@/components/welcome-header";
import {
  Card,
  CardContent,
//   CardDescription,
//   CardFooter,
  CardHeader,
//   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BillModalForm } from "@/components/new-bill-modal-form";

export function HomePage() {
  const [isNewBillOpen, setIsNewBillOpen] = useState(false)


  function openNewBillModal(){
    console.log(isNewBillOpen)
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
          <section className="w-full flex flex-col  justify-start">
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
              <Card className="bg-transparent text-white border-none shadow-none">
                <CardHeader className="flex flex-col items-center">
                </CardHeader>
                <CardContent>
                 
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {isNewBillOpen && (
            <BillModalForm   closeNewBillModal={closeNewBillModal}/>
        )}
      </main>
    </div>
  );
}
