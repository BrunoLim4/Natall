import React, { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock do carrinho (Na aplicação real, virá do seu Context/Estado Global)
const MOCK_CART = [
  {
    id: 1,
    name: "Panetone Gourmet de Frutas Cristalizadas",
    price: 7990, // em centavos
    quantity: 1,
  },
  {
    id: 2,
    name: "Cesta Natalina Pequena",
    price: 12990,
    quantity: 1,
  }
];

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
  });

  // Cálculos
  const subtotal = MOCK_CART.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Grátis conforme a imagem
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função simulada de busca de CEP (opcional)
  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      // Aqui você implementaria a chamada para viacep.com.br
      console.log("Buscando CEP...", formData.cep);
    }
  };

  // Lógica de Pagamento com Stripe
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      console.log("Iniciando processamento com Stripe...");
      console.log("Dados do comprador:", formData);
      console.log("Itens:", MOCK_CART);

      // ------------------------------------------------------------------
      // LÓGICA DO STRIPE ENTRARIA AQUI:
      // 1. Enviar os dados para o seu backend (Node.js/Python/etc).
      // 2. O backend cria uma "PaymentIntent" no Stripe e retorna o `clientSecret`.
      // 3. Confirmar o pagamento usando stripe.confirmPayment().
      // ------------------------------------------------------------------

      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Redirecionando para o pagamento seguro...");
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8 font-sans">
      
      {/* Botão Voltar */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-red-600 text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a loja
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#1a472a] mt-2">Finalizar Compra</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA - FORMULÁRIOS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Dados Pessoais */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1a472a] text-xl">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Digite seu nome completo" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="(00) 00000-0000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Endereço de Entrega */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1a472a] text-xl">Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input 
                  id="cep" 
                  name="cep" 
                  placeholder="00000-000" 
                  value={formData.cep}
                  onChange={handleInputChange}
                  onBlur={handleCepBlur}
                  className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Rua *</Label>
                  <Input 
                    id="street" 
                    name="street" 
                    value={formData.street}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número *</Label>
                  <Input 
                    id="number" 
                    name="number" 
                    value={formData.number}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input 
                  id="complement" 
                  name="complement" 
                  placeholder="Apto, Bloco, Referência..." 
                  value={formData.complement}
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 focus:ring-[#1a472a]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* COLUNA DA DIREITA - RESUMO E PAGAMENTO */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-lg sticky top-6">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-[#1a472a] text-xl">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Lista de Itens */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {MOCK_CART.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 flex-1 pr-4">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-800">
                      R$ {((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Separador */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Totais */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">
                    {shipping === 0 ? "Grátis" : `R$ ${(shipping / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#1a472a] pt-2 border-t mt-2">
                  <span>Total</span>
                  <span className="text-[#d32f2f]">R$ {(total / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* BOTÃO DE PAGAMENTO (STRIPE TRIGGER) */}
              <Button 
                className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white py-6 text-lg font-bold shadow-md transition-all hover:scale-[1.02]"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processando..." : "Realizar Pagamento"}
              </Button>

              {/* Selo de Segurança */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                <Lock className="w-3 h-3" />
                <span>Pagamento 100% Seguro via Stripe</span>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}