import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Header, Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';

interface IUserInvitationHeaderProps {
  invitationsCount: number;
  sentInvitationsCount: number;
  selectedTab: 'received' | 'sent';
  onTabChange: (tab: 'received' | 'sent') => void;
  setShowInviteModal: (boolean: boolean) => void;
}

const UserInvitationHeader: React.FC<IUserInvitationHeaderProps> = ({
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
        />

        <View className="flex-row items-center justify-between px-5 py-2 bg-primary/10">
         <Typography variant="light" size={16} className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
             You have {invitationsCount} invitations
          </Typography>
        </View>

    </View>  
  );
};

export default UserInvitationHeader;