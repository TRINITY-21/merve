import { MaterialIcons } from '@expo/vector-icons';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme/colors';
import { Typography } from '../common/Typography';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Enhanced interfaces with better type safety
export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
  // Header Configuration
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showCloseButton?: boolean;
  closeIcon?: keyof typeof MaterialIcons.glyphMap;
  headerStyle?: ViewStyle;
  
  // Size Configuration - Fixed maxHeight enforcement
  height?: number | `${number}%`;
  maxHeight?: number | `${number}%`;
  minHeight?: number | `${number}%`;
  
  // Visual Configuration
  backgroundColor?: string;
  borderRadius?: number;
  showHandle?: boolean;
  handleStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  
  // Backdrop Configuration
  closeOnBackdropPress?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  onBackdropPress?: () => void;
  
  // Progress Configuration
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  progressPercentage?: number;
  progressColor?: string;
  
  // Behavior Configuration
  keyboardAware?: boolean;
  scrollEnabled?: boolean;
  scrollViewProps?: any;
  dismissible?: boolean;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  
  // Animation Configuration
  animationDuration?: number;
  animationType?: 'slide' | 'fade' | 'spring';
  springConfig?: {
    tension?: number;
    friction?: number;
  };
  
  // Keyboard Configuration
  keyboardAvoidingBehavior?: 'height' | 'position' | 'padding';
  keyboardVerticalOffset?: number;
  
  // Status Bar Configuration - Improved handling
  preserveStatusBar?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  statusBarBackgroundColor?: string;
  
  // Safe Area Configuration
  safeAreaEdges?: ('top' | 'right' | 'bottom' | 'left')[];
  ignoreTopSafeArea?: boolean;
  
  // Callbacks
  onShow?: () => void;
  onHide?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

export interface BottomSheetRef {
  close: () => void;
  open: () => void;
  toggle: () => void;
  snapTo: (height: number) => void;
  getCurrentHeight: () => number;
}

// Snap points for common use cases
export const BottomSheetSnapPoints = {
  SMALL: '25%' as const,
  MEDIUM: '50%' as const,
  LARGE: '75%' as const,
  FULL: '90%' as const,
} as const;

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      isVisible,
      onClose,
      children,
      
      // Header props with better defaults
      title,
      subtitle,
      showHeader = !!title || !!subtitle,
      showCloseButton = true,
      closeIcon = 'close',
      headerStyle,
      
      // Size props with proper constraints
      height = '72%',
      maxHeight = '90%',
      minHeight = '60%',
      
      // Visual props
      backgroundColor = colors.white,
      borderRadius = 24,
      showHandle = true,
      handleStyle,
      contentStyle,
      
      // Backdrop props
      closeOnBackdropPress = true,
      backdropColor = '#000000',
      backdropOpacity = 0.5,
      onBackdropPress,
      
      // Progress props
      showProgress = false,
      currentStep,
      totalSteps = 3,
      progressPercentage,
      progressColor = colors.primary,
      
      // Behavior props
      keyboardAware = true,
      scrollEnabled = true,
      scrollViewProps = {},
      dismissible = true,
      swipeToClose = true,
      swipeThreshold = 100,
      
      // Animation props
      animationDuration = 300,
      animationType = 'spring',
      springConfig = { tension: 300, friction: 30 },
      
      // Keyboard props
      keyboardAvoidingBehavior = Platform.OS === 'ios' ? 'padding' : 'height',
      keyboardVerticalOffset = 0,
      
      // Status bar props - Better handling
      preserveStatusBar = true,
      statusBarStyle,
      statusBarBackgroundColor,
      
      // Safe area props
      safeAreaEdges = ['bottom'],
      ignoreTopSafeArea = false,
      
      // Callbacks
      onShow,
      onHide,
      onSwipeStart,
      onSwipeEnd,
    },
    ref
  ) => {
    // State management
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);
    const [originalStatusBarStyle, setOriginalStatusBarStyle] = useState<any>(null);
    
    // Animation refs
    const modalAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
    
    // Gesture handling
    const panGestureRef = useRef<any>(null);
    const lastGestureY = useRef(0);
    
    // Safe area insets
    const insets = useSafeAreaInsets();
    
    // Utility function to parse height values
    const parseHeight = useCallback((value: number | string): number => {
      if (typeof value === 'string' && value.endsWith('%')) {
        const percentage = parseFloat(value.replace('%', ''));
        return (SCREEN_HEIGHT * percentage) / 100;
      }
      return value as number;
    }, []);
    
    // Calculate constrained height with proper maxHeight enforcement and screen bounds
    const getConstrainedHeight = useCallback((): number => {
      const desiredHeight = parseHeight(height);
      const maxHeightValue = parseHeight(maxHeight);
      const minHeightValue = parseHeight(minHeight);
      
      // Calculate safe maximum height based on screen and safe areas
      const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;
      const topSafeArea = ignoreTopSafeArea ? 0 : insets.top;
      const bottomSafeArea = safeAreaEdges.includes('bottom') ? insets.bottom : 0;
      
      // Maximum possible height that won't overflow the screen
      const screenSafeHeight = SCREEN_HEIGHT - statusBarHeight - topSafeArea - bottomSafeArea;
      
      let finalHeight = desiredHeight;
      
      // Apply keyboard adjustments for Android
      if (Platform.OS === 'android' && keyboardVisible && keyboardAware) {
        const availableHeight = SCREEN_HEIGHT - statusBarHeight - keyboardHeight - bottomSafeArea;
        finalHeight = Math.min(finalHeight, availableHeight - 20);
      }
      
      // First, ensure we don't exceed screen bounds (critical fix for 170% case)
      finalHeight = Math.min(finalHeight, screenSafeHeight);
      
      // Then enforce user-defined min/max constraints
      finalHeight = Math.max(minHeightValue, Math.min(maxHeightValue, finalHeight));
      
      // Final safety check to ensure we never exceed screen bounds
      finalHeight = Math.min(finalHeight, screenSafeHeight);
      
      // Ensure we have a reasonable minimum (at least 10% of screen)
      const absoluteMinHeight = SCREEN_HEIGHT * 0.1;
      finalHeight = Math.max(absoluteMinHeight, finalHeight);
      
      return Math.floor(finalHeight);
    }, [height, maxHeight, minHeight, keyboardVisible, keyboardHeight, keyboardAware, parseHeight, insets, ignoreTopSafeArea, safeAreaEdges]);
    
    // Imperative handle for ref methods
    useImperativeHandle(ref, () => ({
      close: () => handleClose(),
      open: () => handleOpen(),
      toggle: () => isVisible ? handleClose() : handleOpen(),
      snapTo: (snapHeight: number) => {
        setCurrentHeight(snapHeight);
        animateToHeight(snapHeight);
      },
      getCurrentHeight: () => currentHeight,
    }));
    
    // Keyboard listeners
    useEffect(() => {
      if (!keyboardAware) return;
      
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
      
      const keyboardDidShow = Keyboard.addListener(showEvent, (evt) => {
        setKeyboardVisible(true);
        setKeyboardHeight(evt.endCoordinates.height);
      });
      
      const keyboardDidHide = Keyboard.addListener(hideEvent, () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      });
      
      return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      };
    }, [keyboardAware]);
    
    // Status bar handling - Improved
    useEffect(() => {
      if (preserveStatusBar) return;
      
      if (isVisible && statusBarStyle) {
        // Store original status bar style
        // setOriginalStatusBarStyle(StatusBar._defaultProps?.barStyle as any);
        StatusBar.setBarStyle(statusBarStyle, true);
        
        if (statusBarBackgroundColor && Platform.OS === 'android') {
          StatusBar.setBackgroundColor(statusBarBackgroundColor, true);
        }
      }
      
      return () => {
        if (!preserveStatusBar && originalStatusBarStyle) {
          StatusBar.setBarStyle(originalStatusBarStyle, true);
        }
      };
    }, [isVisible, statusBarStyle, statusBarBackgroundColor, preserveStatusBar, originalStatusBarStyle]);
    
    // Animation functions
    const animateToHeight = useCallback((toHeight: number) => {
      const animations = [
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT - toHeight,
          duration: animationDuration,
          useNativeDriver: true,
        })
      ];
      
      if (animationType === 'spring') {
        animations[0] = Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT - toHeight,
          ...springConfig,
          useNativeDriver: true,
        });
      }
      
      Animated.parallel(animations).start();
    }, [translateY, animationDuration, animationType, springConfig]);
    
    const handleOpen = useCallback(() => {
      const targetHeight = getConstrainedHeight();
      setCurrentHeight(targetHeight);
      
      modalAnim.setValue(1);
      translateY.setValue(SCREEN_HEIGHT);
      backdropAnim.setValue(0);
      
      const animations = [
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        animationType === 'spring'
          ? Animated.spring(translateY, {
              toValue: SCREEN_HEIGHT - targetHeight,
              ...springConfig,
              useNativeDriver: true,
            })
          : Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT - targetHeight,
              duration: animationDuration,
              useNativeDriver: true,
            })
      ];
      
      Animated.parallel(animations).start(() => {
        onShow?.();
      });
    }, [getConstrainedHeight, modalAnim, translateY, backdropAnim, animationDuration, animationType, springConfig, onShow]);
    
    const handleClose = useCallback(() => {
      const animations = [
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: animationDuration,
          useNativeDriver: true,
        })
      ];
      
      Animated.parallel(animations).start(() => {
        modalAnim.setValue(0);
        onHide?.();
        onClose();
      });
    }, [backdropAnim, translateY, modalAnim, animationDuration, onHide, onClose]);
    
    // Handle visibility changes
    useEffect(() => {
      if (isVisible) {
        handleOpen();
      } else {
        handleClose();
      }
    }, [isVisible]);
    
    // Update height when dependencies change
    useEffect(() => {
      if (isVisible) {
        const newHeight = getConstrainedHeight();
        if (newHeight !== currentHeight) {
          setCurrentHeight(newHeight);
          animateToHeight(newHeight);
        }
      }
    }, [isVisible, keyboardVisible, keyboardHeight, height, maxHeight, minHeight]);
    
    // Backdrop press handler
    const handleBackdropPress = useCallback(() => {
      if (closeOnBackdropPress && dismissible) {
        onBackdropPress ? onBackdropPress() : handleClose();
      }
    }, [closeOnBackdropPress, dismissible, onBackdropPress, handleClose]);
    
    // Gesture handlers for swipe to close
    const handleGestureEvent = useCallback((event: any) => {
      if (!swipeToClose || !dismissible) return;
      
      const { translationY } = event.nativeEvent;
      lastGestureY.current = translationY;
      
      if (translationY > 0) {
        translateY.setValue(SCREEN_HEIGHT - currentHeight + translationY);
      }
    }, [swipeToClose, dismissible, translateY, currentHeight]);
    
    const handleGestureEnd = useCallback(() => {
      if (!swipeToClose || !dismissible) return;
      
      onSwipeEnd?.();
      
      if (lastGestureY.current > swipeThreshold) {
        handleClose();
      } else {
        animateToHeight(currentHeight);
      }
      
      lastGestureY.current = 0;
    }, [swipeToClose, dismissible, swipeThreshold, handleClose, animateToHeight, currentHeight, onSwipeEnd]);
    
    // Progress calculation
    const calculateProgress = useCallback((): number => {
      if (progressPercentage !== undefined) {
        return Math.max(0, Math.min(100, progressPercentage));
      }
      if (currentStep !== undefined && totalSteps > 0) {
        return (currentStep / totalSteps) * 100;
      }
      return 0;
    }, [progressPercentage, currentStep, totalSteps]);
    
    // Render methods
    const renderHandle = (): React.ReactElement | null => {
      if (!showHandle) return null;
      
      return (
        <View style={{
          alignItems: 'center',
          paddingVertical: 12,
          paddingTop: ignoreTopSafeArea ? 12 : Math.max(12, Math.min(insets.top / 2, 20)), // Cap the top padding
        }}>
          <View
            style={[
              {
                width: 36,
                height: 4,
                backgroundColor: colors.gray?.light || '#E5E7EB',
                borderRadius: 2,
              },
              handleStyle,
            ]}
          />
        </View>
      );
    };
    
    const renderHeader = (): React.ReactElement | null => {
      if (!showHeader) return null;
      
      return (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray?.light || '#F3F4F6',
            },
            headerStyle,
          ]}
        >
          <View style={{ flex: 1 }}>
            {title && (
              <Typography
                variant="bold"
                size={18}
                style={{ color: colors.text?.primary || '#111827' }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="regular"
                size={14}
                style={{
                  color: colors.text?.secondary || '#6B7280',
                  marginTop: 4,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </View>
          
          {showCloseButton && (
            <TouchableOpacity
              onPress={handleClose}
              style={{
                marginLeft: 16,
                padding: 8,
                borderRadius: 20,
                backgroundColor: colors.gray?.light || '#F3F4F6',
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={closeIcon}
                size={20}
                color={colors.text?.secondary || '#6B7280'}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    };
    
    const renderProgress = (): React.ReactElement | null => {
      if (!showProgress) return null;
      
      const progress = calculateProgress();
      
      return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <View
            style={{
              height: 6,
              backgroundColor: colors.gray?.light || '#F3F4F6',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: progressColor,
                borderRadius: 3,
                width: `${progress}%`,
              }}
            />
          </View>
          
          {(currentStep !== undefined || progressPercentage !== undefined) && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Typography
                variant="regular"
                size={12}
                style={{ color: colors.text?.secondary || '#6B7280' }}
              >
                {currentStep !== undefined
                  ? `Step ${currentStep} of ${totalSteps}`
                  : 'Progress'}
              </Typography>
              <Typography
                variant="regular"
                size={12}
                style={{ color: colors.text?.secondary || '#6B7280' }}
              >
                {Math.round(progress)}% Complete
              </Typography>
            </View>
          )}
        </View>
      );
    };
    
    const renderContent = (): React.ReactElement => {
      const contentPadding = {
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: Math.max(20, insets.bottom),
      };
      
      if (!keyboardAware || !scrollEnabled) {
        return (
          <View style={[{ flex: 1 }, contentPadding, contentStyle]}>
            {children}
          </View>
        );
      }
      
      return (
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={[
            {
              flexGrow: 1,
              ...contentPadding,
            },
            contentStyle,
          ]}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableAutomaticScroll={true}
          extraHeight={Platform.OS === 'ios' ? 0 : 20}
          extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
          enableResetScrollToCoords={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
          {...scrollViewProps}
        >
          {children}
        </KeyboardAwareScrollView>
      );
    };
    
    if (!isVisible) return null;
    
    const safeAreaConfig = ignoreTopSafeArea 
      ? safeAreaEdges.filter(edge => edge !== 'top')
      : safeAreaEdges;
    
    return (
      <Modal
        visible={true}
        transparent
        animationType="none"
        statusBarTranslucent={!preserveStatusBar}
        onRequestClose={dismissible ? handleClose : undefined}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: `${backdropColor}${Math.round(backdropOpacity * 255).toString(16).padStart(2, '0')}`,
                opacity: backdropAnim,
              }}
            />
          </TouchableWithoutFeedback>
          
          {/* Bottom Sheet */}
          <PanGestureHandler
            ref={panGestureRef}
            onGestureEvent={handleGestureEvent}
            onEnded={handleGestureEnd}
            enabled={swipeToClose && dismissible}
          >
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                height: currentHeight,
                transform: [{ translateY }],
                // Shadow for depth
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: -2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 16,
              }}
            >
              <SafeAreaView style={{ flex: 1 }} edges={safeAreaConfig}>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={keyboardAvoidingBehavior}
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  {renderHandle()}
                  {renderHeader()}
                  {renderProgress()}
                  {renderContent()}
                </KeyboardAvoidingView>
              </SafeAreaView>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Modal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';