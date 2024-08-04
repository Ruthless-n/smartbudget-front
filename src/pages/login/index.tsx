/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/services/user";
import useAuthCookies from "@/auth/hooks/use-auth-cookies";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/contexts/auth-provider";
import { Alert } from "@/components/ui/alert";
import Text from "@/components/text";
import { LoaderCircle } from "lucide-react";

export function LoginPage() {
  const { mutate: login, isPending: isPendingLogin } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { tokens, setTokens } = useAuth();

  const { setAuthCookies } = useAuthCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokens) {
      navigate('/home')
    }
  }, [tokens])

  function handleSubit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage(""),
      login(
        { email: email, password: password },

        {
          onSuccess: (response) => {
            const { access, refresh } = response.data;

            setAuthCookies(access, refresh);
            setTokens({ access, refresh });

            navigate("/home");
          },
          onError: (error) => {
            if (error.request.status === 401) {
              setErrorMessage(
                "Essa combinação de email e senha não funcionou. Tente novamente."
              );
            }
          },
        }
      );
  }

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
            <form
              action=""
              onSubmit={handleSubit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <Label className="text-gray-300">E-mail</Label>
                <Input
                  className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  placeholder="Digite seu email"
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
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                {errorMessage && (
                  <Alert variant="destructive" className="w-full text-center">
                    <Text truncate={false} className="small text-destructive">
                      {errorMessage}
                    </Text>
                  </Alert>
                )}
              </div>
              <div>
                <Button className="bg-white text-gray-700 w-full" type="submit">
                  {isPendingLogin && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Novo no Smart$Budge?
                  <Link to="/register" className="font-semibold text-blue-600">
                    {" "}
                    Crie uma conta
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
