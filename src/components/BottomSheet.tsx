import { MaterialIcons } from '@expo/vector-icons';
import React, {
    forwardRef,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constant/theme/colors';
import { Typography } from './Typography';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number | string;
  maxHeight?: number | string;
  showHeader?: boolean;
  showHandle?: boolean;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  progressPercentage?: number;
  closeOnBackdropPress?: boolean;
  backdropColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  keyboardAware?: boolean;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  handleStyle?: ViewStyle;
  showCloseButton?: boolean;
  closeIcon?: string;
  animationDuration?: number;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarTranslucent?: boolean;
  onBackdropPress?: () => void;
  scrollEnabled?: boolean;
  scrollViewProps?: any;
  androidKeyboardAvoid?: boolean;
  safeAreaEdges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export interface BottomSheetRef {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      isVisible,
      onClose,
      children,
      title,
      height = SCREEN_HEIGHT * 0.72,
      maxHeight = SCREEN_HEIGHT * 0.9,
      showHeader = true,
      showHandle = true,
      showProgress = false,
      currentStep,
      totalSteps = 3,
      progressPercentage,
      closeOnBackdropPress = true,
      backdropColor = 'rgba(0,0,0,0.5)',
      backgroundColor = colors.white,
      borderRadius = 24,
      keyboardAware = true,
      headerStyle,
      contentStyle,
      handleStyle,
      showCloseButton = true,
      closeIcon = 'close',
      animationDuration = 300,
      statusBarStyle = 'light-content',
      statusBarTranslucent = false,
      onBackdropPress,
      scrollEnabled = true,
      scrollViewProps = {},
      androidKeyboardAvoid = true,
      safeAreaEdges = ['top', 'bottom'],
    },
    ref
  ) => {
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    const modalAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

    useImperativeHandle(ref, () => ({
      close: () => onClose(),
      open: () => {},
      toggle: () => onClose(),
    }));

    useEffect(() => {
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
    }, []);

    useEffect(() => {
      if (isVisible) {
        Animated.timing(modalAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(modalAnim, {
          toValue: 0,
          duration: animationDuration - 100,
          useNativeDriver: true,
        }).start();
      }
    }, [isVisible, animationDuration]);

    const handleBackdropPress = (): void => {
      if (closeOnBackdropPress) {
        onBackdropPress ? onBackdropPress() : onClose();
      }
    };

    const getSheetHeight = (): number => {
      if (Platform.OS === 'ios') {
        if (typeof height === 'string') {
          const pct = parseFloat(height.replace('%', ''));
          return (SCREEN_HEIGHT * pct) / 100;
        }
        return height as number;
      }

      let calculatedHeight: number;
      if (typeof height === 'string') {
        const pct = parseFloat(height.replace('%', ''));
        calculatedHeight = (SCREEN_HEIGHT * pct) / 100;
      } else {
        calculatedHeight = height as number;
      }

      if (keyboardVisible && androidKeyboardAvoid) {
        const statusBarHeight = StatusBar.currentHeight || 0;
        const safeAreaTop = 0;
        const availableHeight =
          SCREEN_HEIGHT - statusBarHeight - safeAreaTop - keyboardHeight;
        return Math.min(calculatedHeight, availableHeight);
      }
      return calculatedHeight;
    };

    const getMaxSheetHeight = (): number => {
      if (typeof maxHeight === 'string') {
        const pct = parseFloat(maxHeight.replace('%', ''));
        return (SCREEN_HEIGHT * pct) / 100;
      }
      return maxHeight as number;
    };

    const calculateProgress = (): number => {
      if (progressPercentage !== undefined) {
        return Math.max(0, Math.min(100, progressPercentage));
      }
      if (currentStep !== undefined && totalSteps > 0) {
        return (currentStep / totalSteps) * 100;
      }
      return 0;
    };

    const renderHandle = (): React.ReactElement | null => {
      if (!showHandle) return null;
      return (
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 8,
          }}
        >
          <View
            style={[
              {
                width: 40,
                height: 4,
                backgroundColor: colors.gray.light,
                borderRadius: 2,
              },
              handleStyle,
            ]}
          />
        </View>
      );
    };

    const renderHeader = (): React.ReactElement | null => {
      if (!showHeader && !title) return null;
      return (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray.light,
            },
            headerStyle,
          ]}
        >
          {title ? (
            <Typography
              variant="bold"
              size={18}
              style={{ color: colors.text.primary }}
            >
              {title}
            </Typography>
          ) : (
            <View />
          )}
          {showCloseButton && (
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons
                name={closeIcon as any}
                size={24}
                color={colors.text.secondary}
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
              backgroundColor: colors.gray.light,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: colors.primary,
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
                style={{ color: colors.text.secondary }}
              >
                {currentStep !== undefined
                  ? `Step ${currentStep} of ${totalSteps}`
                  : 'Progress'}
              </Typography>
              <Typography
                variant="regular"
                size={12}
                style={{ color: colors.text.secondary }}
              >
                {Math.round(progress)}% Complete
              </Typography>
            </View>
          )}
        </View>
      );
    };

    const renderContent = (): React.ReactElement => {
      if (!keyboardAware) {
        return (
          <View style={[{ flex: 1, paddingHorizontal: 20 }, contentStyle]}>
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
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: Platform.OS === 'android' && keyboardVisible
                ? Math.max(keyboardHeight + 20, 0)
                : 60,
            },
            contentStyle,
          ]}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableAutomaticScroll={true}
          extraHeight={Platform.OS === 'ios' ? 0 : 0}
          extraScrollHeight={Platform.OS === 'ios' ? 10 : 0}
          enableResetScrollToCoords={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...scrollViewProps}
        >
          {children}
        </KeyboardAwareScrollView>
      );
    };

    return (
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        statusBarTranslucent={statusBarTranslucent}
        onRequestClose={onClose}
      >
        <StatusBar
          backgroundColor={backdropColor}
          barStyle={statusBarStyle}
          translucent={statusBarTranslucent}
        />

        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: backdropColor,
              justifyContent: 'flex-end',
              opacity: modalAnim,
            }}
          >
            <TouchableWithoutFeedback>
              {/* Wrap content in KeyboardAvoidingView on iOS */}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ width: '100%' }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
              >
                <Animated.View
                  style={{
                    backgroundColor,
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    height: getSheetHeight(),
                    maxHeight: getMaxSheetHeight(),
                    transform: [
                      {
                        translateY: modalAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [SCREEN_HEIGHT, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <SafeAreaView style={{ flex: 1 }} edges={safeAreaEdges}>
                    <View style={{ flex: 1 }}>
                      {renderHandle()}
                      {renderHeader()}
                      {renderProgress()}
                      {renderContent()}
                    </View>
                  </SafeAreaView>
                </Animated.View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
