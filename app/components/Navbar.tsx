"use client";
import React, { useState } from "react";
import { ShoppingBag, FileText, Search, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Navbar({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}: NavbarProps) {
  const { totalItems, setIsCartOpen, setIsQuotationOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Bar Banner */}
      <div className="bg-stone-900 text-stone-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-amber-400" />
        <span>โปรโมชั่นพิเศษ! สั่งซื้อสินค้าครบ 1,000 บาท จัดส่งฟรีทั่วประเทศ | ออกใบเสนอราคา/ใบกำกับภาษีได้ทันที</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-amber-600 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg shadow-sm group-hover:scale-105 transition">
                B
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-serif">
                  bunni<span className="text-amber-600">wear</span>
                </span>
                <span className="hidden sm:block text-[10px] text-stone-500 tracking-widest uppercase">
                  Korean Fashion Minimal
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาเสื้อผ้า, เชิ้ต, เดรส, กางเกง..."
                className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quotation Button */}
            <button
              onClick={() => setIsQuotationOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition shadow-xs"
            >
              <FileText size={16} className="text-amber-600" />
              <span>ออกใบเสนอราคา</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-amber-600 rounded-full transition shadow-sm"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">ตะกร้าสินค้า</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาเสื้อผ้าสไตล์เกาหลี..."
              className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 py-3 space-y-2 shadow-lg animate-fadeIn">
          <button
            onClick={() => {
              setIsQuotationOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition"
          >
            <FileText size={18} className="text-amber-600" />
            <span>สร้างใบเสนอราคา / พิมพ์ PDF</span>
          </button>
        </div>
      )}
    </header>
  );
}