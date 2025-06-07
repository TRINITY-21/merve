import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import {
    Dimensions,
    Keyboard,
    LayoutChangeEvent,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetModalRef {
  open: () => void;
  close: () => void;
  snapTo: (index: number) => void;
  scrollToInput: (node: any) => void;
  scrollToEnd: () => void;
}

export interface BottomSheetModalProps {
  children: ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  height?: number | 'auto' | 'full';
  maxHeight?: number;
  minHeight?: number;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  closeOnPressBack?: boolean;
  dragFromTopOnly?: boolean;
  showIndicator?: boolean;
  indicatorStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  draggableIconStyle?: ViewStyle;
  animationType?: 'none' | 'fade' | 'slide';
  animationDuration?: number;
  customStyles?: {
    wrapper?: ViewStyle;
    container?: ViewStyle;
    draggableIcon?: ViewStyle;
  };
  keyboardAwareScrollViewProps?: any;
  scrollable?: boolean;
  snapPoints?: number[];
  headerComponent?: ReactNode;
  footerComponent?: ReactNode;
  footerHeight?: number;
  headerHeight?: number;
  enabledContentTapToDismiss?: boolean;
  enabledContentGestureInteraction?: boolean;
  bounces?: boolean;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
  extraScrollHeight?: number;
  extraHeight?: number;
  enableResetScrollToCoords?: boolean;
  enableAutomaticScroll?: boolean;
  viewIsInsideTabBar?: boolean;
  enableOnAndroid?: boolean;
}

const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  (
    {
      children,
      onClose,
      onOpen,
      height = 'auto',
      maxHeight = SCREEN_HEIGHT * 0.9,
      minHeight = 100,
      closeOnDragDown = true,
      closeOnPressMask = true,
      closeOnPressBack = true,
      dragFromTopOnly = false,
      showIndicator = true,
      indicatorStyle,
      containerStyle,
      wrapperStyle,
      draggableIconStyle,
      animationType = 'slide',
      animationDuration = 300,
      customStyles,
      keyboardAwareScrollViewProps,
      scrollable = true,
      snapPoints = [],
      headerComponent,
      footerComponent,
      footerHeight = 0,
      headerHeight = 0,
      enabledContentTapToDismiss = false,
      enabledContentGestureInteraction = true,
      bounces = false,
      scrollEnabled = true,
      showsVerticalScrollIndicator = false,
      keyboardShouldPersistTaps = 'handled',
      extraScrollHeight = 100,
      extraHeight = 0,
      enableResetScrollToCoords = true,
      enableAutomaticScroll = true,
      viewIsInsideTabBar = false,
      enableOnAndroid = true,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const rbSheetRef = useRef<RBSheet>(null);
    const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // Calculate actual height
    const getSheetHeight = useCallback(() => {
      if (height === 'full') {
        return SCREEN_HEIGHT - insets.top;
      } else if (height === 'auto') {
        const totalContentHeight = contentHeight + headerHeight + footerHeight;
        const calculatedHeight = totalContentHeight + insets.bottom + (showIndicator ? 20 : 0);
        return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
      } else {
        return Math.min(height, maxHeight);
      }
    }, [height, contentHeight, insets, maxHeight, minHeight, showIndicator, headerHeight, footerHeight]);

    // Public methods
    const open = useCallback(() => {
      rbSheetRef.current?.open();
      setIsOpen(true);
    }, []);

    const close = useCallback(() => {
      Keyboard.dismiss();
      rbSheetRef.current?.close();
      setIsOpen(false);
    }, []);

    const snapTo = useCallback((index: number) => {
      // This would require extending RBSheet or using a different library
      console.warn('snapTo is not implemented in react-native-raw-bottom-sheet');
    }, []);

    const scrollToInput = useCallback((node: any) => {
      scrollViewRef.current?.scrollToFocusedInput(node);
    }, []);

    const scrollToEnd = useCallback(() => {
      scrollViewRef.current?.scrollToEnd();
    }, []);

    useImperativeHandle(ref, () => ({
      open,
      close,
      snapTo,
      scrollToInput,
      scrollToEnd,
    }));

    // Handle content layout
    const handleContentLayout = (event: LayoutChangeEvent) => {
      if (height === 'auto') {
        const { height: layoutHeight } = event.nativeEvent.layout;
        setContentHeight(layoutHeight);
      }
    };

    // Merge custom styles
    const mergedCustomStyles = {
      wrapper: [styles.wrapper, customStyles?.wrapper, wrapperStyle],
      container: [
        styles.container,
        { paddingBottom: insets.bottom },
        customStyles?.container,
        containerStyle,
      ],
      draggableIcon: [
        styles.draggableIcon,
        customStyles?.draggableIcon,
        draggableIconStyle,
        indicatorStyle,
      ],
    };

    const sheetHeight = getSheetHeight();

    return (
      <RBSheet
        ref={rbSheetRef}
        height={sheetHeight}
        openDuration={animationDuration}
        closeDuration={animationDuration}
        animationType={animationType}
        closeOnDragDown={closeOnDragDown}
        closeOnPressMask={closeOnPressMask}
        closeOnPressBack={closeOnPressBack}
        dragFromTopOnly={dragFromTopOnly}
        customStyles={mergedCustomStyles}
        onClose={() => {
          setIsOpen(false);
          onClose?.();
        }}
        onOpen={() => {
          setIsOpen(true);
          onOpen?.();
        }}
      >
        <View style={styles.contentContainer}>
          {headerComponent && (
            <View style={[styles.header, { height: headerHeight || undefined }]}>
              {headerComponent}
            </View>
          )}

          {scrollable ? (
            <KeyboardAwareScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              bounces={bounces}
              scrollEnabled={scrollEnabled}
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              extraScrollHeight={extraScrollHeight}
              extraHeight={extraHeight}
              enableResetScrollToCoords={enableResetScrollToCoords}
              enableAutomaticScroll={enableAutomaticScroll}
              viewIsInsideTabBar={viewIsInsideTabBar}
              enableOnAndroid={enableOnAndroid}
              onLayout={height === 'auto' ? handleContentLayout : undefined}
              {...keyboardAwareScrollViewProps}
            >
              {children}
            </KeyboardAwareScrollView>
          ) : (
            <View
              style={styles.content}
              onLayout={height === 'auto' ? handleContentLayout : undefined}
            >
              {children}
            </View>
          )}

          {footerComponent && (
            <View style={[styles.footer, { height: footerHeight || undefined }]}>
              {footerComponent}
            </View>
          )}
        </View>
      </RBSheet>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  draggableIcon: {
    width: 40,
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

export default BottomSheetModal;

// Advanced usage example with complete form handling:
/*
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardTypeOptions,
} from 'react-native';
import BottomSheetModal, { BottomSheetModalRef } from './BottomSheetModal';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'number' | 'phone';
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
}

const App = () => {
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);
  const inputRefs = useRef<{ [key: string]: TextInput | null }>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    message: '',
    newsletter: false,
  });

  const formFields: FormField[] = [
    {
      id: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      type: 'email',
      keyboardType: 'email-address',
    },
    {
      id: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      type: 'phone',
      keyboardType: 'phone-pad',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
      secureTextEntry: true,
    },
    {
      id: 'message',
      label: 'Message',
      placeholder: 'Enter your message here...',
      type: 'textarea',
      multiline: true,
      numberOfLines: 4,
    },
  ];

  const handleSubmit = () => {
    // Validate form
    const requiredFields = ['name', 'email', 'message'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      Alert.alert('Error', `Please fill in: ${emptyFields.join(', ')}`);
      return;
    }

    Alert.alert(
      'Form Submitted Successfully',
      JSON.stringify(formData, null, 2),
      [{ text: 'OK', onPress: () => bottomSheetRef.current?.close() }]
    );
  };

  const handleInputFocus = (inputId: string) => {
    // Scroll to the focused input
    const inputRef = inputRefs.current[inputId];
    if (inputRef) {
      bottomSheetRef.current?.scrollToInput(inputRef);
    }
  };

  const HeaderComponent = (
    <View style={exampleStyles.header}>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
        <Text style={exampleStyles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={exampleStyles.headerTitle}>Complete Registration</Text>
      <View style={{ width: 30 }} />
    </View>
  );

  const FooterComponent = (
    <View style={exampleStyles.footer}>
      <TouchableOpacity
        style={exampleStyles.cancelButton}
        onPress={() => bottomSheetRef.current?.close()}
      >
        <Text style={exampleStyles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={exampleStyles.submitButton} 
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={exampleStyles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TouchableOpacity
        style={exampleStyles.openButton}
        onPress={() => bottomSheetRef.current?.open()}
      >
        <Text style={exampleStyles.openButtonText}>Open Registration Form</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        height="auto"
        maxHeight={SCREEN_HEIGHT * 0.85}
        closeOnDragDown={true}
        closeOnPressMask={true}
        showIndicator={true}
        headerComponent={HeaderComponent}
        footerComponent={FooterComponent}
        headerHeight={60}
        footerHeight={80}
        scrollable={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={120}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
      >
        <View style={exampleStyles.formContainer}>
          {formFields.map((field, index) => (
            <View key={field.id} style={exampleStyles.inputGroup}>
              <Text style={exampleStyles.label}>{field.label}</Text>
              <TextInput
                ref={(ref) => (inputRefs.current[field.id] = ref)}
                style={[
                  exampleStyles.input,
                  field.multiline && exampleStyles.textArea,
                ]}
                placeholder={field.placeholder}
                placeholderTextColor="#999"
                value={formData[field.id as keyof typeof formData] as string}
                onChangeText={(text) => 
                  setFormData({ ...formData, [field.id]: text })
                }
                keyboardType={field.keyboardType}
                multiline={field.multiline}
                numberOfLines={field.numberOfLines}
                textAlignVertical={field.multiline ? 'top' : 'center'}
                secureTextEntry={field.secureTextEntry}
                autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
                onFocus={() => handleInputFocus(field.id)}
                returnKeyType={index === formFields.length - 1 ? 'done' : 'next'}
                onSubmitEditing={() => {
                  if (index < formFields.length - 1) {
                    inputRefs.current[formFields[index + 1].id]?.focus();
                  }
                }}
              />
            </View>
          ))}

          <View style={exampleStyles.switchGroup}>
            <View style={{ flex: 1 }}>
              <Text style={exampleStyles.label}>Newsletter Subscription</Text>
              <Text style={exampleStyles.switchDescription}>
                Get updates about new features and tips
              </Text>
            </View>
            <Switch
              value={formData.newsletter}
              onValueChange={(value) => setFormData({ ...formData, newsletter: value })}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={formData.newsletter ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={exampleStyles.termsContainer}>
            <Text style={exampleStyles.termsText}>
              By submitting, you agree to our{' '}
              <Text style={exampleStyles.link}>Terms of Service</Text> and{' '}
              <Text style={exampleStyles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const exampleStyles = StyleSheet.create({
  openButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    fontSize: 24,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 15,
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  termsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default App;
*/