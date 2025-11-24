import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRODUCTS_MOCK } from "@/const";
import { Link } from "wouter";
import { ShoppingCart, Truck, Shield, Package, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext"; // Importando o contexto global
import "../styles/home.css";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  // Agora usamos o contexto global em vez de estado local
  const { addToCart, openCart, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-white font-sans relative">
      
      {/* HEADER */}
      <header className="w-full py-6 px-8 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-yellow-600">granpanettone</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Início</Link>
          <Link href="/produtos" className="hover:text-red-600 transition-colors">Produtos</Link>
          <Link href="/sobre" className="hover:text-red-600 transition-colors">Sobre</Link>
        </nav>

        <div className="flex items-center gap-6">

          <div 
            className="relative cursor-pointer hover:text-red-600 text-gray-600 transition-transform active:scale-95"
            onClick={openCart} // Abre o sidebar global
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

      {/* HERO */}
      <section className="relative w-full h-[550px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero_background.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-2/3"></div>
        <div className="container mx-auto px-8 relative z-20 grid grid-cols-1 md:grid-cols-2">
          <div className="max-w-xl pt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#13331d] leading-tight mb-6">
              Panetones, Árvores Decoradas <br />
              e Kits Natalinos Especiais
            </h1>
            <p className="text-black font-bold text-lg mb-8 max-w-lg leading-relaxed">
              Celebre o Natal com sabores marcantes e presentes únicos. Panetones gourmet, árvores especiais e decorações para tornar suas festas inesquecíveis.
            </p>

            <Link href="/produtos">
              <Button className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-medium px-8 py-6 rounded-md text-base shadow-lg transition-all hover:scale-105">
                Ver Produtos Natalinos →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-[#d32f2f]">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1a472a] mb-2">Entrega Natalina</h3>
              <p className="text-gray-500 text-sm max-w-xs">Entrega garantida antes do Natal em todo o Brasil</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-[#d32f2f]">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1a472a] mb-2">Pagamento Seguro</h3>
              <p className="text-gray-500 text-sm max-w-xs">Suas compras protegidas com criptografia de ponta</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-[#d32f2f]">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1a472a] mb-2">Produtos de Qualidade</h3>
              <p className="text-gray-500 text-sm max-w-xs">Qualidade garantida em cada produto</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a472a] mb-2">Destaques Natalinos</h2>
            <p className="text-gray-600">Os panetones e presentes mais queridos desta temporada</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS_MOCK.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col">
                <div className="relative aspect-square overflow-hidden">

                  {/* IMAGEM GENÉRICA SE NÃO TIVER */}
                  <img 
                    src={product.image || "https://via.placeholder.com/500x500?text=Produto+Natalino"} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                  />

                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-xs text-[#d32f2f] font-semibold uppercase tracking-wider">
                    {product.categoryId === 1 ? "Panetones" : "Árvores"}
                  </span>

                  <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2">{product.name}</h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-lg font-bold text-[#1a472a]">
                      R$ {(product.price / 100).toFixed(2)}
                    </span>
                    
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product)} // Adiciona ao contexto global
                      className="bg-[#1a472a] hover:bg-[#0f2e1b] text-white rounded-full w-10 h-10 p-0 flex items-center justify-center transition-transform active:scale-90"
                    > 
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/produtos">
              <Button variant="outline" className="border-[#1a472a] text-[#1a472a] hover:bg-[#1a472a] hover:text-white">
                Ver Todos os Produtos Natalinos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-20 bg-[#d32f2f] text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Pronto para celebrar o Natal?</h2>
        <p className="mb-8 text-red-100">Escolha seus panetones e presentes favoritos agora!</p>
        <Link href="/produtos">
          <Button className="bg-white text-[#d32f2f] hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-bold">
            Começar Compras
          </Button>
        </Link>
      </section>

    </div>
  );
}