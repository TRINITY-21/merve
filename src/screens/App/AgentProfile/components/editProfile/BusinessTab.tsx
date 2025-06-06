// components/tabs/BusinessTab.tsx
import React from 'react';
import {
    Animated,
    Text,
    View,
} from 'react-native';
import { InputField } from '.';
import { IBusinessTabProps, IServiceToggle } from '../../../../../types/editProfileTypes';
import { ToggleItem } from './ToggleItem';


export const BusinessTab: React.FC<IBusinessTabProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  inputRefs,
  onInputChange,
  onFocusNextInput,
}) => {
  const serviceToggles: IServiceToggle[] = [
    {
      key: 'acceptsCashDeposits',
      label: 'Cash Deposits',
      icon: 'arrow-downward',
      iconColor: '#4CAF50',
      value: agentData.acceptsCashDeposits,
      onValueChange: (value) => onInputChange('acceptsCashDeposits', value),
    },
    {
      key: 'acceptsCashWithdrawals',
      label: 'Cash Withdrawals',
      icon: 'arrow-upward',
      iconColor: '#F44336',
      value: agentData.acceptsCashWithdrawals,
      onValueChange: (value) => onInputChange('acceptsCashWithdrawals', value),
    },
    {
      key: 'acceptsBillPayments',
      label: 'Bill Payments',
      icon: 'receipt',
      iconColor: '#00BFA5',
      value: agentData.acceptsBillPayments,
      onValueChange: (value) => onInputChange('acceptsBillPayments', value),
    },
    {
      key: 'acceptsAirtimePurchases',
      label: 'Airtime Purchases',
      icon: 'phone',
      iconColor: '#FF9800',
      value: agentData.acceptsAirtimePurchases,
      onValueChange: (value) => onInputChange('acceptsAirtimePurchases', value),
    },
  ];

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
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Business Information
        </Text>
        
        <InputField
          label="Business Name"
          fieldKey="businessName"
          value={agentData.businessName}
          options={{ required: true, icon: 'business', nextField: 'businessDescription' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Business Description"
          fieldKey="businessDescription"
          value={agentData.businessDescription}
          options={{ 
            icon: 'description', 
            multiline: true, 
            numberOfLines: 3, 
            placeholder: 'Describe your business and services',
            nextField: 'businessType'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Business Type"
          fieldKey="businessType"
          value={agentData.businessType}
          options={{ icon: 'category', nextField: 'businessRegNumber' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Business Registration Number"
          fieldKey="businessRegNumber"
          value={agentData.businessRegNumber}
          options={{ icon: 'confirmation-number', nextField: 'businessCategory' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Business Category"
          fieldKey="businessCategory"
          value={agentData.businessCategory}
          options={{ icon: 'category', nextField: 'yearsInOperation' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Years in Operation"
          fieldKey="yearsInOperation"
          value={agentData.yearsInOperation}
          options={{ icon: 'schedule', keyboardType: 'numeric', nextField: 'operatingLicense' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Operating License"
          fieldKey="operatingLicense"
          value={agentData.operatingLicense}
          options={{ icon: 'gavel', nextField: 'dailyTransactionLimit' }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Daily Transaction Limit (GH₵)"
          fieldKey="dailyTransactionLimit"
          value={agentData.dailyTransactionLimit}
          options={{ 
            icon: 'account-balance-wallet', 
            keyboardType: 'numeric',
            nextField: 'monthlyTransactionLimit'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Monthly Transaction Limit (GH₵)"
          fieldKey="monthlyTransactionLimit"
          value={agentData.monthlyTransactionLimit}
          options={{ 
            icon: 'account-balance-wallet', 
            keyboardType: 'numeric',
            nextField: 'floatAmount'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Float Amount (GH₵)"
          fieldKey="floatAmount"
          value={agentData.floatAmount}
          options={{ 
            icon: 'savings', 
            keyboardType: 'numeric',
            nextField: 'minimumFloatAlert'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />

        <InputField
          label="Minimum Float Alert (GH₵)"
          fieldKey="minimumFloatAlert"
          value={agentData.minimumFloatAlert}
          options={{ 
            icon: 'notification-important', 
            keyboardType: 'numeric'
          }}
          inputRefs={inputRefs}
          onInputChange={onInputChange}
          onFocusNextInput={onFocusNextInput}
        />
      </View>

      {/* Service Toggles */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Services Offered
        </Text>
        
        <View className="gap-4">
          {serviceToggles.map((toggle) => (
            <ToggleItem key={toggle.key} data={toggle} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};