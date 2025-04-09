"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { supabase } from "../../supabase/supabase";
import { useState } from "react";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tradução dos nomes dos planos
  const getLocalizedName = (name: string) => {
    if (name === "Basic") return "Básico";
    if (name === "Pro") return "Profissional";
    if (name === "Enterprise") return "Empresarial";
    return name;
  };

  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não retornada");
      }
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      setError(
        "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`w-[350px] relative overflow-hidden ${item.popular ? "border-2 border-green-500 shadow-xl scale-105" : "border border-gray-200"}`}
    >
      {item.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-30" />
      )}
      <CardHeader className="relative">
        {item.popular && (
          <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-fit mb-4">
            Mais Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
          {getLocalizedName(item.name)}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-bold text-gray-900">
            R${item?.amount / 100}
          </span>
          <span className="text-gray-600">
            /
            {item?.interval === "month"
              ? "mês"
              : item?.interval === "year"
                ? "ano"
                : item?.interval}
          </span>
        </CardDescription>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            •{" "}
            {item.name === "Basic"
              ? "1 instância do WhatsApp"
              : item.name === "Pro"
                ? "5 instâncias do WhatsApp"
                : "Instâncias ilimitadas do WhatsApp"}
          </p>
          <p className="text-sm text-gray-600">
            •{" "}
            {item.name === "Basic"
              ? "Monitoramento básico"
              : item.name === "Pro"
                ? "Monitoramento avançado"
                : "Monitoramento empresarial"}
          </p>
          <p className="text-sm text-gray-600">
            •{" "}
            {item.name === "Basic"
              ? "Suporte por e-mail"
              : item.name === "Pro"
                ? "Suporte prioritário"
                : "Suporte dedicado 24/7"}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="relative flex flex-col">
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          disabled={isLoading}
          className={`w-full py-6 text-lg font-medium ${item.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
        >
          {isLoading ? "Processando..." : "Começar Agora"}
        </Button>
      </CardFooter>
    </Card>
  );
}
