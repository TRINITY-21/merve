// components/ProductCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IProductCardProps } from '../../../../../types/favoriteProductTypes';

const { width: screenWidth } = Dimensions.get('window');

export const ProductCard: React.FC<IProductCardProps> = ({
  product,
  index,
  onRemoveFavorite,
  onProductPress,
  fadeAnim, // This will be ignored, we'll create our own
  scrollY,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;
  // Create card's own fadeAnim instead of using shared one
  const cardFadeAnim = useRef(new Animated.Value(1)).current;

  // Parallax effect
  const inputRange = [-1, 0, (index || 0) * 120, ((index || 0) + 2) * 120];
  const cardScale = scrollY?.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.98],
    extrapolate: 'clamp',
  }) || new Animated.Value(1);

  const handlePressIn = (): void => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 400,
      friction: 8,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 400,
      friction: 8,
    }).start();
  };

  const handleRemoveFavorite = (): void => {
    // Prevent multiple taps
    if (isRemoving) return;
    
    setIsRemoving(true);

    // Remove from data immediately - this fixes the white screen issue
    onRemoveFavorite(product.id);

    // Play animation as visual feedback only
    if (Platform.OS === 'android') {
      // Simpler animation for Android
      Animated.parallel([
        Animated.timing(heartAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardFadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // iOS animation (more complex)
      Animated.sequence([
        Animated.spring(heartAnim, {
          toValue: 1.3,
          useNativeDriver: true,
          tension: 300,
          friction: 4,
        }),
        Animated.timing(heartAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(cardFadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDistance = (distance: number): string => {
    return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`;
  };

  return (
    <Animated.View 
      style={{
        transform: [
          { scale: Animated.multiply(scaleAnim, cardScale) },
        ],
        opacity: cardFadeAnim, // Use card's own fadeAnim
        marginBottom: 14,
      }}
    >
      <TouchableOpacity
        onPress={() => onProductPress(product.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
          overflow: 'hidden',
        }}
      >
        <View style={{ flexDirection: 'row', padding: 14 }}>
          {/* Product Image */}
          <View style={{ 
            width: 90, 
            height: 90, 
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: '#F8F9FA',
            position: 'relative',
          }}>
            <Image 
              source={{ uri: product.image }} 
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
            
            {/* Compact Badges */}
            <View style={{
              position: 'absolute',
              top: 6,
              left: 6,
              right: 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              {product.inStock && (
                <View style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.9)',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 6,
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: '600',
                  }}>
                    IN STOCK
                  </Text>
                </View>
              )}

              {product.discount && (
                <View style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 6,
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: '700',
                  }}>
                    -{product.discount}%
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Product Info */}
          <View style={{ flex: 1, marginLeft: 14, justifyContent: 'space-between' }}>
            {/* Header */}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#1F2937',
                    lineHeight: 20,
                    flex: 1,
                    marginRight: 8,
                  }}
                >
                  {product.title}
                </Text>
                
                {/* Favorite Button */}
                <TouchableOpacity
                  onPress={handleRemoveFavorite}
                  disabled={isRemoving}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isRemoving ? '#F3F4F6' : '#FEF2F2',
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isRemoving ? 0.5 : 1,
                  }}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                    <Ionicons name="heart" size={16} color="#EF4444" />
                  </Animated.View>
                </TouchableOpacity>
              </View>

              {/* Agent & Rating */}
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginTop: 6,
                marginBottom: 8,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{
                    width: 14,
                    height: 14,
                    backgroundColor: product.agent.verified ? '#10B981' : '#E5E7EB',
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 6,
                  }}>
                    <Ionicons 
                      name="checkmark" 
                      size={9} 
                      color={product.agent.verified ? '#FFFFFF' : '#9CA3AF'} 
                    />
                  </View>
                  <Text style={{
                    fontSize: 13,
                    color: '#6B7280',
                    fontWeight: '500',
                    marginRight: 8,
                  }}>
                    {product.agent.name}
                  </Text>
                  <Text style={{
                    fontSize: 11,
                    color: '#9CA3AF',
                  }}>
                    {formatDistance(product.agent.distance)}
                  </Text>
                </View>

                {/* Compact Rating */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    fontWeight: '600',
                    marginLeft: 2,
                  }}>
                    {product.rating.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Price & Category */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
            }}>
              <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '800',
                  color: colors.accent,
                  letterSpacing: -0.3,
                }}>
                  {formatPrice(product.price)}
                </Text>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Text style={{
                    fontSize: 13,
                    color: '#9CA3AF',
                    textDecorationLine: 'line-through',
                    marginTop: -2,
                  }}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
              </View>

              {/* Compact Category */}
              <View style={{
                backgroundColor: '#F1F5F9',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 8,
              }}>
                <Text style={{
                  fontSize: 10,
                  color: '#64748B',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {product.category}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Bar */}
        <View style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: '#F8FAFC',
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              backgroundColor: '#FAFBFC',
            }}
          >
            <Ionicons name="share-outline" size={16} color="#64748B" />
            <Text style={{
              fontSize: 12,
              color: '#64748B',
              fontWeight: '600',
              marginLeft: 6,
            }}>
              Share
            </Text>
          </TouchableOpacity>

          <View style={{ width: 1, backgroundColor: '#F1F5F9' }} />

          <TouchableOpacity
            onPress={() => onProductPress(product.id)}
            style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              backgroundColor: colors.accent,
            }}
          >
            <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
            <Text style={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: '700',
              marginLeft: 6,
            }}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};