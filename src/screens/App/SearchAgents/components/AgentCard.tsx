// components/AgentCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { AgentProvider, AgentStatus, IAgentCardProps } from '../../../../types/searchAgentTypes';
import AgentStatsDisplay from './AgentsStatsDisplay';
import RatingStars from './RatingStars';

const AgentCard: React.FC<IAgentCardProps> = ({
  agent,
  index,
  fadeAnim,
  slideAnim,
  scaleAnim,
  onPress,
  onChatPress,

}) => {
  const getStatusColor = (status: AgentStatus): string => {
    switch (status) {
      case 'open': return '#10B981';
      case 'closed': return '#EF4444';
      case 'busy': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getProviderColor = (provider: AgentProvider): string => {
    const colors = {
      mtn: '#FFCC00',
      vodafone: '#E60000',
      airteltigo: '#FF0066',
    };
    return colors[provider] || '#6B7280';
  };

  return (
    <Animated.View
      style={{
        marginBottom: 12,
        marginHorizontal: 0,
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 8,
        opacity: fadeAnim,
        transform: [
          { 
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, index * 5],
            })
          },
          { scale: scaleAnim }
        ],
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 14,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
        onPress={() => onPress(agent)}
        activeOpacity={0.95}
      >
        {/* Header Section */}
        <View style={{
          padding: 16,
          paddingBottom: 16,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <View style={{ flex: 1, marginRight: 0 }}>
              <Typography variant="semibold" size={18} style={{
                marginBottom: 6,
                letterSpacing: -0.5,
              }} numberOfLines={1}>
                {agent.name}
              </Typography>

                          
              <RatingStars rating={agent.rating} size={12} showRatingText />
            </View>

            <View style={{
              alignItems: 'flex-end',
              gap: 8,
            }}>
             
          <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 4,
                  marginBottom: 2,
                  backgroundColor: getStatusColor(agent.status),
                }} />
                <Typography style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: getStatusColor(agent.status),
                  textTransform: 'capitalize',
                }}>
                  {agent.status}
                </Typography>
              </View>


              <Typography style={{
                fontSize: 14,
                color: '#6B7280',
                fontWeight: '600',
              }}>
                {agent.distance}km away
              </Typography>
            </View>
          </View>



          {/* Location & Hours */}
          <View style={{ gap: 10 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MaterialIcons name="location-on" size={16} color="#10B981" />
              </View>
              <Typography style={{
                fontSize: 13,
                color: '#374151',
                fontWeight: '500',
                flex: 1,
              }} numberOfLines={1}>
                {agent.address}
              </Typography>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
              <View style={{

                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MaterialIcons name="access-time" size={16} color="#F97316" />
              </View>
              <Typography style={{
                fontSize: 12,
                color: '#6B7280',
                fontWeight: '500',
              }}>
                {agent.workingHours}
              </Typography>
            </View>
          </View>

          {/* Provider badges */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 6,
          }}>
            {agent.provider.map((prov) => (
              <View key={prov} style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 14,
                backgroundColor: getProviderColor(prov),
                shadowColor: getProviderColor(prov),
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Typography variant='bold' style={{
                  fontSize: 8,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: 0,
                }}>
                  {prov}
                </Typography>
              </View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={{
          height: 1,
          backgroundColor: '#F3F4F6',
          marginHorizontal: 10,
          marginVertical: -6,
        }} />

        {/* Footer Section */}
        <View style={{
          padding: 20,
          paddingTop: 16,
        }}>
          {/* Services */}

            {/* <AgentServices services={agent.services} /> */}

          {/* Bottom row */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <AgentStatsDisplay 
              transactions={agent.transactions}
              cashAvailable={agent.cashAvailable}
            />

                <TouchableOpacity 
              style={{ 
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#F9FAFB',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
              onPress={() => onChatPress(agent)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="directions" size={20} color={colors.accent} />
            </TouchableOpacity>


            <TouchableOpacity 
              style={{ 
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#F9FAFB',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
              onPress={() => onChatPress(agent)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AgentCard;