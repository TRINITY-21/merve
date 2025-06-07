// components/map/SelectedAgentCard.tsx
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Button, Card, Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IAgent } from '../../../../types';

export interface TransportMode {
  label: string;
  icon: string;
  iconSet: 'Ionicons' | 'MaterialIcons';
  mode: string;
  profile: string;
}

interface SelectedAgentCardProps {
  agent: IAgent;
  selectedTransport: string;
  onTransportChange: (transport: string) => void;
  onClose: () => void;
  onGetDirections: () => void;
  onStartNavigation: () => void;
  onStopNavigation: () => void;
  isNavigating: boolean;
  showDirections: boolean;
  routeTimes: Record<string, number>;
  transportModes?: TransportMode[];
  position?: 'bottom' | 'top';
  compact?: boolean;
}

const defaultTransportModes: TransportMode[] = [
  { label: 'Car', icon: 'car', iconSet: 'Ionicons', mode: 'driving', profile: 'driving' },
  { label: 'Motorcycle', icon: 'motorcycle', iconSet: 'MaterialIcons', mode: 'driving', profile: 'driving' },
  { label: 'Bike', icon: 'bicycle', iconSet: 'Ionicons', mode: 'cycling', profile: 'cycling' },
  { label: 'Walk', icon: 'walk', iconSet: 'Ionicons', mode: 'walking', profile: 'walking' },
];

export const SelectedAgentCard: React.FC<SelectedAgentCardProps> = ({
  agent,
  selectedTransport,
  onTransportChange,
  onClose,
  onGetDirections,
  onStartNavigation,
  onStopNavigation,
  isNavigating,
  showDirections,
  routeTimes,
  transportModes = defaultTransportModes,
  position = 'bottom',
  compact = false
}) => {
  const positionClass = position === 'bottom' 
    ? Platform.OS === 'ios' ? 'bottom-28' : 'bottom-24'
    : Platform.OS === 'ios' ? 'top-28' : 'top-24';

  return (
    <View className={`absolute left-4 right-4 ${positionClass}`}>
      <Card className={`bg-white rounded-3xl shadow-2xl ${compact ? 'p-3' : 'p-4.5'}`}>
        <View className="flex-row justify-between items-start">
          <View>
            <Typography 
              variant="bold" 
              size={compact ? 14 : 16} 
              className="text-gray-900 tracking-wide mb-1"
            >
              {agent.name}
            </Typography>
            <Typography 
              variant="medium" 
              size={compact ? 12 : 13} 
              className="text-gray-600 leading-4.5"
            >
              {agent.address}
            </Typography>
          </View>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.gray.medium} />
          </TouchableOpacity>
        </View>

        <View className={`flex-row gap-4 ${compact ? 'mt-2.5' : 'mt-3.5'}`}>
          <View className="flex-row items-center">
            <MaterialIcons name="schedule" size={16} color={colors.success} />
            <Typography 
              variant="semibold" 
              size={compact ? 11 : 12} 
              className="ml-1 text-gray-600 tracking-wide"
            >
              {agent.status === 'open' ? 'Open' : 'Closed'}
            </Typography>
          </View>
          
          {typeof agent.rating === 'number' && agent.rating > 0 && (
            <View className="flex-row items-center">
              <MaterialIcons name="star" size={16} color={colors.warning} />
              <Typography 
                variant="semibold" 
                size={compact ? 11 : 12} 
                className="ml-1 text-gray-600 tracking-wide"
              >
                {agent.rating}
              </Typography>
            </View>
          )}
          
          <View className="flex-row items-center">
            <MaterialIcons name="attach-money" size={16} color={colors.success} />
            <Typography 
              variant="semibold" 
              size={compact ? 11 : 12} 
              className="ml-1 text-gray-600 tracking-wide"
            >
              {agent.cashAvailable ? 'Cash Available' : 'No Cash'}
            </Typography>
          </View>
        </View>

        {/* Transport Mode Selection */}
        <View className={`flex-row justify-around ${compact ? 'mt-2 mb-1' : 'mt-3 mb-2'}`}>
          {transportModes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              className={`items-center p-1.5 ${
                selectedTransport === mode.label.toLowerCase() ? 'bg-gray-100 rounded-xl' : ''
              }`}
              onPress={() => onTransportChange(mode.label.toLowerCase())}
            >
              {mode.iconSet === 'Ionicons' ? (
                <Ionicons
                  name={mode.icon as any}
                  size={compact ? 20 : 24}
                  color={selectedTransport === mode.label.toLowerCase() ? colors.primary : colors.gray.medium}
                />
              ) : (
                <MaterialIcons
                  name={mode.icon as any}
                  size={compact ? 20 : 24}
                  color={selectedTransport === mode.label.toLowerCase() ? colors.primary : colors.gray.medium}
                />
              )}
              <Typography
                variant={selectedTransport === mode.label.toLowerCase() ? 'semibold' : 'regular'}
                size={compact ? 11 : 12}
                className={`mt-1 ${
                  selectedTransport === mode.label.toLowerCase()
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }`}
              >
                {mode.label}
              </Typography>
              {routeTimes[mode.label.toLowerCase()] && (
                <Typography 
                  variant="semibold" 
                  size={compact ? 9 : 10} 
                  className="text-gray-500 mt-0.5"
                >
                  {routeTimes[mode.label.toLowerCase()]}min
                </Typography>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        {!isNavigating ? (
          <View className="flex-row mt-4">
            <Button
              title="Get Directions"
              icon="directions"
              gradient
              size="small"
              onPress={onGetDirections}
              style={{ flex: 1, marginRight: 8 }}
            />
            {showDirections && (
              <Button
                title="Start Navigation"
                icon="navigation"
                gradient
                size="small"
                onPress={onStartNavigation}
                style={{ flex: 1, marginLeft: 8 }}
              />
            )}
          </View>
        ) : (
          <Button
            title="Stop Navigation"
            icon="stop"
            gradient
            onPress={onStopNavigation}
            style={{ backgroundColor: colors.error, marginTop: 16 }}
          />
        )}

        {/* Show estimated time */}
        {showDirections && routeTimes[selectedTransport] && (
          <Typography 
            variant="semibold" 
            size={compact ? 12 : 14} 
            className="mt-3 text-gray-900 text-center"
          >
            Estimated time: {routeTimes[selectedTransport]} min
          </Typography>
        )}
      </Card>
    </View>
  );
};