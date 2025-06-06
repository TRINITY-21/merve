import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '../../../../../constants/theme/colors';
import { IMediaStepProps } from '../../../../../types/editProductTypes';

const { width: screenWidth } = Dimensions.get('window');

const MediaStep: React.FC<IMediaStepProps> = ({
  fadeAnim,
  slideAnim,
  selectedImages,
  mainImageIndex,
  onImagePicker,
  onRemoveImage,
  onSetMainImage,
}) => {
  return (
    <Animated.View 
      className="flex-1 px-5 py-6"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Text className="text-2xl font-extrabold text-gray-900 mb-2">
        Product Photos
      </Text>
      <Text className="text-sm text-gray-600 mb-6 leading-5">
        Update your product images. First photo will be the main image.
      </Text>

      <TouchableOpacity 
        className="border-2 border-primary border-dashed rounded-xl py-10 items-center bg-gray-50 mb-5"
        onPress={onImagePicker}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add-a-photo" size={32} color={colors.primary} />
        <Text className="text-base font-semibold text-primary mt-2">
          Add More Photos
        </Text>
        <Text className="text-xs text-gray-600 mt-1">
          {selectedImages.length}/10 photos added
        </Text>
      </TouchableOpacity>

      {selectedImages.length > 0 && (
        <View className="flex-row flex-wrap gap-3">
          {selectedImages.map((image, index) => (
            <View 
              key={index} 
              className="relative rounded-lg overflow-hidden"
              style={{ 
                width: (screenWidth - 64) / 3,
                height: (screenWidth - 64) / 3,
              }}
            >
              <Image 
                source={{ uri: image }} 
                className="w-full h-full" 
                style={{ resizeMode: 'cover' }} 
              />
              
              {index === mainImageIndex && (
                <View className="absolute top-1.5 left-1.5 bg-blue-500 rounded-lg px-1.5 py-0.5">
                  <Text className="text-xs font-bold text-white">Main</Text>
                </View>
              )}
              
              <TouchableOpacity 
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 items-center justify-center"
                onPress={() => onRemoveImage(index)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="close" size={16} color={colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 items-center justify-center"
                onPress={() => onSetMainImage(index)}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name={index === mainImageIndex ? "star" : "star-border"} 
                  size={16} 
                  color={colors.warning} 
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default MediaStep;