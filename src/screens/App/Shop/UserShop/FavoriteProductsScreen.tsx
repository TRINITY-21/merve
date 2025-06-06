// FavoritesScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    RefreshControl,
    View,
} from 'react-native';
import { IFavoriteProduct, IFavoritesScreenProps, IFilters, TSortKey, TViewMode } from '../../../../types/favoriteProductTypes';
import { categories, mockFavorites, sortOptions } from '../../../../utils/favoritesDummyData';
import { CategoriesFilter } from './components/CategoriesFilter';
import { EmptyState } from './components/EmptyState';
import { FavoritesHeader } from './components/FavoritesHeader';
import { FiltersPanel } from './components/FilterPanel';
import { ProductCard } from './components/ProductCard';
import { SortModal } from './components/SortModal';
import { Toolbar } from './components/Toolbar';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FavoriteProductsScreen: React.FC<IFavoritesScreenProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<TViewMode>('grid');
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

  useEffect(() => {
    // Load favorites from storage/API
    setFavoriteProducts(mockFavorites);
    
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

  const handleRefresh = (): void => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleFilters = (): void => {
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

  const removeFavorite = (productId: string): void => {
    setFavoriteProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleProductPress = (productId: string): void => {
    navigation.navigate('ProductDetails', { productId });
  };

  const getFilteredProducts = (): IFavoriteProduct[] => {
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

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const cardWidth = (screenWidth - 52) / 2;

  const renderProductCard = ({ item }: { item: IFavoriteProduct }) => (
    <ProductCard
      product={item}
      viewMode={viewMode}
      cardWidth={cardWidth}
      onRemoveFavorite={removeFavorite}
      onProductPress={handleProductPress}
      fadeAnim={fadeAnim}
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FavoritesHeader
        favoriteProducts={favoriteProducts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBack={() => navigation.goBack()}
        onClearAll={() => setFavoriteProducts([])}
      />
      
      <CategoriesFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <Toolbar
        filteredCount={filteredProducts.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSortPress={() => setShowSortModal(true)}
        onFilterPress={toggleFilters}
      />
      
      {filteredProducts.length === 0 ? (
        <EmptyState onBrowsePress={() => navigation.navigate('ShopHome')} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
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
        />
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