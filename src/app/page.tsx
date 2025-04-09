import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  QrCode,
  Smartphone,
  Activity,
  RefreshCw,
  PhoneOff,
  BarChart4,
  Bot,
  Brain,
  Zap,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  const features = [
    {
      title: "Automação Inteligente",
      description:
        "Automatize tarefas repetitivas e processos de negócio com nossa tecnologia avançada. Reduza erros e aumente a eficiência operacional.",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: "IA Preditiva",
      description:
        "Antecipe tendências e comportamentos com nossa IA preditiva. Tome decisões mais inteligentes baseadas em dados e insights avançados.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Integração Total",
      description:
        "Conecte todos os seus sistemas e ferramentas em uma única plataforma. Fluxos de trabalho integrados e comunicação unificada.",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: "Análise Avançada",
      description:
        "Obtenha insights profundos sobre seu negócio com dashboards personalizados e relatórios em tempo real. Métricas que importam.",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: "Automação de Atendimento",
      description:
        "Atendimento ao cliente 24/7 com chatbots inteligentes. Respostas instantâneas e personalizadas para melhor experiência do cliente.",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: "Otimização de Processos",
      description:
        "Identifique e elimine gargalos em seus processos. Fluxos de trabalho otimizados para máxima produtividade e eficiência.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Funcionalidades de Gerenciamento do WhatsApp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso painel oferece tudo o que você precisa para conectar e
              gerenciar suas contas do WhatsApp com facilidade e segurança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Interface Intuitiva do Painel
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gerencie suas instâncias do WhatsApp com nosso painel limpo e
              amigável.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center bg-gray-100">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-green-500 mb-3">
                    <QrCode className="w-10 h-10 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Conectar Conta</h3>
                  <p className="text-gray-500 text-sm">
                    Escaneie o código QR com o WhatsApp para autenticar
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-green-500 mb-3">
                    <RefreshCw className="w-10 h-10 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Reiniciar Instância
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Reinicie rapidamente sua conexão do WhatsApp
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-green-500 mb-3">
                    <PhoneOff className="w-10 h-10 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Desconectar</h3>
                  <p className="text-gray-500 text-sm">
                    Desconecte com segurança sua conta do WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Instâncias Ativas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99,9%</div>
              <div className="text-green-100">Tempo de Atividade Garantido</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Suporte Técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Preços Simples e Transparentes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o plano perfeito para suas necessidades de gerenciamento
              do WhatsApp. Sem taxas ocultas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Gerenciar seu WhatsApp?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Comece com nosso Painel de Gerenciamento do WhatsApp hoje e assuma o
            controle de suas mensagens.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Acessar Painel
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
