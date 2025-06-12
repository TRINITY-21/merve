import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const agentTypes: Array<'Retail' | 'Mobile' | 'Corporate'> = ['Retail', 'Mobile', 'Corporate'];

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
    <ScrollView 
      style={{ flex: 1, marginTop: 20 }}
      contentContainerStyle={{ 
        paddingBottom: 10,
        flexGrow: 1 
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View 
        className="bg-white/95 rounded-2xl p-5 mb-5 shadow-lg"
        style={[cardStyle, { 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderWidth: 1,
          borderColor: colors.primary + '30'
        }]}
      >
        <Typography variant='semibold'
          className="text-xl font-bold mb-0"
          style={{ color: colors.text.primary }}
        >
          Business Information
        </Typography>
        <Typography size={14}
          className="text-sm mb-5"
          style={{ color: colors.text.secondary }}
        >
          Showcase your business! 🚀
        </Typography>

        {/* Business Name */}
        <View 
          className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, { 
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="business" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Business Name"
            value={formData.businessName}
            onChangeText={(text) => setFormData({ ...formData, businessName: text })}
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Business Description */}
        <View 
          className="flex-row items-start rounded-xl px-4 mb-4 border"
          style={[multilineContainerStyle, { 
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons 
            name="description" 
            size={24} 
            color={colors.primary} 
            style={{ ...iconStyle, marginTop: Platform.OS === 'ios' ? 4 : 2 }}
          />
          <TextInput
            style={multilineInputStyle}
            placeholder="Business Description"
            value={formData.businessDescription}
            onChangeText={(text) => setFormData({ ...formData, businessDescription: text })}
            multiline
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Agent Type */}
        <Text 
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: colors.text.primary }}
        >
          Agent Type
        </Text>
        <View className="flex-row justify-between mb-4">
          {agentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className="flex-1 p-3 rounded-lg border-2 items-center mx-1"
              style={{
                backgroundColor: formData.agentType === type ? colors.primary : 'transparent',
                borderColor: formData.agentType === type ? colors.primary : colors.gray?.light || '#E0E0E0'
              }}
              onPress={() => setFormData({ ...formData, agentType: type })}
            >
              <Text
                className="text-sm"
                style={{
                  color: formData.agentType === type ? colors.white : colors.text.primary,
                  fontWeight: formData.agentType === type ? 'bold' : 'normal'
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Services Offered */}
        <Text 
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: colors.text.primary }}
        >
          Services Offered
        </Text>
        <FlatList
          data={servicesList}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 flex-row items-center p-2 rounded-lg border m-1"
              style={{
                backgroundColor: formData.services.includes(item.id) ? colors.primary : 'transparent',
                borderColor: formData.services.includes(item.id) ? colors.primary : colors.gray?.light || '#E0E0E0'
              }}
              onPress={() => toggleService(item.id)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={20}
                color={formData.services.includes(item.id) ? colors.white : colors.primary}
              />
              <Text
                className="ml-2 text-sm"
                style={{
                  color: formData.services.includes(item.id) ? colors.white : colors.text.primary,
                  fontWeight: formData.services.includes(item.id) ? 'bold' : 'normal'
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Supported Networks */}
        <Text 
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: colors.text.primary }}
        >
          Supported Networks
        </Text>
        {networksList.map((network) => (
          <TouchableOpacity
            key={network.id}
            className="flex-row items-center mb-2"
            onPress={() => toggleNetwork(network.id)}
          >
            <MaterialIcons
              name={
                formData.networks.includes(network.id)
                  ? 'check-box'
                  : 'check-box-outline-blank'
              }
              size={24}
              color={network.color}
            />
            <Text 
              className="ml-2 text-base"
              style={{ color: network.color }}
            >
              {network.name}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ScrollView>
  );
};

export default BusinessInfoStep;