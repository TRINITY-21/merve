// components/common/LoadingOverlay.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated as RNAnimated, View } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { Typography } from './Typography';

export interface NearbyAgent {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface LoadingOverlayProps {
  visible: boolean;
  nearbyAgents?: NearbyAgent[];
  title?: string;
  subtitle?: string;
  showAgentCircle?: boolean;
  backgroundColor?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  nearbyAgents = [],
  title = 'Searching for agents...',
  subtitle = 'Please wait while we find nearby agents',
  showAgentCircle = true,
  backgroundColor = 'rgba(255, 255, 255, 0.95)'
}) => {
  const rotationAnim = useRef(new RNAnimated.Value(0)).current;
  const agentRotationAnim = useRef(new RNAnimated.Value(0)).current;
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      startAnimations();
    } else {
      stopAnimations();
    }
  }, [visible]);

  const startAnimations = () => {
    rotationAnim.setValue(0);
    agentRotationAnim.setValue(0);

    // Central spinner rotation
    RNAnimated.loop(
      RNAnimated.timing(rotationAnim, {
        toValue: 1,
        duration: 19000,
        useNativeDriver: true,
      })
    ).start();

    // Agent avatars rotation (slower, opposite direction)
    RNAnimated.loop(
      RNAnimated.timing(agentRotationAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        RNAnimated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAnimations = () => {
    rotationAnim.stopAnimation();
    agentRotationAnim.stopAnimation();
    pulseAnim.stopAnimation();
  };

  if (!visible) return null;

  return (
    <View 
      className=" mt-10 absolute top-0 left-0 right-0 bottom-0 z-50 items-center justify-center rounded-t-3xl"
      style={{ backgroundColor }}
    >
      <View className="items-center justify-center relative w-72 h-72">
        {showAgentCircle && nearbyAgents.length > 0 && (
          <RNAnimated.View
            className="absolute w-72 h-72 items-center justify-center"
            style={{
              transform: [
                {
                  rotate: agentRotationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-360deg'],
                  }),
                },
              ],
            }}
          >
            {nearbyAgents.map((agent, index) => {
              const angle = (index * 360) / nearbyAgents.length;
              const radius = 100;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <RNAnimated.View
                  key={agent.id}
                  className="absolute items-center"
                  style={{
                    transform: [
                      { translateX: x },
                      { translateY: y },
                      {
                        rotate: agentRotationAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  }}
                >
                  <RNAnimated.View
                    className="w-10 h-10 rounded-full items-center justify-center shadow-md border-2 border-white"
                    style={{
                      backgroundColor: agent.color,
                      transform: [
                        {
                          scale: rotationAnim.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [1, 1.1, 1],
                          }),
                        },
                      ],
                    }}
                  >
                    <MaterialIcons name={agent.avatar as any} size={20} color={colors.white} />
                  </RNAnimated.View>
                  <Typography variant="semibold" size={10} className="text-gray-600 mt-1 text-center">
                    {agent.name}
                  </Typography>
                </RNAnimated.View>
              );
            })}
          </RNAnimated.View>
        )}

        {/* Central loading indicator */}
        <RNAnimated.View
          className="w-16 h-16 rounded-full bg-yellow-400 items-center justify-center shadow-lg"
          style={{
            transform: [
              {
                rotate: rotationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              { scale: pulseAnim },
            ],
          }}
        >
          <MaterialIcons name="search" size={24} color={colors.white} />
        </RNAnimated.View>

        {/* Loading text */}
        <View className="absolute bottom-0 items-center w-full">
          <Typography variant="semibold" size={18} className="text-gray-900 mb-2 text-center">
            {title}
          </Typography>
          <Typography variant="regular" size={14} className="text-gray-600 text-center px-8">
            {subtitle}
          </Typography>
        </View>
      </View>
    </View>
  );
};