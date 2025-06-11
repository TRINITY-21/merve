import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { IInvitation } from '../../../../types/invitationTypes';

interface IInvitationCardProps {
  item: IInvitation;
  onAccept: (id: string, type: string) => void;
  onDecline: (id: string, type: string) => void;
  onCancel: (id: string, type: string) => void;
}

const InvitationCard: React.FC<IInvitationCardProps> = ({
  item,
  onAccept,
  onDecline,
  onCancel,
}) => {
  const isReceived = item.type.startsWith('received_');
  const isPending = item.status === 'pending';
  const isFollowInvite = item.type.includes('_follow_');


  const getStatusColor = () => {
    switch (item.status) {
      case 'accepted':
        return 'bg-[#4CAF50]';
      case 'declined':
      case 'cancelled':
        return 'bg-[#F44336]';
      default:
        return 'bg-[#FF9800]';
    }
  };

  const getIcon = () => {
    if (isFollowInvite) return 'person-add';
    if (!isReceived) return 'send';
    return 'mail';
  };

  const getIconColor = () => {
    if (isFollowInvite) return '#00BFA5';
    if (!isReceived) return '#1E3A5F';
    return '#FFCC00';
  };

  const statusText = item.status.charAt(0).toUpperCase() + item.status.slice(1);

  const renderDetailsSection = () => {
    if (!item.details || Object.keys(item.details).length === 0) return null;

    return (
      <View className="bg-[#F5F5F5] rounded-lg p-3 mb-4">
        {Object.entries(item.details).map(([key, value]) => (
          <View key={key} className="flex-row mb-1.5">
            <Typography variant='regular' size={13} className="text-xs font-semibold text-[#212121] mr-2">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
            </Typography>
            <Typography variant='regular' size={11} className="flex-1 text-xs text-[#757575]">
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </Typography>
          </View>
        ))}
      </View>
    );
  };

  const renderActionButtons = () => {
    if (isReceived && isPending) {
      return (
        <View className="flex-row justify-around mt-2 gap-2">
          <TouchableOpacity
            className="flex-row items-center justify-center py-2.5 rounded-full flex-1 bg-[#4CAF50] shadow-sm"
            onPress={() => onAccept(item.id, item.type)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
            <Typography className="text-white text-sm font-bold ml-2">
              {isFollowInvite ? 'Accept Follow' : 'Accept'}
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center justify-center py-2.5 rounded-full flex-1 bg-[#F44336] shadow-sm"
            onPress={() => onDecline(item.id, item.type)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="cancel" size={20} color="#FFFFFF" />
            <Typography className="text-white text-sm font-bold ml-2">
              {isFollowInvite ? 'Decline Follow' : 'Decline'}
            </Typography>
          </TouchableOpacity>
        </View>
      );
    }

    if (!isReceived && isPending) {
      return (
        <View className="flex-row justify-around mt-2">
          <TouchableOpacity
            className="flex-row items-center justify-center py-2.5 rounded-full flex-1 bg-[#FF9800] shadow-sm"
            onPress={() => onCancel(item.id, item.type)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="close" size={20} color="#FFFFFF" />
            <Typography className="text-white text-sm font-bold ml-2">
              {isFollowInvite ? 'Cancel Request' : 'Cancel Invite'}
            </Typography>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      {/* Card Header */}
      <View className="flex-row items-center mb-3">
        <MaterialIcons
          name={getIcon()}
          size={24}
          color={getIconColor()}
        />
        
        <View className="flex-1 ml-3">
          <Typography className="text-lg font-bold text-[#212121] mb-1">
            {item.title}
          </Typography>
          <Typography variant='regular' size={12} className="text-xs text-[#757575]">
            {isReceived 
              ? `From ${item.sender} (${item.senderType})` 
              : `To ${item.recipient} (${item.recipientType})`
            }
          </Typography>
        </View>
        
        <View className={`px-2.5 py-1.5 rounded-lg ${getStatusColor()}`}>
          <Typography size={12} className="text-white text-xs font-bold">
            {statusText}
          </Typography>
        </View>
      </View>

      {/* Message */}
      <Typography size={13} className="text-sm text-[#757575] mb-3 leading-5">
        {item.message}
      </Typography>

      {/* Date */}
      <Typography size={12} className="text-xs text-[#9E9E9E] mb-4 text-right">
        {item.date}
      </Typography>

      {/* Details Section */}
      {renderDetailsSection()}

      {/* Action Buttons */}
      {renderActionButtons()}
    </View>
  );
};

export default InvitationCard;