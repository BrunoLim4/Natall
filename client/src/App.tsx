import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Produtos from "@/pages/Produtos";
import Checkout from "@/pages/Checkout";
import Sobre from "@/pages/Sobre"; // 1. Importando a página Sobre
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Mantemos o Contexto
import { CartProvider } from "@/contexts/CartContext"; 

// Sidebar (mantendo o caminho que está funcionando para você)
import { CartSidebar } from "@/pages/CartSidebar"; 

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/produtos"} component={Produtos} />
      <Route path={"/sobre"} component={Sobre} /> {/* 2. Adicionada a rota /sobre */}
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          
          {/* Provider Global */}
          <CartProvider>
            <Toaster />
            <Router />
            
            {/* Sidebar Global */}
            <CartSidebar />
          </CartProvider>

        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;