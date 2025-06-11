import React, { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { IInvitation } from '../../../types/invitationTypes';
import { InviteModal } from '../AgentProfile/components/profile/AgentInviteModal';
import InvitationCard from './components/InvitaionCard';
import EmptyState from './components/InvitationEmptyState';
import InvitationHeader from './components/InvitationHeader';

const InvitationsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'received' | 'sent'>('received');
  const [invitePhone, setInvitePhone] = useState<string>('');
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [inviteMessage, setInviteMessage] = useState<string>('');

      const handleComposeInvitation = (): void => {
      if (!invitePhone.trim()) {
        Alert.alert('Error', 'Please enter a phone number');
        return;
      }
      Alert.alert(
        'Invite Sent!',
        `Invitation sent to ${invitePhone}`,
        [{
          text: 'OK', onPress: () => {
            setShowInviteModal(false);
            setInvitePhone('');
            setInviteMessage('');
          }
        }]
      );
    };

  // Sample data for invitations
  const [invitations, setInvitations] = useState<IInvitation[]>([
    {
      id: '1',
      type: 'received_partnership',
      sender: 'MTN Ghana',
      senderType: 'Organization',
      title: 'Partnership Program Invitation',
      message: 'You have been invited to join the exclusive MTN Agent Partnership Program. Accept to unlock new benefits and higher commissions.',
      date: '2025-05-20',
      status: 'pending',
      details: {
        programName: 'MTN Agent Elite Partnership',
        benefits: ['Higher Commissions', 'Dedicated Support', 'Marketing Materials'],
        deadline: '2025-06-15',
        contactPerson: 'Sarah Mensah',
        contactEmail: 'sarah.mensah@mtn.com'
      }
    },
    {
      id: '2',
      type: 'received_network',
      sender: 'Alex Johnson',
      senderType: 'Agent',
      title: 'Join My Network',
      message: 'Alex Johnson has invited you to join their agent network for collaborative services.',
      date: '2025-05-18',
      status: 'pending',
      details: {
        networkName: 'Accra Mobile Money Hub',
        networkDescription: 'A network of trusted mobile money agents in Accra.',
        benefits: ['Referral Bonuses', 'Shared Customer Base', 'Community Support'],
        agentCode: 'AJ-MOMO-789',
        location: 'Accra Central'
      }
    },
    {
      id: '3',
      type: 'received_partnership',
      sender: 'Ghana Commercial Bank',
      senderType: 'Bank',
      title: 'Agent Banking Opportunity',
      message: 'Opportunity to become a GCB Agent for cash services.',
      date: '2025-05-10',
      status: 'accepted',
      details: {
        programName: 'GCB Agent Connect',
        benefits: ['New Revenue Stream', 'Bank Endorsement', 'Training'],
        onboardingDate: '2025-06-01'
      }
    },
    {
      id: '4',
      type: 'received_partnership',
      sender: 'Vodafone Cash',
      senderType: 'Organization',
      title: 'New Service Integration',
      message: 'Vodafone Cash invites you to integrate their new bill payment service.',
      date: '2025-05-05',
      status: 'declined',
      details: {
        serviceName: 'Vodafone Bill Pay',
        commissionRate: '0.4%',
        integrationProcess: 'API Integration'
      }
    },
    {
      id: '5',
      type: 'received_follow_user',
      sender: 'Aisha Rahman',
      senderType: 'User',
      title: 'Follow Request',
      message: 'Aisha Rahman wants to follow your activity and get updates.',
      date: '2025-05-24',
      status: 'pending',
      details: {
        userId: 'user_aisha',
        reason: 'I enjoy your content and want to stay updated!'
      }
    },
    {
      id: '6',
      type: 'received_follow_agent',
      sender: 'Kojo Appiah',
      senderType: 'Agent',
      title: 'Follow Request (Agent)',
      message: 'Kojo Appiah (Mobile Money Agent) wants to follow your public updates and services.',
      date: '2025-05-23',
      status: 'pending',
      details: {
        agentId: 'agent_kojo',
        businessName: 'Kojo\'s Quick Cash',
        location: 'Kumasi',
        reason: 'I want to stay informed about your latest offers.'
      }
    },
    {
      id: '7',
      type: 'received_follow_user',
      sender: 'David Boakye',
      senderType: 'User',
      title: 'Follow Request',
      message: 'David Boakye has accepted your follow request.',
      date: '2025-05-21',
      status: 'accepted',
      details: {
        userId: 'user_david',
      }
    }
  ]);

  const [sentInvitations, setSentInvitations] = useState<IInvitation[]>([
    {
      id: 's1',
      type: 'sent_collaboration',
      recipient: 'Grace Adom',
      recipientType: 'Agent',
      title: 'Team Collaboration Invite',
      message: 'You invited Grace Adom to collaborate on large transactions.',
      date: '2025-05-22',
      status: 'pending',
      details: {
        project: 'Large Transaction Facilitation',
        expectedVolume: 'GH₵ 50,000+',
        deadline: 'N/A'
      }
    },
    {
      id: 's2',
      type: 'sent_partnership_proposal',
      recipient: 'Smart Solutions Ltd.',
      recipientType: 'Business',
      title: 'Service Partnership Proposal',
      message: 'You proposed a partnership to offer joint services.',
      date: '2025-05-19',
      status: 'accepted',
      details: {
        service: 'Utility Bill Collection',
        revenueShare: '10%'
      }
    },
    {
      id: 's3',
      type: 'sent_follow_user',
      recipient: 'Kwame Nkrumah',
      recipientType: 'User',
      title: 'Follow Request Sent',
      message: 'You sent a follow request to Kwame Nkrumah.',
      date: '2025-05-25',
      status: 'pending',
      details: {
        userId: 'user_kwame',
      }
    },
    {
      id: 's4',
      type: 'sent_follow_agent',
      recipient: 'Best Agents Hub',
      recipientType: 'Agent',
      title: 'Follow Request Sent (Agent)',
      message: 'You sent a follow request to Best Agents Hub (Agent Profile).',
      date: '2025-05-24',
      status: 'declined',
      details: {
        agentId: 'agent_best',
        businessName: 'Best Agents Hub',
      }
    }
  ]);

  const handleAccept = (id: string, type: string) => {
    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, status: 'accepted' as const } : inv
    ));
    
    if (type === 'received_follow_user' || type === 'received_follow_agent') {
      Alert.alert('Follow Request Accepted! You are now connected.');
    } else {
      Alert.alert('Invitation Accepted!');
    }
  };

  const handleDecline = (id: string, type: string) => {
    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, status: 'declined' as const } : inv
    ));
    
    if (type === 'received_follow_user' || type === 'received_follow_agent') {
      Alert.alert('Follow Request Declined.');
    } else {
      Alert.alert('Invitation Declined!');
    }
  };

  const handleCancelSent = (id: string, type: string) => {
    setSentInvitations(sentInvitations.map(inv =>
      inv.id === id ? { ...inv, status: 'cancelled' as const } : inv
    ));
    
    if (type === 'sent_follow_user' || type === 'sent_follow_agent') {
      Alert.alert('Follow Request Cancelled!');
    } else {
      Alert.alert('Sent Invitation Cancelled!');
    }
  };

  const currentData = selectedTab === 'received' ? invitations : sentInvitations;

  const renderInvitationCard = ({ item }: { item: IInvitation }) => (
    <InvitationCard
      item={item}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onCancel={handleCancelSent}
    />
  );



  return (
    <View className="flex-1 bg-background">
      <InvitationHeader
        invitationsCount={invitations.length}
        sentInvitationsCount={sentInvitations.length}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        setShowInviteModal={() => setShowInviteModal(true)}
      />

      <FlatList
        data={currentData}
        renderItem={renderInvitationCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyState selectedTab={selectedTab} />}
      />

        <InviteModal
                visible={showInviteModal}
                invitePhone={invitePhone}
                inviteMessage={inviteMessage}
                setInvitePhone={setInvitePhone}
                setInviteMessage={setInviteMessage}
                onClose={() => setShowInviteModal(false)}
                onSend={handleComposeInvitation}
              />
    </View>
  );
};

export default InvitationsScreen;