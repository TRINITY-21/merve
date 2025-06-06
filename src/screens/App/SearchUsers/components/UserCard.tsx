// components/UserCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { IUserCardProps } from '../../../../types/searchUsersTypes';
import UserInterests from './UserInterests';
import UserStats from './UserStats';


const UserCard: React.FC<IUserCardProps> = ({
  user,
  index,
  fadeAnim,
  slideAnim,
  scaleAnim,
  onPress,
  onFollowToggle,
}) => {
  const formatLastSeen = (lastSeen: string, isOnline: boolean): string => {
    if (isOnline) return 'Active now';
    return lastSeen;
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
              outputRange: [0, index * 3],
            })
          },
          { scale: scaleAnim }
        ],
      }}
    >
      <TouchableOpacity
        className="rounded-2xl overflow-hidden"
        onPress={() => onPress(user)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#f8fafc', '#ffffff']}
          className="p-5"
        >
          {/* Card Header */}
          <View className="flex-row items-start mb-4">
            <View className="relative mr-4">
              <Image 
                source={{ uri: user.avatar }} 
                className="w-15 h-15 rounded-full border-2 border-white" 
              />
              {user.isOnline && (
                <View className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-[#4CAF50] border-2 border-white" />
              )}
              {user.verified && (
                <View className="absolute -top-0.5 -right-0.5 bg-white rounded-xl p-0.5">
                  <MaterialIcons name="verified" size={16} color="#FFCC00" />
                </View>
              )}
            </View>

            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-1 gap-2">
                <Text className="text-lg font-bold text-[#212121] flex-1" numberOfLines={1}>
                  {user.name}
                </Text>
              </View>
              
              <Text className="text-sm text-[#9E9E9E] mb-1.5 font-semibold" numberOfLines={1}>
                {user.username}
              </Text>
              
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="location-on" size={14} color="#9E9E9E" />
                <Text className="text-xs text-[#757575] flex-1" numberOfLines={1}>
                  {user.location}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <TouchableOpacity 
                className="rounded-2xl overflow-hidden"
                onPress={() => onFollowToggle(user.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={user.following ? ['#f8fafc', '#ffffff'] : ['#FFCC00', '#FFB300']}
                  className="flex-row items-center px-4 py-2 gap-1"
                >
                  <MaterialIcons 
                    name={user.following ? 'check' : 'person-add'} 
                    size={16} 
                    color={user.following ? '#757575' : 'white'} 
                  />
                  <Text className={`text-xs font-bold ${
                    user.following ? 'text-[#757575]' : 'text-white'
                  }`}>
                    {user.following ? 'Following' : 'Follow'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Body */}
          <View className="mb-4">
            <Text className="text-sm text-[#757575] leading-5 mb-3" numberOfLines={2}>
              {user.bio}
            </Text>

            <View className="mb-2">
              <UserInterests interests={user.interests} maxVisible={3} />
            </View>
          </View>

          {/* Card Footer */}
          <View className="flex-row justify-between items-center pt-4 border-t border-[#E0E0E0]">
            <UserStats
              followers={user.followers}
              posts={user.posts}
              mutual={user.mutual}
            />

            <View className="items-end">
              <Text className="text-xs text-[#757575] font-medium">
                {formatLastSeen(user.lastSeen, user.isOnline)}
              </Text>
            </View>
          </View>
        </LinearGradient> 
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;