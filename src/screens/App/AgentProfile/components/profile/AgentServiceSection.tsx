
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

const { width: screenWidth } = Dimensions.get('window');

interface ServicesSectionProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  navigation,
}) => (
  <Animated.View
    style={[
      styles.container,
      {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      },
    ]}
  >
    {/* Header */}
    <View style={styles.header}>
      <Typography variant="semibold" size={16} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
     
        Services Offered
        </Typography>
      <TouchableOpacity
        style={styles.manageButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('AgentSettings')}
      >
    <Typography variant="semibold" size={10} style={{ color: colors.text.light, letterSpacing: 0.5 }}>
        Manage
        </Typography>
      </TouchableOpacity>
    </View>

    {/* Services */}
    <View style={styles.servicesWrap}>
      {agentData.services.map((service) => {
        const isActive = service.active;
        return (
          <TouchableOpacity
            key={service.id}
            activeOpacity={0.85}
            style={[
              styles.serviceCard,
              { opacity: isActive ? 1 : 0.6 },
            ]}
          >
            <LinearGradient
              colors={
                isActive
                  ? colors.gradient.light
                  : [colors.gray.light, colors.gray.light]
              }
              style={styles.cardContent}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: isActive
                      ? colors.secondary
                      : colors.gray.medium,
                  },
                ]}
              >
                <MaterialIcons
                  name={service.icon as any}
                  size={24}
                  color={colors.white}
                />
              </View>

              

              <Typography
                style={[
                  styles.serviceName,
                  { color: isActive ? colors.text.primary : colors.text.secondary },
                ]}
              >
                {service.name}
              </Typography>

              {!isActive && (
                <View style={styles.inactiveBadge}>
                  <Text style={styles.inactiveBadgeText}>Inactive</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    padding: 16,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
    paddingRight: 8,
  },
  manageButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
  },
  manageButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  servicesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: (screenWidth - 80) / 2,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
 
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  commission: {
    fontSize: 12,
    fontWeight: '800',
  },
  inactiveBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.gray.medium,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inactiveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
  },
});