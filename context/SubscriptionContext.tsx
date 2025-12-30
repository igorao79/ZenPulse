import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SubscriptionContextType } from '../types';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => {
    setIsSubscribed(true);
  };

  const resetSubscription = () => {
    setIsSubscribed(false);
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscribe, resetSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
