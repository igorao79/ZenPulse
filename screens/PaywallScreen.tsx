import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSubscription } from '../context/SubscriptionContext';
import { SubscriptionPlan } from '../types';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface PaywallScreenProps {
  onGoFree?: () => void;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ onGoFree }) => {
  const { subscribe } = useSubscription();

  const plans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      name: 'Месячный',
      price: 299,
      period: 'месяц',
    },
    {
      id: 'yearly',
      name: 'Годовой',
      price: 2990,
      period: 'год',
      savings: 'Сэкономьте 25%',
      isPopular: true,
    },
  ];

  const features = [
    { icon: <FontAwesome5 name="headphones" size={24} color="#667eea" />, text: '500+ медитаций' },
    { icon: <FontAwesome5 name="brain" size={24} color="#667eea" />, text: 'AI персонализация' },
    { icon: <FontAwesome5 name="chart-line" size={24} color="#667eea" />, text: 'Отслеживание прогресса' },
    { icon: <FontAwesome5 name="moon" size={24} color="#667eea" />, text: 'Медитации для сна' },
    { icon: <FontAwesome5 name="bullseye" size={24} color="#667eea" />, text: 'Достижение целей' },
    { icon: <FontAwesome5 name="sparkles" size={24} color="#667eea" />, text: 'Эксклюзивный контент' },
  ];

  const handleSubscribe = (plan: SubscriptionPlan) => {
    subscribe();
  };

  return (
    <LinearGradient
      colors={['#667eea', '#f093fb', '#f5576c']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroGlow}>
            <FontAwesome5 name="spa" size={60} color="white" />
          </View>
          <Text style={styles.heroTitle}>ZenPulse Premium</Text>
          <Text style={styles.heroSubtitle}>Найдите гармонию в цифровом мире</Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Что вы получите</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  {feature.icon}
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Plans Section */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>Выберите план</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, plan.isPopular && styles.popularPlan]}
              onPress={() => handleSubscribe(plan)}
            >
              {plan.isPopular && (
                <View style={styles.popularBadge}>
                  <MaterialIcons name="star" size={14} color="#fff" />
                  <Text style={styles.popularBadgeText} numberOfLines={1}>Самый популярный</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={[styles.planName, plan.isPopular && styles.popularText]} numberOfLines={1}>
                  {plan.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={[styles.price, plan.isPopular && styles.popularPrice]} numberOfLines={1}>
                    {plan.price}₽
                  </Text>
                  <Text style={[styles.period, plan.isPopular && styles.popularText]} numberOfLines={1}>
                    /{plan.period}
                  </Text>
                </View>
              </View>

              {plan.savings && (
                <View style={styles.savingsContainer}>
                  <Text style={styles.savingsText} numberOfLines={1}>{plan.savings}</Text>
                </View>
              )}

              <View style={[styles.subscribeButton, plan.isPopular && styles.popularButton]}>
                <MaterialIcons name="play-arrow" size={20} color={plan.isPopular ? "#fff" : "#667eea"} />
                <Text style={[styles.subscribeText, plan.isPopular && styles.popularButtonText]} numberOfLines={1}>
                  Попробовать бесплатно
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Free Button */}
        <View style={styles.freeContinueContainer}>
          <TouchableOpacity
            style={styles.freeContinueButton}
            onPress={onGoFree}
          >
            <Text style={styles.freeContinueText}>
              Продолжить без подписки
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Отмена в любое время • Доступ ко всем функциям Premium
          </Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroGlow: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderRadius: 80,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  heroEmoji: {
    fontSize: 60,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#b0b0b0',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  featureIcon: {
    marginBottom: 12,
    color: '#667eea',
  },
  featureText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  planCard: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: width * 0.8,
    alignSelf: 'center',
  },
  popularPlan: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#ffd700',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  popularText: {
    color: '#ffffff',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  popularPrice: {
    color: '#ffffff',
  },
  period: {
    fontSize: 14,
    color: '#888',
  },
  savingsContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  subscribeButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  popularButton: {
    backgroundColor: '#ffd700',
    borderWidth: 0,
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginLeft: 8,
  },
  popularButtonText: {
    color: '#1a1a2e',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  freeContinueContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  freeContinueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  freeContinueText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
});

export default PaywallScreen;
