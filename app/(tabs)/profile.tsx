import React from 'react';
import { View, Text, Button, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ThemedText>Home Screen</ThemedText>
      <Button title="Take Quiz" onPress={() => router.push('/quiz')} />
      <Button title="Run Tracker" onPress={() => router.push('/run-tracker')} />
      <Button title="Effort Level Test" onPress={() => router.push('/effort-level-test')} />
      <Button title="History" onPress={() => router.push('/history')} />
    </SafeAreaView>
  );
}

export default ProfileScreen