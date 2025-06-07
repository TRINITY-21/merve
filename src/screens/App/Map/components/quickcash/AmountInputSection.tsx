// components/quickcash/AmountInputSection.tsx
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';

interface AmountInputSectionProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  currency?: string;
  placeholder?: string;
  quickAmounts?: string[];
  title?: string;
  showQuickAmounts?: boolean;
  compact?: boolean;
}

export const AmountInputSection: React.FC<AmountInputSectionProps> = ({
  amount,
  onAmountChange,
  currency = 'GHS',
  placeholder = '0.00',
  quickAmounts = ['10', '25', '50', '100'],
  title = 'Enter Amount',
  showQuickAmounts = true,
  compact = false
}) => {
  return (
    <View className={compact ? 'gap-3' : 'gap-4'}>
      {title && (
        <Typography 
          variant="semibold" 
          size={compact ? 14 : 16} 
          className="text-gray-900 mb-1 tracking-tight"
        >
          {title}
        </Typography>
      )}
      
      <View 
        className="flex-row items-center border-2 border-gray-300 rounded-2xl px-5 bg-gray-50" 
        style={{ 
          paddingVertical: compact ? 12 : 16,
          alignItems: 'center' // Explicit center alignment
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography 
            variant="semibold" 
            size={compact ? 18 : 20} 
            className="text-gray-900"
            style={{
              lineHeight: compact ? 22 : 24, // Match TextInput line height
              textAlignVertical: 'center' // Android alignment
            }}
          >
            {currency}
          </Typography>
        </View>
        
        <View 
          className="w-px bg-gray-300 mx-3" 
          style={{ height: compact ? 20 : 24 }} // Visual separator
        />
        
        <TextInput
          className="flex-1 text-gray-900"
          style={{
            fontFamily: 'System', // Use system font for consistency
            fontWeight: '600', // Match semibold
            fontSize: compact ? 18 : 20,
            lineHeight: compact ? 20 : 23, // Match Typography line height
            textAlignVertical: 'center', // Android alignment
            paddingVertical: 0, // Remove default TextInput padding
            margin: 0, // Remove default margins
            includeFontPadding: false, // Android: remove extra font padding
          }}
          value={amount}
          onChangeText={onAmountChange}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor={colors.gray.medium}
        />
      </View>
      
      {showQuickAmounts && (
        <View className="flex-row justify-between gap-2">
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              className={`flex-1 rounded-xl bg-gray-200 items-center ${compact ? 'py-2' : 'py-3'}`}
              onPress={() => onAmountChange(quickAmount)}
            >
              <Typography
                variant="semibold" 
                size={compact ? 12 : 14} 
                className="text-gray-600"
              >
                {currency}{quickAmount}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};