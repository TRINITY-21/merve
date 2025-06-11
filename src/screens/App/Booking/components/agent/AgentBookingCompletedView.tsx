// components/agent/CompletedView.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBookingRequest } from '../../../../../types/agentBookingTypes';

interface CompletedViewProps {
  bookingRequests: IBookingRequest[];
  navigation: any;
}

interface CompletedBookingCardProps {
  booking: IBookingRequest;
  getServiceIcon: (service: string) => string;
  getServiceColor: (service: string) => string;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
  getTimeAgo: (dateString: string) => string;
}

const CompletedBookingCard: React.FC<CompletedBookingCardProps> = ({
  booking,
  getServiceIcon,
  getServiceColor,
  formatDate,
  formatTime,
  getTimeAgo,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      marginBottom: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginRight: 12,
        }}>
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            backgroundColor: getServiceColor(booking.serviceType) + '20',
          }}>
            <MaterialIcons
              name={getServiceIcon(booking.serviceType) as any}
              size={24}
              color={getServiceColor(booking.serviceType)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.text.primary,
              marginBottom: 4,
            }}>
              {booking.customerName}
            </Text>
            <Text style={{
              fontSize: 13,
              color: colors.text.secondary,
              fontWeight: '500',
            }}>
              {booking.serviceType.replace('_', ' ').toUpperCase()}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
              gap: 4,
            }}>
              <MaterialIcons name="star" size={14} color={colors.warning} />
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: colors.warning,
              }}>
                {booking.customerRating}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.success,
            marginBottom: 4,
          }}>
            GH₵{booking.amount}
          </Text>
          <View style={{
            backgroundColor: colors.success + '20',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 4,
          }}>
            <Text style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: colors.success,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              COMPLETED
            </Text>
          </View>
          <Text style={{
            fontSize: 11,
            color: colors.text.secondary,
            fontWeight: '500',
          }}>
            {getTimeAgo(booking.createdAt)}
          </Text>
        </View>
      </View>

      {/* Quick Details */}
      <View style={{ gap: 12, marginBottom: 16 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <View style={{
            backgroundColor: colors.accent + '15',
            padding: 6,
            borderRadius: 8,
          }}>
            <MaterialIcons name="event" size={16} color={colors.accent} />
          </View>
          <Text style={{
            fontSize: 14,
            color: colors.text.primary,
            fontWeight: '600',
            flex: 1,
          }}>
            {formatDate(booking.requestedDate)} at {formatTime(booking.requestedTime)}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <View style={{
            backgroundColor: colors.success + '15',
            padding: 6,
            borderRadius: 8,
          }}>
            <MaterialIcons name="location-on" size={16} color={colors.success} />
          </View>
          <Text style={{
            fontSize: 14,
            color: colors.text.primary,
            fontWeight: '500',
            flex: 1,
          }} numberOfLines={expanded ? undefined : 1}>
            {booking.customLocation || booking.location}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <View style={{
            backgroundColor: colors.warning + '15',
            padding: 6,
            borderRadius: 8,
          }}>
            <MaterialIcons name="schedule" size={16} color={colors.warning} />
          </View>
          <Text style={{
            fontSize: 14,
            color: colors.text.primary,
            fontWeight: '500',
          }}>
            Duration: {booking.estimatedDuration} minutes
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <View style={{
            backgroundColor: colors.error + '15',
            padding: 6,
            borderRadius: 8,
          }}>
            <MaterialIcons name="phone" size={16} color={colors.error} />
          </View>
          <Text style={{
            fontSize: 14,
            color: colors.text.primary,
            fontWeight: '500',
          }}>
            {booking.customerPhone}
          </Text>
        </View>
      </View>

      {/* Expandable Details */}
      {expanded && (
        <View style={{
          backgroundColor: colors.gray.light + '30',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}>
          <Text style={{
            fontSize: 13,
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Transaction Details
          </Text>
          
          <View style={{ gap: 8 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                fontSize: 13,
                color: colors.text.secondary,
              }}>
                Transaction ID:
              </Text>
              <Text style={{
                fontSize: 13,
                fontWeight: '600',
                color: colors.text.primary,
              }}>
                {booking.id.toUpperCase()}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                fontSize: 13,
                color: colors.text.secondary,
              }}>
                Urgency Level:
              </Text>
              <View style={{
                backgroundColor: booking.urgency === 'high' ? colors.error + '20' : 
                               booking.urgency === 'normal' ? colors.success + '20' : 
                               colors.accent + '20',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 8,
              }}>
                <Text style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: booking.urgency === 'high' ? colors.error : 
                         booking.urgency === 'normal' ? colors.success : 
                         colors.accent,
                  textTransform: 'uppercase',
                }}>
                  {booking.urgency}
                </Text>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                fontSize: 13,
                color: colors.text.secondary,
              }}>
                Request Date:
              </Text>
              <Text style={{
                fontSize: 13,
                fontWeight: '600',
                color: colors.text.primary,
              }}>
                {formatDate(booking.createdAt)}
              </Text>
            </View>
          </View>

          {booking.notes && (
            <View style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: 'white',
              borderRadius: 8,
              borderLeftWidth: 3,
              borderLeftColor: colors.accent,
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Customer Notes
              </Text>
              <Text style={{
                fontSize: 13,
                color: colors.text.secondary,
                lineHeight: 18,
              }}>
                {booking.notes}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Expand/Collapse Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          borderTopWidth: 1,
          borderTopColor: colors.gray.light + '50',
        }}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={{
          fontSize: 12,
          fontWeight: '600',
          color: colors.accent,
          marginRight: 4,
        }}>
          {expanded ? 'Show Less' : 'Show More'}
        </Text>
        <MaterialIcons 
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={16} 
          color={colors.accent} 
        />
      </TouchableOpacity>
    </View>
  );
};

export const CompletedView: React.FC<CompletedViewProps> = ({
  bookingRequests,
  navigation,
}) => {
  const completedBookings = bookingRequests.filter(booking => booking.status === 'completed');
  
  // Calculate stats
  const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const thisWeekEarnings = completedBookings
    .filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return bookingDate >= weekAgo;
    })
    .reduce((sum, booking) => sum + booking.amount, 0);

  const getServiceIcon = (service: string): string => {
    switch (service) {
      case 'cash_out': return 'arrow-upward';
      case 'cash_in': return 'arrow-downward';
      case 'bill_payment': return 'receipt';
      case 'airtime': return 'phone';
      default: return 'help';
    }
  };

  const getServiceColor = (service: string): string => {
    switch (service) {
      case 'cash_out': return colors.error;
      case 'cash_in': return colors.success;
      case 'bill_payment': return colors.warning;
      case 'airtime': return colors.accent;
      default: return colors.gray.medium;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string): string => {
    return timeString;
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInHours = (now.getTime() - past.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const renderCompletedBooking = ({ item }: { item: IBookingRequest }) => (
    <CompletedBookingCard
      booking={item}
      getServiceIcon={getServiceIcon}
      getServiceColor={getServiceColor}
      formatDate={formatDate}
      formatTime={formatTime}
      getTimeAgo={getTimeAgo}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Stats Header */}
      <View style={{
        marginHorizontal: 16,
        marginBottom: 16,
        gap: 12,
      }}>
        <View style={{
          backgroundColor: colors.success + '10',
          borderRadius: 16,
          padding: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.text.primary,
            }}>
              Transaction History
            </Text>
            <View style={{
              backgroundColor: colors.success,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons name="history" size={20} color="white" />
            </View>
          </View>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: colors.success,
              }}>
                {completedBookings.length}
              </Text>
              <Text style={{
                fontSize: 12,
                color: colors.text.secondary,
                fontWeight: '500',
              }}>
                Total Completed
              </Text>
            </View>
            
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.text.primary,
              }}>
                GH₵{totalEarnings}
              </Text>
              <Text style={{
                fontSize: 12,
                color: colors.text.secondary,
                fontWeight: '500',
              }}>
                Total Earnings
              </Text>
            </View>
          </View>
        </View>

        <View style={{
          backgroundColor: colors.accent + '10',
          borderRadius: 12,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
          <MaterialIcons name="trending-up" size={24} color={colors.accent} />
          <View>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.text.primary,
            }}>
              GH₵{thisWeekEarnings} this week
            </Text>
            <Text style={{
              fontSize: 12,
              color: colors.text.secondary,
            }}>
              Weekly earnings summary
            </Text>
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={completedBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
        renderItem={renderCompletedBooking}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 16, 
          paddingBottom: 100 
        }}
        ListEmptyComponent={
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80,
          }}>
            <MaterialIcons
              name="history"
              size={64}
              color={colors.gray.medium}
            />
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.text.primary,
              marginTop: 16,
              marginBottom: 8,
            }}>
              No completed bookings
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.text.secondary,
              textAlign: 'center',
              paddingHorizontal: 40,
            }}>
              Your completed transactions will appear here for easy reference
            </Text>
          </View>
        }
      />
    </View>
  );
};