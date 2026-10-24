"use client";
import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import CartDrawer from "@/app/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Sparkles, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-amber-50/60 to-transparent py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles size={14} />
              <span>คอลเลกชันใหม่ สไตล์เกาหลี 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 font-serif leading-tight">
              bunni<span className="text-amber-600">wear</span> เสื้อผ้าแฟชั่น มินิมอล ปลีก-ส่ง
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
              แหล่งรวมเสื้อผ้าแฟชั่นหญิง-ชาย ดีไซน์น่ารัก เนื้อผ้าพรีเมียม สั่งซื้อสะดวก พร้อมระบบออกใบเสนอราคาและใบกำกับภาษีออนไลน์ทันที
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3 bg-stone-900 hover:bg-amber-600 text-white rounded-full text-sm font-medium transition shadow-md"
              >
                เลือกซื้อสินค้า
              </a>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80"
              alt="bunniwear shop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-stone-200 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-full"><Truck size={20} /></div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-stone-900">จัดส่งรวดเร็ว</h4>
              <p className="text-xs text-stone-500">ส่งทั่วไทย ได้รับของไว</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-full"><ShieldCheck size={20} /></div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-stone-900">สินค้าคุณภาพเกรดพรีเมียม</h4>
              <p className="text-xs text-stone-500">คัดสรรเนื้อผ้าและดีไซน์ที่ดีที่สุด</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-full"><RefreshCw size={20} /></div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-stone-900">ออกใบเสนอราคาออนไลน์</h4>
              <p className="text-xs text-stone-500">ออกเอกสารทางธุรกิจได้ทันที</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <main id="catalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-serif">แคตตาล็อกสินค้าทั้งหมด</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">เลือกชมสินค้าแฟชั่นและเลือกไซส์ตามต้องการ</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-600 font-medium">ไม่พบสินค้าที่คุณค้นหา</p>
            <p className="text-xs text-stone-400 mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูนะครับ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800 mt-12">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-2xl font-bold font-serif text-white">
            bunni<span className="text-amber-500">wear</span>
          </span>
          <p className="text-xs max-w-md mx-auto">
            ร้านเสื้อผ้าแฟชั่นสไตล์เกาหลี มินิมอล ปลีกและส่ง พร้อมบริการออกใบเสนอราคาและใบกำกับภาษีสำหรับองค์กร
          </p>
          <p className="text-[11px] text-stone-500 pt-4 border-t border-stone-800">
            © 2026 bunniwear. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart Drawer & Modals */}
      <CartDrawer />
    </div>
  );
}