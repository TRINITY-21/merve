import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

interface IEmptyStateProps {
  selectedTab: 'received' | 'sent';
}

const EmptyState: React.FC<IEmptyStateProps> = ({ selectedTab }) => {
  const handleComposeInvitation = () => {
    Alert.alert('Compose New Invitation');
  };

  const isReceived = selectedTab === 'received';

  return (
    <View className="flex-1 items-center justify-center py-12 px-5">
      <MaterialIcons name="inbox" size={60} color="#9E9E9E" />
      
      <Text className="text-lg font-bold text-[#212121] mt-5 mb-2 text-center">
        {isReceived ? "No invitations received yet." : "No invitations sent yet."}
      </Text>
      
      <Text className="text-sm text-[#757575] text-center mb-5">
        {isReceived 
          ? "Check back later or explore partnership opportunities." 
          : "Start by inviting partners, clients, or followers."
        }
      </Text>
      
      <TouchableOpacity
        className="flex-row items-center bg-[#00BFA5] px-5 py-3 rounded-full shadow-md mt-5"
        onPress={handleComposeInvitation}
        activeOpacity={0.8}
      >
        <MaterialIcons name="create" size={20} color="#FFFFFF" />
        <Text className="text-white text-base font-bold ml-2">
          Compose New Invite
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;