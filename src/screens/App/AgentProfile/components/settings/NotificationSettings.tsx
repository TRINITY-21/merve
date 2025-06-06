// components/NotificationSettings.tsx
import React from 'react';
import { View } from 'react-native';
import { INotificationSettingsProps } from '../../../../../types/agentSettingsTypes';
import SettingItem from './SettingItem';


const NotificationSettings: React.FC<INotificationSettingsProps> = ({
  settings,
  onToggleChange,
}) => {
  const getNotificationIcon = (key: string): string => {
    switch (key) {
      case 'transactionAlerts': return 'swap-horiz';
      case 'dailyReports': return 'assessment';
      case 'lowBalanceAlerts': return 'account-balance-wallet';
      case 'customerReviews': return 'star';
      case 'systemUpdates': return 'system-update';
      case 'promotionalOffers': return 'local-offer';
      case 'securityAlerts': return 'security';
      case 'maintenanceNotices': return 'notifications';
      default: return 'notifications';
    }
  };

  const getNotificationSubtitle = (key: string): string => {
    switch (key) {
      case 'transactionAlerts': return 'Get notified of all transactions';
      case 'dailyReports': return 'Receive daily performance summaries';
      case 'lowBalanceAlerts': return 'Alert when float is running low';
      case 'customerReviews': return 'Notifications for new reviews';
      case 'systemUpdates': return 'System maintenance and updates';
      case 'promotionalOffers': return 'Marketing and promotional content';
      case 'securityAlerts': return 'Security and fraud notifications';
      case 'maintenanceNotices': return 'Important notices and announcements';
      default: return 'Notification setting';
    }
  };

  const formatTitle = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <View className="px-1">
      {Object.entries(settings).map(([key, value]) => (
        <SettingItem
          key={key}
          icon={getNotificationIcon(key)}
          title={formatTitle(key)}
          subtitle={getNotificationSubtitle(key)}
          value={value}
          onValueChange={(newValue) => onToggleChange(key as keyof typeof settings, newValue)}
        />
      ))}
    </View>
  );
};

export default NotificationSettings;