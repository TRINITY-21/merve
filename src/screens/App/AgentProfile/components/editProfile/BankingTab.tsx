// components/tabs/BankingTab.tsx
import React from 'react';
import {
  Animated,
  View
} from 'react-native';
import { InfoCard } from '.';
import { Typography } from '../../../../../components/common';
import { IBankingTabProps } from '../../../../../types/editProfileTypes';
import { InputField } from './InputField';


export const BankingTab: React.FC<IBankingTabProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  inputRefs,
  onInputChange,
  onFocusNextInput,
}) => {
  return (
    <Animated.View 
      className="p-5"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography variant="semibold" className="text-lg font-bold text-gray-800 mb-4">
          Banking Information
        </Typography>
        
        <InputField
          label="Bank Name"
          fieldKey="bankName"
          value={agentData.bankName}
          options={{ required: true, icon: 'account-balance', nextField: 'accountName' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Account Name"
          fieldKey="accountName"
          value={agentData.accountName}
          options={{ required: true, icon: 'person', nextField: 'accountNumber' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Account Number"
          fieldKey="accountNumber"
          value={agentData.accountNumber}
          options={{ 
            required: true, 
            icon: 'credit-card',
            keyboardType: 'numeric',
            nextField: 'mobileMoneyNumber'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Mobile Money Number"
          fieldKey="mobileMoneyNumber"
          value={agentData.mobileMoneyNumber}
          options={{ 
            icon: 'phone-android',
            keyboardType: 'phone-pad',
            placeholder: 'For commission payments'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      </View>

      <InfoCard
        title="Banking Information Security"
        content="Your banking information is encrypted and used only for commission payments and account verification. This information is never shared with third parties."
        icon="info"
      />
    </Animated.View>
  );
};