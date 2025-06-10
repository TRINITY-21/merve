// screens/MarketplaceScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { Component, ErrorInfo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Typography } from '../../../../components/common';
import { Header } from '../../../../components/common/Header';
import { colors } from '../../../../constants/theme/colors';
import { ShopStackScreenProps } from '../../../../navigation/AppNavigator';
import { ICategory, IMarketplaceScreenProps, IProduct, ISelectedFilters, SortBy, ViewMode } from '../../../../types/marketplaceTypes';
import { ghanaLocations, products, sortOptions } from '../../../../utils/productDetailsDummyData';
import { CategoriesSection, FiltersPanel, LocationModal, MarketplaceToolbar, ProductCard, SortModal } from './components/home';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  ProductDetails: { productId: string };
  FavoriteProducts: { productId: string };
  FavoritesScreen: undefined;
};

type NavigationProp = ShopStackScreenProps<'ShopHome'>['navigation'];

// Custom Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center p-5">
          <MaterialIcons name="error-outline" size={64} color={colors.error} />
          <Text className="text-xl font-bold text-text-primary mt-4 mb-2">
            Oops! Something went wrong
          </Text>
          <Text className="text-sm text-text-secondary text-center mb-4">
            {this.state.error?.message}
          </Text>
          <TouchableOpacity
            className="bg-accent px-6 py-3 rounded-xl"
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

// Temporary Skeleton component until the real one is implemented
const Skeleton = ({ className }: { className: string }) => (
  <View className={`bg-gray-200 animate-pulse ${className}`} />
);

// Loading skeleton component
const ProductSkeleton = () => (
  <View className="bg-white rounded-3xl mb-4 shadow-md overflow-hidden p-4">
    <Skeleton className="w-full h-40 rounded-2xl mb-4" />
    <Skeleton className="w-3/4 h-6 rounded-lg mb-2" />
    <Skeleton className="w-1/2 h-4 rounded-lg mb-4" />
    <View className="flex-row justify-between">
      <Skeleton className="w-1/3 h-4 rounded-lg" />
      <Skeleton className="w-1/4 h-4 rounded-lg" />
    </View>
  </View>
);

const MarketplaceScreen: React.FC<IMarketplaceScreenProps> = () => {
  
  // State management
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  const [error, setError] = useState<string | null>(null);
const [isToolbarSticky, setIsToolbarSticky] = useState(false);
const scrollViewRef = useRef<ScrollView>(null);
const navigation = useNavigation<NavigationProp>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const filterSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const locationSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;

  // Mock data
  const categories: ICategory[] = [
    { key: 'all', label: 'All', icon: 'apps', count: 1247 },
    { key: 'airtime', label: 'Airtime', icon: 'phone', count: 456 },
    { key: 'sim', label: 'SIM Cards', icon: 'sim-card', count: 123 },
    { key: 'phones', label: 'Phones', icon: 'smartphone', count: 89 },
    { key: 'accessories', label: 'Tech', icon: 'headphones', count: 234 },
    { key: 'essentials', label: 'Essentials', icon: 'shopping-bag', count: 345 },
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

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleLocationModal = useCallback(() => {
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
  }, [showLocationModal, locationSlideAnim]);

  const toggleFilters = useCallback(() => {
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
  }, [showFilters, filterSlideAnim]);

  const getFilteredProducts = useCallback((): IProduct[] => {
    try {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while filtering products');
      return [];
    }
  }, [searchQuery, selectedCategory, selectedFilters, priceRange, sortBy]);


const handleProductPress = useCallback((productId: string) => {
  // Since ProductDetails expects no params in ShopStackParamList
  navigation.navigate('ProductDetails');
}, [navigation]);

const handleFavoritePress = useCallback((productId: string) => {
  // Since FavoriteProducts expects no params
  navigation.navigate('FavoriteProducts');
}, [navigation]);
  const handleSharePress = useCallback((productId: string) => {
    // Implement share functionality
    console.log('Share pressed for product:', productId);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const renderProductItem = useCallback(({ item }: { item: IProduct }) => {
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
  }, [viewMode, handleProductPress, handleFavoritePress, handleSharePress]);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters({
      inStock: false,
      verified: false,
      openNow: false,
      ratings: 0,
    });
  }, []);

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

  if (isLoading) {
    return (
      <View className="flex-1 bg-background p-4">
        <Header
  title={!isToolbarSticky ? "Marketplace" : `${filteredProducts.length} Products`}
  leftIcon={{
    name: 'arrow-back',
    onPress: () => navigation.goBack(),
    color: colors.secondary
  }}
  rightIcons={[
    {
      name: 'favorite-border',
      onPress: () => navigation.navigate('FavoritesScreen'),
      color: colors.secondary
    },
    {
      name: showMap ? 'grid-view' : 'map',
      onPress: () => setShowMap(!showMap),
      color: colors.secondary
    }
  ]}
  fixed={true}
  titleColor={colors.secondary}
  iconBackgroundColor={colors.accent + '20'}
  customContent={isToolbarSticky ? (
    <View className="flex-row items-center justify-between px-4 h-14">
      {/* Left Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
        <MaterialIcons name="arrow-back" size={24} color={colors.secondary} />
      </TouchableOpacity>

      {/* Center Content - Search results */}
      <View className="flex-1 items-center">
        <Typography
          variant="bold"
          size={16}
          style={{ color: colors.secondary }}
          numberOfLines={1}
        >
          {filteredProducts.length} Products Found
        </Typography>
        {selectedCategory !== 'all' && (
          <Typography
            variant="medium"
            size={12}
            style={{ color: colors.secondary, opacity: 0.7 }}
          >
            in {categories.find(c => c.key === selectedCategory)?.label}
          </Typography>
        )}
      </View>

      {/* Right Icons */}
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')} className="w-8 h-8 items-center justify-center">
          <MaterialIcons name="favorite-border" size={18} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMap(!showMap)} className="w-8 h-8 items-center justify-center">
          <MaterialIcons name={showMap ? 'grid-view' : 'map'} size={18} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  ) : undefined}
/>
        <View className="flex-row flex-wrap justify-between mt-4">
          {[1, 2, 3, 4,5,6,7,8,9,10].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </View>
      </View>
    );
  }


 
  const renderProductContent = () => {
  if (showMap) {
    return <MapView />;
  }

  if (filteredProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={{ padding: viewMode === 'grid' ? 0 : 20, paddingBottom: 100 }}>
      {viewMode === 'grid' ? (
        <View 
          style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            gap: 12
          }}
        >
          {filteredProducts.map((item, index) => {
            const cardWidth = (screenWidth - 52) / 2;
            return (
              <ProductCard
                key={`${item.id}-${viewMode}-${index}`} // Unique key for view mode
                product={item}
                viewMode={viewMode}
                cardWidth={cardWidth}
                onPress={handleProductPress}
                onFavoritePress={handleFavoritePress}
                onSharePress={handleSharePress}
              />
            );
          })}
        </View>
      ) : (
        <View>
          {filteredProducts.map((item, index) => (
            <ProductCard
              key={`${item.id}-${viewMode}-${index}`} // Unique key for view mode
              product={item}
              viewMode={viewMode}
              onPress={handleProductPress}
              onFavoritePress={handleFavoritePress}
              onSharePress={handleSharePress}
            />
          ))}
        </View>
      )}
    </View>
  );
};


  return (
    <ErrorBoundary>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-background" style={{ backgroundColor: colors.background }}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
          
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Header
              title="Marketplace"
              leftIcon={{
                name: 'arrow-back',
                onPress: () => navigation.goBack(),
                color: colors.secondary
              }}
              rightIcons={[
                {
                  name: 'favorite-border',
                  onPress: () => navigation.navigate('FavoritesScreen'),
                  color: colors.secondary
                },
                {
                  name: showMap ? 'grid-view' : 'map',
                  onPress: () => setShowMap(!showMap),
                  color: colors.secondary
                }
              ]}
              titleColor={colors.secondary}
              iconBackgroundColor={colors.accent + '20'}
            />
          </Animated.View>
          
{/* Replace the existing content structure with this: */}
<ScrollView
  ref={scrollViewRef}
  className="flex-1"
  showsVerticalScrollIndicator={false}
  stickyHeaderIndices={[1]}
  onScroll={({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    setIsToolbarSticky(offsetY > 80);
  }}
  scrollEventThrottle={16}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={[colors.accent]}
      tintColor={colors.accent}
    />
  }
>
  <CategoriesSection
    categories={categories}
    selectedCategory={selectedCategory}
    onCategorySelect={setSelectedCategory}
  />
  
  <View className="bg-white">
    <MarketplaceToolbar
      resultCount={filteredProducts.length}
      viewMode={viewMode}
      onSortPress={() => setShowSortModal(true)}
      onFilterPress={toggleFilters}
      onViewModeChange={handleViewModeChange}
    />
  </View>

  {/* Simple product rendering - no conditional ScrollViews */}
  <View style={{ padding: viewMode === 'grid' ? 0 : 20, paddingBottom: 100 }}>
    {showMap ? (
      <MapView />
    ) : filteredProducts.length === 0 ? (
      <EmptyState />
    ) : viewMode === 'grid' ? (
      <View 
        style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          gap: 12
        }}
      >
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            viewMode={viewMode}
            cardWidth={(screenWidth - 52) / 2}
            onPress={handleProductPress}
            onFavoritePress={handleFavoritePress}
            onSharePress={handleSharePress}
          />
        ))}
      </View>
    ) : (
      filteredProducts.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          viewMode={viewMode}
          onPress={handleProductPress}
          onFavoritePress={handleFavoritePress}
          onSharePress={handleSharePress}
        />
      ))
    )}
  </View>
</ScrollView>       
      
          <SortModal
            visible={showSortModal}
            sortOptions={sortOptions}
            selectedSort={sortBy}
            onClose={() => setShowSortModal(false)}
            onSortSelect={(sortKey) => setSortBy(sortKey as SortBy)}
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
      </TouchableWithoutFeedback>
    </ErrorBoundary>
  );
};

export default MarketplaceScreen;