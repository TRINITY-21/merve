
// OperationalHours.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

interface OperationalHoursProps {
  agentData: IAgentData;
}

export const OperationalHours: React.FC<OperationalHoursProps> = ({ agentData }) => {
  const [hoursExpanded, setHoursExpanded] = useState<boolean>(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleHours = (): void => {
    setHoursExpanded(!hoursExpanded);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: hoursExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hoursExpanded]);

  const hoursStyle = {
    opacity: animation,
    transform: [{
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0],
      }),
    }],
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
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
    <View key={index} className="flex-row justify-between py-0 border-b border-black/6 mb-2">
      <Text className="text-xs font-bold" style={{ color: colors.text.primary }}>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </Text>
      <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
        {hours.isClosed ? 'Closed' : `${formatTime(hours.open)} - ${formatTime(hours.close)}`}
      </Text>
    </View>
  );

  return (
    <View
      className="mt-4 px-4 bg-white rounded-2xl py-4 shadow-sm shadow-black/8 elevation-8 mx-4 mb-5"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    >
      <TouchableOpacity onPress={toggleHours} className="flex-row justify-between items-center py-1.5">
        <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
          Operating Hours
        </Text>
        <Ionicons name={hoursExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.secondary} />
      </TouchableOpacity>
      <Animated.View className="mt-2 mb-20 px-0.5" style={hoursStyle}>
        {Object.entries(agentData.operatingHours).map(([day, hours], index) =>
          renderDayHours(day, hours, index)
        )}
      </Animated.View>
    </View>
  );
};
