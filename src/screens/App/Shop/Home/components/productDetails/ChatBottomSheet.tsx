// components/ChatBottomSheet.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { IChatBottomSheetProps } from '../../../../../../types/productDetailsTypes';

const { height: screenHeight } = Dimensions.get('window');

const ChatBottomSheet: React.FC<IChatBottomSheetProps> = ({
  visible,
  agent,
  messages,
  isTyping,
  chatMessage,
  chatSheetAnim,
  onClose,
  onSendMessage,
  onMessageChange,
  onCall,
}) => {
  const formatMessageTime = (timestamp: Date): string => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / 1000 / 60);
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return messageTime.toLocaleDateString();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <TouchableOpacity 
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />
        
        <Animated.View 
          className="bg-white rounded-t-3xl shadow-lg"
          style={{
            height: screenHeight * 0.7,
            transform: [{
              translateY: chatSheetAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [screenHeight, 0],
              })
            }]
          }}
        >
          {/* Chat Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-light">
            <View className="flex-row items-center flex-1">
              <View className="relative mr-3">
                <Image 
                  source={{ uri: agent.profileImage }} 
                  className="w-10 h-10 rounded-full"
                />
                {agent.isOnline && (
                  <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-white" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-text-primary">
                  {agent.name}
                </Text>
                <Text className="text-xs text-success mt-0.5">
                  {agent.isOnline ? agent.lastSeen : `Last seen ${agent.lastSeen}`}
                </Text>
              </View>
            </View>
            
            <View className="flex-row gap-2">
              <TouchableOpacity 
                className="w-9 h-9 rounded-full bg-background items-center justify-center"
                onPress={onCall}
              >
                <MaterialIcons name="phone" size={20} color="#FFCC00" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-9 h-9 rounded-full bg-background items-center justify-center"
                onPress={onClose}
              >
                <MaterialIcons name="close" size={20} color="#616161" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Chat Messages */}
          <ScrollView 
            className="flex-1 bg-background"
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View 
                key={message.id} 
                className={`mb-3 ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <View 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.sender === 'user' 
                      ? 'bg-primary rounded-br-sm' 
                      : 'bg-white border border-gray-light rounded-bl-sm'
                  }`}
                >
                  <Text 
                    className={`text-sm leading-4 ${
                      message.sender === 'user' ? 'text-white' : 'text-text-primary'
                    }`}
                  >
                    {message.text}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1 gap-1">
                  <Text className="text-xs text-gray-medium">
                    {formatMessageTime(message.timestamp)}
                  </Text>
                  {message.sender === 'user' && (
                    <MaterialIcons 
                      name={
                        message.status === 'sending' ? 'schedule' :
                        message.status === 'delivered' ? 'done' :
                        'done-all'
                      }
                      size={12} 
                      color={message.status === 'read' ? '#FFCC00' : '#9E9E9E'} 
                    />
                  )}
                </View>
              </View>
            ))}
            
            {isTyping && (
              <View className="items-start mb-3">
                <View className="bg-white border border-gray-light rounded-2xl rounded-bl-sm px-4 py-3">
                  <View className="flex-row items-center gap-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-gray-medium animate-pulse" />
                    <View className="w-1.5 h-1.5 rounded-full bg-gray-medium animate-pulse" style={{ animationDelay: '150ms' }} />
                    <View className="w-1.5 h-1.5 rounded-full bg-gray-medium animate-pulse" style={{ animationDelay: '300ms' }} />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Chat Input */}
          <View 
            className={`px-4 py-3 bg-white border-t border-gray-light ${
              Platform.OS === 'ios' ? 'pb-7' : ''
            }`}
          >
            <View className="flex-row items-end bg-background rounded-full px-3 py-2 gap-2">
              <TextInput
                className="flex-1 text-sm text-text-primary pt-2 max-h-24"
                placeholder="Type a message..."
                placeholderTextColor="#9E9E9E"
                value={chatMessage}
                onChangeText={onMessageChange}
                multiline
                maxLength={1000}
              />
              <TouchableOpacity 
                className={`w-9 h-9 rounded-full items-center justify-center ${
                  chatMessage.trim() === '' ? 'bg-gray-light' : 'bg-primary'
                }`}
                onPress={onSendMessage}
                disabled={chatMessage.trim() === ''}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name="send" 
                  size={20} 
                  color={chatMessage.trim() === '' ? '#9E9E9E' : '#FFFFFF'} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ChatBottomSheet;