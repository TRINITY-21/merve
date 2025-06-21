import React, { useState } from 'react';
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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
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

  const getTimeInputStyle = (inputName: string) => ({
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: focusedInput === inputName ? colors.primary : colors.gray.light,
    borderWidth: focusedInput === inputName ? 2 : 1,
    textAlign: 'center' as const,
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: 'JosefinSans_400Regular',
    // shadowColor: focusedInput === inputName ? colors.primary : colors.shadowColor,
    // shadowOffset: colors.shadowOffset,
    // shadowOpacity: focusedInput === inputName ? 0.1 : 0.05,
    // shadowRadius: focusedInput === inputName ? 4 : 2,
    // elevation: focusedInput === inputName ? 2 : 1,
  });

  return (
    <Animated.View
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.1,
        // shadowRadius: 16,
        // elevation: 8,
        borderWidth: 1,
        borderColor: colors.gray.light,
        marginTop: 10,
      }]}
    >
      <View style={{ marginBottom: 24 }}>
        <Typography variant="semibold" size={18} style={{ color: colors.text.primary, marginBottom: 8 }}>
          Operating Details
        </Typography>
        <Typography variant="regular" size={14} style={{ color: colors.text.secondary, lineHeight: 20 }}>
          When are you ready to serve? Set your business hours to help customers know when to visit.
        </Typography>
      </View>

      {/* Days Operating Hours */}
      {days.map((day) => (
        <View key={day} style={{ marginBottom: 16 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.gray.light,
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 12,
            marginBottom: 12,
            // shadowColor: colors.shadowColor,
            // shadowOffset: colors.shadowOffset,
            // shadowOpacity: 0.05,
            // shadowRadius: 4,
            // elevation: 2,
          }}>
            <Typography style={{
              flex: 1,
              fontSize: 16,
              color: colors.text.primary,
              fontWeight: '600',
              textTransform: 'capitalize' as any,
            }}>
              {day}
            </Typography>

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
                  backgroundColor: !formData.operatingHours[day].isClosed ? colors.primary : colors.gray.medium,
                  borderWidth: 1,
                  borderColor: colors.gray.light,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    // shadowColor: colors.shadowColor,
                    // shadowOpacity: 0.2,
                    // shadowRadius: 3,
                    // shadowOffset: colors.shadowOffset,
                    // elevation: 3,
                    alignSelf: !formData.operatingHours[day].isClosed ? 'flex-end' : 'flex-start',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {!formData.operatingHours[day].isClosed && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
              gap: 12,
            }}>
              <TextInput
                style={getTimeInputStyle(`${day}_open`)}
                placeholder="09:00"
                value={formData.operatingHours[day].open}
                onChangeText={(text) => updateDayTime(day, 'open', text)}
                keyboardType="numeric"
                placeholderTextColor={colors.text.secondary}
                onFocus={() => setFocusedInput(`${day}_open`)}
                onBlur={() => setFocusedInput(null)}
                maxLength={5}
              />
              <Typography style={{ fontSize: 16, color: colors.text.primary, fontWeight: '500' }}>
                to
              </Typography>
              <TextInput
                style={getTimeInputStyle(`${day}_close`)}
                placeholder="18:00"
                value={formData.operatingHours[day].close}
                onChangeText={(text) => updateDayTime(day, 'close', text)}
                keyboardType="numeric"
                placeholderTextColor={colors.text.secondary}
                onFocus={() => setFocusedInput(`${day}_close`)}
                onBlur={() => setFocusedInput(null)}
                maxLength={5}
              />
            </View>
          )}
        </View>
      ))}

      {/* Currently Open Switch */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray.light,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 8,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.05,
        // shadowRadius: 4,
        // elevation: 2,
      }}>
        <Typography style={{
          fontSize: 16,
          color: formData.isOpen ? colors.success : colors.error,
          fontWeight: '600',
        }}>
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
              backgroundColor: formData.isOpen ? colors.success : colors.gray.medium,
              borderWidth: 1,
              borderColor: colors.gray.light,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: 'white',
                shadowColor: colors.shadowColor,
                // shadowOpacity: 0.2,
                // shadowRadius: 3,
                // shadowOffset: colors.shadowOffset,
                // elevation: 3,
                alignSelf: formData.isOpen ? 'flex-end' : 'flex-start',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default OperatingDetailsStep; 