// screens/ProductDetailsScreen.tsx

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IChatMessage, IDetailedProduct, IProductDetailsScreenProps, TabKey } from '../../../../types/productDetailsTypes';
import { initialChatMessages, mockProduct, mockReviews, mockSimilarProducts, tabs } from '../../../../utils/productDetailsDummyData';
import { LoadingState } from '../UserShop/components/details/LoadingState';
import { BottomActions, ChatBottomSheet, ImageModal, OptionsMenu, ProductDescription, ProductDetailsHeader, ProductImageGallery, ProductInfo, ProductReviews, ProductSpecifications, ProductTabs, SellerInfo, SimilarProducts } from './components/productDetails';

const ProductDetailsScreen: React.FC<IProductDetailsScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { productId } = route.params as { productId: string };
  const [isLoading, setIsLoading] = useState(true);

  // State management
  const [product, setProduct] = useState<IDetailedProduct | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [showSimilarProducts, setShowSimilarProducts] = useState<boolean>(true);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [showChatBottomSheet, setShowChatBottomSheet] = useState<boolean>(false);
  const [isFollowingSeller, setIsFollowingSeller] = useState<boolean>(false);
  const [showSellerNumber, setShowSellerNumber] = useState<boolean>(false);

  // Chat state
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const chatSheetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setProduct(mockProduct);
    setChatMessages(initialChatMessages);

    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [productId]);


    useFocusEffect(
    React.useCallback(() => {
      // Hide tab bar when this screen is focused
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
      
      return () => {
        // Show tab bar when leaving this screen
        navigation.getParent()?.setOptions({
          tabBarStyle: { 
            display: 'flex',
            // Add your normal tab bar styling here
          }
        });
      };
    }, [navigation])
  );



  // Updated header opacity animation - starts appearing earlier
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    setShowOptionsMenu(false);
    console.log('Share product');
  };

  const handleFollowSeller = () => {
    setShowOptionsMenu(false);
    setIsFollowingSeller(!isFollowingSeller);
  };

  const handleReportSeller = () => {
    setShowOptionsMenu(false);
    console.log('Report seller');
  };

  const handleCall = () => {
    setShowSellerNumber(true);
    console.log('Call seller:', product?.agent.phone);
  };

  const handleOpenChat = () => {
    setShowChatBottomSheet(true);
    Animated.spring(chatSheetAnim, {
      toValue: 1,
      tension: 20,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseChat = () => {
    Animated.spring(chatSheetAnim, {
      toValue: 0,
      tension: 20,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      setShowChatBottomSheet(false);
    });
  };

  const handleDirections = () => {
    console.log('Get directions to seller');
  };

  const sendMessage = () => {
    if (chatMessage.trim() === '') return;

    const newMessage: IChatMessage = {
      id: `m${Date.now()}`,
      text: chatMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
    Keyboard.dismiss();

    // Simulate message delivery
    setTimeout(() => {
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate seller response
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    setTimeout(() => {
      setIsTyping(false);
      const sellerResponse: IChatMessage = {
        id: `m${Date.now() + 1}`,
        text: "Thanks for your message! I'll get back to you shortly.",
        sender: 'seller',
        timestamp: new Date(),
        status: 'delivered'
      };
      setChatMessages(prev => [...prev, sellerResponse]);
    }, 4000);
  };

  const renderTabContent = () => {
    if (!product) return null;

    switch (activeTab) {
      case 'description':
        return (
          <ProductDescription
            description={product.description}
            showFull={showFullDescription}
            onToggle={() => setShowFullDescription(!showFullDescription)}
          />
        );
      case 'specifications':
        return <ProductSpecifications specifications={product.specifications} />;
      case 'reviews':
        return (
          <ProductReviews
            reviews={mockReviews}
            productRating={product.rating}
            totalReviews={product.totalReviews}
            showAll={showAllReviews}
            onToggleShowAll={() => setShowAllReviews(!showAllReviews)}
          />
        );
      case 'seller':
        return (
          <SellerInfo
            agent={product.agent}
            onViewProfile={() => navigation.navigate('SellerProfile' as never, { sellerId: product.agent.id } as never)}
            onViewStore={() => navigation.navigate('SellerProducts' as never, { sellerId: product.agent.id } as never)}
          />
        );
      default:
        return (
          <ProductDescription
            description={product.description}
            showFull={showFullDescription}
            onToggle={() => setShowFullDescription(!showFullDescription)}
          />
        );
    }
  };

  useEffect(() => {
    // Simulate loading for 3 seconds
    if (product) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [product]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingState />
      </View>
    );
  }

  if (!product) return null;

  return ( 
    <View className="flex-1 bg-white">
      <ProductDetailsHeader
        productTitle={product.title}
        isFavorite={isFavorite}
        headerOpacity={headerOpacity}
        onBack={() =>navigation.goBack()}
        onFavoritePress={toggleFavorite}
        onOptionsPress={() => setShowOptionsMenu(true)}
      />

      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 120, // Extra space for bottom actions + safe area
        }}
      >
        <ProductImageGallery
          images={product.images}
          selectedIndex={selectedImageIndex}
          isPromoted={product.isPromoted}
          discount={product.discount}
          isFavorite={isFavorite}
          onImagePress={() => setShowImageModal(true)}
          onImageChange={setSelectedImageIndex}
          onFavoritePress={toggleFavorite}
          onOptionsPress={() => setShowOptionsMenu(true)}
        />

        <ProductInfo
          product={product}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
        />

        <ProductTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabKey) => setActiveTab(tabKey as TabKey)}
        />

        {renderTabContent()}

        <SimilarProducts
          products={mockSimilarProducts}
          visible={showSimilarProducts}
          onClose={() => setShowSimilarProducts(false)}
          onProductPress={(id) => navigation.push('ProductDetails' as never, { productId: id } as never)}
        />
      </Animated.ScrollView>

      <BottomActions
        showSellerNumber={showSellerNumber}
        sellerPhone={product.agent.phone}
        onCall={handleCall}
        onDirections={handleDirections}
        onMessage={handleOpenChat}
      />

      <ImageModal
        visible={showImageModal}
        images={product.images}
        selectedIndex={selectedImageIndex}
        onClose={() => setShowImageModal(false)}
      />

      <OptionsMenu
        visible={showOptionsMenu}
        isFollowingSeller={isFollowingSeller}
        onClose={() => setShowOptionsMenu(false)}
        onShare={handleShare}
        onFollowSeller={handleFollowSeller}
        onReportSeller={handleReportSeller}
      />

      <ChatBottomSheet
        visible={showChatBottomSheet}
        agent={product.agent}
        messages={chatMessages}
        isTyping={isTyping}
        chatMessage={chatMessage}
        chatSheetAnim={chatSheetAnim}
        onClose={handleCloseChat}
        onSendMessage={sendMessage}
        onMessageChange={setChatMessage}
        onCall={handleCall}
      />
    </View>
  );
};

export default ProductDetailsScreen;