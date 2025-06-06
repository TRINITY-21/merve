// components/ProductReviews.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IProductReviewsProps } from '../../../../../../types/productDetailsTypes';

const ProductReviews: React.FC<IProductReviewsProps> = ({
  reviews,
  productRating,
  totalReviews,
  showAll,
  onToggleShowAll,
}) => {
  return (
    <View className="bg-white px-5 py-5">
      {/* Reviews Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-lg font-bold text-text-primary">Customer Reviews</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-xl font-extrabold text-text-primary">
            {productRating}
          </Text>
          <View className="flex-row gap-0.5">
            {[...Array(5)].map((_, i) => (
              <MaterialIcons
                key={i}
                name="star"
                size={14}
                color={i < Math.floor(productRating) ? '#FF9800' : '#E0E0E0'}
              />
            ))}
          </View>
          <Text className="text-sm text-text-secondary">({totalReviews})</Text>
        </View>
      </View>

      {/* Reviews List */}
      {reviews.slice(0, showAll ? reviews.length : 2).map((review) => (
        <View key={review.id} className="bg-background rounded-xl p-4 mb-3">
          <View className="flex-row mb-3">
            <Image 
              source={{ uri: review.userImage }} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Text className="text-sm font-semibold text-text-primary">
                  {review.userName}
                </Text>
                {review.verified && (
                  <MaterialIcons name="verified" size={14} color="#00BFA5" />
                )}
              </View>
              <View className="flex-row items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={12}
                    color={i < review.rating ? '#FF9800' : '#E0E0E0'}
                  />
                ))}
                <Text className="text-xs text-text-secondary ml-2">
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
          
          <Text className="text-sm leading-5 text-text-primary mb-3">
            {review.comment}
          </Text>
          
          {review.images && (
            <ScrollView horizontal className="mb-3">
              {review.images.map((image, index) => (
                <Image 
                  key={index} 
                  source={{ uri: image }} 
                  className="w-15 h-15 rounded-lg mr-2"
                />
              ))}
            </ScrollView>
          )}
          
          <TouchableOpacity 
            className="flex-row items-center gap-1 self-start"
            activeOpacity={0.8}
          >
            <MaterialIcons name="thumb-up" size={14} color="#9E9E9E" />
            <Text className="text-xs text-text-secondary">
              Helpful ({review.helpful})
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Show More Button */}
      <TouchableOpacity
        className="py-3 self-center"
        onPress={onToggleShowAll}
        activeOpacity={0.8}
      >
        <Text className="text-sm font-semibold text-accent">
          {showAll ? 'Show less reviews' : `Show all ${reviews.length} reviews`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductReviews;