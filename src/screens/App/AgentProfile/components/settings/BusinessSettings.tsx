// components/BusinessSettings.tsx
import React from 'react';
import { View } from 'react-native';
import { IBusinessSettingsProps } from '../../../../../types/agentSettingsTypes';
import ActionItem from './ActionItem';
import SettingItem from './SettingItem';

const BusinessSettings: React.FC<IBusinessSettingsProps> = ({
  settings,
  onToggleChange,
  onNavigateToEdit,
}) => {
  return (
    <View className="px-1">
      <SettingItem
        icon="business"
        title="Auto-Accept Transactions"
        subtitle="Automatically accept valid transactions"
        value={settings.autoAcceptTransactions}
        onValueChange={(value) => onToggleChange('autoAcceptTransactions', value)}
      />

      <SettingItem
        icon="badge"
        title="Require Customer ID"
        subtitle="Mandate ID verification for transactions"
        value={settings.requireCustomerID}
        onValueChange={(value) => onToggleChange('requireCustomerID', value)}
      />

      <SettingItem
        icon="schedule"
        title="24/7 Operations"
        subtitle="Operate round the clock"
        value={settings.businessHours24}
        onValueChange={(value) => onToggleChange('businessHours24', value)}
      />

      <SettingItem
        icon="weekend"
        title="Weekend Operations"
        subtitle="Available on weekends"
        value={settings.weekendOperations}
        onValueChange={(value) => onToggleChange('weekendOperations', value)}
      />

      <ActionItem
        icon="edit"
        title="Edit Agent Profile Information"
        subtitle="Modify your profile details"
        onPress={onNavigateToEdit}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="edit"
        title="Edit Business Hours"
        subtitle="Customize your operating schedule"
        onPress={() => console.log('Edit business hours')}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="location-on"
        title="Update Location"
        subtitle="Modify your business address"
        onPress={() => console.log('Update location')}
        iconColor="#00BFA5"
      />
    </View>
  );
};

export default BusinessSettings;