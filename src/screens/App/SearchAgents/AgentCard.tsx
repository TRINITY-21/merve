// components/AgentCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { AgentProvider, AgentStatus, IAgentCardProps } from '../../../types/searchAgentTypes';
import AgentServices from './AgentServices';
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
      case 'open': return '#4CAF50';
      case 'closed': return '#F44336';
      case 'busy': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getProviderColor = (provider: AgentProvider): string => {
    const colors = {
      mtn: '#FFCC00',
      vodafone: '#E60000',
      airteltigo: '#FF0066',
    };
    return colors[provider] || '#9E9E9E';
  };

  return (
    <Animated.View
      className="mb-5 rounded-2xl shadow-lg overflow-hidden"
      style={{
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
        className="rounded-2xl overflow-hidden"
        onPress={() => onPress(agent)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#f8fafc', '#ffffff']}
          className="p-5"
        >
          {/* Card Header */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-2 gap-2.5">
                <Text className="text-lg font-bold text-[#212121] flex-1" numberOfLines={1}>
                  {agent.name}
                </Text>
                <View 
                  className="px-2.5 py-1 rounded-xl"
                  style={{ backgroundColor: getStatusColor(agent.status) }}
                >
                  <Text className="text-xs font-bold text-white uppercase">
                    {agent.status}
                  </Text>
                </View>
              </View>
              
              <RatingStars rating={agent.rating} size={14} showRatingText />
            </View>

            <View className="items-end">
              <View 
                className="px-3 py-1.5 rounded-2xl mb-1.5"
                style={{ backgroundColor: getProviderColor(agent.provider) }}
              >
                <Text className="text-xs font-extrabold text-white">
                  {agent.provider.toUpperCase()}
                </Text>
              </View>
              <Text className="text-xs text-[#757575] font-semibold">
                {agent.distance}km away
              </Text>
            </View>
          </View>

          {/* Card Body */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <MaterialIcons name="location-on" size={16} color="#00BFA5" />
              <Text className="text-sm text-[#757575] flex-1" numberOfLines={1}>
                {agent.address}
              </Text>
            </View>

            <View className="flex-row items-center mb-3 gap-2">
              <MaterialIcons name="access-time" size={16} color="#757575" />
              <Text className="text-xs text-[#757575] font-medium">
                {agent.workingHours}
              </Text>
            </View>

            <AgentServices services={agent.services} />
          </View>

          {/* Card Footer */}
          <View className="flex-row justify-between items-center pt-2.5 border-t border-[#E0E0E0]">
            <AgentStatsDisplay 
              transactions={agent.transactions}
              cashAvailable={agent.cashAvailable}
            />

            <TouchableOpacity 
              className="p-2"
              onPress={() => onChatPress(agent)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chat" size={18} color="#616161" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AgentCard;