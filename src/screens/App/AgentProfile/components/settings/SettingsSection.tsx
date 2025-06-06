// components/SettingsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ISettingsSectionProps } from '../../../../../types/agentSettingsTypes';

const SettingsSection: React.FC<ISettingsSectionProps> = ({
  section,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <View className="bg-white rounded-3xl mb-4 overflow-hidden shadow-sm">
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => onToggle(section.id)}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center flex-1">
          <LinearGradient 
            colors={[section.color, section.color + '80']} 
            className="w-10 h-10 rounded-full items-center justify-center mr-4"
          >
            <MaterialIcons name={section.icon as any} size={20} color="#FFFFFF" />
          </LinearGradient>
          <Text className="text-lg font-bold text-text-primary">
            {section.title}
          </Text>
        </View>
        
        <MaterialIcons 
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={24} 
          color="#757575" 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View className="pb-2">
          {children}
        </View>
      )}
    </View>
  );
};

export default SettingsSection;