import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import { colors } from '../../../../constants/theme/colors';
import { IAgentProductsScreenProps, IFilterOption, IProduct, ISortOption, IStatusOption } from '../../../../types/agentProductTypes';
import { mockProducts } from '../../../../utils/productsDummyData';
import AgentProductsHeader from './components/agentProducts/AgentProductsHeader';
import BulkActionsModal from './components/agentProducts/BulkActionModal';
import EmptyState from './components/agentProducts/EmptyState';
import FilterChips from './components/agentProducts/FilterChips';
import ProductCard from './components/agentProducts/ProductCard';
import ProductsToolbar from './components/agentProducts/ProductsToolBar';
import SortModal from './components/agentProducts/SortModal';
import StatusModal from './components/agentProducts/StatusModal';


const AgentProductsScreen: React.FC<IAgentProductsScreenProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<string>('date_desc');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showBulkActions, setShowBulkActions] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductMenu, setShowProductMenu] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const filterOptions: IFilterOption[] = [
    { key: 'all', label: 'All Products', count: mockProducts.length },
    { key: 'active', label: 'Active', count: mockProducts.filter(p => p.status === 'active').length },
    { key: 'draft', label: 'Drafts', count: mockProducts.filter(p => p.status === 'draft').length },
    { key: 'out_of_stock', label: 'Out of Stock', count: mockProducts.filter(p => p.status === 'out_of_stock').length },
    { key: 'paused', label: 'Paused', count: mockProducts.filter(p => p.status === 'paused').length },
    { key: 'promoted', label: 'Promoted', count: mockProducts.filter(p => p.isPromoted).length },
  ];
 
  const sortOptions: ISortOption[] = [
    { key: 'date_desc', label: 'Newest First', icon: 'schedule' },
    { key: 'date_asc', label: 'Oldest First', icon: 'schedule' },
    { key: 'views_desc', label: 'Most Views', icon: 'visibility' },
    { key: 'sales_desc', label: 'Best Selling', icon: 'trending-up' },
    { key: 'revenue_desc', label: 'Highest Revenue', icon: 'monetization-on' },
    { key: 'price_desc', label: 'Price: High to Low', icon: 'trending-down' },
    { key: 'price_asc', label: 'Price: Low to High', icon: 'trending-up' },
    { key: 'name_asc', label: 'Name A-Z', icon: 'sort-by-alpha' },
  ];

  const statusOptions: IStatusOption[] = [
    { key: 'active', label: 'Active', color: colors.success, icon: 'check-circle' },
    { key: 'paused', label: 'Paused', color: colors.warning, icon: 'pause-circle' },
    { key: 'draft', label: 'Draft', color: colors.gray.medium, icon: 'edit' },
    { key: 'out_of_stock', label: 'Out of Stock', color: colors.error, icon: 'remove-circle' },
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
  }, [fadeAnim, slideAnim, scaleAnim]);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getFilteredProducts = (): IProduct[] => {
    let filtered = [...mockProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'promoted') {
        filtered = filtered.filter(product => product.isPromoted);
      } else {
        filtered = filtered.filter(product => product.status === selectedFilter);
      }
    }

    // Sort
    switch (sortBy) {
      case 'date_desc':
        filtered.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        break;
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        break;
      case 'views_desc':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'sales_desc':
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      case 'revenue_desc':
        filtered.sort((a, b) => b.revenue - a.revenue);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const toggleProductSelection = (productId: string): void => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = (): void => {
    const filteredIds = getFilteredProducts().map(p => p.id);
    setSelectedProducts(
      selectedProducts.length === filteredIds.length ? [] : filteredIds
    );
  };

  const handleBulkAction = (action: string): void => {
    Alert.alert(
      'Bulk Action',
      `Are you sure you want to ${action} ${selectedProducts.length} selected products?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            // Handle bulk action
            setSelectedProducts([]);
            setShowBulkActions(false);
          }
        }
      ]
    );
  };

  const handleProductAction = (action: string, product: IProduct): void => {
    switch (action) {
      case 'edit':
        navigation.navigate('AgentEditProduct', { product: product });
        break;
      case 'analytics':
        navigation.navigate('AgentProductAnalytics', { product: product });
        break;
      case 'delete':
        Alert.alert(
          'Delete Product',
          'Are you sure you want to delete this product?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete') }
          ]
        );
        break;
      case 'promote':
        // Handle promotion
        break;
      case 'status':
        setSelectedProduct(product);
        setShowStatusModal(true);
        break;
      default:
        break;
    }
    setShowProductMenu(null);
  };

  const updateProductStatus = (status: string): void => {
    // Update product status logic
    setShowStatusModal(false);
    setSelectedProduct(null);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <View className="flex-1 bg-gray-50">
      <AgentProductsHeader
        navigation={navigation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={mockProducts}
        scaleAnim={scaleAnim}
      />
      
      <FilterChips
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />
      
      <ProductsToolbar
        selectedProducts={selectedProducts}
        filteredProducts={filteredProducts}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSortPress={() => setShowSortModal(true)}
        onSelectAll={selectAllProducts}
        onBulkActions={() => setShowBulkActions(true)}
        onClearSelection={() => setSelectedProducts([])}
      />
      
      {filteredProducts.length === 0 ? (
        <EmptyState
          onAddProduct={() => navigation.navigate('AddProduct' as never)}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              viewMode={viewMode}
              isSelected={selectedProducts.includes(item.id)}
              showMenu={showProductMenu === item.id}
              onPress={() => {
                if (selectedProducts.length > 0) {
                  toggleProductSelection(item.id);
                } else {
                //   navigation.navigate('ProductDetails', { productId: item.id });
                }
              }}
              onLongPress={() => toggleProductSelection(item.id)}
              onMenuPress={() => setShowProductMenu(showProductMenu === item.id ? null : item.id)}
              onMenuAction={(action) => handleProductAction(action, item)}
              onSelectionToggle={() => toggleProductSelection(item.id)}
              fadeAnim={fadeAnim}
            />
          )}
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
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}

      <SortModal
        visible={showSortModal}
        sortOptions={sortOptions}
        selectedSort={sortBy}
        onSelect={(sort) => {
          setSortBy(sort);
          setShowSortModal(false);
        }}
        onClose={() => setShowSortModal(false)}
      />

      <BulkActionsModal
        visible={showBulkActions}
        selectedCount={selectedProducts.length}
        onAction={handleBulkAction}
        onClose={() => setShowBulkActions(false)}
      />

      <StatusModal
        visible={showStatusModal}
        statusOptions={statusOptions}
        selectedProduct={selectedProduct}
        onStatusChange={updateProductStatus}
        onClose={() => setShowStatusModal(false)}
      />
    </View>
  );
};

export default AgentProductsScreen;