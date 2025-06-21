import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
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
  const [showPicker, setShowPicker] = useState(false);
  const [pickerConfig, setPickerConfig] = useState<{ day: string, type: 'open' | 'close' } | null>(null);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const showTimePicker = (day: string, type: 'open' | 'close') => {
    setPickerConfig({ day, type });
    setShowPicker(true);
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate && pickerConfig) {
      const { day, type } = pickerConfig;
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const newTime = `${hours}:${minutes}`;
      updateDayTime(day, type, newTime);
    }
    setPickerConfig(null);
  };

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
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
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
              <TouchableOpacity onPress={() => showTimePicker(day, 'open')} style={{
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.gray.light,
                  backgroundColor: colors.white
              }}>
                <Typography>{formData.operatingHours[day].open || 'Open'}</Typography>
              </TouchableOpacity>
              <Typography style={{ fontSize: 16, color: colors.text.primary, fontWeight: '500' }}>
                to
              </Typography>
              <TouchableOpacity onPress={() => showTimePicker(day, 'close')} style={{
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.gray.light,
                  backgroundColor: colors.white
              }}>
                <Typography>{formData.operatingHours[day].close || 'Close'}</Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray.light,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 8,
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
                alignSelf: formData.isOpen ? 'flex-end' : 'flex-start',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {showPicker && pickerConfig && (
        <DateTimePicker
          value={new Date()} // This will be updated to reflect the actual time
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </Animated.View>
  );
};

export default OperatingDetailsStep; 