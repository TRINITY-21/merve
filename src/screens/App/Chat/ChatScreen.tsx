// ChatScreen.tsx
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Vibration,
    View
} from 'react-native';
import { IAgent, IMediaAttachment, IMessage, IReplyTo, IUser } from '../../../types/chatTypes';
import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { MessageItem } from './components/MessageItem';
import { QuickReplies } from './components/QuickReplies';
import { ReplyPreview } from './components/ReplyPreview';


const QUICK_REPLIES = [
    'Thanks! 👍',
    'Sure, I\'ll check',
    'Give me a moment',
    'Perfect!',
    'On my way',
];

const ChatScreen: React.FC = ({  }) => {
    const navigation = useNavigation();

    // Mock agent data - in real app this would come from route params or API
    const agent: IAgent = {
        id: '1',
        address: "Tty",
        agentType: "Mobile",
        businessDescription: "Tuijf",
        businessLicense: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMoMoPlus-0e2a6058-0316-4654-9e1d-2a684e3144ef/ImagePicker/5056c42b-1378-4aba-81e8-f475c14c0a47.jpeg",
        businessName: "Richdoe Mobile Money",
        confirmPin: "1111",
        contactPhone: "6605382432",
        email: "john@example.com",
        idDocument: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMoMoPlus-0e2a6058-0316-4654-9e1d-2a684e3144ef/ImagePicker/21490386-9faf-4dec-bd0f-491e9450ea58.jpeg",
        isOpen: true,
        landmark: "Yyu",
        location: { latitude: 40.7469672, longitude: 30.3518481 },
        name: "John Doe",
        networks: ["mtn", "vodafone", "airteltigo"],
        operatingHours: {
            friday: { close: "18:00", isClosed: false, open: "08:00" },
            monday: { close: "18:00", isClosed: false, open: "08:00" },
            saturday: { close: "15:00", isClosed: false, open: "09:00" },
            sunday: { close: "", isClosed: true, open: "" },
            thursday: { close: "18:00", isClosed: false, open: "08:00" },
            tuesday: { close: "18:00", isClosed: false, open: "08:00" },
            wednesday: { close: "18:00", isClosed: false, open: "08:00" }
        },
        otp: "950009",
        phone: "0241234567",
        pin: "1111",
        services: ["cash_in", "bill_payment", "money_transfer", "cash_out", "airtime"],
        setupPhotos: ["file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMoMoPlus-0e2a6058-0316-4654-9e1d-2a684e3144ef/ImagePicker/337b10ab-c80d-44cc-8bad-08c9cf23c7c6.jpeg"],
        termsAccepted: true,
        whatsapp: "6688556322",
        avatar: 'https://i.pravatar.cc/100'
    };

    // Mock current user - in real app this would come from global state
    const currentUser: IUser = {
        id: 'user1',
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/100?img=2'
    };

    const [messages, setMessages] = useState<IMessage[]>([
        {
            id: '1',
            senderId: agent.id || 'agent1',
            text: `Hello! Welcome to ${agent.businessName}. How can I assist you today?`,
            timestamp: moment().subtract(1, 'hours').toISOString(),
            read: true,
            reactions: ['👍'],
        },
        {
            id: '2',
            senderId: currentUser.id,
            text: 'Hi! I have a question about your services.',
            timestamp: moment().subtract(30, 'minutes').toISOString(),
            read: true,
        },
    ]);

    const [messageText, setMessageText] = useState<string>('');
    const [media, setMedia] = useState<IMediaAttachment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [replyingTo, setReplyingTo] = useState<IReplyTo | null>(null);
    const [showMediaOptions, setShowMediaOptions] = useState<boolean>(false);
    const [isOnline, setIsOnline] = useState<boolean>(true);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: false });

        // Simulate online status changes
        const interval = setInterval(() => {
            setIsOnline(prev => !prev);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const vibrateShort = (): void => {
        if (Platform.OS !== 'web') {
            Vibration.vibrate(50);
        }
    };

    const pickMedia = async (mediaType: 'image' | 'video'): Promise<void> => {
        let result;
        if (mediaType === 'image') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                quality: 1,
            });
        } else if (mediaType === 'video') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsMultipleSelection: false,
                quality: 1,
            });
        }

        if (result && !result.canceled && result.assets && result.assets[0]) {
            const newMedia: IMediaAttachment = {
                uri: result.assets[0].uri,
                type: result.assets[0].type === 'video' ? 'video' : 'image',
                id: result.assets[0].assetId || result.assets[0].uri + Math.random().toString(36).slice(2),
            };
            setMedia([newMedia]);
            vibrateShort();
            setShowMediaOptions(false);
        }
    };

    const sendMessage = (): void => {
        if (!messageText.trim() && media.length === 0) {
            return;
        }
        setIsLoading(true);
        Keyboard.dismiss();

        const newMessage: IMessage = {
            id: `${Date.now()}`,
            senderId: currentUser.id,
            text: messageText.trim(),
            media: media.length > 0 ? media[0] : undefined,
            timestamp: moment().toISOString(),
            read: false,
            replyTo: replyingTo || undefined,
            reactions: [],
        };

        setMessages((prev) => [...prev, newMessage]);
        setMessageText('');
        setMedia([]);
        setReplyingTo(null);
        setIsLoading(false);

        flatListRef.current?.scrollToEnd({ animated: true });

        // Simulate agent typing and response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `typing-${Date.now()}`,
                    senderId: agent.id || 'agent1',
                    typing: true,
                    timestamp: moment().toISOString(),
                    read: false,
                },
            ]);

            setTimeout(() => {
                setMessages((prev) => {
                    const filtered = prev.filter((msg) => !msg.typing);
                    return [
                        ...filtered,
                        {
                            id: `${Date.now()}`,
                            senderId: agent.id || 'agent1',
                            text: 'I understand. Let me help you with that.',
                            timestamp: moment().toISOString(),
                            read: false,
                            reactions: [],
                        },
                    ];
                });
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 2000);
        }, 1000);
    };

    const handleReaction = (messageId: string, emoji: string): void => {
        setMessages(prev =>
            prev.map(msg => {
                if (msg.id === messageId) {
                    const reactions = msg.reactions || [];
                    if (reactions.includes(emoji)) {
                        return { ...msg, reactions: reactions.filter(r => r !== emoji) };
                    }
                    return { ...msg, reactions: [...reactions, emoji] };
                }
                return msg;
            })
        );
        vibrateShort();
    };

    const handleReply = (message: IMessage): void => {
        setReplyingTo({
            id: message.id,
            text: message.text || 'Media message',
            isUser: message.senderId === currentUser.id,
        });
    };

    const handleQuickReply = (text: string): void => {
        setMessageText(text);
        vibrateShort();
    };

    const dismissKeyboard = (): void => {
        Keyboard.dismiss();
        setIsFocused(false);
    };

    const handleRemoveMedia = (index: number): void => {
        setMedia(prev => prev.filter((_, i) => i !== index));
    };

    const renderMessage = ({ item }: { item: IMessage }) => {
        const isUser = item.senderId === currentUser.id;
        return (
            <MessageItem
                item={item}
                isUser={isUser}
                onReact={handleReaction}
                onReply={handleReply}
            />
        );
    };


    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: undefined,
            });
        };
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1">
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View className="flex-1">
                    <LinearGradient
                        colors={['#FFCC00', '#FFB300']}
                        className={`${Platform.OS === 'ios' ? 'pt-0' : 'pt-0'}`}
                    >
                        <ChatHeader
                            agent={agent}
                            isOnline={isOnline}
                            onBack={() => navigation.goBack()}
                            onCall={() => console.log('Call pressed')}
                            onMenu={() => console.log('Menu pressed')}
                        />
                    </LinearGradient>


                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="flex-1"
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                    >
                        <View className="flex-1">
                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                keyExtractor={(item) => item.id}
                                renderItem={renderMessage}
                                contentContainerStyle={{ padding: 20, paddingBottom: 10 }}
                                showsVerticalScrollIndicator={false}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            />

                            {replyingTo && (
                                <ReplyPreview
                                    replyTo={replyingTo}
                                    onCancel={() => setReplyingTo(null)}
                                />
                            )}

                            <QuickReplies
                                replies={QUICK_REPLIES}
                                onReplyPress={handleQuickReply}
                                isVisible={!isFocused}
                            />
                        </View>

                        <ChatInput
                            messageText={messageText}
                            media={media}
                            isLoading={isLoading}
                            isFocused={isFocused}
                            replyingTo={replyingTo}
                            showMediaOptions={showMediaOptions}
                            onMessageTextChange={setMessageText}
                            onSendMessage={sendMessage}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onToggleMediaOptions={() => setShowMediaOptions(!showMediaOptions)}
                            onMediaSelect={(mediaItem) => setMedia([mediaItem])}
                            onRemoveMedia={handleRemoveMedia}
                            onCancelReply={() => setReplyingTo(null)}
                            pickMedia={pickMedia}
                        />
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default ChatScreen;