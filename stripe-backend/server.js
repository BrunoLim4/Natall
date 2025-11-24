import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

// Inicializa o Stripe com a Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio ou inválido." });
    }

    // Converte produtos
    const line_items = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name || "Produto",
        },
        unit_amount: item.price, // já vem em centavos do front
      },
      quantity: item.quantity || 1,
    }));

    // Cria a sessão do Checkout **com várias formas de pagamento**
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // AQUI ESTÁ A PARTE IMPORTANTE:
      payment_method_types: ["card", "boleto", "link"],

      line_items,

      // URLs de retorno
      success_url: `${process.env.FRONTEND_URL}/pagamento-sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pagamento-cancelado`,

      // Recomendações para pagamentos BR
      locale: "pt-BR",
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Erro ao criar sessão:", err);
    res.status(500).json({ error: "Erro ao criar sessão de checkout" });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`Servidor Stripe rodando na porta ${port}`);
});
