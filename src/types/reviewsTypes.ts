// types/Reviews.types.ts

export type UserRole = 'user' | 'agent';
export type TabType = 'received' | 'given' | 'add_review';

export interface IReview {
  id: string;
  reviewerName?: string;
  reviewedName?: string;
  reviewerType?: string;
  reviewedType?: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  entityType?: string;
  entityName?: string;
  entityId?: string;
  reply?: IReply | null;
  helpfulCount: number;
  notHelpfulCount: number;
}

export interface IReply {
  agentName: string;
  date: string;
  comment: string;
}

export interface IAgent {
  id: string;
  name: string;
  type: string;
  avatar: string;
}

export interface IHelpfulVotes {
  [reviewId: string]: {
    helpful: number;
    notHelpful: number;
  };
}

export interface IUserVotes {
  [reviewId: string]: boolean | null;
}

export interface IReviewsScreenProps {
  userRole?: UserRole;
  currentUserName?: string;
}

export interface IReviewsHeaderProps {
  userRole: UserRole;
  selectedTab: TabType;
  receivedReviewsCount: number;
  givenReviewsCount: number;
  onBack: () => void;
  onTabChange: (tab: TabType) => void;
  onHeaderAction: () => void;
}

export interface IReviewCardProps {
  review: IReview;
  isReceived: boolean;
  isOwnReview: boolean;
  userRole: UserRole;
  currentUserName: string;
  replyingToReviewId: string | null;
  replyText: string;
  helpfulVotes: IHelpfulVotes;
  userVotes: IUserVotes;
  onReplyStart: (reviewId: string) => void;
  onReplyCancel: () => void;
  onReplyTextChange: (text: string) => void;
  onReplySend: (reviewId: string) => void;
  onHelpfulVote: (reviewId: string, isHelpful: boolean) => void;
  onReport: (reviewId: string) => void;
}

export interface IHelpfulSectionProps {
  reviewId: string;
  isOwnReview: boolean;
  helpfulVotes: IHelpfulVotes;
  userVotes: IUserVotes;
  onHelpfulVote: (reviewId: string, isHelpful: boolean) => void;
}

export interface IReplySectionProps {
  review: IReview;
  userRole: UserRole;
  currentUserName: string;
  replyingToReviewId: string | null;
  replyText: string;
  onReplyStart: (reviewId: string) => void;
  onReplyCancel: () => void;
  onReplyTextChange: (text: string) => void;
  onReplySend: (reviewId: string) => void;
}

export interface IAddReviewSectionProps {
  targetAgent: IAgent;
  reviewRating: number;
  reviewComment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

export interface IEmptyStateProps {
  userRole: UserRole;
  tabType: TabType;
  onWriteReview?: () => void;
}

export interface IStarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}