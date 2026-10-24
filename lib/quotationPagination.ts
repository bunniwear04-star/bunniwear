import { CartItem } from "@/types";

export interface QuotationPageData {
  pageIndex: number;
  pageNumber: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  items: CartItem[];
  startIndex: number;
}

export function thaiBahtText(num: number): string {
  if (isNaN(num) || num < 0) return "ศูนย์บาทถ้วน";
  
  const thaiNums = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const units = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
  const integerPart = Math.floor(num);
  
  if (integerPart === 0) return "ศูนย์บาทถ้วน";
  
  let result = "";
  const s = integerPart.toString();
  const len = s.length;
  
  for (let i = 0; i < len; i++) {
    const digit = parseInt(s.charAt(i), 10);
    const pos = len - i - 1;
    if (digit > 0) {
      if (pos === 1 && digit === 1) {
        result += "";
      } else if (pos === 1 && digit === 2) {
        result += "ยี่";
      } else {
        result += thaiNums[digit];
      }
      result += units[pos % 6];
    }
    if (pos % 6 === 0 && pos > 0) {
      result += "ล้าน";
    }
  }
  return result + "บาทถ้วน";
}

export function paginateQuotationItems(items: CartItem[]): QuotationPageData[] {
  if (items.length <= 11) {
    return [
      {
        pageIndex: 0,
        pageNumber: 1,
        totalPages: 1,
        isFirstPage: true,
        isLastPage: true,
        items,
        startIndex: 0,
      }
    ];
  }

  if (items.length <= 16) {
    const minP2 = 3;
    const p1Count = items.length - minP2;
    const p1Items = items.slice(0, p1Count);
    const p2Items = items.slice(p1Count);
    return [
      {
        pageIndex: 0,
        pageNumber: 1,
        totalPages: 2,
        isFirstPage: true,
        isLastPage: false,
        items: p1Items,
        startIndex: 0,
      },
      {
        pageIndex: 1,
        pageNumber: 2,
        totalPages: 2,
        isFirstPage: false,
        isLastPage: true,
        items: p2Items,
        startIndex: p1Count,
      }
    ];
  }

  const pages: Omit<QuotationPageData, "totalPages">[] = [];
  let remaining = [...items];
  let curIndex = 0;
  
  const p1Count = 15;
  pages.push({
    pageIndex: 0,
    pageNumber: 1,
    isFirstPage: true,
    isLastPage: false,
    items: remaining.slice(0, p1Count),
    startIndex: 0,
  });
  
  remaining = remaining.slice(p1Count);
  curIndex += p1Count;

  while (remaining.length > 0) {
    if (remaining.length <= 12) {
      pages.push({
        pageIndex: pages.length,
        pageNumber: pages.length + 1,
        isFirstPage: false,
        isLastPage: true,
        items: remaining,
        startIndex: curIndex,
      });
      break;
    }
    const batch = remaining.slice(0, 16);
    pages.push({
      pageIndex: pages.length,
      pageNumber: pages.length + 1,
      isFirstPage: false,
      isLastPage: false,
      items: batch,
      startIndex: curIndex,
    });
    remaining = remaining.slice(16);
    curIndex += 16;
  }

  const totalPages = pages.length;
  return pages.map((p) => ({
    ...p,
    totalPages,
  }));
}