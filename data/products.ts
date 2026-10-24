export interface ProductVariant {
  name: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  basePrice: number;
  image: string;
  variants: ProductVariant[];
  features: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "all", name: "เสื้อผ้าทั้งหมด", iconName: "LayoutGrid", description: "รวมเสื้อผ้าแฟชั่นสไตล์เกาหลี/มินิมอล จากร้าน bunniwear" },
  { id: "shirts", name: "เสื้อเชิ้ต & เสื้อยืด", iconName: "Flame", description: "เสื้อเชิ้ตทำงาน เสื้อยืดเกาหลี ดีไซน์สวยใส่สบาย" },
  { id: "dresses", name: "ชุดเดรส & ชุดเซ็ต", iconName: "Sparkles", description: "เดรสยาว เดรสสั้น และชุดเซ็ตเข้าชุดสุดน่ารัก" },
  { id: "pants", name: "กางเกง & กระโปรง", iconName: "Package", description: "กางเกงขาสั้น ขายาว และกระโปรงแฟชั่นหลากหลายสไตล์" },
  { id: "outerwear", name: "เสื้อคลุม & แจ็คเก็ต", iconName: "Home", description: "เบลเซอร์ เสื้อกันหนาว คาร์ดิแกนสุดชิค" },
];

export const PRODUCTS: Product[] = [
  {
    id: "bunni-shirt-01",
    name: "เสื้อเชิ้ตโอเวอร์사이즈 สไตล์เกาหลี ผ้าลินินพรีเมียม",
    category: "shirts",
    description: "เสื้อเชิ้ตทรงโอเวอร์사이즈 ดีไซน์มินิมอล เนื้อผ้าลินินผสมเกรดพรีเมียม ระบายอากาศได้ดี ใส่ทำงานหรือคาเฟ่ก็สวยเก๋",
    badge: "ขายดี",
    basePrice: 350,
    image: "/images/products/shirt-01.png",
    variants: [
      { name: "ไซส์ S / สีขาว", price: 350, image: "/images/products/variants/shirt-01-s.webp" },
      { name: "ไซส์ M / สีเบจ", price: 350, image: "/images/products/variants/shirt-01-m.webp" },
      { name: "ไซส์ L / สีดำ", price: 390, image: "/images/products/variants/shirt-01-l.webp" }
    ],
    features: [
      "ผ้าลินินเกรดพรีเมียม ไม่บาง",
      "ทรงโอเวอร์ไซส์ใส่สบาย",
      "แมทช์ง่ายกับทุกลุค"
    ]
  },
  {
    id: "bunni-dress-02",
    name: "มินิเดรสคอเหลี่ยม แขนตุ๊กตาสไตล์คุณหนู",
    category: "dresses",
    description: "ชุดเดรสสั้นทรงสวย ดีไซน์คอเหลี่ยมช่วยให้ช่วงคอระหง แขนตุ๊กตาน่ารักละมุน ผ้าเนื้อดีมีซับในทั้งชุด",
    badge: "ยอดนิยม",
    basePrice: 450,
    image: "/images/products/dress-02.png",
    variants: [
      { name: "ไซส์ S / สีชมพูพาสเทล", price: 450, image: "/images/products/variants/dress-02-s.webp" },
      { name: "ไซส์ M / สีครีม", price: 450, image: "/images/products/variants/dress-02-m.webp" }
    ],
    features: [
      "มีซับใน ไม่โป๊",
      "ดีไซน์แขนตุ๊กตาน่ารัก",
      "ทรงเข้ารูปสวยงาม"
    ]
  }
];