
// OperationalHours.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { JSX, useRef, useState } from 'react';
import { Animated, LayoutAnimation, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

interface OperationalHoursProps {
  agentData: IAgentData;
}

export const OperationalHours: React.FC<OperationalHoursProps> = ({ agentData }) => {
  const [hoursExpanded, setHoursExpanded] = useState<boolean>(false);
  const animation = useRef(new Animated.Value(0)).current;



  const toggleHours = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHoursExpanded(!hoursExpanded);
  };


  const formatTime = (time: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  const renderDayHours = (day: string, hours: any, index: number): JSX.Element => (
    <View key={index} className="flex-row justify-between py-1.5 border-b border-black/6 mb-2">
      <Typography variant="semibold" size={14} style={{ color: colors.text.primary }}>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </Typography>
      <Typography variant="regular" size={14} className="" style={{ color: colors.text.secondary }}>
        {hours.isClosed ? 'Closed' : `${formatTime(hours.open)} - ${formatTime(hours.close)}`}
      </Typography>
    </View>
  );

  return (
    <View
      className="mt-4 px-4 bg-white rounded-2xl py-4 shadow-sm shadow-black/8 elevation-8 mx-4 mb-5"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    >
      <TouchableOpacity onPress={toggleHours} className="flex-row justify-between items-center py-1.5">
      <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
          Operating Hours
        </Typography>
        <Ionicons name={hoursExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.secondary} />
      </TouchableOpacity>

      {hoursExpanded && (
        <View className="mt-2 mb-2 px-0.5">
          {Object.entries(agentData.operatingHours).map(([day, hours], index) =>
            renderDayHours(day, hours, index)
          )}
        </View>
      )}
    </View>
  );
};
