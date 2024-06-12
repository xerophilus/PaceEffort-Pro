import React from 'react';
import { View, Text, Button, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
  const router = useRouter();

  return (
    <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ThemedText>Home Screen</ThemedText>
      <Button title="Take Quiz" onPress={() => router.push('/quiz')} />
      <Button title="Run Tracker" onPress={() => router.push('/run-tracker')} />
      <Button title="Effort Level Test" onPress={() => router.push('/effort-level-test')} />
      <Button title="History" onPress={() => router.push('/history')} />
    </ThemedView>
  );
}