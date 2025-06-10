// screens/MarketplaceScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { Component, ErrorInfo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList, // Import FlatList
  Keyboard,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
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
            {this.state.error?.message || 'An unexpected error occurred.'}
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

// Loading skeleton component for grid view
const ProductGridSkeleton = () => (
  <View className="flex-1 max-w-[48%] bg-white rounded-3xl mb-4 shadow-md overflow-hidden p-3">
    <Skeleton className="w-full h-32 rounded-2xl mb-3" />
    <Skeleton className="w-3/4 h-5 rounded-lg mb-2" />
    <Skeleton className="w-1/2 h-4 rounded-lg mb-3" />
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
  const navigation = useNavigation<NavigationProp>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const filterSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const locationSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [categoriesHeight, setCategoriesHeight] = useState(0);

  // Add this scroll handler function (around line 130 with other handlers):
  const handleScroll = useCallback((event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Stick when toolbar would meet the header (i.e., when categories are scrolled past)
    setIsToolbarSticky(scrollY >= categoriesHeight);
  }, [categoriesHeight]);
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
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 25, friction: 8, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const toggleLocationModal = useCallback(() => {
    const toValue = showLocationModal ? screenHeight : 0;
    if (!showLocationModal) setShowLocationModal(true);
    Animated.timing(locationSlideAnim, { toValue, duration: 300, useNativeDriver: true, }).start(() => {
      if (showLocationModal) setShowLocationModal(false);
    });
  }, [showLocationModal, locationSlideAnim]);

  const toggleFilters = useCallback(() => {
    const toValue = showFilters ? screenHeight : 0;
    if (!showFilters) setShowFilters(true);
    Animated.timing(filterSlideAnim, { toValue, duration: 300, useNativeDriver: true }).start(() => {
      if (showFilters) setShowFilters(false);
    });
  }, [showFilters, filterSlideAnim]);

  const filteredProducts = useCallback((): IProduct[] => {
    try {
      let filtered = products;
      // Apply filtering and sorting logic here...
      return filtered;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while filtering products');
      return [];
    }
  }, [searchQuery, selectedCategory, selectedFilters, priceRange, sortBy])();


  const handleProductPress = useCallback((productId: string) => navigation.navigate('ProductDetails'), [navigation]);
  const handleFavoritePress = useCallback((productId: string) => navigation.navigate('FavoriteProducts'), [navigation]);
  const handleSharePress = useCallback((productId: string) => console.log('Share pressed for product:', productId), []);
  const handleViewModeChange = useCallback((mode: ViewMode) => setViewMode(mode), []);
  const handleClearFilters = useCallback(() => setSelectedFilters({ inStock: false, verified: false, openNow: false, ratings: 0 }), []);

  const renderProductItem = useCallback(({ item }: { item: IProduct }) => (
    <View style={{
      flex: 1,
      maxWidth: viewMode === 'grid' ? '48%' : '100%',
      marginBottom: 0,
      marginRight: viewMode === 'grid' ? 8 : 10,
      marginLeft: viewMode === 'grid' ? 8 : 10,
      marginTop: viewMode === 'grid' ? 8 : 10
    }}>
      <ProductCard
        product={item}
        viewMode={viewMode}
        onPress={handleProductPress}
        onFavoritePress={handleFavoritePress}
        onSharePress={handleSharePress}
      />
    </View>
  ), [viewMode, handleProductPress, handleFavoritePress, handleSharePress]);

  const EmptyState = () => (
    <View className="items-center justify-center pt-20">
      <MaterialIcons name="search-off" size={64} color="#9E9E9E" />
      <Text className="text-lg font-bold text-text-primary mt-4 mb-2">No products found</Text>
      <Text className="text-sm text-text-secondary text-center">Try adjusting your search or filters</Text>
    </View>
  );

  const MapView = () => (
    <View className="items-center justify-center pt-20">
      <Text className="text-base text-text-secondary">Map View Coming Soon</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-background p-4 pt-0">
        <Header title="Marketplace" /* ... other props ... */ />
        <View className="flex-col flex-wrap justify-between mt-4 px-2">
          {[...Array(8)].map((_, i) => <ProductGridSkeleton key={i} />)}
        </View>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-background">
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Header
              title="Marketplace"
              leftIcon={{ name: 'chevron-left', onPress: () => navigation.goBack(), color: colors.secondary }}
              rightIcons={[
                { name: 'favorite-border', onPress: () => navigation.navigate('FavoritesScreen'), color: colors.secondary },
                { name: showMap ? 'grid-view' : 'map', onPress: () => setShowMap(!showMap), color: colors.secondary }
              ]}
              titleColor={colors.secondary}
              iconBackgroundColor={colors.accent + '20'}
            />
          </Animated.View>
          <FlatList
            key={viewMode}
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={viewMode === 'grid' ? 2 : 1}
            columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined}
            contentContainerStyle={{
              paddingBottom: 100
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.accent]}
                tintColor={colors.accent}
              />
            }
            ListHeaderComponent={
              <View
                onLayout={(event) => {
                  setCategoriesHeight(event.nativeEvent.layout.height + 60); // Include toolbar height
                }}
              >
                <CategoriesSection
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
                {!isToolbarSticky && (
                  <View className="bg-white">
                    <MarketplaceToolbar
                      resultCount={filteredProducts.length}
                      viewMode={viewMode}
                      onSortPress={() => setShowSortModal(true)}
                      onFilterPress={toggleFilters}
                      onViewModeChange={handleViewModeChange}
                    />
                  </View>
                )}
              </View>
            }
            ListEmptyComponent={showMap ? <MapView /> : <EmptyState />}
          />
          {isToolbarSticky && (
            <View
              style={{
                position: 'absolute',
                top: (StatusBar.currentHeight || 0) + 100, // Position below header
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white'
              }}
            >
              <MarketplaceToolbar
                resultCount={filteredProducts.length}
                viewMode={viewMode}
                onSortPress={() => setShowSortModal(true)}
                onFilterPress={toggleFilters}
                onViewModeChange={handleViewModeChange}
              />
            </View>
          )}

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