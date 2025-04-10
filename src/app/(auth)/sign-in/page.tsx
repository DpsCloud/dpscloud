import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "../../../supabase/client";
import Link from "next/link";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;
  const error = searchParams.error;

  if (error) {
    let errorMessage = "Erro ao fazer login com Google";
    switch (error) {
      case "oauth_error":
        errorMessage = "Erro na autenticação do Google";
        break;
      case "no_code":
        errorMessage = "Código de autenticação não recebido";
        break;
      case "session_error":
        errorMessage = "Erro ao criar sessão";
        break;
      case "unexpected":
        errorMessage = "Erro inesperado ao fazer login";
        break;
    }
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Erro</h2>
          <p className="mt-2 text-gray-600">{errorMessage}</p>
          <Link
            href="/sign-in"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Tentar novamente
          </Link>
        </div>
      </div>
    );
  }

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Entrar</h1>
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                className="text-primary font-medium hover:underline transition-all"
                href="/sign-up"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <form action={signInWithGoogleAction}>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Entrar com Google
              </Button>
            </form>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <form className="mt-6 flex flex-col space-y-6" action={signInAction} method="POST">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </Label>
                  <Link
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Sua senha"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full"
              pendingText="Entrando..."
            >
              Entrar
            </SubmitButton>

            <FormMessage message={message} />
          </form>
        </div>
      </div>
    </>
  );
}
