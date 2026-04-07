import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "site_test_cart";

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem(product, selectedSize, selectedColor, quantity) {
        setItems((currentItems) => {
          const existing = currentItems.find(
            (item) =>
              item.productId === product.id &&
              item.size === selectedSize &&
              item.color === selectedColor
          );

          if (existing) {
            return currentItems.map((item) =>
              item.id === existing.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [
            ...currentItems,
            {
              id: `${product.id}-${selectedSize}-${selectedColor}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              size: selectedSize,
              color: selectedColor,
              quantity
            }
          ];
        });
      },
      updateQuantity(itemId, nextQuantity) {
        if (nextQuantity <= 0) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.id !== itemId)
          );
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === itemId ? { ...item, quantity: nextQuantity } : item
          )
        );
      },
      removeItem(itemId) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== itemId)
        );
      },
      clearCart() {
        setItems([]);
      }
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
