// components/ReviewsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IReviewsHeaderProps, TabType } from '../../../../types/reviewsTypes';

const ReviewsHeader: React.FC<IReviewsHeaderProps> = ({
  userRole,
  selectedTab,
  receivedReviewsCount,
  givenReviewsCount,
  onBack,
  onTabChange,
  onHeaderAction,
}) => {
  const renderTabButton = (
    tab: TabType,
    label: string,
    count?: number,
    icon?: string
  ) => (
    <TouchableOpacity
      className={`flex-1 py-3 items-center border-b-2 flex-row justify-center gap-1 ${
        selectedTab === tab ? 'border-[#1E3A5F]' : 'border-transparent'
      }`}
      onPress={() => onTabChange(tab)}
    >
      {icon && (
        <MaterialIcons 
          name={icon as any} 
          size={18} 
          color={selectedTab === tab ? '#1E3A5F' : '#FFF8E1'} 
        />
      )}
      <Text 
        className={`text-base font-semibold ${
          selectedTab === tab 
            ? 'text-[#1E3A5F] opacity-100 font-extrabold' 
            : 'text-[#1E3A5F] opacity-70'
        }`}
      >
        {label}{count !== undefined ? ` (${count})` : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient 
      colors={['#FFCC00', '#FFB300']} 
      className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-2.5'} pb-2.5 shadow-lg`}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
      
      <View className="flex-row items-center justify-between px-5 mb-2.5">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
          onPress={onBack}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
        </TouchableOpacity>
        
        <Text className="text-2xl font-extrabold text-[#1E3A5F] text-center flex-1">
          Reviews
        </Text>

        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
          onPress={onHeaderAction}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name={userRole === 'user' ? 'rate-review' : 'build'} 
            size={24} 
            color="#1E3A5F" 
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-around px-7.5">
        {renderTabButton('received', 'Received', receivedReviewsCount)}
        
        {userRole === 'user' && renderTabButton('given', 'Given', givenReviewsCount)}
        
        {userRole === 'user' && renderTabButton('add_review', 'Add Review', undefined, 'add')}
      </View>
    </LinearGradient>
  );
};

export default ReviewsHeader;