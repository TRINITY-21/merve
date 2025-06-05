// components/quickcash/QuickCashBottomSheet.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Animated as RNAnimated, TouchableOpacity, View } from 'react-native';
import { LoadingOverlay, NearbyAgent } from '../common/LoadingOverlay';
import { AmountInputSection } from './AmountInputSection';
import { ServiceSelectionGrid, ServiceType } from './ServiceSelectionGrid';

import { colors } from '../../constants/theme/colors';
import { Button } from '../common';
import { Typography } from '../common/Typography';
const { height } = Dimensions.get('window');

export interface AcceptedAgent {
  id: string;
  name: string;
  profilePicture: string;
  location: string;
  phone: string;
  rating: string;
  completedTransactions: string;
  latitude: number;
  longitude: number;
}

interface QuickCashBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onRequestAgent: (service: string, amount: string) => void;
  onCallAgent?: () => void;
  onMessageAgent?: () => void;
  onGetDirections?: () => void;
  isLoading: boolean;
  agentAccepted: boolean;
  acceptedAgent?: AcceptedAgent | null;
  services?: ServiceType[];
  nearbyAgents?: NearbyAgent[];
  title?: string;
  subtitle?: string;
  currency?: string;
  quickAmounts?: string[];
  gradientColors?: string[];
}

const defaultServices: ServiceType[] = [
  {
    id: 'cash-in',
    label: 'Cash In',
    icon: 'account-balance-wallet',
    color: '#4CAF50',
    bgColor: '#E8F5E8'
  },
  {
    id: 'cash-out',
    label: 'Cash Out',
    icon: 'payments',
    color: '#FF5722',
    bgColor: '#FFF3F0'
  },
  {
    id: 'bill-payment',
    label: 'Bills',
    icon: 'receipt-long',
    color: '#2196F3',
    bgColor: '#E8F4FD'
  },
  {
    id: 'airtime-data',
    label: 'Airtime',
    icon: 'smartphone',
    color: '#9C27B0',
    bgColor: '#F3E5F5'
  },
];

export const QuickCashBottomSheet: React.FC<QuickCashBottomSheetProps> = ({
  visible,
  onClose,
  onRequestAgent,
  onCallAgent,
  onMessageAgent,
  onGetDirections,
  isLoading,
  agentAccepted,
  acceptedAgent,
  services = defaultServices,
  nearbyAgents = [],
  title = 'Quick Cash Help',
  subtitle = 'Get instant assistance from verified agents nearby',
  currency = 'GHS',
  quickAmounts = ['10', '25', '50', '100'],
  gradientColors = colors.gradient.primary
}) => {
  const slideAnim = useRef(new RNAnimated.Value(height)).current;
  const [selectedService, setSelectedService] = React.useState<string>('cash-in');
  const [cashAmount, setCashAmount] = React.useState<string>('');

  useEffect(() => {
    if (visible) {
      RNAnimated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }).start();
    } else {
      RNAnimated.spring(slideAnim, {
        toValue: height,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }).start();
    }
  }, [visible]);

  const handleRequestAgent = () => {
    onRequestAgent(selectedService, cashAmount);
  };

  const handleDone = () => {
    setSelectedService('cash-in');
    setCashAmount('');
    onClose();
  };

  if (!visible) return null;

  return (
    <View
    >
      {/* Loading Overlay */}
      <LoadingOverlay
        visible={isLoading}
        nearbyAgents={nearbyAgents}
        title="Searching for agents..."
        subtitle="Please wait while we find nearby agents"
        showAgentCircle={nearbyAgents.length > 0} 
      />

      {!agentAccepted ? (
        <>

            {/* Service Selection */}
            <View className="px-0 pt-1 pb-4">
              <Typography variant="semibold" size={16} className="text-gray-900 mb-4 tracking-tight">
                Select Service
              </Typography>
              <ServiceSelectionGrid
                services={services}
                selectedService={selectedService}
                onServiceSelect={setSelectedService}
                columns={4}
              />
            </View>

            {/* Amount Input */}
            <View className="px-0 py-2">
              <AmountInputSection
                amount={cashAmount}
                onAmountChange={setCashAmount}
                currency={currency}
                quickAmounts={quickAmounts}
                title="Enter Amount"
                showQuickAmounts={true}
              />
            </View>

            {/* Request Button */}
            <View className="px-0 py-3 mt-auto">
             <Button title="Request Agent Now" onPress={handleRequestAgent}
             startIcon='flash-on'  
             />
            </View>
        </>
      ) : (
        // Agent Accepted View
        <View className="flex-1 p-0">
          <View className="items-center py-2 mb-6">
            <View className="mb-4">
              <MaterialIcons name="check-circle" size={48} color="#4CAF50" />
            </View>
            <Typography variant="bold" size={24} className="text-gray-900 mb-2 tracking-tight">
              Agent Found!
            </Typography>
            <Typography variant="regular" size={16} className="text-gray-600 text-center leading-5.5">
              Your request has been accepted by a verified agent
            </Typography>
          </View>

          {acceptedAgent && (
            <>
              <View className="bg-gray-50 rounded-3xl p-5 mb-6 border border-gray-200">
                <View className="flex-row items-center">
                  <View className="w-16 h-16 rounded-full bg-white items-center justify-center mr-4 relative border-2 border-gray-200">
                    <MaterialIcons name="person" size={32} color="#FF6B35" />
                    <View className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white items-center justify-center">
                      <MaterialIcons name="verified" size={16} color="#4CAF50" />
                    </View>
                  </View>
                  <View className="flex-1">
                    <Typography variant="bold" size={18} className="text-gray-900 mb-1 tracking-tight">
                      {acceptedAgent.name}
                    </Typography>
                    <Typography variant="medium" size={14} className="text-gray-600 mb-2">
                      {acceptedAgent.location}
                    </Typography>
                    <View className="flex-row items-center">
                      <View className="flex-row items-center">
                        <MaterialIcons name="star" size={14} color="#FFB300" />
                        <Typography variant="regular" size={12} className="text-gray-600 ml-1">
                          {acceptedAgent.rating}
                        </Typography>
                      </View>
                      <View className="w-px h-3 bg-gray-400 mx-3" />
                      <View className="flex-row items-center">
                        <MaterialIcons name="history" size={14} color={colors.gray.medium} />
                        <Typography variant="regular" size={12} className="text-gray-600 ml-1">
                          {acceptedAgent.completedTransactions}
                        </Typography>
                      </View>
                    </View>
                  </View> 
                </View>
              </View>

              <Typography variant="semibold" size={16} className="text-gray-900 mb-4 tracking-tight">
                Contact Agent
              </Typography>
              <View className="flex-row justify-between mb-4 gap-3">
                <TouchableOpacity 
                  className="flex-1 items-center py-4 rounded-2xl bg-green-50 border-2 border-green-200"
                  onPress={onCallAgent}
                >
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                    <MaterialIcons name="call" size={20} color="#4CAF50" />
                  </View>
                  <Typography variant="semibold" size={12} className="text-gray-900 tracking-wide">
                    Call
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 items-center py-4 rounded-2xl bg-blue-50 border-2 border-blue-200"
                  onPress={onGetDirections}
                >
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                    <MaterialIcons name="directions" size={20} color="#2196F3" />
                  </View>
                  <Typography variant="semibold" size={12} className="text-gray-900 tracking-wide">
                    Directions
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 items-center py-4 rounded-2xl bg-orange-50 border-2 border-orange-200"
                  onPress={onMessageAgent}
                >
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                    <MaterialIcons name="message" size={20} color="#FF6B35" />
                  </View>
                  <Typography variant="semibold" size={12} className="text-gray-900 tracking-wide">
                    Message
                  </Typography>
                </TouchableOpacity>
              </View>
            </>
          )}

          <TouchableOpacity
            className="bg-gray-100 py-4 mt-3 mb-24 rounded-2xl items-center"
            onPress={handleDone}
          >
            <Typography variant="semibold" size={16} className="text-gray-600 tracking-wide">
              Done
            </Typography>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};