import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
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
  { id: 'mtn', name: 'MTN Mobile Money', color: '#FFCC00' },
  { id: 'vodafone', name: 'Vodafone Cash', color: '#E60000' },
  { id: 'airteltigo', name: 'AirtelTigo Money', color: '#FF0066' },
];

const BusinessInfoStep: React.FC<IBusinessInfoStepProps> = ({
  formData,
  setFormData,
  cardStyle,
}) => {
  const agentTypes: Array<'Retail' | 'Mobile' | 'Corporate'> = ['Retail', 'Mobile', 'Corporate'];

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
      style={cardStyle}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-[#FFCC00]/30 shadow-lg"
    >
      <Text className="text-xl font-bold text-[#212121] mb-2">
        Business Information
      </Text>
      <Text className="text-sm text-[#757575] mb-5">
        Showcase your business! 🚀
      </Text>

      {/* Business Name */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="business" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Business Name"
          value={formData.businessName}
          onChangeText={(text) => setFormData({ ...formData, businessName: text })}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Business Description */}
      <View className="flex-row items-start bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="description" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121] h-20"
          placeholder="Business Description"
          value={formData.businessDescription}
          onChangeText={(text) => setFormData({ ...formData, businessDescription: text })}
          multiline
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Agent Type */}
      <Text className="text-lg font-semibold text-[#212121] mb-2 mt-4">
        Agent Type
      </Text>
      <View className="flex-row justify-between mb-4">
        {agentTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className={`flex-1 p-3 rounded-lg border-2 items-center mx-1 ${
              formData.agentType === type 
                ? 'bg-[#FFCC00] border-[#FFCC00]' 
                : 'border-[#E0E0E0]'
            }`}
            onPress={() => setFormData({ ...formData, agentType: type })}
          >
            <Text
              className={`text-sm ${
                formData.agentType === type 
                  ? 'text-white font-bold' 
                  : 'text-[#212121]'
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Services Offered */}
      <Text className="text-lg font-semibold text-[#212121] mb-2 mt-4">
        Services Offered
      </Text>
      <FlatList
        data={servicesList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-1 flex-row items-center p-2 rounded-lg border m-1 ${
              formData.services.includes(item.id)
                ? 'bg-[#FFCC00] border-[#FFCC00]'
                : 'border-[#E0E0E0]'
            }`}
            onPress={() => toggleService(item.id)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={20}
              color={formData.services.includes(item.id) ? '#FFFFFF' : '#00BFA5'}
            />
            <Text
              className={`ml-2 text-sm ${
                formData.services.includes(item.id) 
                  ? 'text-white font-bold' 
                  : 'text-[#212121]'
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Supported Networks */}
      <Text className="text-lg font-semibold text-[#212121] mb-2 mt-4">
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
            className="ml-2 text-base text-[#212121]"
            style={{ color: network.color }}
          >
            {network.name}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default BusinessInfoStep;