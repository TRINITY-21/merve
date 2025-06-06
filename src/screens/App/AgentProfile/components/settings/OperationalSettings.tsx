// components/OperationalSettings.tsx
import React from 'react';
import { View } from 'react-native';
import { IOperationalSettingsProps } from '../../../../../types/agentSettingsTypes';
import ActionItem from './ActionItem';
import SettingItem from './SettingItem';


const OperationalSettings: React.FC<IOperationalSettingsProps> = ({
  settings,
  onToggleChange,
}) => {
  return (
    <View className="px-1">
      <ActionItem
        icon="account-balance-wallet"
        title="Float Management"
        subtitle="Auto-replenish • Low threshold: GH₵ 1,000"
        onPress={() => console.log('Float management')}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="trending-up"
        title="Performance Reports"
        subtitle="Weekly reports • Last sent: 3 days ago"
        onPress={() => console.log('Performance reports')}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="backup"
        title="Data Backup"
        subtitle="Cloud backup • Last backup: Today"
        onPress={() => console.log('Data backup')}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="gavel"
        title="Compliance Settings"
        subtitle="Standard mode • Audit trail enabled"
        onPress={() => console.log('Compliance settings')}
        iconColor="#00BFA5"
      />

      <SettingItem
        icon="trending-up"
        title="High Volume Alerts"
        subtitle="Get notified of unusual transaction volumes"
        value={settings.highVolumeAlerts}
        onValueChange={(value) => onToggleChange('highVolumeAlerts', value)}
      />

      <SettingItem
        icon="fact-check"
        title="Audit Trail"
        subtitle="Maintain detailed transaction logs"
        value={settings.auditTrail}
        onValueChange={(value) => onToggleChange('auditTrail', value)}
      />
    </View>
  );
};

export default OperationalSettings;