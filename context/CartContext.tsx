"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductVariant, QuotationDetails } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuotationOpen: boolean;
  setIsQuotationOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  quotationDetails: QuotationDetails;
  setQuotationDetails: React.Dispatch<React.SetStateAction<QuotationDetails>>;
  generateLineOrderUrl: (customNote?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [quotationDetails, setQuotationDetails] = useState<QuotationDetails>({
    quoteNumber: "QT-20261023-100",
    date: "2026-10-23",
    validUntil: "2026-11-07",
    customer: {
      name: "",
      company: "",
      taxId: "",
      phone: "",
      email: "",
      address: "",
      notes: "ต้องการสินค้าด่วน / ออกใบกำกับภาษีได้",
    },
    includeVat: false,
    vatRate: 7,
    discount: 0,
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const validDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const quoteNo = `QT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${randomNum}`;
    
    setQuotationDetails((prev) => ({
      ...prev,
      quoteNumber: quoteNo,
      date: formattedDate,
      validUntil: validDate,
    }));
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bunniwear_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bunniwear_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    const itemId = `${product.id}_${variant.name}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            variantName: variant.name,
            price: variant.price,
            quantity: quantity,
            image: variant.image || product.image,
          },
        ];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateLineOrderUrl = (customNote?: string) => {
    return "https://lin.ee/example";
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isQuotationOpen,
        setIsQuotationOpen,
        quickViewProduct,
        setQuickViewProduct,
        quotationDetails,
        setQuotationDetails,
        generateLineOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}