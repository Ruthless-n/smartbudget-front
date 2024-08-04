import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListRoles } from "@/services/role";
import { useCreateUser } from "@/services/user/";
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { UserFormPayload } from "@/services/user/types";
import { LoaderCircle } from "lucide-react";

export function RegisterPage() {

  const {data: roles } = useListRoles();
  const { mutate: createUser,isPending: isCreateUserPending } = useCreateUser();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function hanhandleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const payload:UserFormPayload = {
      email,
      password,
      first_name: name,
      last_name: lastName,
      is_superuser: false,
      is_staff: false,
      cpf,
      role_id: roles.find(role_obj => role_obj.role_name === role)?.id_role || null
    }
    
    createUser(payload, {
      onSuccess: (response) => {
        console.log(response.data);
        toast.success("Tudo certo, vá para o Login para acessar sua conta ")
      },
      onError: () => {
        toast.success("Ops ! Algo deu errado")
      },

    })

    

  }


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
            <form action="" onSubmit={hanhandleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Nome</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Informe seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Sobrenome</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Informe seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">CPF</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Informe seu CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Cargo</Label>
                <Select onValueChange={setRole}>
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
                    {roles?.map((role) => (
                      <SelectItem key={role.id_role} value={role.role_name}>
                        {role.role_name}
                      </SelectItem>
                    ) )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">E-email</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  placeholder="Informe seu E-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">Senha</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="password"
                  placeholder="Informe sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Button className="bg-white text-gray-700 w-full" type="submit">
                  Registrar
                  {isCreateUserPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
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
