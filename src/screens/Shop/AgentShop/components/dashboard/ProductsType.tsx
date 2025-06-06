import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import ProductItem from './ProductItem';


const { width: screenWidth } = Dimensions.get('window');

interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  favorites: number;
  trend: number;
}

interface IOverviewData {
  activeProducts: number;
  draftProducts: number;
  totalProducts: number;
}

interface IDashboardData {
  overview: IOverviewData;
  topProducts: IProduct[];
}

interface IProductsTabProps {
  dashboardData: IDashboardData;
  navigation: any;
}

const ProductsTab: React.FC<IProductsTabProps> = ({ dashboardData, navigation }) => {
  return (
    <View className="p-5">
      {/* Product Status Overview */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Product Status</Text>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4">
            <MaterialIcons name="check-circle" size={32} color={colors.success} />
            <Text className="text-2xl font-extrabold text-gray-900 mt-2 mb-1">
              {dashboardData.overview.activeProducts}
            </Text>
            <Text className="text-xs text-gray-500">Active</Text>
          </View> 
          <View className="flex-1 bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4">
            <MaterialIcons name="save" size={32} color={colors.warning} />
            <Text className="text-2xl font-extrabold text-gray-900 mt-2 mb-1">
              {dashboardData.overview.draftProducts}
            </Text>
            <Text className="text-xs text-gray-500">Drafts</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4">
            <MaterialIcons name="inventory" size={32} color={colors.primary} />
            <Text className="text-2xl font-extrabold text-gray-900 mt-2 mb-1">
              {dashboardData.overview.totalProducts}
            </Text>
            <Text className="text-xs text-gray-500">Total</Text>
          </View>
        </View>
      </View> 

      {/* Top Performing Products */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">Top Performing Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddProductScreen')}>
            <MaterialIcons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <FlatList 
          data={dashboardData.topProducts}
          renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Quick Actions */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Quick Actions</Text>
        <View className="flex-row flex-wrap gap-3">
          <TouchableOpacity 
            className="bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4"
            style={{ width: (screenWidth - 52) / 2 }}
            onPress={() => navigation.navigate('AddProduct')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={24} color={colors.primary} />
            <Text className="text-sm font-semibold text-gray-900 mt-2">Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4"
            style={{ width: (screenWidth - 52) / 2 }}
            onPress={() => navigation.navigate('AgentProducts')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="shopping-cart" size={24} color={colors.accent} />
            <Text className="text-sm font-semibold text-gray-900 mt-2">View All Products</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4"
            style={{ width: (screenWidth - 52) / 2 }}
            onPress={() => {/* Handle export */}}
            activeOpacity={0.8}
          >
            <MaterialIcons name="file-download" size={24} color={colors.success} />
            <Text className="text-sm font-semibold text-gray-900 mt-2">Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-white rounded-xl p-5 items-center shadow-sm shadow-black/10 elevation-4"
            style={{ width: (screenWidth - 52) / 2 }}
            onPress={() => navigation.navigate('PromoteProductScreen')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="star" size={24} color={colors.warning} />
            <Text className="text-sm font-semibold text-gray-900 mt-2">Promote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductsTab;