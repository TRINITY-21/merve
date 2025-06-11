// InviteModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';

interface InviteModalProps {
  visible: boolean;
  invitePhone: string;
  inviteMessage: string;
  setInvitePhone: (value: string) => void;
  setInviteMessage: (value: string) => void;
  onClose: () => void;
  onSend: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  visible,
  invitePhone,
  inviteMessage,
  setInvitePhone,
  setInviteMessage,
  onClose,
  onSend
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View className="flex-1 bg-black/60 justify-end">
      <View
        className="bg-white rounded-t-3xl p-6"
        style={{ minHeight: 280 }}
      >
        <View className="flex-row justify-between items-center mb-5">
          <Typography variant='semibold' size={18} className="text-lg font-extrabold" style={{ color: colors.text.primary }}>
            Send Invite
          </Typography>
          <TouchableOpacity
            onPress={onClose}
            className="p-1.5 rounded-xl bg-gray-100"
          >
            <MaterialIcons name="close" size={24} color={colors.gray.dark} />
          </TouchableOpacity>
        </View>

        <TextInput
          className="border border-black/10 rounded-2xl p-4 text-base mb-4 bg-gray-50 font-medium"
          placeholder="Phone Number"
          value={invitePhone}
          onChangeText={setInvitePhone}
          keyboardType="phone-pad"
        />

        <TextInput
          className="border border-black/10 rounded-2xl p-4 text-base mb-4 bg-gray-50 font-medium h-25"
          placeholder="Personal message (optional)"
          value={inviteMessage}
          onChangeText={setInviteMessage}
          multiline
          numberOfLines={3}
          style={{ textAlignVertical: 'top' }}
        />

        <TouchableOpacity
          className="rounded-2xl p-4 items-center mt-2 shadow-sm elevation-8"
          style={{ backgroundColor: colors.primary }}
          onPress={onSend}
          activeOpacity={0.8}
        >
          <Typography variant='semibold' className="text-base font-extrabold" style={{ color: colors.white }}>
            Send Invite
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);