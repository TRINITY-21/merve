import React from 'react';
import { Switch, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IFormData } from '../../../../../types/agentRegistrationTypes';

interface IOperatingDetailsStepProps {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  cardStyle: any;
}

const OperatingDetailsStep: React.FC<IOperatingDetailsStepProps> = ({
  formData,
  setFormData,
  cardStyle,
}) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const toggleDayOpen = (day: string) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...formData.operatingHours[day],
          isClosed: !formData.operatingHours[day].isClosed,
        },
      },
    });
  };

  const updateDayTime = (day: string, timeType: 'open' | 'close', value: string) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: { 
          ...formData.operatingHours[day], 
          [timeType]: value 
        },
      },
    });
  };

  return (
    <Animated.View 
      style={cardStyle}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-[#FFCC00]/30 shadow-lg"
    >
      <Text className="text-xl font-bold text-[#212121] mb-2">
        Operating Details
      </Text>
      <Text className="text-sm text-[#757575] mb-5">
        When are you ready to serve? ⏰
      </Text>

      {/* Days Operating Hours */}
      {days.map((day) => (
        <View key={day} className="mb-4">
          <View className="flex-row items-center justify-between bg-[#E0E0E0] p-3 rounded-xl mb-4 px-4">
            <Text className="flex-1 text-base text-[#212121] font-semibold capitalize">
              {day}
            </Text>
            <Switch
              value={!formData.operatingHours[day].isClosed}
              onValueChange={() => toggleDayOpen(day)}
              trackColor={{ false: '#E0E0E0', true: '#00BFA5' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {!formData.operatingHours[day].isClosed && (
            <View className="flex-row items-center ml-2">
              <TextInput
                className="w-20 p-2 rounded-lg bg-white text-[#212121] text-center mx-1 border border-[#9E9E9E]"
                placeholder="Open"
                value={formData.operatingHours[day].open}
                onChangeText={(text) => updateDayTime(day, 'open', text)}
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text className="text-base text-[#212121] mx-2">-</Text>
              <TextInput
                className="w-20 p-2 rounded-lg bg-white text-[#212121] text-center mx-1 border border-[#9E9E9E]"
                placeholder="Close"
                value={formData.operatingHours[day].close}
                onChangeText={(text) => updateDayTime(day, 'close', text)}
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
            </View>
          )}
        </View>
      ))}

      {/* Currently Open Switch */}
      <View className="flex-row items-center justify-between bg-[#E0E0E0] p-3 rounded-xl">
        <Text className="text-base text-[#212121] font-semibold">
          Currently Open
        </Text>
        <Switch
          value={formData.isOpen}
          onValueChange={() => setFormData({ ...formData, isOpen: !formData.isOpen })}
          trackColor={{ false: '#E0E0E0', true: '#00BFA5' }}
          thumbColor="#FFFFFF"
        />
      </View>
    </Animated.View>
  );
};

export default OperatingDetailsStep;