import { useState } from "react";
import { Plus, Minus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  totalItems: number;
  totalPrice: number;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  totalItems,
  totalPrice,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { removeFromCart, addToCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Botón rojo fijo que se ve siempre (parte inferior) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4"
        onClick={() => setShowDetails(true)}
      >
        <div className="w-full max-w-[820px] bg-[#DA291C] text-white px-6 py-3 flex justify-between items-center rounded-tl-2xl rounded-tr-2xl cursor-pointer">
          <div className="flex flex-col font-bold">
          <span className="text-sm">
            {totalItems} {t(`item_${totalItems === 1 ? "one" : "other"}`)}
          </span>
            <span className="text-lg">${totalPrice.toFixed(2)}</span>
          </div>
          <span className="text-white font-bold text-sm">{t("proceed_to_cart")}</span>
        </div>
      </div>

      {/* Fondo oscurecido y blur cuando el carrito está abierto */}
      {showDetails && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setShowDetails(false)}
        />
      )}

      {/* Panel deslizante del carrito (aparece desde abajo) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300 ${
          showDetails ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full max-w-[820px] bg-white rounded-t-2xl shadow-xl p-6 relative h-[500px]">
          {/* Botón para cerrar el panel */}
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Título del carrito */}
          <h2 className="text-xl font-bold mb-2">{t("my_order")}</h2>
          <p className="text-sm text-gray-500 mb-4">{t("details")}</p>

          {/* Lista de productos en el carrito */}
          <div className="overflow-y-auto max-h-[250px] pr-1">
            {cartItems.map((item) => (
              <div
                key={item.id + "-" + Math.random()}
                className="flex justify-between items-center mb-5"
              >
                <div className="flex items-center gap-3 w-full max-w-[70%]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-sm">{t(item.name)}</p>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Controles de cantidad para cada producto */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 border border-gray-300 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                      })
                    }
                    className="bg-[var(--yellow-mcdonalds)] px-2 py-1 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enlace simulado para aplicar códigos promocionales */}
          <div className="text-sm text-blue-500 underline cursor-pointer mb-4">
            {t("apply_promo_code")}
          </div>

          {/* Total del pedido y botón de checkout */}
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>{t("total")}</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full bg-[var(--yellow-mcdonalds)] py-2 rounded-full font-bold text-black" 
            onClick={() => navigate('/checkout')}>
            {t("checkout")}
          </button>
        </div>
      </div>
    </>
  );
};
