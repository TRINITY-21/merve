import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
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
  compact = false
}) => {
  const getMarkerColor = (provider: string): string => {
    return colors.vendor[provider as keyof typeof colors.vendor] || colors.primary;
  };

  const formatServices = (services: string[]) => {
    return services.map(service => service.replace('_', ' ').toUpperCase());
  };

  return (
    <Card
      className={`mx-4 my-1.5 bg-white rounded-2xl shadow-md border border-gray-50 ${compact ? 'p-3' : 'p-4'}`}
      onPress={() => onPress(agent)}
      elevated={true}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-3">
          <Typography 
            variant="bold" 
            size={compact ? 14 : 16} 
            className="text-gray-900 mb-1 tracking-tight"
          >
            {agent.name}
          </Typography>
          <Typography 
            variant="medium" 
            size={compact ? 12 : 13} 
            className="text-gray-600 leading-5 mb-2"
          >
            {agent.address}
          </Typography>
          
          <View className="flex-row items-center flex-wrap">
            {showDistance && (
              <>
                <MaterialIcons name="location-on" size={16} color={colors.gray.medium} />
                <Typography variant="semibold" size={11} className="text-gray-600 ml-1 mr-3 tracking-wide">
                  {agent.distance}km
                </Typography>
              </>
            )}
            
            <View
              className="w-2 h-2 rounded-full mr-1"
              style={{
                backgroundColor: agent.status === 'open' ? colors.success : colors.error
              }}
            />
            <Typography variant="semibold" size={11} className="text-gray-600 tracking-wide">
              {agent.status === 'open' ? 'Open' : 'Closed'}
            </Typography>
            
            {typeof agent.rating === 'number' && agent.rating > 0 && (
              <>
                <MaterialIcons name="star" size={12} color={colors.warning} className="ml-2" />
                <Typography variant="semibold" size={11} className="text-gray-600 ml-1">
                  {agent.rating}
                </Typography>
              </>
            )}
          </View>
        </View>
        
        <View
          className="px-2.5 py-1.5 rounded-xl shadow-sm"
          style={{ backgroundColor: getMarkerColor(agent.provider) }}
        >
          <Typography variant="bold" size={compact ? 10 : 11} className="text-white tracking-wider">
            {agent.provider.toUpperCase()}
          </Typography>
        </View>
      </View>
      
      {showServices && agent.services && agent.services.length > 0 && (
        <View className="flex-row flex-wrap mt-3 gap-1.5">
          {formatServices(agent.services).map((service, index) => (
            <View key={index} className="bg-gray-100 px-2.5 py-1 rounded-xl border border-gray-200">
              <Typography variant="bold" size={10} className="text-gray-600 tracking-wide">
                {service}
              </Typography>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};