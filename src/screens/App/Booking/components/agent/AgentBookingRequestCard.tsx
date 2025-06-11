import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
    style={{
      marginBottom: 10,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
      opacity: fadeAnim,
      margin:0,
    }}
  >
    <LinearGradient
      colors={[colors.gradient.light[0], colors.gradient.light[1] + 'D0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ padding: 16 }}
    >
      {/* Card Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginRight: 16,
        }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            backgroundColor: getServiceColor(request.serviceType) + '20',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <MaterialIcons
              name={getServiceIcon(request.serviceType) as any}
              size={28}
              color={getServiceColor(request.serviceType)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
              gap: 2,
            }}>
              <Typography size={18} variant='semibold' style={{
              }}>
                {request.customerName}
              </Typography>
              <MaterialIcons name="verified" size={16} color={colors.primary} />
            </View>
            <Typography size={12} variant='regular' style={{
              marginTop: 2,
              color: colors.text.secondary,
            }}>
              {request.serviceType.replace('_', ' ').toUpperCase()} •{' '}
              <Typography size={12} variant='semibold' style={{ fontWeight: 'bold' }}>GH₵{request.amount}</Typography>
            </Typography>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            marginBottom: 4,
            backgroundColor: getUrgencyColor(request.urgency),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
          }}>
            <Typography variant='bold' size={10} style={{
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: -0.5,
            }}>
              {request.urgency.toUpperCase()}
            </Typography>
          </View>
          <Typography style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.text.primary,
          }}>
            {getTimeAgo(request.createdAt)}
          </Typography>
        </View>
      </View>

      {/* Card Body */}
      <View style={{ marginBottom: 10 }}>
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
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 16,
            borderRadius: 16,
            marginTop: 1,
            gap: 12,
            backgroundColor: colors.primary + '15',
          }}>
            <MaterialIcons name="note" size={18} color={colors.accent} />
            <Typography variant="regular" size={12} style={{
              fontWeight: '500',
              flex: 1,
              lineHeight: 20,
              color: colors.accent,
            }} numberOfLines={3}>
              {request.notes}
            </Typography>
          </View>
        )}
      </View>

      {/* Card Actions */}
      {request.status === 'pending' && (
        <View style={{
          flexDirection: 'row',
          gap: 16,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.1)',
        }}>
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
            color={colors.primary}
            onPress={() => onAction(request.id, 'accept')}
            variant="solid"
          />
        </View>
      )}

      {request.status === 'accepted' && (
        <View style={{
          flexDirection: 'row',
          gap: 16,
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.1)',
        }}>
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

// --- Helper Components ---

interface InfoRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  numberOfLines?: number;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, text, numberOfLines }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  }}>
    <MaterialIcons name={icon} size={18} color={colors.text.secondary} />
    <Typography variant="regular" size={14} style={{
      flex: 1,
      color: colors.text.secondary,
    }} numberOfLines={numberOfLines}>
      {text}
    </Typography>
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
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 12,
      gap: 8,
      backgroundColor: variant === 'solid' ? color : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? color + '80' : undefined,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    }}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons name={icon} size={20} color={variant === 'solid' ? colors.white : color} />
    <Typography variant='semibold' size={14} style={{
      letterSpacing: 0.5,
      color: variant === 'solid' ? colors.white : color,
    }}>
      {label}
    </Typography>
  </TouchableOpacity>
);