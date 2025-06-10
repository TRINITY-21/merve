import { IFavoriteProduct, ISortOption } from "../types/favoriteProductTypes";

  // Mock favorite products data
  export const mockFavorites: IFavoriteProduct[] = [
    {
      id: 'f1',
      title: 'iPhone 13 Pro - Unlocked',
      price: 4500.00,
      image: 'https://picsum.photos/300/300?random=2',
      category: 'phones',
      agent: {
        name: 'Tech World GH',
        distance: 1.2,
        rating: 4.9,
        verified: true,
        location: 'East Legon, Accra'
      },
      inStock: true,
      stockCount: 3,
      isPromoted: false,
      tags: ['premium', 'warranty'],
      rating: 4.8,
      reviews: 89,
      dateAdded: '2024-05-28',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'f2',
      title: 'AirPods Pro (2nd Gen)',
      price: 1200.00,
      originalPrice: 1400.00,
      image: 'https://picsum.photos/300/300?random=3',
      category: 'accessories',
      agent: {
        name: 'Premium Electronics',
        distance: 2.1,
        rating: 4.7,
        verified: true,
        location: 'Osu, Accra'
      },
      inStock: true,
      stockCount: 8,
      discount: 14,
      isPromoted: true,
      tags: ['trending', 'authentic'],
      rating: 4.6,
      reviews: 156,
      dateAdded: '2024-05-25',
      lastUpdated: '3 hours ago'
    },
    {
      id: 'f3',
      title: 'Samsung Galaxy Buds2',
      price: 450.00,
      originalPrice: 520.00,
      image: 'https://picsum.photos/300/300?random=5',
      category: 'accessories',
      agent: {
        name: 'Sound Heaven',
        distance: 1.8,
        rating: 4.6,
        verified: true,
        location: 'Kumasi, Ashanti'
      },
      inStock: false,
      stockCount: 0,
      discount: 13,
      isPromoted: false,
      tags: ['quality', 'warranty'],
      rating: 4.3,
      reviews: 91,
      dateAdded: '2024-05-20',
      lastUpdated: '1 day ago'
    },
    {
      id: 'f4',
      title: 'MacBook Air M2',
      price: 8500.00,
      image: 'https://picsum.photos/300/300?random=7',
      category: 'laptops',
      agent: {
        name: 'Apple Store Ghana',
        distance: 0.5,
        rating: 4.9,
        verified: true,
        location: 'Accra Mall, Accra'
      },
      inStock: true,
      stockCount: 2,
      isPromoted: true,
      tags: ['new', 'official'],
      rating: 4.9,
      reviews: 45,
      dateAdded: '2024-05-15',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'f5s',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },
        {
      id: 'f5f',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },
        {
      id: 'fs5',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },
        {
      id: 'f51',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },
        {
      id: 'f52',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },    {
      id: 'f53',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    }
    ,
        {
      id: 'f45',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },    {
      id: 'f15',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    },    {
      id: 'f35',
      title: 'Gaming Chair RGB',
      price: 850.00,
      originalPrice: 950.00,
      image: 'https://picsum.photos/300/300?random=8',
      category: 'furniture',
      agent: {
        name: 'Office Plus',
        distance: 3.2,
        rating: 4.4,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 12,
      discount: 11,
      isPromoted: false,
      tags: ['gaming', 'comfort'],
      rating: 4.2,
      reviews: 78,
      dateAdded: '2024-05-10',
      lastUpdated: '4 hours ago'
    }
    
  ];


  export const sortOptions: ISortOption[] = [
    { key: 'date_added', label: 'Recently Added', icon: 'schedule' },
    { key: 'price_low', label: 'Price: Low to High', icon: 'trending-up' },
    { key: 'price_high', label: 'Price: High to Low', icon: 'trending-down' },
    { key: 'rating', label: 'Highest Rated', icon: 'grade' },
    { key: 'distance', label: 'Nearest First', icon: 'location-on' },
    { key: 'name', label: 'Name A-Z', icon: 'sort-by-alpha' },
  ];

  export const categories= [
    { key: 'all', label: 'All', icon: 'apps', count: mockFavorites.length },
    { key: 'phones', label: 'Phones', icon: 'smartphone', count: mockFavorites.filter(p => p.category === 'phones').length },
    { key: 'accessories', label: 'Tech', icon: 'headphones', count: mockFavorites.filter(p => p.category === 'accessories').length },
    { key: 'laptops', label: 'Laptops', icon: 'laptop', count: mockFavorites.filter(p => p.category === 'laptops').length },
    { key: 'furniture', label: 'Furniture', icon: 'chair', count: mockFavorites.filter(p => p.category === 'furniture').length },
  ].filter(cat => cat.count > 0 || cat.key === 'all');
