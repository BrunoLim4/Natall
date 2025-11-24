import React from "react";
import { useLocation } from "wouter";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function CartSidebar() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();
  
  const [, setLocation] = useLocation();

  const handleCheckout = async () => {
    try {
      // Opcional: bloquear se não tiver itens
      if (items.length === 0) return;

      // Chama o backend que cria a sessão no Stripe
      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartTotal,
        }),
      });

      if (!response.ok) {
        console.error("Erro ao criar sessão do Stripe", response.status);
        alert("Não foi possível iniciar o pagamento. Tente novamente.");
        return;
      }

      const data = await response.json();

      if (data.url) {
        closeCart();
        window.location.href = data.url;
      } else {
        console.error("Resposta inesperada da API:", data);
        alert("Erro ao iniciar o checkout. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro inesperado no checkout:", error);
      alert("Erro inesperado ao iniciar o pagamento.");
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop Escuro */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      />

      {/* Painel Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d32f2f]" />
            <h2 className="text-xl font-bold text-[#1a472a]">Seu Carrinho</h2>
            <span className="bg-[#d32f2f] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Seu carrinho está vazio.</p>
              <Button onClick={closeCart} variant="outline">
                Começar a comprar
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Foto")}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                    <p className="text-[#1a472a] font-bold mt-1">
                      R$ {(item.price / 100).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer com Total e Botão de Finalizar */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-bold text-[#1a472a] pt-2">
                <span>Total</span>
                <span>R$ {(cartTotal / 100).toFixed(2)}</span>
              </div>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white py-6 text-lg shadow-md group"
            >
              Finalizar Compra
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
