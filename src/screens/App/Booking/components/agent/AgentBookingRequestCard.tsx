import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBookingRequest } from '../../../../../types/agentBookingTypes';

interface BookingRequestCardProps {
  request: IBookingRequest;
  fadeAnim: Animated.Value;
  onAction: (requestId: string, action: string) => void;
  onMessage: (customerName: string) => void;
  getServiceIcon: (service: string) => string;
  getServiceColor: (service: string) => string;
  getUrgencyColor: (urgency: string) => string;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
  getTimeAgo: (dateString: string) => string;
}

export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  request,
  fadeAnim,
  onAction,
  onMessage,
  getServiceIcon,
  getServiceColor,
  getUrgencyColor,
  formatDate,
  formatTime,
  getTimeAgo,
}) => (
  <Animated.View
    className="mb-4 rounded-3xl overflow-hidden shadow-xl shadow-black/15 elevation-8"
    style={{ opacity: fadeAnim }}
  >
    <LinearGradient
      colors={[colors.gradient.light[0], colors.gradient.light[1] + 'D0']} // Slightly more opaque gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-6" // Increased padding
    >
      {/* Card Header */}
      <View className="flex-row justify-between items-start mb-5">
        <View className="flex-row items-center flex-1 mr-4">
          <View
            className="w-14 h-14 rounded-full items-center justify-center mr-4 shadow-sm shadow-black/10"
            style={{ backgroundColor: getServiceColor(request.serviceType) + '20' }} // Lighter, tinted background
          >
            <MaterialIcons
              name={getServiceIcon(request.serviceType) as any}
              size={28} // Larger icon
              color={getServiceColor(request.serviceType)}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1 gap-2">
              <Text className="text-lg font-extrabold" style={{ color: colors.text.primary }}>
                {request.customerName}
              </Text>
              <View className="flex-row items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                <MaterialIcons name="star" size={14} color={colors.primary} />
                <Text className="text-xs font-bold" style={{ color: colors.primary }}>
                  {request.customerRating}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-semibold" style={{ color: colors.text.secondary }}>
              {request.serviceType.replace('_', ' ').toUpperCase()} •{' '}
              <Text className="font-bold">GH₵{request.amount}</Text>
            </Text>
          </View>
        </View>

        <View className="items-end">
          <View
            className="px-3 py-1.5 rounded-full mb-1 shadow-sm"
            style={{ backgroundColor: getUrgencyColor(request.urgency) }}
          >
            <Text className="text-xs font-bold text-white uppercase tracking-wider">
              {request.urgency.toUpperCase()}
            </Text>
          </View>
          <Text className="text-xs font-medium" style={{ color: colors.text.primary }}>
            {getTimeAgo(request.createdAt)}
          </Text>
        </View>
      </View>

      {/* Card Body */}
      <View className="mb-5">
        <InfoRow
          icon="event"
          text={`${formatDate(request.requestedDate)} at ${formatTime(
            request.requestedTime,
          )}`}
        />

        <InfoRow
          icon="location-on"
          text={request.customLocation || request.location}
          numberOfLines={1}
        />

        <InfoRow
          icon="schedule"
          text={`~${request.estimatedDuration} minutes`}
        />

        {request.notes && (
          <View
            className="flex-row items-start p-4 rounded-2xl mt-3 gap-3"
            style={{ backgroundColor: colors.accent + '15' }} // Slightly richer background for notes
          >
            <MaterialIcons name="note" size={18} color={colors.accent} />
            <Text
              className="text-sm font-medium flex-1 leading-5"
              style={{ color: colors.accent }}
              numberOfLines={3} // Allow more lines for notes
            >
              {request.notes}
            </Text>
          </View>
        )}
      </View>

      {/* Card Actions */}
      {request.status === 'pending' && (
        <View className="flex-row gap-4 pt-5 border-t border-black/10">
          <ActionButton
            icon="close"
            label="Decline"
            color={colors.error}
            onPress={() => onAction(request.id, 'decline')}
            variant="outline"
          />

          <ActionButton
            icon="check"
            label="Accept"
            color={colors.success}
            onPress={() => onAction(request.id, 'accept')}
            variant="solid"
          />
        </View>
      )}

      {request.status === 'accepted' && (
        <View className="flex-row gap-4 pt-5 border-t border-black/10">
          <ActionButton
            icon="message"
            label="Message"
            color={colors.accent}
            onPress={() => onMessage(request.customerName)}
            variant="outline"
          />

          <ActionButton
            icon="check-circle"
            label="Complete"
            color={colors.accent}
            onPress={() => onAction(request.id, 'complete')}
            variant="solid"
          />
        </View>
      )}
    </LinearGradient>
  </Animated.View>
);

// --- Helper Components for better readability and reusability ---

interface InfoRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  numberOfLines?: number;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, text, numberOfLines }) => (
  <View className="flex-row items-center mb-3 gap-3">
    <MaterialIcons name={icon} size={18} color={colors.text.secondary} />
    <Text
      className="text-base flex-1"
      style={{ color: colors.text.secondary }}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  </View>
);

interface ActionButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
  variant: 'solid' | 'outline';
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, color, onPress, variant }) => (
  <TouchableOpacity
    className={`flex-1 flex-row items-center justify-center py-3.5 rounded-xl gap-2 shadow-sm ${
      variant === 'solid' ? '' : 'border'
    }`}
    style={{
      backgroundColor: variant === 'solid' ? color : 'transparent',
      borderColor: variant === 'outline' ? color + '80' : undefined, // Slightly transparent border
    }}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons name={icon} size={20} color={variant === 'solid' ? colors.white : color} />
    <Text
      className="text-sm font-bold tracking-wide"
      style={{ color: variant === 'solid' ? colors.white : color }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);