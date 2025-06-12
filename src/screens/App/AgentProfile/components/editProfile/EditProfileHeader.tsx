// components/Header.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  View
} from 'react-native';
import { Header, Typography } from '../../../../../components/common';
import { IHeaderProps } from '../../../../../types/editProfileTypes';

export const EditProfileHeader: React.FC<IHeaderProps> = ({
  loading,
  hasChanges,
  onCancel,
  onSave,
  headerScaleAnim,
}) => {
  return (
    <Animated.View 
      className="shadow-lg shadow-black/30 z-10 pb-0.5"
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        transform: [{ scale: headerScaleAnim }]
      }}
    >

        <View className="px-5">
              <Header title="Edit Agent Info" 
                leftIcon={{
                  name: 'chevron-left',
                  onPress: onCancel,
                }}
                rightIcons={[
                  {
                    name: loading ? 'hourglass-empty' : 'check',
                    onPress: onSave,
                  }
                ]}
              />


          {hasChanges && (
            <View className="flex-row items-center justify-center mt-3 bg-white/15 rounded-2xl px-3 py-1.5 gap-1.5">
              <MaterialIcons name="info" size={16} color="#FF9800" />
              <Typography variant='regular' size={12} className="text-xs text-[#1E3A5F] font-semibold">
                You have unsaved changes 
              </Typography>
            </View>
          )}
        </View>
    </Animated.View>
  );
};