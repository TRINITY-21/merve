// hooks/useQuickCash.ts - Custom hook for Quick Cash functionality
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

interface UseQuickCashReturn {
  isVisible: boolean;
  isLoading: boolean;
  agentAccepted: boolean;
  acceptedAgent: any | null;
  selectedService: string;
  amount: string;
  show: () => void;
  hide: () => void;
  requestAgent: (service: string, amount: string) => Promise<void>;
  setService: (service: string) => void;
  setAmount: (amount: string) => void;
  resetState: () => void;
}

export const useQuickCash = (): UseQuickCashReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agentAccepted, setAgentAccepted] = useState(false);
  const [acceptedAgent, setAcceptedAgent] = useState<any>(null);
  const [selectedService, setSelectedService] = useState('cash-in');
  const [amount, setAmount] = useState('');

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  const requestAgent = useCallback(async (service: string, amount: string) => {
    if (!amount.trim()) {
      Alert.alert('Please enter an amount');
      return;
    }

    setIsLoading(true);

    // Simulate agent search and acceptance
    setTimeout(() => {
      setIsLoading(false);
      setAgentAccepted(true);
      setAcceptedAgent({
        id: '1',
        name: 'Sarah Johnson',
        location: '150m away • Verified Agent',
        rating: '4.9',
        completedTransactions: '2,847',
      });
    }, 3000);
  }, []);

  const setService = useCallback((service: string) => {
    setSelectedService(service);
  }, []);

  const setAmountValue = useCallback((newAmount: string) => {
    setAmount(newAmount);
  }, []);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setAgentAccepted(false);
    setAcceptedAgent(null);
    setSelectedService('cash-in');
    setAmount('');
  }, []);

  return {
    isVisible,
    isLoading,
    agentAccepted,
    acceptedAgent,
    selectedService,
    amount,
    show,
    hide,
    requestAgent,
    setService,
    setAmount: setAmountValue,
    resetState,
  };
};