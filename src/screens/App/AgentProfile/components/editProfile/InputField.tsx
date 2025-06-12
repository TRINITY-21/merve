// components/InputField.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { IInputFieldProps } from '../../../../../types/editProfileTypes';

export const InputField: React.FC<IInputFieldProps> = ({
  label,
  fieldKey,
  value,
  options = {},
  inputRefs,
  onInputChange,
  onFocusNextInput,
}) => {
  const stringValue = typeof value === 'boolean' ? value.toString() : value;

  return (
    <View className="mb-4">
      <Typography variant="regular" size={14} className="text-sm font-semibold text-gray-800 mb-2">
        {label}
        {options.required && <Text className="text-red-500"> *</Text>}
      </Typography>
      <View className="flex-row items-center bg-gray-200 rounded-xl px-4 border border-gray-200"
        style={{ 
          paddingVertical: Platform.OS === 'ios' ? 16 : 12,
          minHeight: Platform.OS === 'ios' ? 52 : 48
        }}
      >
        {options.icon && (
          <MaterialIcons 
            name={options.icon as any} 
            size={20} 
            color="#00BFA5"
            style={{ 
              marginRight: 12,
              marginTop: Platform.OS === 'ios' ? 0 : -1
            }}
          />
        )}
        <TextInput
          ref={ref => inputRefs.current[fieldKey] = ref as any}
          style={{
            flex: 1,
            fontSize: 15, // Change this value for different sizes
            fontFamily: Platform.OS === 'ios' ? 'Josefin Sans' : 'Josefin Sans', // Change font family here
            fontWeight: '400', // Adjust weight: '300', '400', '500', '600', '700'
            color: '#1F2937',
            paddingVertical: 0,
            lineHeight: Platform.OS === 'ios' ? 17 : 17, // Adjust lineHeight when changing fontSize
            includeFontPadding: false,
            textAlignVertical: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : -1
          }}
          value={stringValue}
          onChangeText={(newValue) => onInputChange(fieldKey, newValue)}
          placeholder={options.placeholder || `Enter ${label.toLowerCase()}`}
          placeholderTextColor="#9E9E9E"
          keyboardType={options.keyboardType || 'default'}
          autoCapitalize={options.autoCapitalize || 'words'}
          returnKeyType="next"
          onSubmitEditing={() => options.nextField && onFocusNextInput(options.nextField)}
          multiline={options.multiline}
          numberOfLines={options.numberOfLines || 1}
          maxLength={options.maxLength}
        />
      </View>
    </View>
  );
};