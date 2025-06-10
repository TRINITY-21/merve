// FavoritesScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import { Header } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IFavoriteProduct, IFavoritesScreenProps, IFilters, TSortKey } from '../../../../types/favoriteProductTypes';
import { mockFavorites, sortOptions } from '../../../../utils/favoritesDummyData';
import { EmptyState } from './components/EmptyState';
import { FiltersPanel } from './components/FilterPanel';
import { ProductCard } from './components/ProductCard';
import { SortModal } from './components/SortModal';
import { Toolbar } from './components/Toolbar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ITEM_HEIGHT = 140; // Approximate height for better performance

const FavoriteProductsScreen: React.FC<IFavoritesScreenProps> = () => {
  const navigation = useNavigation();

  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<TSortKey>('date_added');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<IFilters>({
    inStock: false,
    verified: false,
    ratings: 0,
  });
  const [favoriteProducts, setFavoriteProducts] = useState<IFavoriteProduct[]>([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const filterSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Refs
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Load favorites from storage/API
    setFavoriteProducts(mockFavorites);
    console.log('Loaded favoriteProducts:', mockFavorites);

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

  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setFavoriteProducts(mockFavorites);
      setRefreshing(false);
      console.log('Refreshed favoriteProducts:', mockFavorites);
    }, 2000);
  }, []);

  const toggleFilters = useCallback((): void => {
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

  const removeFavorite = useCallback((productId: string): void => {
    console.log('Products after removal:', favoriteProducts.length)

    setFavoriteProducts(prev => prev.filter(product => product.id !== productId));
  }, []);

  const handleProductPress = useCallback((productId: string): void => {
    navigation.navigate('ProductDetails', { productId });
  }, [navigation]);

  const getFilteredProducts = useCallback((): IFavoriteProduct[] => {
    let filtered = favoriteProducts;

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

    // Sort
    switch (sortBy) {
      case 'date_added':
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
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
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    console.log('Filtered products:', filtered);
    return filtered;
  }, [favoriteProducts, searchQuery, selectedCategory, selectedFilters, sortBy]);

  const filteredProducts = getFilteredProducts();
  const renderProductCard = useCallback(({ item, index }: { item: IFavoriteProduct; index: number }) => (


    <ProductCard
      product={item}
      index={index}
      onRemoveFavorite={removeFavorite}
      onProductPress={handleProductPress}
      fadeAnim={fadeAnim}
      scrollY={scrollY}
    />
  ), [removeFavorite, handleProductPress, fadeAnim, scrollY]);

  const keyExtractor = useCallback((item: IFavoriteProduct) => item.id, []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.gray.light}
        translucent={Platform.OS === 'android'}
      />

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Header
          title="Saved Items"
          leftIcon={{
            name: 'chevron-left',
            onPress: () => navigation.goBack(),
            color: colors.secondary
          }}
          rightIcons={[
            { name: 'more-vert', onPress: () => { }, color: colors.secondary }
          ]}
          titleColor={colors.secondary}
          iconBackgroundColor={colors.accent + '20'}
        />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        }}
      >
        <Toolbar
          filteredCount={filteredProducts.length}
          onSortPress={() => setShowSortModal(true)}
          onFilterPress={toggleFilters}
        />
      </Animated.View>

      {filteredProducts.length === 0 ? (
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            justifyContent: 'center',
          }}
        >
          <EmptyState onBrowsePress={() => navigation.navigate('ShopHome')} />
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >


          <FlatList
            ref={flatListRef}
            data={filteredProducts}
            renderItem={renderProductCard}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: Platform.OS === 'ios' ? 100 : 120,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={8}
            updateCellsBatchingPeriod={50}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.accent]}
                tintColor={colors.accent}
                progressBackgroundColor={colors.white}
              // size="small"
              />
            }
            bounces={true}
            bouncesZoom={false}
            alwaysBounceVertical={true}
            decelerationRate="normal"
            scrollIndicatorInsets={{ right: 1 }}
          />
        </Animated.View>
      )}

      <SortModal
        visible={showSortModal}
        sortOptions={sortOptions}
        selectedSort={sortBy}
        onSortSelect={(sortKey: string) => {
          setSortBy(sortKey as TSortKey);
          setShowSortModal(false);
        }}
        onClose={() => setShowSortModal(false)}
      />

      <FiltersPanel
        visible={showFilters}
        filters={selectedFilters}
        onFiltersChange={setSelectedFilters}
        onClose={toggleFilters}
      />
    </View>
  );
};

export default FavoriteProductsScreen;