// components/CustomerSettings.tsx
import React from 'react';
import { View } from 'react-native';
import { ICustomerSettingsProps } from '../../../../../types/agentSettingsTypes';
import ActionItem from './ActionItem';
import SettingItem from './SettingItem';


const CustomerSettings: React.FC<ICustomerSettingsProps> = ({
  settings,
  onToggleChange,
}) => {
  const getCustomerIcon = (key: string): string => {
    switch (key) {
      case 'showRating': return 'star';
      case 'allowReviews': return 'rate-review';
      case 'customerSupport24': return 'support';
      case 'automaticReceipts': return 'receipt';
      case 'shareContactInfo': return 'contact-phone';
      case 'loyaltyProgram': return 'card-giftcard';
      case 'customerFeedbackAlerts': return 'feedback';
      default: return 'people';
    }
  };

  const getCustomerSubtitle = (key: string): string => {
    switch (key) {
      case 'showRating': return 'Display your rating publicly';
      case 'allowReviews': return 'Allow customers to leave reviews';
      case 'customerSupport24': return '24/7 customer support availability';
      case 'automaticReceipts': return 'Auto-send transaction receipts';
      case 'shareContactInfo': return 'Share contact details with customers';
      case 'loyaltyProgram': return 'Participate in loyalty rewards';
      case 'customerFeedbackAlerts': return 'Get alerts for customer feedback';
      default: return 'Customer setting';
    }
  };

  const formatTitle = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const booleanSettings = Object.entries(settings).filter(([, value]) => typeof value === 'boolean');

  return (
    <View className="px-1">
      {booleanSettings.map(([key, value]) => (
        <SettingItem
          key={key}
          icon={getCustomerIcon(key)}
          title={formatTitle(key)}
          subtitle={getCustomerSubtitle(key)}
          value={value as boolean}
          onValueChange={(newValue) => onToggleChange(key as keyof typeof settings, newValue)}
        />
      ))}

      <ActionItem
        icon="message"
        title="Custom Messages"
        subtitle="Set automated customer messages"
        onPress={() => console.log('Custom messages')}
        iconColor="#00BFA5"
      />
    </View>
  );
};

export default CustomerSettings;