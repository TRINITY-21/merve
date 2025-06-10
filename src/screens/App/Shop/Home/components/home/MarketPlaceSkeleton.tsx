import React from 'react';
import { View } from 'react-native';

// Base Skeleton component
const Skeleton = ({ className }: { className: string }) => (
  <View className={`bg-gray-200 animate-pulse ${className}`} />
);

// Categories skeleton component
const CategoriesSkeleton = () => (
  <View className="px-4 py-4 bg-white">
    <View className="flex-row">
      {[...Array(5)].map((_, i) => (
        <View key={i} className={`rounded-2xl p-4 mr-3 ${i === 0 ? 'bg-gray-200' : 'bg-gray-100'}`} style={{ width: 80, height: 80 }}>
          <Skeleton className="w-6 h-6 rounded mb-2" />
          <Skeleton className="w-8 h-3 rounded mb-1" />
          <Skeleton className="w-6 h-2 rounded" />
        </View>
      ))}
    </View>
  </View>
);

// Toolbar skeleton component  
const ToolbarSkeleton = () => (
  <View className="bg-white px-4 py-3 flex-row justify-between items-center border-t border-gray-100">
    <Skeleton className="w-28 h-4 rounded" />
    <View className="flex-row items-center">
      <Skeleton className="w-12 h-8 rounded-lg mr-3" />
      <Skeleton className="w-14 h-8 rounded-lg mr-3" />
      <Skeleton className="w-8 h-8 rounded mr-2" />
      <Skeleton className="w-8 h-8 rounded" />
    </View>
  </View>
);

// Product skeleton component
const ProductSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <View className="bg-white rounded-2xl mb-3 mx-4 p-4 shadow-sm">
        <View className="flex-row">
          <View className="relative mr-3">
            <Skeleton className="w-20 h-20 rounded-xl" />
            <View className="absolute top-2 left-2">
              <Skeleton className="w-4 h-4 rounded" />
            </View>
          </View>
          <View className="flex-1">
            <Skeleton className="w-3/4 h-4 rounded mb-2" />
            <Skeleton className="w-1/2 h-5 rounded mb-2" />
            <Skeleton className="w-2/3 h-3 rounded mb-2" />
            <View className="flex-row justify-between items-center">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl mb-4 shadow-sm overflow-hidden">
      {/* Image section with overlays */}
      <View className="relative">
        <Skeleton className="w-full h-40" />
        {/* Featured badge */}
        <View className="absolute top-3 left-3">
          <Skeleton className="w-16 h-5 rounded-full" />
        </View>
        {/* Discount badge */}
        <View className="absolute top-3 left-3 mt-7">
          <Skeleton className="w-10 h-5 rounded" />
        </View>
        {/* Action buttons */}
        <View className="absolute top-3 right-3">
          <Skeleton className="w-8 h-8 rounded-full mb-2" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </View>
      </View>
      
      {/* Content section */}
      <View className="p-4">
        <Skeleton className="w-full h-4 rounded mb-2" />
        <Skeleton className="w-20 h-5 rounded mb-3" />
        
        {/* Store info */}
        <View className="flex-row items-center mb-2">
          <Skeleton className="w-3/4 h-3 rounded mr-2" />
          <Skeleton className="w-3 h-3 rounded" />
        </View>
        
        {/* Location and rating */}
        <View className="flex-row justify-between items-center mb-3">
          <Skeleton className="w-12 h-3 rounded" />
          <View className="flex-row items-center">
            <Skeleton className="w-3 h-3 rounded mr-1" />
            <Skeleton className="w-8 h-3 rounded" />
          </View>
        </View>
        
        {/* Distance and stock */}
        <View className="flex-row justify-between items-center mb-3">
          <Skeleton className="w-12 h-3 rounded" />
          <Skeleton className="w-10 h-3 rounded" />
        </View>
        
        {/* Tags */}
        <View className="flex-row">
          <Skeleton className="w-12 h-4 rounded-full mr-2" />
          <Skeleton className="w-14 h-4 rounded-full" />
        </View>
      </View>
    </View>
  );
};

// Main skeleton component
interface MarketplaceSkeletonProps {
  viewMode: 'grid' | 'list';
}

const MarketplaceSkeleton: React.FC<MarketplaceSkeletonProps> = ({ viewMode }) => {
  return (
    <View className="flex-1 bg-gray-50">
      <CategoriesSkeleton />
      <ToolbarSkeleton />
      
      {/* Grid layout for skeleton */}
      {viewMode === 'grid' ? (
        <View className="px-4 pt-2">
          {[...Array(4)].map((_, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between">
              <View style={{ flex: 1, marginRight: 4 }}>
                <ProductSkeleton viewMode="grid" />
              </View>
              <View style={{ flex: 1, marginLeft: 4 }}>
                <ProductSkeleton viewMode="grid" />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="pt-2">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} viewMode="list" />
          ))}
        </View>
      )}
    </View>
  );
};

export default MarketplaceSkeleton;