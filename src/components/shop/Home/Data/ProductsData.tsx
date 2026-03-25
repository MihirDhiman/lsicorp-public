import iphone1 from "../../Image/iphone1.jpg";
import iphone2 from "../../Image/iphone2.jpg";
import shoe1 from "../../Image/shoe1.jpg";
import s24_1 from "../../Image/s24-1.jpg";
import mac1 from "../../Image/mac1.jpg";

import sony1 from "../../Image/sony1.jpg";
import hoodie1 from "../../Image/hoodie1.jpg";
import watch1 from "../../Image/watch1.jpg";
import tv1 from "../../Image/tv1.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: "INR";

  category: string;
  subCategory?: string;
  brand?: string;

  images: string[];
  thumbnail: string;

  rating: number;
  reviewsCount: number;

  stock: number;
  isAvailable: boolean;

  tags?: string[];

  createdAt: string;
  updatedAt: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip and titanium body.",
    price: 134900,
    discountPrice: 129900,
    currency: "INR",
    category: "Electronics",
    subCategory: "Smartphones",
    brand: "Apple",
    images: [iphone1, iphone2], // ✅ FIXED
    thumbnail: iphone1,
    rating: 4.8,
    reviewsCount: 1245,
    stock: 20,
    isAvailable: true,
    tags: ["trending", "premium", "apple"],
    createdAt: "2026-03-01",
    updatedAt: "2026-03-20"
  },
  {
    id: "p2",
    name: "Nike Air Max",
    description: "Comfortable and stylish running shoes.",
    price: 7999,
    currency: "INR",
    category: "Fashion",
    subCategory: "Footwear",
    brand: "Nike",
    images: [shoe1, shoe1],
    thumbnail: shoe1,
    rating: 4.5,
    reviewsCount: 320,
    stock: 50,
    isAvailable: true,
    tags: ["sports", "popular"],
    createdAt: "2026-02-15",
    updatedAt: "2026-03-10"
  },
  {
    id: "p3",
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with 200MP camera.",
    price: 119999,
    discountPrice: 109999,
    currency: "INR",
    category: "Electronics",
    subCategory: "Smartphones",
    brand: "Samsung",
    images: [s24_1, s24_1],
    thumbnail: s24_1,
    rating: 4.7,
    reviewsCount: 980,
    stock: 15,
    isAvailable: true,
    tags: ["android", "premium"],
    createdAt: "2026-03-05",
    updatedAt: "2026-03-18"
  },
  {
    id: "p4",
    name: "MacBook Air M3",
    description: "Lightweight laptop with Apple M3 chip.",
    price: 114900,
    currency: "INR",
    category: "Electronics",
    subCategory: "Laptops",
    brand: "Apple",
    images: [mac1, mac1],
    thumbnail: mac1,
    rating: 4.9,
    reviewsCount: 540,
    stock: 10,
    isAvailable: true,
    tags: ["laptop", "premium"],
    createdAt: "2026-02-25",
    updatedAt: "2026-03-15"
  },
  {
    id: "p5",
    name: "Sony WH-1000XM5",
    description: "Noise cancelling wireless headphones.",
    price: 29990,
    discountPrice: 25990,
    currency: "INR",
    category: "Electronics",
    subCategory: "Audio",
    brand: "Sony",
    images: [sony1, sony1],
    thumbnail: sony1,
    rating: 4.8,
    reviewsCount: 2100,
    stock: 35,
    isAvailable: true,
    tags: ["audio", "wireless"],
    createdAt: "2026-01-20",
    updatedAt: "2026-03-12"
  },
  {
    id: "p6",
    name: "Adidas Hoodie",
    description: "Warm hoodie for winter.",
    price: 4999,
    currency: "INR",
    category: "Fashion",
    subCategory: "Clothing",
    brand: "Adidas",
    images: [hoodie1],
    thumbnail: hoodie1,
    rating: 4.6,
    reviewsCount: 410,
    stock: 40,
    isAvailable: true,
    tags: ["winter"],
    createdAt: "2026-02-05",
    updatedAt: "2026-03-14"
  },
  {
    id: "p7",
    name: "Fossil Watch",
    description: "Leather strap premium watch.",
    price: 8999,
    discountPrice: 7499,
    currency: "INR",
    category: "Accessories",
    subCategory: "Watches",
    brand: "Fossil",
    images: [watch1],
    thumbnail: watch1,
    rating: 4.5,
    reviewsCount: 650,
    stock: 25,
    isAvailable: true,
    tags: ["premium"],
    createdAt: "2026-01-18",
    updatedAt: "2026-03-11"
  },
  {
    id: "p8",
    name: "Mi Smart TV 43\"",
    description: "Full HD Android Smart TV.",
    price: 25999,
    currency: "INR",
    category: "Electronics",
    subCategory: "Television",
    brand: "Xiaomi",
    images: [tv1],
    thumbnail: tv1,
    rating: 4.4,
    reviewsCount: 2100,
    stock: 18,
    isAvailable: true,
    tags: ["tv"],
    createdAt: "2026-02-12",
    updatedAt: "2026-03-16"
  }
];