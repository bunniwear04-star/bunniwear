"use client";
import React, { useState } from "react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Eye, Check, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setQuickViewProduct } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { name: "ฟรีไซส์", price: product.basePrice }
  );
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image & Badge */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={selectedVariant.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback image if local image not found yet
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {product.badge && (
          <span className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles size={12} />
            {product.badge}
          </span>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-stone-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          title="ดูรายละเอียด"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-amber-600 font-semibold">
            {product.category}
          </span>
          <h3 className="font-medium text-stone-900 text-sm sm:text-base mt-1 line-clamp-1 group-hover:text-amber-700 transition">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 space-y-3">
          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((variant, idx) => {
                const isSelected = selectedVariant.name === variant.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(variant)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition font-medium ${
                      isSelected
                        ? "border-amber-600 bg-amber-50 text-amber-800"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-stone-400">ราคา</span>
              <div className="text-base sm:text-lg font-bold text-stone-900">
                ฿{selectedVariant.price.toLocaleString()}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-900 hover:bg-amber-600 text-white"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>เพิ่มแล้ว</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>ใส่ตะกร้า</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}