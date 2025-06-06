// screens/PromoteProductScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { DURATIONS, MOCK_ANALYTICS, PAYMENT_METHODS, PROMOTION_PLANS, STEPS } from '../../../constants';
import { IPricing, IProduct, IPromoteProductScreenProps } from '../../../types/promoteTypes';
import AnalyticsModal from './components/AnalyticsModal';
import BottomAction from './components/BottomAction';
import DurationSelection from './components/DurationSelection';
import PaymentModal from './components/PaymentModal';
import PlanSelection from './components/PlanSelection';
import ProductCard from './components/ProductCard';
import PromoteProductHeader from './components/PromoteProductHeader';
import ReviewAndConfirm from './components/ReviewAndConfirm';


const PromoteProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = (route.params as IPromoteProductScreenProps) || {};
  
  // State management
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('mobile_money');
  const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

  // Mock product data
  const mockProduct: IProduct = {
    id: productId || 'p1',
    title: 'iPhone 13 Pro - 128GB Unlocked',
    price: 4500.00,
    image: 'https://picsum.photos/400/400?random=1',
    currentViews: 247,
    currentSaves: 18,
    category: 'Electronics',
  };

  // Helper functions
  const getSelectedPlan = () => {
    return PROMOTION_PLANS.find(plan => plan.id === selectedPlan)!;
  };

  const calculatePrice = (): IPricing => {
    const plan = getSelectedPlan();
    const basePrice = plan.pricing[selectedDuration as keyof typeof plan.pricing];
    const duration = DURATIONS.find(d => d.days === selectedDuration)!;
    const discount = duration.discount;
    const discountAmount = (basePrice * discount) / 100;
    return {
      basePrice,
      discount: discountAmount,
      finalPrice: basePrice - discountAmount
    };
  };

  // Event handlers
  const handleContinue = (): void => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePromoteProduct();
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handlePromoteProduct = (): void => {
    setShowPaymentModal(true);
  };

  const handlePayment = (): void => {
    setShowPaymentModal(false);
    // Navigate to payment processing or success screen
    navigation.navigate('PaymentProcessing' as never, {
      plan: getSelectedPlan(),
      duration: selectedDuration,
      price: calculatePrice(),
      paymentMethod: selectedPaymentMethod,
      productId: mockProduct.id
    } as never);
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.PLAN_SELECTION:
        return (
          <PlanSelection
            plans={PROMOTION_PLANS}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
          />
        );
      case STEPS.DURATION_SELECTION:
        return (
          <DurationSelection
            durations={DURATIONS}
            selectedDuration={selectedDuration}
            selectedPlan={getSelectedPlan()}
            isAutoRenewal={isAutoRenewal}
            onDurationSelect={setSelectedDuration}
            onAutoRenewalToggle={setIsAutoRenewal}
          />
        );
      case STEPS.REVIEW_CONFIRM:
        return (
          <ReviewAndConfirm
            selectedPlan={getSelectedPlan()}
            selectedDuration={selectedDuration}
            durations={DURATIONS}
            pricing={calculatePrice()}
          />
        );
      default:
        return (
          <PlanSelection
            plans={PROMOTION_PLANS}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
          />
        );
    }
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
    <View className="flex-1 bg-[#F5F5F5]">
      <PromoteProductHeader
        currentStep={currentStep}
        onBack={handleBack}
        onAnalytics={() => setShowAnalytics(true)}
      />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ProductCard product={mockProduct} />
        {renderStepContent()}
      </ScrollView>

      <BottomAction
        currentStep={currentStep}
        pricing={calculatePrice()}
        onContinue={handleContinue}
      />

      <AnalyticsModal
        visible={showAnalytics}
        analytics={MOCK_ANALYTICS}
        onClose={() => setShowAnalytics(false)}
      />

      <PaymentModal
        visible={showPaymentModal}
        paymentMethods={PAYMENT_METHODS}
        selectedPaymentMethod={selectedPaymentMethod}
        selectedPlan={getSelectedPlan()}
        pricing={calculatePrice()}
        onClose={() => setShowPaymentModal(false)}
        onPaymentMethodSelect={setSelectedPaymentMethod}
        onPayment={handlePayment}
      />
    </View>
  );
};

export default PromoteProductScreen;