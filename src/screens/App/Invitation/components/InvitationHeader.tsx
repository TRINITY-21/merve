import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';

interface IInvitationHeaderProps {
  invitationsCount: number;
  sentInvitationsCount: number;
  selectedTab: 'received' | 'sent';
  onTabChange: (tab: 'received' | 'sent') => void;
}

const InvitationHeader: React.FC<IInvitationHeaderProps> = ({
  invitationsCount,
  sentInvitationsCount,
  selectedTab,
  onTabChange,
}) => {
  const navigation = useNavigation();

  const handleComposeInvitation = () => {
    Alert.alert('Compose New Invitation (e.g., Partnership, Follow)');
  };

  return (
    <LinearGradient
      colors={['#FFCC00', '#FFB300']}
      className={`${Platform.OS === 'ios' ? 'pt-16' : 'pt-3'} pb-5 shadow-lg`}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
      
      {/* Header Content */}
      <View className="flex-row items-center justify-between px-5 mb-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
        </TouchableOpacity>
        
        <Text className="text-2xl font-extrabold text-[#1E3A5F] text-center flex-1">
          Invitations
        </Text>
        
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          onPress={handleComposeInvitation}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add" size={24} color="#1E3A5F" />
        </TouchableOpacity>
      </View>

      {/* Tab Container */}
      <View className="flex-row justify-around px-8">
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-3 ${
            selectedTab === 'received' ? 'border-[#1E3A5F]' : 'border-transparent'
          }`}
          onPress={() => onTabChange('received')}
        >
          <Text
            className={`text-base font-semibold text-[#1E3A5F] ${
              selectedTab === 'received' ? 'opacity-100 font-extrabold' : 'opacity-70'
            }`}
          >
            Received ({invitationsCount})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-3 ${
            selectedTab === 'sent' ? 'border-[#1E3A5F]' : 'border-transparent'
          }`}
          onPress={() => onTabChange('sent')}
        >
          <Text
            className={`text-base font-semibold text-[#1E3A5F] ${
              selectedTab === 'sent' ? 'opacity-100 font-extrabold' : 'opacity-70'
            }`}
          >
            Sent ({sentInvitationsCount})
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default InvitationHeader;