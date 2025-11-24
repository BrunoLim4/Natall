export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Natal Sabor & Encanto";

export const APP_LOGO = import.meta.env.VITE_APP_LOGO || "/logo.png";

export const SITE_CONFIG = {
  name: "Natal Sabor & Encanto",
  description: "Panetones artesanais e presentes natalinos especiais",
  phone: "(11) 9999-9999",
  email: "contato@natalsabor.com.br",
  address: "São Paulo, SP - Brasil",
};

// =============================
// ⚠️ VERSÃO CORRIGIDA DO getLoginUrl
// =============================
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  // Validações para evitar "Invalid URL"
  if (!oauthPortalUrl) {
    console.error("❌ ERRO: VITE_OAUTH_PORTAL_URL não está definida no .env");
    return "#"; // Evita crash da aplicação
  }

  if (!appId) {
    console.error("❌ ERRO: VITE_APP_ID não está definida no .env");
    return "#";
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

// =============================
// PRODUTOS MOCK
// =============================
export const PRODUCTS_MOCK = [
  {
    id: 1,
    categoryId: 1,
    name: "Chocotones Bauduco",
    description:
      "Chocotones Balduco com gotas de chocolate ao leite, feitos com ingredientes selecionados para garantir sabor e maciez excepcionais.",
    price: 8990,
    image: "/images/panetone.jpg",
    stock: 50,
    featured: 1,
  },
  {
    id: 2,
    categoryId: 1,
    name: "Panetone Gourmet de Frutas Cristalizadas",
    description:
      "Panetone premium com frutas cristalizadas selecionadas e uvas passas. Receita tradicional italiana com toque especial da casa.",
    price: 7990,
    image: "/images/panetone2.jpg",
    stock: 40,
    featured: 1,
  },
  {
    id: 3,
    categoryId: 2,
    name: "Kit Cestas Natalinas Premium",
    description:
      "Cesta completa com panetone, espumante, chocolates finos, castanhas e frutas secas. Embalagem natalina elegante. Ideal para presente.",
    price: 18990,
    image: "/images/arvores.jpeg",
    stock: 30,
    featured: 1,
  },
];

// =============================
// CATEGORIAS
// =============================
export const CATEGORIES = [
  { id: 1, name: "Panetones", description: "Panetones artesanais" },
  { id: 2, name: "Árvores", description: "Árvores natalinas" },
];
