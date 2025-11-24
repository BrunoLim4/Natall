import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PRODUCTS_MOCK, CATEGORIES } from "@/const";
import { Link } from "wouter";
import { ShoppingCart, Home, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext"; 
import "../styles/produtos.css";

export default function Produtos() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory
    ? PRODUCTS_MOCK.filter((p) => p.categoryId === selectedCategory)
    : PRODUCTS_MOCK;

  return (
    <div className="produtos-page min-h-screen bg-gray-50">
      <div className="produtos-header">
        <h1>Nossos Produtos</h1>
        <p>Escolha entre nossa seleção de panetones artesanais e presentes natalinos</p>
      </div>

            <div className="container mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-[#d32f2f] flex items-center transition-colors cursor-pointer">
            <Home className="w-4 h-4 mr-1" />
            Início
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="font-semibold text-[#1a472a]">Produtos</span>
        </nav>
      </div>

      <div className="produtos-container">
        {/* Sidebar with Filters */}
        <aside className="produtos-sidebar">
          <div className="filter-section">
            <h3>Categorias</h3>
            <div className="filter-options">
              <button
                className={`filter-btn ${selectedCategory === null ? "active" : ""}`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos os Produtos
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="produtos-main">
          <div className="produtos-info">
            <p>Mostrando {filteredProducts.length} produtos</p>
          </div>

          <div className="produtos-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.featured === 1 && (
                    <span className="product-badge">Destaque</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category">
                    {product.categoryId === 1 ? "Panetones" : "Árvores"}
                  </span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">
                      R$ {(product.price / 100).toFixed(2)}
                    </span>
                    <div className="product-actions">
                      <Link href={`/produtos/${product.id}`}>
                      </Link>
                      
                      <Button 
                        size="sm" 
                        className="add-to-cart"
                        onClick={() => addToCart(product)}
                      > Adicione ao Carrinho
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}