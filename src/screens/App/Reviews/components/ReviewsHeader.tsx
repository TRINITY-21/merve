// components/ReviewsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../../components/common';
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
    <View
    >
      


      <Header title="Reviews" 
      leftIcon={{
        name: 'chevron-left',
        onPress: onBack,
        color: '#1E3A5F'
      }}
      
      rightIcons={[
        {
          name: userRole === 'user' ? 'rate-review' : 'build',
          onPress: onHeaderAction,
          color: '#1E3A5F'
        }
      ]}
      
      
      />

      <View className="flex-row justify-around px-7.5">
        {renderTabButton('received', 'Received', receivedReviewsCount)}
        
        {userRole === 'user' && renderTabButton('given', 'Given', givenReviewsCount)}
        
        {userRole === 'user' && renderTabButton('add_review', 'Add Review', undefined, 'add')}
      </View>
    </View>
  );
};

export default ReviewsHeader;