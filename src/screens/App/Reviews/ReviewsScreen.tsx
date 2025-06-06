// screens/ReviewsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, RefreshControl, ScrollView, View } from 'react-native';
import { FIXED_AGENT_TO_REVIEW, INITIAL_GIVEN_REVIEWS, INITIAL_RECEIVED_REVIEWS, REFRESH_TIMEOUT } from '../../../constants';
import { IAgent, IHelpfulVotes, IReview, IReviewsScreenProps, IUserVotes, TabType } from '../../../types/reviewsTypes';
import { createNewReview, generateReviewId, initializeHelpfulVotes, isOwnReview, validateReview } from '../../../utils/reviewsUtil';
import AddReviewSection from './components/AddReviewSection';
import EmptyState from './components/EmptyState';
import ReviewCard from './components/ReviewCard';
import ReviewsHeader from './components/ReviewsHeader';


const ReviewsScreen: React.FC<IReviewsScreenProps> = ({ 
  userRole = 'user', 
  currentUserName = 'Your Name' 
}) => {
  const navigation = useNavigation();

  // State management
  const [selectedTab, setSelectedTab] = useState<TabType>('received');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [replyingToReviewId, setReplyingToReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [helpfulVotes, setHelpfulVotes] = useState<IHelpfulVotes>({});
  const [userVotes, setUserVotes] = useState<IUserVotes>({});
  const [targetAgent, setTargetAgent] = useState<IAgent | null>(null);
  const [receivedReviews, setReceivedReviews] = useState<IReview[]>([]);
  const [givenReviews, setGivenReviews] = useState<IReview[]>([]);

  // Initialize data
  useEffect(() => {
    // Set entity names based on user role
    const processedReceivedReviews = INITIAL_RECEIVED_REVIEWS.map(review => ({
      ...review,
      entityName: userRole === 'agent' ? 'Your Business Name' : currentUserName,
      reply: review.reply ? {
        ...review.reply,
        agentName: userRole === 'agent' ? 'Your Business Name' : currentUserName
      } : null
    }));

    setReceivedReviews(processedReceivedReviews);
    setGivenReviews(INITIAL_GIVEN_REVIEWS);

    // Initialize helpful votes
    const allReviews = [...processedReceivedReviews, ...INITIAL_GIVEN_REVIEWS];
    setHelpfulVotes(initializeHelpfulVotes(allReviews));
  }, [userRole, currentUserName]);

  // Set target agent for add review
  useEffect(() => {
    if (userRole === 'user' && selectedTab === 'add_review') {
      setTargetAgent(FIXED_AGENT_TO_REVIEW);
    } else if (selectedTab !== 'add_review') {
      setTargetAgent(null);
    }
  }, [selectedTab, userRole]);

  // Event handlers
  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, REFRESH_TIMEOUT);
  };

  const handleTabChange = (tab: TabType): void => {
    setSelectedTab(tab);
  };

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean): void => {
    const currentUserVote = userVotes[reviewId];
    
    // Prevent voting on your own reviews
    const review = [...receivedReviews, ...givenReviews].find(r => r.id === reviewId);
    if (!review) return;
    
    const ownReview = isOwnReview(review, userRole, currentUserName, 
      receivedReviews.some(r => r.id === reviewId));
      
    if (ownReview) {
      Alert.alert("Notice", "You can't vote on your own review");
      return;
    }

    // If user already voted the same way, remove the vote
    if (currentUserVote === isHelpful) {
      setUserVotes(prev => ({ ...prev, [reviewId]: null }));
      setHelpfulVotes(prev => ({
        ...prev,
        [reviewId]: {
          ...prev[reviewId],
          helpful: prev[reviewId].helpful - (isHelpful ? 1 : 0),
          notHelpful: prev[reviewId].notHelpful - (!isHelpful ? 1 : 0)
        }
      }));
      return;
    }

    // Update user vote
    setUserVotes(prev => ({ ...prev, [reviewId]: isHelpful }));
    
    // Update vote counts
    setHelpfulVotes(prev => {
      const current = prev[reviewId] || { helpful: 0, notHelpful: 0 };
      const newVotes = { ...current };
      
      // Remove previous vote if exists
      if (currentUserVote === true) {
        newVotes.helpful = Math.max(0, newVotes.helpful - 1);
      } else if (currentUserVote === false) {
        newVotes.notHelpful = Math.max(0, newVotes.notHelpful - 1);
      }
      
      // Add new vote
      if (isHelpful) {
        newVotes.helpful += 1;
      } else {
        newVotes.notHelpful += 1;
      }
      
      return {
        ...prev,
        [reviewId]: newVotes
      };
    });
  };

  const handleSubmitReview = (): void => {
    if (!targetAgent) {
      Alert.alert('Error', 'A target agent must be set to submit a review.');
      return;
    }

    const validation = validateReview(reviewRating, reviewComment);
    if (!validation.isValid) {
      Alert.alert('Error', validation.error);
      return;
    }

    const newReviewId = generateReviewId('giv', givenReviews);
    const newReview = createNewReview(newReviewId, targetAgent, reviewRating, reviewComment);

    setGivenReviews(prev => [newReview, ...prev]);
    
    // Initialize helpful votes for new review
    setHelpfulVotes(prev => ({
      ...prev,
      [newReview.id]: { helpful: 0, notHelpful: 0 }
    }));
    
    Alert.alert('Success', 'Review submitted successfully!');
    setReviewRating(0);
    setReviewComment('');
    setSelectedTab('given');
    Keyboard.dismiss();
  };

  const handleSendReply = (reviewId: string): void => {
    if (replyText.trim() === '') {
      Alert.alert('Error', 'Reply cannot be empty.');
      return;
    }

    setReceivedReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? {
              ...review,
              reply: {
                agentName: userRole === 'agent' ? 'Your Business Name' : currentUserName,
                date: new Date().toISOString().split('T')[0],
                comment: replyText.trim()
              }
            }
          : review
      )
    );
    
    setReplyingToReviewId(null);
    setReplyText('');
    Keyboard.dismiss();
    Alert.alert('Success', 'Reply sent!');
  };

  const handleReportReview = (reviewId: string): void => {
    Alert.alert('Report', `Reporting review ${reviewId}`);
  };

  const handleHeaderAction = (): void => {
    if (userRole === 'user') {
      setSelectedTab('add_review');
    } else {
      Alert.alert('Agent Actions', 'Access Agent Review Management');
    }
  };

  // Render functions
  const renderReviewList = (reviews: IReview[], isReceived: boolean) => (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewCard
          review={item}
          isReceived={isReceived}
          isOwnReview={isOwnReview(item, userRole, currentUserName, isReceived)}
          userRole={userRole}
          currentUserName={currentUserName}
          replyingToReviewId={replyingToReviewId}
          replyText={replyText}
          helpfulVotes={helpfulVotes}
          userVotes={userVotes}
          onReplyStart={setReplyingToReviewId}
          onReplyCancel={() => {
            setReplyingToReviewId(null);
            setReplyText('');
          }}
          onReplyTextChange={setReplyText}
          onReplySend={handleSendReply}
          onHelpfulVote={handleHelpfulVote}
          onReport={handleReportReview}
        />
      )}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      ListEmptyComponent={() => (
        <EmptyState
          userRole={userRole}
          tabType={selectedTab}
          onWriteReview={selectedTab === 'given' ? () => setSelectedTab('add_review') : undefined}
        />
      )}
    />
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'received':
        return renderReviewList(receivedReviews, true);
      case 'given':
        return userRole === 'user' ? renderReviewList(givenReviews, false) : null;
      case 'add_review':
        return userRole === 'user' && targetAgent ? (
          <AddReviewSection
            targetAgent={targetAgent}
            reviewRating={reviewRating}
            reviewComment={reviewComment}
            onRatingChange={setReviewRating}
            onCommentChange={setReviewComment}
            onSubmit={handleSubmitReview}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <ReviewsHeader
        userRole={userRole}
        selectedTab={selectedTab}
        receivedReviewsCount={receivedReviews.length}
        givenReviewsCount={givenReviews.length}
        onBack={() => navigation.goBack()}
        onTabChange={handleTabChange}
        onHeaderAction={handleHeaderAction}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FFCC00']}
            tintColor="#FFCC00"
          />
        }
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default ReviewsScreen;