import { IGhanaLocation, IProduct, ISortOption } from "../types/marketplaceTypes";
import { IChatMessage, IDetailedProduct, IReview, ISimilarProduct, ITab } from "../types/productDetailsTypes";

  // Mock data
  export const mockProduct: IDetailedProduct = {
    id: "4",
    title: 'iPhone 13 Pro - 128GB Unlocked',
    price: 4500.00,
    originalPrice: 5200.00,
    discount: 13,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3',
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5',
      'https://picsum.photos/400/400?random=6',
      'https://picsum.photos/400/400?random=7',
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=9',
      'https://picsum.photos/400/400?random=11',

    ],
    description: 'Experience the ultimate in smartphone technology with the iPhone 13 Pro. Featuring the revolutionary A15 Bionic chip, ProRAW photography capabilities, and a stunning Super Retina XDR display with ProMotion technology.\n\nThe triple-camera system delivers exceptional photo and video quality, while the all-day battery life keeps you connected from morning to night.',
    category: 'phones',
    agent: {
      id: 'agent1',
      name: 'Tech World Ghana',
      profileImage: 'https://picsum.photos/100/100?random=10',
      rating: 4.9,
      totalReviews: 1247,
      verified: true,
      location: 'East Legon, Accra',
      distance: 1.2,
      responseTime: '< 30 mins',
      memberSince: '2019',
      totalProducts: 156,
      phone: '+233 20 123 4567',
      isOnline: true,
      lastSeen: 'Active now',
    },
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A15 Bionic chip',
      'Storage': '128GB',
      'Camera': 'Triple 12MP system',
      'Battery': 'Up to 22 hours video',
      'Operating System': 'iOS 15',
      'Connectivity': '5G, Wi-Fi 6',
      'Color': 'Graphite',
      'Condition': 'Brand New',
      'Warranty': '1 Year Apple Warranty'
    },
    inStock: true,
    stockCount: 3,
    condition: 'Brand New',
    warranty: '1 Year',
    isPromoted: true,
    tags: ['premium', 'latest', 'authentic', '5G'],
    rating: 4.8,
    totalReviews: 89,
    datePosted: '2024-05-25',
    lastUpdated: '2 hours ago',
    views: 1247,
    saves: 89,
  };

  export const mockReviews: IReview[] = [
    {
      id: 'r1',
      userName: 'Kwame A.',
      userImage: 'https://picsum.photos/50/50?random=20',
      rating: 5,
      date: '2024-05-20',
      comment: 'Excellent product and fast delivery! The phone is exactly as described and the seller was very professional.',
      images: ['https://picsum.photos/100/100?random=21'],
      helpful: 12,
      verified: true,
    },
    {
      id: 'r2',
      userName: 'Ama S.',
      userImage: 'https://picsum.photos/50/50?random=22',
      rating: 4,
      date: '2024-05-18',
      comment: 'Great phone, arrived in perfect condition. Seller responded quickly to my questions.',
      helpful: 8,
      verified: true,
    },
    {
      id: 'r3',
      userName: 'John D.',
      userImage: 'https://picsum.photos/50/50?random=23',
      rating: 5,
      date: '2024-05-15',
      comment: 'Amazing quality and authentic product. Highly recommend this seller!',
      helpful: 15,
      verified: false,
    },
  ];

  export const mockSimilarProducts: ISimilarProduct[] = [
    {
      id: 'sp1',
      title: 'iPhone 13 Pro Max - 256GB',
      price: 5200.00,
      image: 'https://picsum.photos/200/200?random=30',
      rating: 4.9,
      agent: { name: 'Apple Store GH', verified: true },
    },
    {
      id: 'sp2',
      title: 'iPhone 12 Pro - 128GB',
      price: 3800.00,
      image: 'https://picsum.photos/200/200?random=31',
      rating: 4.7,
      agent: { name: 'Mobile Hub', verified: true },
    },
    {
      id: 'sp3',
      title: 'iPhone 13 - 128GB',
      price: 3200.00,
      image: 'https://picsum.photos/200/200?random=32',
      rating: 4.6,
      agent: { name: 'Tech Plus', verified: false },
    },
  ];

  export const initialChatMessages: IChatMessage[] = [
    {
      id: 'm1',
      text: 'Hello! I\'m interested in this iPhone 13 Pro. Is it still available?',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000),
      status: 'delivered'
    },
    {
      id: 'm2',
      text: 'Hi there! Yes, it\'s still available. It\'s in excellent condition and comes with all original accessories.',
      sender: 'seller',
      timestamp: new Date(Date.now() - 240000),
      status: 'read'
    },
  ];

 export const tabs: ITab[] = [
    { key: 'description', label: 'Description', icon: 'description' },
    { key: 'specifications', label: 'Specs', icon: 'list' },
    { key: 'reviews', label: 'Reviews', icon: 'star' },
    { key: 'seller', label: 'Seller', icon: 'person' },
  ];





 export const products: IProduct[] = [
    {
      id: 'p1',
      title: 'MTN Airtime - GHS 10',
      price: 10.00,
      originalPrice: 12.00,
      image: 'https://picsum.photos/300/300?random=1',
      category: 'airtime',
      agent: {
        name: 'Alex Mobile Hub',
        distance: 0.8,
        rating: 4.8,
        verified: true,
        location: 'Madina, Accra'
      },
      inStock: true,
      stockCount: 50,
      discount: 17,
      isPromoted: true,
      tags: ['instant', 'popular'],
      rating: 4.9,
      reviews: 234,
      lastUpdated: '2 mins ago'
    },
    {
      id: 'p2',
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
      lastUpdated: '1 hour ago'
    },
    {
      id: 'p3',
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
      lastUpdated: '3 hours ago'
    },
    {
      id: 'p4',
      title: 'Vodafone SIM Card',
      price: 5.00,
      image: 'https://picsum.photos/300/300?random=4',
      category: 'sim',
      agent: {
        name: 'Connect Point',
        distance: 0.5,
        rating: 4.5,
        verified: false,
        location: 'Tema, Accra'
      },
      inStock: true,
      stockCount: 25,
      isPromoted: false,
      tags: ['new', 'activated'],
      rating: 4.4,
      reviews: 67,
      lastUpdated: '5 hours ago'
    },
    {
      id: 'p5',
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
      lastUpdated: '1 day ago'
    },
    {
      id: 'p6',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'p26',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'p996',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: '5p6',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'p609',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'pf6',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'pn6',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    },
     {
      id: 'pe6',
      title: 'Power Bank 20000mAh',
      price: 120.00,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'essentials',
      agent: {
        name: 'Power Solutions',
        distance: 0.9,
        rating: 4.4,
        verified: true,
        location: 'Adabraka, Accra'
      },
      inStock: true,
      stockCount: 15,
      isPromoted: false,
      tags: ['essential', 'fast-charge'],
      rating: 4.2,
      reviews: 203,
      lastUpdated: '6 hours ago'
    }
  ];

   export const sortOptions: ISortOption[] = [
    { key: 'relevance', label: 'Most Relevant', icon: 'star' },
    { key: 'distance', label: 'Nearest First', icon: 'location-on' },
    { key: 'price_low', label: 'Price: Low to High', icon: 'trending-up' },
    { key: 'price_high', label: 'Price: High to Low', icon: 'trending-down' },
    { key: 'rating', label: 'Highest Rated', icon: 'grade' },
    { key: 'newest', label: 'Recently Added', icon: 'schedule' },
  ];

   export const ghanaLocations: IGhanaLocation[] = [
    {
      region: 'Greater Accra',
      cities: ['Accra', 'Tema', 'Madina', 'East Legon', 'Osu', 'Adabraka', 'Dansoman', 'Kasoa']
    },
    {
      region: 'Ashanti',
      cities: ['Kumasi', 'Obuasi', 'Ejisu', 'Mampong', 'Konongo']
    },
    {
      region: 'Western',
      cities: ['Takoradi', 'Tarkwa', 'Axim', 'Half Assini']
    },
    {
      region: 'Central',
      cities: ['Cape Coast', 'Elmina', 'Winneba', 'Kasoa']
    },
    {
      region: 'Eastern',
      cities: ['Koforidua', 'Akosombo', 'Nkawkaw', 'Mpraeso']
    },
    {
      region: 'Northern',
      cities: ['Tamale', 'Yendi', 'Savelugu', 'Tolon']
    },
    {
      region: 'Volta',
      cities: ['Ho', 'Keta', 'Hohoe', 'Kpando']
    },
    {
      region: 'Upper East',
      cities: ['Bolgatanga', 'Navrongo', 'Bawku']
    },
    {
      region: 'Upper West',
      cities: ['Wa', 'Tumu', 'Lawra']
    },
    {
      region: 'Brong-Ahafo',
      cities: ['Sunyani', 'Techiman', 'Berekum', 'Dormaa Ahenkro']
    }
  ];