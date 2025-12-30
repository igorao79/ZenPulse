import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { useSubscription } from '../context/SubscriptionContext';
import { MeditationCard } from '../components/MeditationCard';
import { Meditation, AIMood } from '../types';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface MeditationsScreenProps {
  onBackToPaywall?: () => void;
  isFreeVersion?: boolean;
  onUpgradePress?: () => void;
}

const MeditationsScreen: React.FC<MeditationsScreenProps> = ({ onBackToPaywall, isFreeVersion = false, onUpgradePress }) => {
  const { isSubscribed, resetSubscription } = useSubscription();
  const [isAIModalVisible, setIsAIModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState<AIMood | null>(null);

  const meditations: Meditation[] = [
    {
      id: '1',
      title: 'Утреннее пробуждение',
      iconName: 'wb-sunny',
      iconType: 'MaterialIcons',
      duration: '10 мин',
      isPremium: false,
      description: 'Настройтесь на продуктивный день',
    },
    {
      id: '2',
      title: 'Медитация для сна',
      iconName: 'nightlight-round',
      iconType: 'MaterialIcons',
      duration: '15 мин',
      isPremium: true,
      description: 'Глубокий и спокойный сон',
    },
    {
      id: '3',
      title: 'Сосредоточение',
      iconName: 'gps-fixed',
      iconType: 'MaterialIcons',
      duration: '12 мин',
      isPremium: false,
      description: 'Улучшите концентрацию',
    },
    {
      id: '4',
      title: 'Осознанное дыхание',
      iconName: 'air',
      iconType: 'MaterialIcons',
      duration: '8 мин',
      isPremium: true,
      description: 'Техники дыхания для релаксации',
    },
    {
      id: '5',
      title: 'Благодарность',
      iconName: 'favorite',
      iconType: 'MaterialIcons',
      duration: '5 мин',
      isPremium: false,
      description: 'Практика благодарности',
    },
    {
      id: '6',
      title: 'Визуализация успеха',
      iconName: 'stars',
      iconType: 'MaterialIcons',
      duration: '20 мин',
      isPremium: true,
      description: 'Представьте свои достижения',
    },
    {
      id: '7',
      title: 'Йога-нидра',
      iconName: 'self-improvement',
      iconType: 'MaterialIcons',
      duration: '25 мин',
      isPremium: true,
      description: 'Глубокая релаксация тела и ума',
    },
    {
      id: '8',
      title: 'Медитация на природе',
      iconName: 'nature',
      iconType: 'MaterialIcons',
      duration: '18 мин',
      isPremium: false,
      description: 'Связь с природой и гармония',
    },
  ];

  const aiMoods: AIMood[] = [
    {
      id: 'happy',
      name: 'Радостное',
      iconName: 'sentiment-very-satisfied',
      iconType: 'MaterialIcons',
      description: 'Повысьте настроение и энергию',
    },
    {
      id: 'calm',
      name: 'Спокойное',
      iconName: 'spa',
      iconType: 'MaterialIcons',
      description: 'Найдите внутренний покой',
    },
    {
      id: 'focused',
      name: 'Сосредоточенное',
      iconName: 'center-focus-strong',
      iconType: 'MaterialIcons',
      description: 'Улучшите концентрацию и продуктивность',
    },
  ];

  const handleMeditationPress = (meditation: Meditation) => {
    Alert.alert(
      meditation.title,
      `${meditation.description}\n\nДлительность: ${meditation.duration}`,
      [{ text: 'OK' }]
    );
  };

  const handleAIMoodSelect = (mood: AIMood) => {
    setIsAIModalVisible(false);
    setSelectedMood(mood);

    const responses = {
      happy: `🌟 Радостная медитация дня:\n\n"Сегодня прекрасный день для того, чтобы наполнить свою жизнь радостью! Представьте, как солнечные лучи проникают в ваше сердце, принося тепло и свет. Почувствуйте, как каждая клеточка вашего тела вибрирует от счастья. Вы достойны этой радости, и она уже с вами!"`,
      calm: `🌸 Спокойная медитация дня:\n\n"В этот момент позвольте себе просто быть. Ваше дыхание спокойно и размеренно, как волны океана. Все мысли могут подождать - сейчас время для внутреннего покоя. Вы в безопасности, вы защищены, вы спокойны."`,
      focused: `🎯 Сосредоточенная медитация дня:\n\n"Ваше внимание подобно лазерному лучу - четкое, мощное и направленное. Каждый вдох помогает вам сосредоточиться на настоящем моменте. Ваши цели ясны, ваш путь определен. Вы способны достичь всего, на что направите свою энергию."`,
    };

    setTimeout(() => {
      Alert.alert(
        `AI ${mood.name} настрой`,
        responses[mood.id as keyof typeof responses],
        [{ text: 'Понятно' }]
      );
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (isFreeVersion && onBackToPaywall) {
                onBackToPaywall();
              } else {
                // Для платной версии сбрасываем подписку и возвращаемся к экрану подписки
                resetSubscription();
              }
            }}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <FontAwesome5 name="spa" size={24} color="white" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Медитации</Text>
        </View>
        {selectedMood && (
          <View style={styles.headerRight}>
            {selectedMood.iconType === 'FontAwesome5' ? (
              <FontAwesome5 name={selectedMood.iconName} size={14} color="#667eea" />
            ) : (
              <MaterialIcons name={selectedMood.iconName} size={14} color="#667eea" />
            )}
            <Text style={styles.headerMoodText}>{selectedMood.name}</Text>
          </View>
        )}
      </View>

      {/* Subscription Status */}
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, isSubscribed && styles.premiumStatus]}>
          {isSubscribed ? 'Premium подписка активна' : 'Бесплатная версия'}
        </Text>
      </View>

      {/* Meditations Grid */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        <View style={styles.grid}>
          {meditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              onPress={handleMeditationPress}
              onUpgradePress={onUpgradePress}
            />
          ))}
        </View>
      </ScrollView>

      {/* AI FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAIModalVisible(true)}
      >
        <FontAwesome5 name="brain" size={24} color="#fff" />
      </TouchableOpacity>

      {/* AI Modal */}
      <Modal
        visible={isAIModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsAIModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <FontAwesome5 name="brain" size={20} color="#667eea" />
                <Text style={styles.modalTitle}>AI Настрой дня</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsAIModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Выберите настроение для персонализированной медитации
            </Text>

            <View style={styles.moodGrid}>
              {aiMoods.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={styles.moodCard}
                  onPress={() => handleAIMoodSelect(mood)}
                >
                  <View style={styles.moodIconContainer}>
                    {mood.iconType === 'FontAwesome5' ? (
                      <FontAwesome5 name={mood.iconName} size={24} color="#667eea" />
                    ) : (
                      <MaterialIcons name={mood.iconName} size={24} color="#667eea" />
                    )}
                  </View>
                  <View style={styles.moodTextContainer}>
                    <Text style={styles.moodName} numberOfLines={1}>{mood.name}</Text>
                    <Text style={styles.moodDescription} numberOfLines={2}>{mood.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Increased top padding to avoid status bar
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 12,
    marginTop: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerMoodText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
    marginLeft: 4,
  },
  resetButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  premiumStatus: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 4,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    bottom: 60,
    right: 24,
    backgroundColor: '#667eea',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a3e',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: width - 40,
    maxHeight: width > 400 ? '60%' : '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
    position: 'absolute',
    right: -15,
    top: -15,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  moodGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  moodCard: {
    backgroundColor: '#3a3a4e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: width - 120, // Full width minus margins
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moodIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  moodTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  moodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'left',
  },
  moodDescription: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 18,
    textAlign: 'left',
  },
});

export default MeditationsScreen;
