// components/AgentSettingsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentSettingsHeaderProps } from '../../../../../types/agentSettingsTypes';

const AgentSettingsHeader: React.FC<IAgentSettingsHeaderProps> = ({
  hasChanges,
  onBack,
  onReset,
  onSave,
}) => {
  return (
    <View className="shadow-lg">

        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
          <Header title="Agent Settings" 
            leftIcon={{
              name: 'chevron-left',
              onPress: onBack,
              color: colors.secondary
            }}
            rightIcons={[
              {
                name: 'refresh',
                onPress: onReset,
                color: colors.secondary
              }
            ]}
          
          />

          {hasChanges && (
            <View className="flex-row items-center justify-between bg-white/15 rounded-2xl px-4 py-2.5">
              <View className="flex-row items-center flex-1">
                <MaterialIcons name="info" size={16} color="#FF9800" />
                <Text className="text-sm text-secondary font-semibold ml-2">
                  You have unsaved changes
                </Text>
              </View>
              <TouchableOpacity 
                className="bg-success px-4 py-1.5 rounded-xl"
                onPress={onSave}
                activeOpacity={0.8}
              >
                <Text className="text-white text-xs font-bold">Save Now</Text>
              </TouchableOpacity>
            </View>
          )}
    </View>
  );
};

export default AgentSettingsHeader;