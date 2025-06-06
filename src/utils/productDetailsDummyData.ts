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
