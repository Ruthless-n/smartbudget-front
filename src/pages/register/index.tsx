import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <div className="h-screen flex w-full items-center justify-center bg-gray-900 flex-col gap-9">
      <div className="w-full flex justify-center">
        <h1 className="text-5xl text-gray-200">Smart$Budge</h1>
      </div>
      <section className="w-full max-w-[500px]">
        <Card className="bg-transparent text-white border-none shadow-none">
          <CardHeader className="flex flex-col items-center">
            <CardTitle>Criar Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Nome</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Informe seu nome"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">CPF</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Informe seu CPF"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Cargo</Label>
                <Select>
                  <SelectTrigger
                    id="cargo"
                    className="ring-0 focus:ring-0 bg-transparent border-gray-400 text-gray-400 data-[placeholder]:text-gray-500 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0"
                  >
                    <SelectValue
                      placeholder="Informe seu Cargo"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-400 text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0">
                    <SelectItem value="next">Cargo 1</SelectItem>
                    <SelectItem value="sveltekit">Cargo 2</SelectItem>
                    <SelectItem value="astro">Cargo 3</SelectItem>
                    <SelectItem value="nuxt">Cargo 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">E-email</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  placeholder="Informe seu E-email"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Senha</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="password"
                  placeholder="Informe sua senha"
                  required
                />
              </div>

              <div>
                <Button className="bg-white text-gray-700 w-full">
                  Registrar
                </Button>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Já tem uma conta no Smart$Budge?
                  <Link to="/login" className="font-semibold text-blue-600">
                  {" "}Vá para o Login
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
