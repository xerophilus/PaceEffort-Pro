// amplitudeConfig.js
import * as Amplitude from '@amplitude/analytics-react-native';
import { createContext, useContext } from 'react';

const API_KEY = '71d8617d9d7864a2b6a5ce5422996c02';


const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

  const init = () => {
    Amplitude.init(API_KEY);
  }

  const setUser = (userId) => {
    Amplitude.setUserId(userId);
  }
  
  const trackEvent = (event, data = {}) => {
    Amplitude.track(event, data)
  }
  return (
    <AnalyticsContext.Provider value={{ init, setUser, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  }
  return context;
};