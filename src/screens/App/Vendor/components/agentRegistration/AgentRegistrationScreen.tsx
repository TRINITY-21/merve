import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Button } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import useStore from '../../../../../store/useStore';
import { IFormData } from '../../../../../types/agentRegistrationTypes';
import AgentRegistrationHeader from './AgentRegistrationHeader';
import BusinessInfoStep from './BusinessInfoStep';
import LocationContactStep from './LocationContactStep';
import OperatingDetailsStep from './OperationDetailStep';
import PersonalInfoStep from './PersonalInfoStep';
import VerificationMediaStep from './VerificationMediaStep';
 
const AgentRegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentUser, sendOTP, verifyOTP, agentRegistration } = useStore();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const [formData, setFormData] = useState<IFormData>({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    pin: '',
    confirmPin: '',
    otp: '',
    businessName: '',
    businessDescription: '',
    agentType: 'Retail',
    services: [],
    networks: [],
    address: '',
    landmark: '',
    contactPhone: '',
    whatsapp: '',
    operatingHours: {
      monday: { open: '08:00', close: '18:00', isClosed: false },
      tuesday: { open: '08:00', close: '18:00', isClosed: false },
      wednesday: { open: '08:00', close: '18:00', isClosed: false },
      thursday: { open: '08:00', close: '18:00', isClosed: false },
      friday: { open: '08:00', close: '18:00', isClosed: false },
      saturday: { open: '09:00', close: '15:00', isClosed: false },
      sunday: { open: '', close: '', isClosed: true },
    },
    isOpen: true,
    location: { latitude: 0, longitude: 0 },
    idDocument: null,
    businessLicense: null,
    setupPhotos: [],
    termsAccepted: false,
  });

  // Reanimated values
  const cardOpacity = useSharedValue(0);
  const cardSlide = useSharedValue(50);
  const buttonPulse = useSharedValue(1);

  // Calculate header height for proper content padding
  const headerHeight = Platform.OS === 'ios' ? 120 : 100;

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 600 });
    cardSlide.value = withTiming(0, { duration: 600 });
    buttonPulse.value = withTiming(1.05, { 
      duration: 800, 
      easing: Easing.inOut(Easing.ease) 
    }, () => {
      buttonPulse.value = withTiming(1, { 
        duration: 800, 
        easing: Easing.inOut(Easing.ease) 
      });
    });

    // Request location permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setFormData((prev) => ({
          ...prev,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardSlide.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonPulse.value }],
  }));

  const validateStep = (): boolean => {
    console.log('Validating step', step, 'FormData:', formData, 'otpSent:', otpSent);
    
    switch (step) {
      case 1:
        if (!formData.name || !formData.phone || !formData.email) {
          Toast.show({ type: 'error', text1: 'Missing Information', text2: 'Please fill all fields' });
          return false;
        }
        if (formData.phone.length !== 10) {
          Toast.show({ type: 'error', text1: 'Invalid Phone', text2: 'Phone must be 10 digits' });
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          Toast.show({ type: 'error', text1: 'Invalid Email', text2: 'Enter a valid email' });
          return false;
        }
        if (!otpSent) {
          Toast.show({ type: 'error', text1: 'OTP Not Sent', text2: 'Please send the OTP first' });
          return false;
        }
        if (!formData.otp) {
          Toast.show({ type: 'error', text1: 'Missing OTP', text2: 'Enter the OTP sent to your phone' });
          return false;
        }
        const verifyResult = verifyOTP(formData.otp);
        console.log('verifyOTP result:', verifyResult);
        if (!verifyResult.success) {
          Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Enter a valid OTP' });
          return false;
        }
        if (!formData.pin || formData.pin.length !== 4) {
          Toast.show({ type: 'error', text1: 'Invalid PIN', text2: 'PIN must be 4 digits' });
          return false;
        }
        if (formData.pin !== formData.confirmPin) {
          Toast.show({ type: 'error', text1: 'PIN Mismatch', text2: 'PINs do not match' });
          return false;
        }
        return true;
        
      case 2:
        if (!formData.businessName || !formData.businessDescription || !formData.agentType) {
          Toast.show({ type: 'error', text1: 'Missing Information', text2: 'Fill all business details' });
          return false;
        }
        if (formData.services.length === 0) {
          Toast.show({ type: 'error', text1: 'No Services', text2: 'Select at least one service' });
          return false;
        }
        if (formData.networks.length === 0) {
          Toast.show({ type: 'error', text1: 'No Networks', text2: 'Select at least one network' });
          return false;
        }
        return true;
        
      case 3:
        if (!formData.address || !formData.landmark || !formData.contactPhone) {
          Toast.show({ type: 'error', text1: 'Missing Information', text2: 'Fill all contact details' });
          return false;
        }
        if (formData.contactPhone.length !== 10) {
          Toast.show({ type: 'error', text1: 'Invalid Phone', text2: 'Contact phone must be 10 digits' });
          return false;
        }
        if (formData.whatsapp && formData.whatsapp.length !== 10) {
          Toast.show({ type: 'error', text1: 'Invalid WhatsApp', text2: 'WhatsApp number must be 10 digits' });
          return false;
        }
        if (formData.location.latitude === 0 || formData.location.longitude === 0) {
          Toast.show({ type: 'error', text1: 'Invalid Location', text2: 'Select a valid location' });
          return false;
        }
        return true;
        
      case 4:
        const hasValidHours = Object.values(formData.operatingHours).some(
          (day) => !day.isClosed && day.open && day.close
        );
        if (!hasValidHours) {
          Toast.show({ type: 'error', text1: 'Invalid Hours', text2: 'Set operating hours for at least one day' });
          return false;
        }
        return true;
        
      case 5:
        if (!formData.idDocument) {
          Toast.show({ type: 'error', text1: 'Missing ID', text2: 'Upload an ID document' });
          return false;
        }
        if (!formData.termsAccepted) {
          Toast.show({ type: 'error', text1: 'Terms Not Accepted', text2: 'Accept the terms to proceed' });
          return false;
        }
        return true;
        
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      cardOpacity.value = withTiming(0, { duration: 300 });
      cardSlide.value = withTiming(50, { duration: 300 });

      setTimeout(() => {
        setStep((prevStep) => {
          console.log('Step updated to', prevStep + 1);
          return prevStep + 1;
        });
        cardOpacity.value = withTiming(1, { duration: 300 });
        cardSlide.value = withTiming(0, { duration: 300 });
      }, 300);
    }
  };

  const handleBack = () => {
    cardOpacity.value = withTiming(0, { duration: 300 });
    cardSlide.value = withTiming(-50, { duration: 300 });

    setTimeout(() => {
      setStep((prevStep) => {
        console.log('Step updated to', prevStep - 1);
        return prevStep - 1;
      });
      cardOpacity.value = withTiming(1, { duration: 300 });
      cardSlide.value = withTiming(0, { duration: 300 });
    }, 300);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    
    try {
      setTimeout(() => {
        const newAgent = agentRegistration({
          id: currentUser?.id || '', 
          name: formData.name,
          // phone: formData.phone,
          // email: formData.email,
          // businessName: formData.businessName,
          // businessDescription: formData.businessDescription,
          // agentType: formData.agentType,
          // services: formData.services as any,
          // networks: formData.networks,
          // address: formData.address,
          // landmark: formData.landmark,
          // contactPhone: formData.contactPhone,
          // whatsapp: formData.whatsapp,
          // operatingHours: formData.operatingHours,
          // isOpen: formData.isOpen,
          // location: formData.location,
          // idDocument: formData.idDocument,
          // businessLicense: formData.businessLicense,
          // setupPhotos: formData.setupPhotos,
        });
        
        setLoading(false);
        setShowConfetti(true);
        
        Toast.show({
          type: 'success',
          text1: 'Agent Application Submitted',
          text2: 'Your journey as an agent awaits approval! 🌟',
        });
        
        setTimeout(() => {
          setShowConfetti(false);
          navigation.navigate('AgentsProfile', { agent: newAgent });
        }, 3000);
      }, 1500);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: 'Something went wrong, try again!',
      });
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      otpSent,
      setOtpSent,
      sendOTP,
      cardStyle,
    };

    switch (step) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <BusinessInfoStep {...stepProps} />;
      case 3:
        return <LocationContactStep {...stepProps} />;
      case 4:
        return <OperatingDetailsStep {...stepProps} />;
      case 5:
        return <VerificationMediaStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <AgentRegistrationHeader
        onGoBack={() => navigation.goBack()}
        step={step}
        totalSteps={5}
      />

      {/* Background Gradient with Scrollable Content */}
      <LinearGradient 
        colors={colors.gradient.primary} 
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingTop: headerHeight + 20, // Account for sticky header
              paddingHorizontal: 20,
              paddingBottom: 140, // Extra space for buttons
              flexGrow: 1
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={true}
          >
            {/* Render Current Step */}
            {renderStep()}

            {/* Action Buttons */}
            <View 
              style={{
                flexDirection: 'row',
                gap: 12,
                marginTop: 20,
                justifyContent: 'space-between'
              }}
            >
              {step > 1 && (
                <Animated.View style={[buttonStyle, { flex: 1 }]}>
                  <Button
                    title="Back"
                    variant="outline"
                    size="medium"
                    onPress={handleBack}
                    style={{
                      borderColor: colors.white,
                      backgroundColor: 'transparent'
                    }}
                    textStyle={{ color: colors.white }}
                  />
                </Animated.View>
              )}
              <Animated.View style={[buttonStyle, { flex: step > 1 ? 1 : 2 }]}>
                <Button
                  title={step === 5 ? 'Submit' : 'Next'}
                  size="medium"
                  onPress={step === 5 ? handleSubmit : handleNext}
                  disabled={loading}
                  loading={loading}
                  style={{
                    // backgroundColor: colors.white,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6
                  }}
                  textStyle={{ color: colors.white }}
                  icon={step === 5 ? 'check' : 'chevron-right'}
                  iconPosition="right"
                />
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      
      {showConfetti && (
        <ConfettiCannon count={150} origin={{ x: -10, y: 0 }} autoStart fadeOut />
      )}
    </View>
  );
};

export default AgentRegistrationScreen;