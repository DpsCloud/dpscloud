import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  QrCode,
  Smartphone,
  Activity,
  Bot,
  Brain,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Potencialize seu Negócio com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Automação e IA
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transforme sua comunicação e gestão com nossa plataforma inteligente. 
              Automatize processos, aumente sua produtividade e impulsione seus resultados 
              com o poder da Inteligência Artificial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Comece Gratuitamente
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Ver Preços
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-500" />
                <span>Automação Inteligente</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-green-500" />
                <span>IA Avançada</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>Produtividade Máxima</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
