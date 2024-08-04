import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="h-screen flex w-full items-center justify-center bg-gray-900 flex-col gap-9">
      <div className="w-full flex justify-center">
        <h1 className="text-5xl text-gray-200">Smart$Budge</h1>
      </div>
      <section className="w-full max-w-[500px]">
        <Card className="bg-transparent text-white border-none shadow-none">
          <CardHeader className="flex flex-col items-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">E-mail</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Senha</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <div>
                <Button className="bg-white text-gray-700 w-full">Login</Button>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Novo no Smart$Budge?
                  <Link to="/register" className="font-semibold text-blue-600">
                   {" "} Crie uma conta
                  </Link>
                  .
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}