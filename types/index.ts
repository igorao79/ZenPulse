export interface Meditation {
  id: string;
  title: string;
  iconName: string;
  iconType: 'MaterialIcons' | 'FontAwesome5';
  duration: string;
  isPremium: boolean;
  description: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  savings?: string;
  isPopular?: boolean;
}

export interface AIMood {
  id: string;
  name: string;
  iconName: string;
  iconType: 'MaterialIcons' | 'FontAwesome5';
  description: string;
}

export interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribe: () => void;
  resetSubscription: () => void;
}

export type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
};
