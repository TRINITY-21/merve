// types/chatInterfaces.ts

export interface IMessage {
  id: string;
  senderId: string;
  text?: string;
  timestamp: string;
  read: boolean;
  reactions?: string[];
  typing?: boolean;
  media?: IMediaAttachment;
  voiceNote?: IVoiceNote;
  replyTo?: IReplyTo;
}

export interface IMediaAttachment {
  uri: string;
  type: 'image' | 'video';
  id: string;
}

export interface IVoiceNote {
  uri: string;
  duration: number;
  waveform?: number[];
}

export interface IReplyTo {
  id: string;
  text: string;
  isUser: boolean;
}

export interface IAgent {
  id?: string;
  address: string;
  agentType: string;
  businessDescription: string;
  businessLicense: string;
  businessName: string;
  confirmPin: string;
  contactPhone: string;
  email: string;
  idDocument: string;
  isOpen: boolean;
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  networks: string[];
  operatingHours: Record<string, IOperatingHours>;
  otp: string;
  phone: string;
  pin: string;
  services: string[];
  setupPhotos: string[];
  termsAccepted: boolean;
  whatsapp: string;
  avatar?: string;
}

export interface IOperatingHours {
  close: string;
  isClosed: boolean;
  open: string;
}

export interface IUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface IChatHeaderProps {
  agent: IAgent;
  isOnline: boolean;
  onBack: () => void;
  onCall: () => void;
  onMenu: () => void;
}

export interface IMessageItemProps {
  item: IMessage;
  isUser: boolean;
  onReact: (messageId: string, emoji: string) => void;
  onReply: (message: IMessage) => void;
}

export interface ITypingIndicatorProps {
  isVisible: boolean;
}

export interface IQuickRepliesProps {
  replies: string[];
  onReplyPress: (text: string) => void;
  isVisible: boolean;
}

export interface IChatInputProps {
  messageText: string;
  media: IMediaAttachment[];
  isLoading: boolean;
  isFocused: boolean;
  replyingTo: IReplyTo | null;
  showMediaOptions: boolean;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onToggleMediaOptions: () => void;
  onMediaSelect: (media: IMediaAttachment) => void;
  onRemoveMedia: (index: number) => void;
  onCancelReply: () => void;
  pickMedia: (mediaType: 'image' | 'video') => Promise<void>;
}

export interface IMediaOptionsProps {
  isVisible: boolean;
  onImagePick: () => void;
  onVideoPick: () => void;
  onCameraPick: () => void;
  onFilePick: () => void;
}

export interface IMediaPreviewProps {
  media: IMediaAttachment[];
  onRemove: (index: number) => void;
}

export interface IReactionPickerProps {
  isVisible: boolean;
  onReactionSelect: (emoji: string) => void;
  reactions: string[];
}

export interface IMessageReactionsProps {
  reactions: string[];
  onReactionPress?: (emoji: string) => void;
}

export interface IReplyPreviewProps {
  replyTo: IReplyTo;
  onCancel: () => void;
}

export interface IVoiceNoteProps {
  voiceNote: IVoiceNote;
  isUser: boolean;
  onPlay: () => void;
}

export interface IChatScreenProps {
  route: {
    params: {
      agent?: IAgent;
    };
  };
}

export interface IMediaOption {
  type: 'image' | 'video' | 'camera' | 'file';
  label: string;
  icon: string;
  colors: [string, string];
  onPress: () => void;
}

export interface IEmojiReaction {
  emoji: string;
  count: number;
  isSelected: boolean;
}

export interface IMessageFooterProps {
  timestamp: string;
  isUser: boolean;
  isRead?: boolean;
}

export interface IAnimatedMessageProps {
  children: React.ReactNode;
  isUser: boolean;
  onSwipeReply: () => void;
}

export type TMessageType = 'text' | 'image' | 'video' | 'voice' | 'file';

export interface IMessageContentProps {
  message: IMessage;
  isUser: boolean;
  onMediaPress?: (media: IMediaAttachment) => void;
  onVoicePlay?: (voiceNote: IVoiceNote) => void;
}