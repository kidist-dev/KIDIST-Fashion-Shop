const products = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    category: "Dresses",
    price: 120,
    isNewArrival: true,

    images: [
      "/images/dress1.jpg",
      "/images/dress2.jpg",
    ],

    image: "/images/dress1.jpg",

    stock: 5,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "Red", "White"],

    description:
      "An elegant evening dress designed for special occasions. Comfortable, stylish, and perfect for a sophisticated look.",
  },

  {
    id: 2,
    name: "Floral Maxi Dress",
    category: "Dresses",
    price: 95,
    isNewArrival: true,

    images: [
      "/images/dress2.jpg",
      "/images/dress1.jpg",
    ],

    image: "/images/dress2.jpg",

    stock: 8,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Floral", "Pink", "Blue"],

    description:
      "A beautiful floral maxi dress with a comfortable fit and elegant design, perfect for casual and special occasions.",
  },

  {
    id: 3,
    name: "Classic Black Dress",
    category: "Dresses",
    price: 110,
    isNewArrival: true,

    images: [
      "/images/dress3.jpg",
      "/images/dress1.jpg",
    ],

    image: "/images/dress3.jpg",

    stock: 6,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "White"],

    description:
      "A timeless black dress designed for an elegant and sophisticated appearance. Perfect for evening events and formal occasions.",
  },

  {
    id: 4,
    name: "Elegant Blouse",
    category: "Tops",
    price: 60,
    isNewArrival: true,

    images: [
      "/images/blouse1.jpg",
    ],

    image: "/images/blouse1.jpg",

    stock: 10,

    sizes: ["S", "M", "L", "XL"],

    colors: ["White", "Black", "Pink"],

    description:
      "A sophisticated blouse designed to create a stylish and elegant everyday look.",
  },

  {
    id: 5,
    name: "Silk Fashion Top",
    category: "Tops",
    price: 75,
    isNewArrival: true,

    images: [
      "/images/top1.jpg",
    ],

    image: "/images/top1.jpg",

    stock: 7,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Cream", "Black", "Pink"],

    description:
      "A luxurious silk-inspired fashion top with a soft feel and elegant appearance.",
  },

  {
    id: 6,
    name: "Pleated Skirt",
    category: "Skirts",
    price: 70,
    isNewArrival: true,

    images: [
      "/images/skirt1.jpg",
    ],

    image: "/images/skirt1.jpg",

    stock: 9,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "Beige", "Brown"],

    description:
      "A stylish pleated skirt that combines comfort and elegance for a modern feminine look.",
  },

  {
    id: 7,
    name: "Maxi Skirt",
    category: "Skirts",
    price: 80,
    isNewArrival: true,

    images: [
      "/images/skirt2.jpg",
    ],

    image: "/images/skirt2.jpg",

    stock: 6,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "White", "Beige"],

    description:
      "A flowing maxi skirt designed for comfort and effortless elegance.",
  },

  {
    id: 8,
    name: "Classic Blazer",
    category: "Jackets",
    price: 130,
    isNewArrival: true,

    images: [
      "/images/jacket1.jpg",
    ],

    image: "/images/jacket1.jpg",

    stock: 5,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "Cream", "Brown"],

    description:
      "A classic tailored blazer that adds sophistication to both professional and casual outfits.",
  },

  {
    id: 9,
    name: "Denim Jacket",
    category: "Jackets",
    price: 100,
    isNewArrival: true,

    images: [
      "/images/jacket2.jpg",
    ],

    image: "/images/jacket2.jpg",

    stock: 8,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Blue", "Black", "Light Blue"],

    description:
      "A modern denim jacket designed for a casual yet stylish everyday outfit.",
  },

  {
    id: 10,
    name: "Wide Leg Trouser",
    category: "Trousers",
    price: 85,
    isNewArrival: true,

    images: [
      "/images/trouser1.jpg",
    ],

    image: "/images/trouser1.jpg",

    stock: 10,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "Beige", "Brown"],

    description:
      "Comfortable wide-leg trousers with a sophisticated silhouette, perfect for creating an elegant modern outfit.",
  },

  {
    id: 11,
    name: "Classic Black Trouser",
    category: "Trousers",
    isNewArrival: true,
    price: 90,

    images: [
      "/images/trouser2.jpg",
    ],

    image: "/images/trouser2.jpg",

    stock: 7,

    sizes: ["S", "M", "L", "XL"],

    colors: ["Black", "Charcoal"],

    description:
      "A classic black trouser with a clean and elegant design suitable for work, events, and everyday wear.",
  },

  {
    id: 12,
    name: "Luxury Handbag",
    category: "Bags & Accessories",
    price: 150,
    isNewArrival: true,

    images: [
      "/images/bag1.jpg",
    ],

    image: "/images/bag1.jpg",

    stock: 4,

    sizes: ["Standard"],

    colors: ["Black", "Brown", "Cream"],

    description:
      "A luxurious handbag designed to complete an elegant and fashionable look.",
  },

  {
    id: 13,
    name: "Elegant Necklace",
    category: "Bags & Accessories",
    price: 45,

    images: [
      "/images/accessory1.jpg",
    ],

    image: "/images/accessory1.jpg",

    stock: 12,

    sizes: ["Standard"],

    colors: ["Gold", "Silver"],

    description:
      "An elegant necklace designed to add a refined and luxurious touch to any outfit.",
  },
];

export default products;