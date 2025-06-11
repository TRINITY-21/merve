// components/agent/CompletedView.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBookingRequest } from '../../../../../types/agentBookingTypes';

const { height: screenHeight } = Dimensions.get('window');

interface CompletedViewProps {
  bookingRequests: IBookingRequest[];
  navigation: any;
  showDateFilter?: boolean;
  onShowDateFilter?: (show: boolean) => void;
}

interface CompletedBookingCardProps {
  booking: IBookingRequest;
  getServiceIcon: (service: string) => string;
  getServiceColor: (service: string) => string;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
  getTimeAgo: (dateString: string) => string;
}

interface DateFilterModalProps {
  visible: boolean;
  startDate: string;
  endDate: string;
  onClose: () => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const DateFilterModal: React.FC<DateFilterModalProps> = ({
  visible,
  startDate,
  endDate,
  onClose,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
  onClearFilter,
}) => {
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);

  // Generate months and years for picker
  const generateDateOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let year = currentYear - 2; year <= currentYear + 1; year++) {
      months.forEach((month, index) => {
        const monthNumber = (index + 1).toString().padStart(2, '0');
        const dateString = `${monthNumber}-${year}`;
        options.push({
          id: dateString,
          month,
          year,
          display: `${month} ${year}`,
          value: `${year}-${monthNumber}-01` // Default to first day of month
        });
      });
    }
    return options;
  };

  const dateOptions = generateDateOptions();

  const handleDateSelect = (dateValue: string) => {
    if (activeField === 'start') {
      onStartDateChange(dateValue);
    } else if (activeField === 'end') {
      // Set to last day of selected month
      const date = new Date(dateValue);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const lastDayString = lastDay.toISOString().split('T')[0];
      onEndDateChange(lastDayString);
    }
    setActiveField(null);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end' 
      }}>
        <View style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: 34,
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
            }}>
              Select Period
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 400 }}>
            {/* Start Date Field */}
            <View style={{ padding: 20, paddingBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 8,
              }}>
                Start date
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: activeField === 'start' ? colors.primary + '10' : 'white',
                }}
                onPress={() => setActiveField(activeField === 'start' ? null : 'start')}
              >
                <Text style={{
                  fontSize: 16,
                  color: startDate ? colors.text.primary : colors.text.secondary,
                }}>
                  {formatDisplayDate(startDate)}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* End Date Field */}
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 8,
              }}>
                End date
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: activeField === 'end' ? colors.primary + '10' : 'white',
                }}
                onPress={() => setActiveField(activeField === 'end' ? null : 'end')}
              >
                <Text style={{
                  fontSize: 16,
                  color: endDate ? colors.text.primary : colors.text.secondary,
                }}>
                  {formatDisplayDate(endDate)}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Date Picker */}
            {activeField && (
              <View style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.text.secondary,
                  marginBottom: 12,
                  textAlign: 'center',
                }}>
                  Select {activeField === 'start' ? 'start' : 'end'} month
                </Text>
                <ScrollView 
                  style={{ maxHeight: 200 }}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                >
                  {dateOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F3F4F6',
                      }}
                      onPress={() => handleDateSelect(option.value)}
                    >
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                        <Text style={{
                          fontSize: 16,
                          color: colors.text.primary,
                          flex: 1,
                        }}>
                          {option.month}
                        </Text>
                        <Text style={{
                          fontSize: 16,
                          color: colors.text.secondary,
                          fontWeight: '500',
                        }}>
                          {option.year}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          {!activeField && (
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: startDate && endDate ? colors.error : colors.gray.medium,
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={onApplyFilter}
                disabled={!startDate || !endDate}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}>
                  Confirm
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 12,
                  alignItems: 'center',
                }}
                onPress={onClearFilter}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.text.secondary,
                }}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

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
  showDateFilter = false,
  onShowDateFilter,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredBookings, setFilteredBookings] = useState<IBookingRequest[]>([]);

  const allCompletedBookings = bookingRequests.filter(booking => booking.status === 'completed');
  const displayBookings = startDate && endDate ? filteredBookings : allCompletedBookings;
  
  const totalEarnings = displayBookings.reduce((sum, booking) => sum + booking.amount, 0);

  // Helper function to normalize date format
  const normalizeDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  // Helper function to check if a date is in range
  const isDateInRange = (dateToCheck: string, startDate: string, endDate: string): boolean => {
    const checkDate = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return checkDate >= start && checkDate <= end;
  };

  const applyDateFilter = () => {
    if (!startDate || !endDate) return;
    
    const filtered = allCompletedBookings.filter(booking => {
      const bookingDate = normalizeDate(booking.createdAt);
      return isDateInRange(bookingDate, startDate, endDate);
    });
    
    setFilteredBookings(filtered);
    onShowDateFilter?.(false);
  };

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredBookings([]);
    onShowDateFilter?.(false);
  };

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
        // marginHorizontal: 16,
        // paddingHorizontal: 16,
        marginBottom: 16,
      }}>
        <View style={{
          backgroundColor: colors.accent + '10',
        //   borderRadius: 16,
          padding: 16,
          paddingLeft: 26,
          paddingRight: 26,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.success,
              }}>
                {displayBookings.length}
              </Text>
              <Text style={{
                fontSize: 11,
                color: colors.text.secondary,
                fontWeight: '500',
              }}>
                {startDate && endDate ? 'Filtered Transactions' : 'Total Completed'}
              </Text>
            </View>
            
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text.primary,
              }}>
                GH₵{totalEarnings}
              </Text>
              <Text style={{
                fontSize: 11,
                color: colors.text.secondary,
                fontWeight: '500',
              }}>
                Total Earnings
              </Text>
            </View>
          </View>

          {(startDate && endDate) && (
            <TouchableOpacity
              style={{
                marginTop: 12,
                backgroundColor: colors.error + '20',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                alignSelf: 'flex-start',
              }}
              onPress={clearDateFilter}
            >
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: colors.error,
              }}>
                Clear Date Filter
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={displayBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
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
              {startDate && endDate ? 'No transactions found' : 'No completed bookings'}
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.text.secondary,
              textAlign: 'center',
              paddingHorizontal: 40,
            }}>
              {startDate && endDate
                ? 'No transactions found for the selected date range'
                : 'Your completed transactions will appear here'
              }
            </Text>
          </View>
        }
      />

      <DateFilterModal
        visible={showDateFilter}
        startDate={startDate}
        endDate={endDate}
        onClose={() => onShowDateFilter?.(false)}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApplyFilter={applyDateFilter}
        onClearFilter={clearDateFilter}
      />
    </View>
  );
};