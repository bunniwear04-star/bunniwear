"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, FileText, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    setIsQuotationOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleOpenQuotation = () => {
    setIsCartOpen(false);
    setIsQuotationOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-amber-600" size={20} />
              <h2 className="text-lg font-bold text-stone-900">
                ตะกร้าสินค้าของฉัน ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-stone-600 font-medium">ไม่มีสินค้าในตะกร้า</p>
                <p className="text-xs text-stone-400">เลือกสินค้าแฟชั่นสไตล์เกาหลีจาก bunniwear ใส่ตะกร้าได้เลยครับ</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50 border border-stone-200/80 rounded-xl items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-white border border-stone-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=200&q=80";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-amber-700 font-medium mt-0.5">
                      {item.variantName}
                    </p>
                    <div className="text-sm font-bold text-stone-900 mt-1">
                      ฿{item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between h-full space-y-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition"
                      title="ลบสินค้า"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center border border-stone-200 bg-white rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-amber-600 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-amber-600 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 px-6 py-5 bg-stone-50 space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="text-stone-600 font-medium">ยอดรวมสินค้า:</span>
                <span className="text-xl font-bold text-stone-900">
                  ฿{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl text-xs font-medium transition"
                >
                  ล้างตะกร้า
                </button>
                <button
                  onClick={handleOpenQuotation}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-medium transition shadow-sm"
                >
                  <FileText size={16} />
                  <span>ออกใบเสนอราคา</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}