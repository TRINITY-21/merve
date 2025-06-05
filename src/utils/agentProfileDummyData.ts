import { colors } from "../constants/theme/colors";
import { IAgentData, IBooking, IMarketplaceData } from "../types/agentProfileTypes";

  // Dummy recent bookings data for agent
  export const agentRecentBookings: IBooking[] = [
    {
      id: '1',
      customerName: 'John Mensah',
      customerPhone: '+233-24-555-0001',
      serviceType: 'cash_out',
      amount: 500,
      requestedDate: '2025-05-30',
      requestedTime: '14:30',
      location: 'Nkrumah Circle',
      status: 'pending',
      createdAt: '2025-05-28T10:00:00Z',
      notes: 'Need to withdraw for school fees',
      urgency: 'normal',
    },
    {
      id: '2',
      customerName: 'Sarah Osei',
      customerPhone: '+233-26-555-0002',
      serviceType: 'cash_in',
      amount: 1000,
      requestedDate: '2025-05-30',
      requestedTime: '16:00',
      location: 'Accra Mall',
      status: 'accepted',
      createdAt: '2025-05-28T11:30:00Z',
      notes: 'Deposit salary, prefer exact change',
      urgency: 'high',
    },
    {
      id: '3',
      customerName: 'Kwame Asante',
      customerPhone: '+233-27-555-0003',
      serviceType: 'bill_payment',
      amount: 150,
      requestedDate: '2025-05-29',
      requestedTime: '11:00',
      location: 'Kaneshie Market',
      status: 'completed',
      createdAt: '2025-05-27T09:15:00Z',
      notes: 'Pay ECG bill, account number: 123456789',
      urgency: 'normal',
    },
  ];

  // Agent data
  export const agentData: IAgentData = {
    id: 'agent_001',
    name: 'Alex Johnson',
    businessName: 'Johnson Mobile Money Services',
    avatar: 'https://i.pravatar.cc/150?img=9',
    verified: true,
    agentCode: 'MTN-ACC-12345',
    businessType: 'Mobile Money Agent',
    location: {
      address: '123 Independence Avenue, Accra',
      city: 'Accra',
      region: 'Greater Accra',
      coordinates: { lat: 40.7782, lng: 30.4017 }
    },
    contact: {
      phone: '+233 24 123 4567',
      email: 'alex@johnsonmomo.com',
      whatsapp: '+233 24 123 4567'
    },
    workingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    services: [
      { id: 'cash_in', name: 'Cash In', icon: 'arrow-downward', active: true, commission: '0.5%' },
      { id: 'cash_out', name: 'Cash Out', icon: 'arrow-upward', active: true, commission: '1.0%' },
      { id: 'bill_payment', name: 'Bill Payment', icon: 'receipt', active: true, commission: '0.3%' },
      { id: 'airtime', name: 'Airtime', icon: 'phone', active: true, commission: '2.0%' },
      { id: 'data_bundle', name: 'Data Bundle', icon: 'wifi', active: false, commission: '1.5%' },
      { id: 'bank_transfer', name: 'Bank Transfer', icon: 'account-balance', active: true, commission: '0.8%' }
    ],
    statistics: {
      totalTransactions: 2847,
      totalVolume: 'GH₵ 284,750',
      monthlyEarnings: 'GH₵ 3,420',
      rating: 4.8,
      totalReviews: 156,
      profileViews: 1234,
      customerRetention: 89,
      averageTransactionValue: 'GH₵ 100',
      followers: 342,
      following: 125,
      totalBookings: agentRecentBookings.length
    },
    followers: [
      { id: 'f1', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=1', verified: false },
      { id: 'f2', name: 'James Miller', avatar: 'https://i.pravatar.cc/150?img=2', verified: true },
      { id: 'f3', name: 'Sophie Chen', avatar: 'https://i.pravatar.cc/150?img=3', verified: false },
      { id: 'f4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4', verified: false },
      { id: 'f5', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
      { id: 'f6', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
      { id: 'f7', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
      { id: 'f8', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },

    ],
    pendingInvites: [
      { id: 'inv1', phone: '+233 24 555 0001', name: 'John Doe', status: 'pending', sentDate: '2025-05-25' },
      { id: 'inv2', phone: '+233 24 555 0002', name: 'Jane Smith', status: 'accepted', sentDate: '2025-05-24' },
      { id: 'inv3', phone: '+233 24 555 0003', name: 'Mike Johnson', status: 'declined', sentDate: '2025-05-23' },
    ],
    recentActivities: [
      {
        id: 'act1',
        type: 'transaction',
        title: 'Cash Out Transaction',
        amount: 'GH₵ 150.00',
        customer: 'Emma Wilson',
        time: '5 minutes ago',
        status: 'completed',
        transactionId: 'TXN123456'
      },
      {
        id: 'act2',
        type: 'transaction',
        title: 'Bill Payment',
        amount: 'GH₵ 85.50',
        customer: 'James Miller',
        time: '12 minutes ago',
        status: 'completed',
        transactionId: 'TXN123457'
      },
      {
        id: 'act3',
        type: 'review',
        title: 'New Customer Review',
        customer: 'Sophie Chen',
        time: '1 hour ago',
        rating: 5,
        comment: 'Excellent service, very professional!'
      },
      {
        id: 'act4',
        type: 'booking',
        title: 'New Booking Request',
        customer: 'David Brown',
        time: '2 hours ago',
        action: 'requested an appointment'
      }
    ],
    reviews: [
      {
        id: 'rev1',
        customer: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        comment: 'Excellent service! Very professional and fast transactions.',
        date: '2025-05-25',
        verified: true
      },
      {
        id: 'rev2',
        customer: 'James Miller',
        avatar: 'https://i.pravatar.cc/150?img=2',
        rating: 4,
        comment: 'Good service, but sometimes takes a bit longer during peak hours.',
        date: '2025-05-23',
        verified: true
      },
      {
        id: 'rev3',
        customer: 'Sophie Chen',
        avatar: 'https://i.pravatar.cc/150?img=3',
        rating: 5,
        comment: 'Always reliable and trustworthy. My go-to agent for all transactions.',
        date: '2025-05-20',
        verified: true
      }
    ],
    about: 'Johnson Mobile Money Services has been serving the Accra community for over 3 years. We pride ourselves on providing fast, reliable, and secure mobile money services. Our experienced team ensures that every transaction is handled with care and professionalism.',
    achievements: [
      { id: 'ach1', title: 'Top Performer', description: '2024 Q4', icon: 'emoji-events', color: colors.primary },
      { id: 'ach2', title: 'Customer Favorite', description: '500+ 5-star reviews', icon: 'favorite', color: colors.error },
      { id: 'ach3', title: 'Verified Agent', description: 'MTN Certified', icon: 'verified', color: colors.accent },
      { id: 'ach4', title: 'Reliability Award', description: '99.9% uptime', icon: 'security', color: colors.success }
    ],
    operatingHours: {
      friday: { close: "18:00", isClosed: false, open: "08:00" },
      monday: { close: "18:00", isClosed: false, open: "08:00" },
      saturday: { close: "15:00", isClosed: false, open: "09:00" },
      sunday: { close: "", isClosed: true, open: "" },
      thursday: { close: "18:00", isClosed: false, open: "08:00" },
      tuesday: { close: "18:00", isClosed: false, open: "08:00" },
      wednesday: { close: "18:00", isClosed: false, open: "08:00" }
    },
    otp: "950009",
    phone: "0241234567",
    pin: "1111"
  };

  export const agentMarketplaceData: IMarketplaceData = {
    monthlyStats: {
      totalProducts: 18,
      activeProducts: 15,
      draftProducts: 3,
      totalViews: 3420,
      totalInquiries: 87,
      totalFavorites: 156,
      customerReach: 842,
      conversionRate: 2.5,
      averageProductPrice: 2150,
      totalRevenue: 15400,
      monthlyGrowth: 18.5,
    },
    categoryBreakdown: [
      { category: 'Smartphones', count: 6, views: 1240, inquiries: 32, revenue: 6800, color: colors.primary },
      { category: 'Laptops', count: 4, views: 890, inquiries: 24, revenue: 4200, color: colors.accent },
      { category: 'Tablets', count: 3, views: 680, inquiries: 18, revenue: 2800, color: colors.success },
      { category: 'Accessories', count: 3, views: 420, inquiries: 9, revenue: 1200, color: colors.warning },
      { category: 'Gaming', count: 2, views: 190, inquiries: 4, revenue: 400, color: colors.error },
    ],
    topProducts: [
      {
        id: 'p1',
        title: 'iPhone 13 Pro Max 256GB',
        price: 3200,
        image: 'https://picsum.photos/100/100?random=20',
        views: 456,
        inquiries: 18,
        favorites: 34,
        status: 'active',
        addedAt: '2 days ago',
        trend: 22.5,
      },
      {
        id: 'p2',
        title: 'MacBook Air M2 512GB',
        price: 4500,
        image: 'https://picsum.photos/100/100?random=21',
        views: 321,
        inquiries: 12,
        favorites: 28,
        status: 'active',
        addedAt: '5 days ago',
        trend: 8.3,
      },
      {
        id: 'p3',
        title: 'Samsung Galaxy S24 Ultra',
        price: 2800,
        image: 'https://picsum.photos/100/100?random=22',
        views: 289,
        inquiries: 15,
        favorites: 22,
        status: 'active',
        addedAt: '1 week ago',
        trend: -3.2,
      },
    ],
    recentInquiries: [
      {
        id: 'i1',
        customerName: 'Sarah Osei',
        productTitle: 'iPhone 13 Pro Max',
        message: 'Is this still available? Can I see it today?',
        time: '15 minutes ago',
        status: 'unread',
        priority: 'high',
      },
      {
        id: 'i2',
        customerName: 'John Mensah',
        productTitle: 'MacBook Air M2',
        message: 'What is the condition? Any warranty?',
        time: '2 hours ago',
        status: 'read',
        priority: 'normal',
      },
      {
        id: 'i3',
        customerName: 'Emma Wilson',
        productTitle: 'Samsung Galaxy S24',
        message: 'Can you negotiate on the price?',
        time: '1 day ago',
        status: 'replied',
        priority: 'normal',
      },
    ],
    customerAnalytics: {
      totalCustomers: 67,
      returningCustomers: 23,
      averageOrderValue: 1890,
      customerSatisfaction: 4.7,
      repeatPurchaseRate: 34.3,
    },
  };