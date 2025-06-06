// components/InputField.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';
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
      <Text className="text-sm font-semibold text-gray-800 mb-2">
        {label}
        {options.required && <Text className="text-red-500"> *</Text>}
      </Text>
      <View className="flex-row items-center bg-gray-200 rounded-xl px-4 py-3 border border-gray-200">
        {options.icon && (
          <MaterialIcons 
            name={options.icon as any} 
            size={20} 
            color="#00BFA5" 
            className="mr-3" 
          />
        )}
        <TextInput
          ref={ref => inputRefs.current[fieldKey] = ref}
          className={`flex-1 text-base text-gray-800 font-medium ${options.icon ? 'ml-0' : ''}`}
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