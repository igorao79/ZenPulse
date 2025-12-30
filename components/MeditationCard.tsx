import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useSubscription } from '../context/SubscriptionContext';
import { Meditation } from '../types';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface MeditationCardProps {
  meditation: Meditation;
  onPress: (meditation: Meditation) => void;
  onUpgradePress?: () => void;
}

export const MeditationCard: React.FC<MeditationCardProps> = ({ meditation, onPress, onUpgradePress }) => {
  const { isSubscribed } = useSubscription();

  const handlePress = () => {
    if (meditation.isPremium && !isSubscribed) {
      if (onUpgradePress) {
        onUpgradePress();
      } else {
        Alert.alert(
          'Premium контент',
          'Эта медитация доступна только для подписчиков Premium. Хотите оформить подписку?',
          [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Оформить', onPress: () => {/* Здесь можно добавить логику оформления */} },
          ]
        );
      }
      return;
    }
    onPress(meditation);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        meditation.isPremium && !isSubscribed && styles.premiumCard
      ]}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>
        {meditation.isPremium && !isSubscribed ? (
          <MaterialIcons name="lock" size={32} color="#888" />
        ) : meditation.iconType === 'FontAwesome5' ? (
          <FontAwesome5 name={meditation.iconName} size={32} color="#667eea" />
        ) : (
          <MaterialIcons name={meditation.iconName} size={32} color="#667eea" />
        )}
      </View>
      <Text style={[styles.title, meditation.isPremium && !isSubscribed && styles.premiumTitle]}>
        {meditation.isPremium && !isSubscribed ? 'Premium' : meditation.title}
      </Text>
      <Text style={[styles.duration, meditation.isPremium && !isSubscribed && styles.premiumDuration]}>
        {meditation.duration}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a3e',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: (width - 48) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  premiumCard: {
    backgroundColor: '#3a3a4e',
    opacity: 0.8,
  },
  iconContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  lockIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#667eea',
    borderRadius: 8,
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  premiumTitle: {
    color: '#888',
  },
  duration: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  premiumDuration: {
    color: '#666',
  },
});
