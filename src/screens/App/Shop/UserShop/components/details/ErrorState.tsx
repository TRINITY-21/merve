import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Error Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#FEF2F2',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
        </View>

        {/* Error Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: colors.text.primary,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Oops! Something went wrong
        </Text>

        {/* Error Message */}
        <Text
          style={{
            fontSize: 16,
            color: colors.text.secondary,
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 16,
          }}
        >
          {error || 'We encountered an error while loading the product details. Please try again.'}
        </Text>

        {/* Retry Button */}
        <TouchableOpacity
          onPress={onRetry}
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>

        {/* Additional Help */}
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.text.secondary,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Still having trouble?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: colors.accent,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}
            >
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};