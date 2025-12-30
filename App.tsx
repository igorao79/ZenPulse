import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SubscriptionProvider } from './context/SubscriptionContext';
import PaywallScreen from './screens/PaywallScreen';
import MeditationsScreen from './screens/MeditationsScreen';
import { useSubscription } from './context/SubscriptionContext';

// Main App Component with navigation logic
const AppContent: React.FC = () => {
  const { isSubscribed } = useSubscription();
  const [showFreeVersion, setShowFreeVersion] = React.useState(false);

  const handleGoFree = () => {
    setShowFreeVersion(true);
  };

  const handleBackToPaywall = () => {
    setShowFreeVersion(false);
  };

  const handleUpgradePress = () => {
    setShowFreeVersion(false);
    // This will show the PaywallScreen
  };

  if (isSubscribed) {
    return <MeditationsScreen />;
  }

  if (showFreeVersion) {
    return <MeditationsScreen isFreeVersion={true} onBackToPaywall={handleBackToPaywall} onUpgradePress={handleUpgradePress} />;
  }

  return <PaywallScreen onGoFree={handleGoFree} />;
};

export default function App() {
  return (
    <PaperProvider>
      <SubscriptionProvider>
        <AppContent />
        <StatusBar style="light" />
      </SubscriptionProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  // Styles can be added here if needed
});
