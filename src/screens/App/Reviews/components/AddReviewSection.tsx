// components/AddReviewSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IAddReviewSectionProps } from '../../../../types/reviewsTypes';

const AddReviewSection: React.FC<IAddReviewSectionProps> = ({
  targetAgent,
  reviewRating,
  reviewComment,
  onRatingChange,
  onCommentChange,
  onSubmit,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    };
  }, []);

  return (
    <Animated.View
      className="bg-white rounded-2xl p-5 shadow-lg mb-5"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Text className="text-xl font-bold text-[#212121] mb-5 text-center">
        Review Your Agent
      </Text>

      <View className="flex-col items-center bg-[#FFF8E1] p-4 rounded-xl mb-5 border border-[#FFCC00]">
        <Text className="text-sm text-[#757575] mb-2">
          You are reviewing:
        </Text>
        <View className="flex-row items-center gap-2.5">
          <MaterialIcons name="people" size={28} color="#1E3A5F" />
          <Text className="text-lg font-bold text-[#212121]">
            {targetAgent.name}
          </Text>
        </View>
      </View>

      <View className="mb-5 items-center">
        <Text className="text-sm font-semibold text-[#212121] mb-2.5">
          Your Rating:
        </Text>
        <View className="flex-row gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
              <MaterialIcons
                name={star <= reviewRating ? 'star' : 'star-border'}
                size={36}
                color="#FFCC00"
                className="mx-0.5"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text className="text-sm font-semibold text-[#212121] mb-2.5">
        Your Comment:
      </Text>
      <TextInput
        className="bg-[#F5F5F5] rounded-xl p-4 text-sm text-[#212121] mb-5 min-h-25 border border-[#E0E0E0]"
        placeholder={`Share your experience with ${targetAgent.name}...`}
        placeholderTextColor="#9E9E9E"
        multiline
        numberOfLines={4}
        value={reviewComment}
        onChangeText={onCommentChange}
        textAlignVertical="top"
      />

      <TouchableOpacity
        className="flex-row items-center justify-center bg-[#FFCC00] py-4 rounded-3xl shadow-md"
        onPress={onSubmit}
        activeOpacity={0.8}
      >
        <MaterialIcons name="send" size={24} color="#1E3A5F" />
        <Text className="text-[#1E3A5F] text-lg font-extrabold ml-2.5">
          Submit Review
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddReviewSection;