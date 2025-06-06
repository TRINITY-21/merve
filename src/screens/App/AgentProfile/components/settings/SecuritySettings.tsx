// components/SecuritySettings.tsx
import React from 'react';
import { View } from 'react-native';
import { ISecuritySettingsProps } from '../../../../../types/agentSettingsTypes';
import ActionItem from './ActionItem';
import SettingItem from './SettingItem';


const SecuritySettings: React.FC<ISecuritySettingsProps> = ({
  settings,
  onToggleChange,
}) => {
  const getSecurityIcon = (key: string): string => {
    switch (key) {
      case 'twoFactorAuth': return 'security';
      case 'biometricAuth': return 'fingerprint';
      case 'autoLogout': return 'logout';
      case 'suspiciousActivityAlerts': return 'warning';
      case 'requirePinForTransactions': return 'pin';
      case 'allowRemoteAccess': return 'remote-desktop';
      case 'encryptTransactionData': return 'lock';
      default: return 'security';
    }
  };

  const getSecuritySubtitle = (key: string): string => {
    switch (key) {
      case 'twoFactorAuth': return 'Extra security with 2FA';
      case 'biometricAuth': return 'Use fingerprint or face unlock';
      case 'autoLogout': return 'Automatic session timeout';
      case 'suspiciousActivityAlerts': return 'Alert on suspicious activities';
      case 'requirePinForTransactions': return 'PIN required for transactions';
      case 'allowRemoteAccess': return 'Allow remote assistance';
      case 'encryptTransactionData': return 'Encrypt all transaction data';
      default: return 'Security setting';
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
          icon={getSecurityIcon(key)}
          title={formatTitle(key)}
          subtitle={getSecuritySubtitle(key)}
          value={value as boolean}
          onValueChange={(newValue) => onToggleChange(key as keyof typeof settings, newValue)}
        />
      ))}

      <ActionItem
        icon="vpn-key"
        title="Change PIN"
        subtitle="Update your transaction PIN"
        onPress={() => console.log('Change PIN')}
        iconColor="#00BFA5"
      />

      <ActionItem
        icon="history"
        title="Login History"
        subtitle="View recent login activities"
        onPress={() => console.log('Login history')}
        iconColor="#00BFA5"
      />
    </View>
  );
};

export default SecuritySettings;