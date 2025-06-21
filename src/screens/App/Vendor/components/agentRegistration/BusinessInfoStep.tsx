import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IFormData, INetwork, IService } from '../../../../../types/agentRegistrationTypes';

interface IBusinessInfoStepProps {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  cardStyle: any;
}

const servicesList: IService[] = [
  { id: 'cash_in', name: 'Cash In', icon: 'file-download' },
  { id: 'cash_out', name: 'Cash Out', icon: 'file-upload' },
  { id: 'bill_payment', name: 'Bill Payment', icon: 'payment' },
  { id: 'airtime', name: 'Airtime Top-Up', icon: 'phone' },
  { id: 'money_transfer', name: 'Money Transfer', icon: 'swap-horiz' },
];

const networksList: INetwork[] = [
  { id: 'mtn', name: 'MTN Mobile Money', color: colors.primary },
  { id: 'vodafone', name: 'Vodafone Cash', color: colors.accent },
  { id: 'airteltigo', name: 'AirtelTigo Money', color: colors.primary },
];

const BusinessInfoStep: React.FC<IBusinessInfoStepProps> = ({
  formData,
  setFormData,
  cardStyle,
}) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const inputStyle = {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 0,
    lineHeight: Platform.OS === 'ios' ? 20 : 18,
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    marginLeft: 8,
    fontFamily: 'JosefinSans_400Regular',
  };

  const multilineInputStyle = {
    ...inputStyle,
    textAlignVertical: 'top' as const,
    minHeight: 80,
    marginTop: Platform.OS === 'ios' ? 4 : 2,
  };

  const iconStyle = {
    marginTop: Platform.OS === 'ios' ? 0 : -1
  };

  const containerStyle = {
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    minHeight: Platform.OS === 'ios' ? 52 : 48
  };

  const multilineContainerStyle = {
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    minHeight: 100,
  };

  const getInputContainerStyle = (inputName: string) => ({
    ...containerStyle,
    backgroundColor: colors.white,
    borderColor: focusedInput === inputName ? colors.primary : colors.gray.light,
    borderWidth: focusedInput === inputName ? 2 : 1,
    // shadowColor: focusedInput === inputName ? colors.primary : colors.shadowColor,
    // shadowOffset: colors.shadowOffset,
    // shadowOpacity: focusedInput === inputName ? 0.1 : 0.05,
    // shadowRadius: focusedInput === inputName ? 8 : 4,
    // elevation: focusedInput === inputName ? 4 : 2,
  });

  const getMultilineContainerStyle = (inputName: string) => ({
    ...multilineContainerStyle,
    backgroundColor: colors.white,
    borderColor: focusedInput === inputName ? colors.primary : colors.gray.light,
    borderWidth: focusedInput === inputName ? 2 : 1,
    // shadowColor: focusedInput === inputName ? colors.primary : colors.shadowColor,
    // shadowOffset: colors.shadowOffset,
    // shadowOpacity: focusedInput === inputName ? 0.1 : 0.05,
    // shadowRadius: focusedInput === inputName ? 8 : 4,
    // elevation: focusedInput === inputName ? 4 : 2,
  });

  const toggleService = (serviceId: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(serviceId)
        ? formData.services.filter((id) => id !== serviceId)
        : [...formData.services, serviceId],
    });
  };

  const toggleNetwork = (networkId: string) => {
    setFormData({
      ...formData,
      networks: formData.networks.includes(networkId)
        ? formData.networks.filter((id) => id !== networkId)
        : [...formData.networks, networkId],
    });
  };

  return (
    <Animated.View
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        // marginBottom: 20,
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
        <Typography variant='semibold'
          className="text-xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Business Information
        </Typography>
        <Typography size={14}
          className="text-sm"
          style={{ color: colors.text.secondary, lineHeight: 20 }}
        >
          Showcase your business! Tell us about your operations and services.
        </Typography>
      </View>

      {/* Business Name */}
      <View 
        className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('businessName')}
      >
        <MaterialIcons name="business" size={24} color={focusedInput === 'businessName' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Business Name"
          value={formData.businessName}
          onChangeText={(text) => setFormData({ ...formData, businessName: text })}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('businessName')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="words"
        />
      </View>

      {/* Business Description */}
      <View 
        className="flex-row items-start rounded-xl px-4 mb-4 border"
        style={getMultilineContainerStyle('businessDescription')}
      >
        <MaterialIcons 
          name="description" 
          size={24} 
          color={focusedInput === 'businessDescription' ? colors.primary : colors.text.secondary} 
          style={{ ...iconStyle, marginTop: Platform.OS === 'ios' ? 4 : 2 }}
        />
        <TextInput
          style={multilineInputStyle}
          placeholder="Describe your business and what makes it unique..."
          value={formData.businessDescription}
          onChangeText={(text) => setFormData({ ...formData, businessDescription: text })}
          multiline
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('businessDescription')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="sentences"
        />
      </View>

      {/* Services Offered */}
      <View style={{ marginBottom: 20 }}>
        <Typography variant="semibold" style={{ color: colors.text.primary, fontSize: 16, marginBottom: 12 }}>
          Services Offered
        </Typography>
        <FlatList
          data={servicesList}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 p-3 rounded-xl border items-center m-1"
              style={{
                backgroundColor: formData.services.includes(item.id) ? colors.primary : colors.white,
                borderColor: formData.services.includes(item.id) ? colors.primary : colors.gray.light,
                // shadowColor: colors.shadowColor,
                // shadowOffset: colors.shadowOffset,
                // shadowOpacity: formData.services.includes(item.id) ? 0.2 : 0.05,
                // shadowRadius: formData.services.includes(item.id) ? 8 : 4,
                // elevation: formData.services.includes(item.id) ? 4 : 2,
              }}
              onPress={() => toggleService(item.id)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={formData.services.includes(item.id) ? colors.white : colors.text.secondary}
                style={{ marginBottom: 8 }}
              />
              <Typography
                variant={formData.services.includes(item.id) ? "semibold" : "regular"}
                style={{
                  color: formData.services.includes(item.id) ? colors.white : colors.text.primary,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {item.name}
              </Typography>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Networks Supported */}
      <View style={{ marginBottom: 20 }}>
        <Typography variant="semibold" style={{ color: colors.text.primary, fontSize: 16, marginBottom: 12 }}>
          Networks Supported
        </Typography>
        <FlatList
          data={networksList}
          numColumns={1}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center p-3 rounded-xl border m-1"
              style={{
                backgroundColor: formData.networks.includes(item.id) ? colors.primary : colors.white,
                borderColor: formData.networks.includes(item.id) ? colors.primary : colors.gray.light,
                // shadowColor: colors.shadowColor,
                // shadowOffset: colors.shadowOffset,
                // shadowOpacity: formData.networks.includes(item.id) ? 0.2 : 0.05,
                // shadowRadius: formData.networks.includes(item.id) ? 8 : 4,
                // elevation: formData.networks.includes(item.id) ? 4 : 2,
              }}
              onPress={() => toggleNetwork(item.id)}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: formData.networks.includes(item.id) ? colors.white : item.color,
                  marginRight: 12,
                }}
              />
              <Typography
                variant={formData.networks.includes(item.id) ? "semibold" : "regular"}
                style={{
                  color: formData.networks.includes(item.id) ? colors.white : colors.text.primary,
                  fontSize: 14,
                }}
              >
                {item.name}
              </Typography>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

    </Animated.View>
  );
};

export default BusinessInfoStep;