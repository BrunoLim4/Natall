import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { ShoppingCart, User, Check, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";

export default function Sobre() {
  const { isAuthenticated } = useAuth();
  const { openCart, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER (Consistente com a Home) */}
      <header className="w-full py-6 px-8 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-yellow-600 cursor-pointer">granpanettone</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Início</Link>
          <Link href="/produtos" className="hover:text-red-600 transition-colors">Produtos</Link>
          <Link href="/sobre" className="text-red-600 font-bold transition-colors">Sobre</Link>
        </nav>

        <div className="flex items-center gap-6">
          
          <div 
            className="relative cursor-pointer hover:text-red-600 text-gray-600 transition-transform active:scale-95"
            onClick={openCart}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">

        <div className="space-y-8">
          
          {/* Seção 1: Nossa História */}
          <Card className="p-8 md:p-10 border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h2 className="text-2xl font-bold text-[#1a472a] mb-6">Nossa História</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                O granpanettone nasceu da paixão por criar momentos mágicos e sabores inesquecíveis durante a época mais especial do ano. Nossos panetones artesanais e presentes natalinos são feitos com ingredientes selecionados e muito carinho.
              </p>
              <p>
                Cada panetone é uma obra de arte, preparado com técnicas tradicionais italianas e toques especiais que tornam cada mordida uma experiência única. Do forno para sua mesa, com amor e dedicação.
              </p>
            </div>
          </Card>

          {/* Seção 2: Estatísticas (Grid de 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 flex flex-col items-center justify-center text-center border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <span className="text-4xl font-bold text-[#d32f2f] mb-2">15k+</span>
              <span className="text-gray-600 font-medium">Panetones Vendidos</span>
            </Card>
            <Card className="p-8 flex flex-col items-center justify-center text-center border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <span className="text-4xl font-bold text-[#d32f2f] mb-2">100%</span>
              <span className="text-gray-600 font-medium">Artesanais</span>
            </Card>
            <Card className="p-8 flex flex-col items-center justify-center text-center border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-4xl font-bold text-[#d32f2f]">5</span>
                <Star className="w-8 h-8 text-[#d32f2f] fill-current" />
              </div>
              <span className="text-gray-600 font-medium">Avaliação Clientes</span>
            </Card>
          </div>

          {/* Seção 3: Nossos Valores */}
          <Card className="p-8 md:p-10 border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h2 className="text-2xl font-bold text-[#1a472a] mb-6">Nossos Valores</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d32f2f] mt-1 shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#1a472a]">Qualidade Artesanal:</strong> Cada panetone é preparado manualmente com ingredientes premium selecionados.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d32f2f] mt-1 shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#1a472a]">Tradição:</strong> Receitas tradicionais italianas com toques especiais da nossa casa.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d32f2f] mt-1 shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#1a472a]">Frescor Garantido:</strong> Produzido sob encomenda para garantir máximo frescor e sabor.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d32f2f] mt-1 shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#1a472a]">Magia Natalina:</strong> Criamos experiências especiais para tornar seu Natal inesquecível.
                </p>
              </li>
            </ul>
          </Card>

          {/* Seção 4: Compromisso com Você */}
          <Card className="p-8 md:p-10 border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h2 className="text-2xl font-bold text-[#1a472a] mb-6">Compromisso com Você</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                No granpanettone, cada cliente faz parte da nossa família natalina. Garantimos entrega pontual antes do Natal e embalagens especiais que tornam cada presente ainda mais encantador.
              </p>
              <p>
                Trabalhamos com os melhores fornecedores de ingredientes premium e parceiros logísticos confiáveis para garantir que seus panetones e presentes cheguem fresquinhos e em perfeito estado, prontos para encantar sua família.
              </p>
            </div>
          </Card>

        </div>
      </main>

    </div>
  );
}