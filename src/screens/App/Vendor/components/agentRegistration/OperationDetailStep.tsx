import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
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
      style={[cardStyle, { marginTop: 20 }]}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-primary/30 shadow-lg"
    >
      <Typography variant="semibold" size={18} className=" text-[#212121] mb-2">
        Operating Details
      </Typography>
      <Typography variant="regular" size={14} className="text-sm text-[#757575] mb-5">
        When are you ready to serve? ⏰
      </Typography>

      {/* Days Operating Hours */}
      {days.map((day) => (
        <View key={day} className="mb-4">
          <View className="flex-row items-center justify-between bg-[#E0E0E0] p-3 rounded-xl mb-4 px-4">
            <Typography className="flex-1 text-base text-[#212121] font-semibold capitalize">
              {day}
            </Typography>
            {/* <Switch
              value={!formData.operatingHours[day].isClosed}
              onValueChange={() => toggleDayOpen(day)}
              trackColor={{ false: '#E0E0E0', true: '#00BFA5' }}
              thumbColor="#FFFFFF"
            /> */}



            <TouchableOpacity
              onPress={() => toggleDayOpen(day)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 56,
                  height: 32,
                  borderRadius: 16,
                  padding: 4,
                  justifyContent: 'center',
                  backgroundColor: !formData.operatingHours[day].isClosed ? colors.accent : colors.white,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 3,
                    alignSelf: !formData.operatingHours[day].isClosed ? 'flex-end' : 'flex-start',
                  }}
                />
              </View>
            </TouchableOpacity>


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
              <Typography className="text-base text-[#212121] mx-2">-</Typography>
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
        <Typography className={`text-base ${formData.isOpen ? 'text-primary' : 'text-error'} font-semibold`}>
          {formData.isOpen ? 'Currently Open' : 'Currently Closed'}
        </Typography>



        <TouchableOpacity
          onPress={() => setFormData({ ...formData, isOpen: !formData.isOpen })}
          activeOpacity={0.7}
        >
          <View
            style={{
              width: 56,
              height: 32,
              borderRadius: 16,
              padding: 4,
              justifyContent: 'center',
              backgroundColor: formData.isOpen ? colors.accent : colors.white,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 1 },
                elevation: 3,
                alignSelf: formData.isOpen ? 'flex-end' : 'flex-start',
              }}
            />
          </View>
        </TouchableOpacity>



        {/* <Switch 
          value={formData.isOpen}
          onValueChange={() => setFormData({ ...formData, isOpen: !formData.isOpen })}
          trackColor={{ false: '#E0E0E0', true: '#00BFA5' }}
          thumbColor="#FFFFFF"
        /> */}
      </View>
    </Animated.View>
  );
};

export default OperatingDetailsStep; 