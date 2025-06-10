// components/ProductDetailsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../../../../constants/theme/colors';

interface IProductDetailsHeaderProps {
  productTitle: string;
  isFavorite: boolean;
  headerOpacity: any;
  onBack: () => void;
  onFavoritePress: () => void;
  onOptionsPress: () => void;
}

const ProductDetailsHeader: React.FC<IProductDetailsHeaderProps> = ({
  productTitle,
  isFavorite,
  headerOpacity,
  onBack,
  onFavoritePress,
  onOptionsPress,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      {/* Always visible floating buttons */}

        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />


      {/* Animated header with background (appears on scroll) */}
      <Animated.View 
        className="absolute top-0 left-0 right-0 z-40"
        style={{ opacity: headerOpacity }}
        pointerEvents={headerOpacity._value > 0.5 ? 'auto' : 'none'}
      >
        <LinearGradient 
          colors={[colors.primary, colors.primary]} 
          style={{ paddingTop: insets.top }}
        >
          <View className="flex-row items-center justify-between px-5 py-3">
            {/* Back button */}
            <TouchableOpacity 
              className="w-10 h-10 rounded-full items-center justify-center"
              onPress={()=>navigation.goBack()}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
            </TouchableOpacity>
            
            {/* Product title */}
            <Animated.Text 
              className="flex-1 text-center text-lg font-bold text-secondary px-5"
              numberOfLines={1}
            >
              {productTitle || 'Product Details'}
            </Animated.Text>
            
            {/* Only three dots menu - NO favorite icon */}
            <View className="flex-row justify-end" style={{ width: 40 }}>
              <TouchableOpacity 
                className="w-10 h-10 rounded-full items-center justify-center"
                onPress={onOptionsPress}
                activeOpacity={0.8}
              >
                <MaterialIcons name="more-vert" size={24} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

export default ProductDetailsHeader;