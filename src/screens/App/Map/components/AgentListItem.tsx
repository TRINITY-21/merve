import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IAgent } from '../../../../types';

interface AgentListItemProps {
  agent: IAgent;
  onPress: (agent: IAgent) => void;
  showDistance?: boolean;
  showServices?: boolean;
  compact?: boolean;
}

export const AgentListItem: React.FC<AgentListItemProps> = ({
  agent,
  onPress,
  showDistance = true,
  showServices = true,
  compact = false,
}) => {
  const getMarkerColor = (provider: string): string => {
    return colors.vendor[provider as keyof typeof colors.vendor] || colors.primary;
  };

  const formatServices = (services: string[]) => {
    return services.map(service => 
      service.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    );
  };

  // Get primary color for card accent
  const primaryColor = agent.provider.length > 0 
    ? getMarkerColor(agent.provider[0])
    : colors.primary;

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => onPress(agent)}
      // style={{ backgroundColor: primaryColor, width: '100%' }}
      
    >
      <Card
        className={`mx-0 my-1.5 bg-white rounded-2xl overflow-hidden border border-gray-100 ${compact ? 'p-3' : 'p-4'}`}
        elevated={false}
       
      >
        {/* Top Row - Name and Provider */}
        <View className="flex-row justify-between items-start mb-2">
          <Typography 
            variant="regular" 
            size={compact ? 15 : 17} 
            className="text-gray-900 tracking-tight flex-1 pr-2"
            numberOfLines={1}
          >
            {agent.name}
          </Typography>
          
          <View className="flex-row flex-wrap justify-end gap-1">
            {agent.provider.map((provider, index) => {
              const providerColor = getMarkerColor(provider);
              return (
                <View 
                  key={index} 
                  className="px-2 py-1 rounded-lg border"
                  style={{ 
                    // backgroundColor: `${providerColor}5`, // 15% opacity
                    borderColor: providerColor
                  }}
                >
                  <Typography 
                    variant="regular" 
                    size={10} 
                    className="tracking-wider"
                    style={{ borderBlockColor: providerColor }}
                  >
                    {formatServices([provider])[0]}
                  </Typography>
                </View>
              );
            })}
          </View>
        </View>
        
        {/* Address */}
        <Typography
          variant="medium"
          size={compact ? 12 : 13}
          className="text-gray-600 leading-5 mb-3"
          numberOfLines={2}
        >
          {agent.address}
        </Typography>
        
        {/* Stats Row */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            {showDistance && (
              <>
                <MaterialIcons name="location-on" size={14} color={colors.gray.medium} />
                <Typography variant="semibold" size={12} className="text-gray-700 ml-1 mr-3">
                  {agent.distance} km
                </Typography>
              </>
            )}
            
            <View className="flex-row items-center">
              <View
                className="w-2 h-2 rounded-full mr-1"
                style={{ 
                  backgroundColor: agent.status === 'open' ? colors.success : colors.error,
                }}
              />
              <Typography variant="medium" size={12} className="text-gray-700">
                {agent.status === 'open' ? 'Open Now' : 'Closed'}
              </Typography>
            </View>
          </View>
          
          {typeof agent.rating === 'number' && agent.rating > 0 && (
            <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
              <MaterialIcons name="star" size={12} color={colors.warning} />
              <Typography variant="bold" size={12} className="text-gray-700 ml-1">
                {agent.rating.toFixed(1)}
              </Typography>
            </View>
          )}
        </View>
        
        {/* Services */}
        {showServices && agent.services && agent.services.length > 0 && (
          <View className="flex-row flex-wrap gap-2">
            {formatServices(agent.services).map((service, index) => (
              <View 
                key={index} 
                className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
              >
                <Typography variant="medium" size={11} className="text-gray-600 tracking-wide">
                  {service}
                </Typography>
              </View>
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};