// screens/MarketplaceScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    RefreshControl,
    Text,
    View
} from 'react-native';
import { ISortOption } from '../../../../types/agentProductTypes';
import { ICategory, IGhanaLocation, IMarketplaceScreenProps, IProduct, ISelectedFilters, SortBy, ViewMode } from '../../../../types/marketplaceTypes';
import { CategoriesSection, FiltersPanel, LocationModal, MarketplaceHeader, MarketplaceToolbar, ProductCard, SortModal } from './components/home';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MarketplaceScreen: React.FC<IMarketplaceScreenProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [radius, setRadius] = useState<number>(5);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('Madina, Accra');
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    inStock: false,
    verified: false,
    openNow: false,
    ratings: 0,
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const filterSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const locationSlideAnim = useRef(new Animated.Value(screenHeight)).current;

  // Mock data
  const categories: ICategory[] = [
    { key: 'all', label: 'All', icon: 'apps', count: 1247 },
    { key: 'airtime', label: 'Airtime', icon: 'phone', count: 456 },
    { key: 'sim', label: 'SIM Cards', icon: 'sim-card', count: 123 },
    { key: 'phones', label: 'Phones', icon: 'smartphone', count: 89 },
    { key: 'accessories', label: 'Tech', icon: 'headphones', count: 234 },
    { key: 'essentials', label: 'Essentials', icon: 'shopping-bag', count: 345 },
  ];

  const products: IProduct[] = [
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
    }
  ];

  const sortOptions: ISortOption[] = [
    { key: 'relevance', label: 'Most Relevant', icon: 'star' },
    { key: 'distance', label: 'Nearest First', icon: 'location-on' },
    { key: 'price_low', label: 'Price: Low to High', icon: 'trending-up' },
    { key: 'price_high', label: 'Price: High to Low', icon: 'trending-down' },
    { key: 'rating', label: 'Highest Rated', icon: 'grade' },
    { key: 'newest', label: 'Recently Added', icon: 'schedule' },
  ];

  const ghanaLocations: IGhanaLocation[] = [
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

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const toggleLocationModal = () => {
    if (showLocationModal) {
      Animated.timing(locationSlideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowLocationModal(false));
    } else {
      setShowLocationModal(true);
      Animated.timing(locationSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleFilters = () => {
    if (showFilters) {
      Animated.timing(filterSlideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowFilters(false));
    } else {
      setShowFilters(true);
      Animated.timing(filterSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const getFilteredProducts = (): IProduct[] => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Additional filters
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }
    if (selectedFilters.verified) {
      filtered = filtered.filter(product => product.agent.verified);
    }
    if (selectedFilters.ratings > 0) {
      filtered = filtered.filter(product => product.rating >= selectedFilters.ratings);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.agent.distance - b.agent.distance);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      default: // relevance
        filtered.sort((a, b) => (b.isPromoted ? 1 : 0) - (a.isPromoted ? 1 : 0));
    }

    return filtered;
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails' as never, { productId } as never);
  };

  const handleFavoritePress = (productId: string) => {
    // Handle favorite functionality
    console.log('Favorite pressed for product:', productId);
  };

  const handleSharePress = (productId: string) => {
    // Handle share functionality
    console.log('Share pressed for product:', productId);
  };

  const renderProductItem = ({ item }: { item: IProduct }) => {
    const cardWidth = viewMode === 'grid' ? (screenWidth - 52) / 2 : undefined;
    return (
      <ProductCard
        product={item}
        viewMode={viewMode}
        cardWidth={cardWidth}
        onPress={handleProductPress}
        onFavoritePress={handleFavoritePress}
        onSharePress={handleSharePress}
      />
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      inStock: false,
      verified: false,
      openNow: false,
      ratings: 0,
    });
  };

  const filteredProducts = getFilteredProducts();

  const EmptyState = () => (
    <View className="items-center py-15">
      <MaterialIcons name="search-off" size={64} color="#9E9E9E" />
      <Text className="text-lg font-bold text-text-primary mt-4 mb-2">
        No products found
      </Text>
      <Text className="text-sm text-text-secondary text-center">
        Try adjusting your search or filters
      </Text>
    </View>
  );

  const MapView = () => (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-base text-text-secondary">Map View Coming Soon</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <MarketplaceHeader
          selectedLocation={selectedLocation}
          showMap={showMap}
          searchQuery={searchQuery}
          radius={radius}
          onLocationPress={toggleLocationModal}
          onMapToggle={() => setShowMap(!showMap)}
          onSearchChange={setSearchQuery}
          onRadiusChange={setRadius}
          onBack={() => navigation.goBack()}
          onFavoritesPress={() => navigation.navigate('FavoritesScreen' as never)}
        />
      </Animated.View>
      
      <CategoriesSection
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <MarketplaceToolbar
        resultCount={filteredProducts.length}
        viewMode={viewMode}
        onSortPress={() => setShowSortModal(true)}
        onFilterPress={toggleFilters}
        onViewModeChange={setViewMode}
      />
      
      {showMap ? (
        <MapView />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={`${viewMode}-${filteredProducts.length}`}
          columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#FFCC00']}
              tintColor="#FFCC00"
            />
          }
          ListEmptyComponent={EmptyState}
        />
      )}

      <SortModal
        visible={showSortModal}
        sortOptions={sortOptions}
        selectedSort={sortBy}
        onClose={() => setShowSortModal(false)}
        onSortSelect={setSortBy}
      />

      <FiltersPanel
        visible={showFilters}
        selectedFilters={selectedFilters}
        priceRange={priceRange}
        slideAnim={filterSlideAnim}
        onClose={toggleFilters}
        onFiltersChange={setSelectedFilters}
        onPriceRangeChange={setPriceRange}
        onClearFilters={handleClearFilters}
      />

      <LocationModal
        visible={showLocationModal}
        locations={ghanaLocations}
        selectedLocation={selectedLocation}
        slideAnim={locationSlideAnim}
        onClose={toggleLocationModal}
        onLocationSelect={setSelectedLocation}
      />
    </View>
  );
};

export default MarketplaceScreen;