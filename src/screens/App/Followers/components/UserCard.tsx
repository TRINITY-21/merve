// components/UserCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IAgent, IFollower, IUserCardProps } from '../../../../types/followersTypes';
import { UserActions } from './EngagementIndicator';

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
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10,
        marginHorizontal: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.08,
        // shadowRadius: 12,
        // elevation: 8,
        opacity: fadeAnim,
        overflow: 'hidden',
      }}
    >
      <TouchableOpacity
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
        onPress={onPress}
        activeOpacity={0.96}
      >
        {/* Selection Checkbox */}
        {isSelectionMode && (
          <View style={{ marginRight: 16, marginTop: 4 }}>
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: isSelected ? '#10B981' : '#F3F4F6',
              borderWidth: isSelected ? 0 : 2,
              borderColor: '#D1D5DB',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {isSelected && (
                <MaterialIcons name="check" size={16} color="white" />
              )}
            </View>
          </View>
        )}

        {/* Avatar Section */}
        <View style={{ marginRight: 16, position: 'relative' }}>
          <View style={{
            width: 68,
            height: 68,
            borderRadius: 34,
            backgroundColor: '#F9FAFB',
            padding: 3,
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 8,
            // elevation: 4,
          }}>
            <Image 
              source={{ uri: item.avatar }} 
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
              }}
            />
          </View>
          
          {/* Verified Badge */}
          {item.verified && (
            <View style={{
              position: 'absolute',
              top: -2,
              right: -2,
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 2,
              // shadowColor: '#000',
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 0.2,
              // shadowRadius: 3,
              // elevation: 3,
            }}>
              <MaterialIcons name="verified" size={16} color={colors.primary} />
            </View>
          )}

          {/* Online Status Indicator */}
          <View style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: '#10B981',
            borderWidth: 3,
            borderColor: 'white',
          }} />
        </View>

        {/* Content Section */}
        <View style={{ flex: 1, marginRight: 12 }}>
          {/* Name and Status */}
          <View style={{ marginBottom: 8 }}>
            <Typography style={{
              fontWeight: '700',
              // color: '#111827',
              marginBottom: 4,
              letterSpacing: -0.3,
            }}>
              {item.name}
            </Typography>

          </View>

          {/* Location */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            gap: 2,
          }}>
            <View style={{
              // backgroundColor: '#ECFDF5',
              padding: 4,
              borderRadius: 6,
            }}>
              <MaterialIcons name="location-on" size={12} color="#059669" />
            </View>
            <Typography style={{
              fontSize: 13,
              // color: '#6B7280',
              fontWeight: '500',
              flex: 1,
            }} numberOfLines={1}>
              {item.location}
            </Typography>
          </View>

          {/* Member Since */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}>
            <View style={{
              // backgroundColor: '#FEF3C7',
              padding: 4,
              borderRadius: 6,
            }}>
              <MaterialIcons name="schedule" size={12} color="#D97706" />
            </View>
            <Typography style={{
              fontSize: 12,
              color: '#9CA3AF',
              fontWeight: '500',
            }}>
              Member since: 10 May, 2024
            </Typography>
          </View>
        </View>

        {/* Actions Section */}
        <View style={{ alignItems: 'flex-end' }}>
          <UserActions
            item={item}
            activeTab={activeTab}
            onAction={onAction}
            onMessage={onMessage}
            onMore={onMore}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};