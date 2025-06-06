// components/ImageModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { IImageModalProps } from '../../../../../../types/productDetailsTypes';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageModal: React.FC<IImageModalProps> = ({
  visible,
  images,
  selectedIndex,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/90 justify-center">
        <TouchableOpacity
          className={`absolute z-50 w-10 h-10 rounded-full bg-black/50 items-center justify-center ${
            Platform.OS === 'ios' ? 'top-16' : 'top-12'
          } right-5`}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <MaterialIcons name="close" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: selectedIndex * screenWidth, y: 0 }}
        >
          {images.map((image, index) => (
            <View 
              key={index} 
              className="justify-center items-center"
              style={{ width: screenWidth, height: screenHeight }}
            >
              <Image 
                source={{ uri: image }} 
                className="rounded-lg"
                style={{ 
                  width: screenWidth - 40, 
                  height: screenWidth - 40,
                  resizeMode: 'contain'
                }}
              />
            </View>
          ))}
        </ScrollView>
        
        <View className="absolute bottom-25 left-0 right-0 flex-row justify-center gap-2">
          {images.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-sm ${
                selectedIndex === index 
                  ? 'w-6 bg-white' 
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;