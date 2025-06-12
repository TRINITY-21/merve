// components/SettingsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
        <View className="flex-row items-center flex-1 gap-2">
  
            <MaterialIcons className='mb-1' name={section.icon as any} size={20} color={section.color} />
          <Typography className="text-lg font-bold text-text-primary">
            {section.title}
          </Typography>
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