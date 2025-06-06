// components/UserCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IAgent, IFollower, IUserCardProps } from '../../../../types/followersTypes';
import { EngagementIndicator, RatingIndicator, UserActions, UserStats, UserTags } from './EngagementIndicator';


export const UserCard: React.FC<IUserCardProps> = ({
  item,
  isSelectionMode,
  isSelected,
  activeTab,
  onPress,
  onSelect,
  onAction,
  onMessage,
  onMore,
  fadeAnim,
}) => {
  const isFollower = item.type === 'user';
  const follower = item as IFollower;
  const agent = item as IAgent;

  return (
    <Animated.View 
      className="bg-white rounded-2xl mb-3 shadow-sm"
      style={{
        opacity: fadeAnim,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <TouchableOpacity
        className="flex-row p-4 items-start"
        onPress={onPress}
        activeOpacity={0.8}
      >
        {isSelectionMode && (
          <View className="mr-3 mt-1">
            <MaterialIcons 
              name={isSelected ? "check-circle" : "radio-button-unchecked"} 
              size={24} 
              color={isSelected ? '#00BFA5' : '#9E9E9E'} 
            />
          </View>
        )}

        <View className="relative mr-3">
          <Image 
            source={{ uri: item.avatar }} 
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          {item.verified && (
            <View className="absolute -top-0.5 -right-0.5 bg-white rounded-lg p-0.5">
              <MaterialIcons name="verified" size={12} color="#00BFA5" />
            </View>
          )}
          
          {isFollower ? (
            <EngagementIndicator engagement={follower.engagement} />
          ) : (
            <RatingIndicator rating={agent.rating} />
          )}
        </View>

        <View className="flex-1">
          <View className="mb-1.5">
            <Text className="text-base font-bold text-gray-800 mb-0.5">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-0.5">
              {item.username}
            </Text>
            {!isFollower && (
              <Text className="text-xs text-gray-500 opacity-70">
                {agent.agentCode}
              </Text>
            )}
          </View>

          <UserStats item={item} activeTab={activeTab} />

          <View className="flex-row justify-between mb-2">
            <Text className="text-xs text-gray-600 flex-1">
              📍 {item.location}
            </Text>
            <Text className="text-xs text-gray-600">
              {item.lastActive}
            </Text>
          </View>

          {!isFollower && agent.services && (
            <View className="flex-row gap-1.5 mb-2 flex-wrap">
              {agent.services.slice(0, 3).map((service, index) => (
                <View key={index} className="bg-teal-100 rounded-lg px-1.5 py-0.5">
                  <Text className="text-xs text-teal-600 font-semibold">
                    {service}
                  </Text>
                </View>
              ))}
              {agent.services.length > 3 && (
                <Text className="text-xs text-gray-600 font-semibold self-center">
                  +{agent.services.length - 3}
                </Text>
              )}
            </View>
          )}

          <UserTags tags={item.tags} itemType={isFollower ? 'follower' : 'agent'} />
        </View>

        <UserActions
          item={item}
          activeTab={activeTab}
          onAction={onAction}
          onMessage={onMessage}
          onMore={onMore}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};