// components/CategoriesSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ICategoriesSectionProps } from '../../../../../../types/marketplaceTypes';

const CategoriesSection: React.FC<ICategoriesSectionProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <View className="bg-white py-4 border-b border-gray-light">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-3">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              className={`items-center rounded-2xl px-4 py-3 min-w-[80px] border ${
                selectedCategory === category.key
                  ? 'bg-accent border-accent'
                  : 'bg-background border-gray-light'
              }`}
              onPress={() => onCategorySelect(category.key)}
              activeOpacity={0.8}
            >
              <View className="mb-2">
                <MaterialIcons 
                  name={category.icon as any} 
                  size={20} 
                  color={selectedCategory === category.key ? '#FFFFFF' : '#9E9E9E'} 
                />
              </View>
              <Text 
                className={`text-xs font-semibold mb-0.5 ${
                  selectedCategory === category.key 
                    ? 'text-white' 
                    : 'text-text-primary'
                }`}
              >
                {category.label}
              </Text>
              <Text 
                className={`text-xs ${
                  selectedCategory === category.key 
                    ? 'text-white/80' 
                    : 'text-text-secondary'
                }`}
              >
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesSection;