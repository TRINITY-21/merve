import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../../components/common';

interface IInvitationHeaderProps {
  invitationsCount: number;
  sentInvitationsCount: number;
  selectedTab: 'received' | 'sent';
  onTabChange: (tab: 'received' | 'sent') => void;
  setShowInviteModal: (boolean: boolean) => void;
}

const InvitationHeader: React.FC<IInvitationHeaderProps> = ({
  invitationsCount,
  sentInvitationsCount,
  selectedTab,
  onTabChange,
  setShowInviteModal,
}) => {
  const navigation = useNavigation();

  const handleComposeInvitation = () => {
    // Alert.alert('Compose New Invitation (e.g., Partnership, Follow)');
    setShowInviteModal(true);
  };

  return (
    <View>
      {/* Header */}
      
     <Header title='Invitations'
        leftIcon={{
          name: 'chevron-left',
          onPress: () => navigation.goBack(),
        }}

        rightIcons={[
          {
            name: 'add',
            onPress: handleComposeInvitation,
            
          },
          
        ]}
        />

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
            Declined ({invitationsCount})
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
    </View>
  );
};

export default InvitationHeader;