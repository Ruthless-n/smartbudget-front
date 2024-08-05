import { HeaderPage } from "@/components/header-page";
import WelcomeHeader from "@/components/welcome-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UsersTable } from "@/components/users-table";

export function UsersPage() {

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
                <span>Usuários</span>
              </div>
              <Button className="flex items-center space-x-2 bg-white text-gray-700 px-3 py-2 rounded">
                <Plus size="1.2em" />
                <span>Adicionar novo usuário</span>
              </Button>
            </div>
            <div>
              <UsersTable />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
