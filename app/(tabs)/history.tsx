import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RunHistoryScreen = () => {
  const [runHistory, setRunHistory] = useState([
    { id: '1', date: '2024-06-01', distance: 5, time: 30, pace: 6, effort: 'Moderate' },
    { id: '2', date: '2024-06-02', distance: 7, time: 42, pace: 6, effort: 'Moderate' },
  ]);

  const data = {
    labels: ['Jun 1', 'Jun 2', 'Jun 3'],
    datasets: [
      {
        data: [5, 5.5, 6],
      },
    ],
  };
  const renderItem = ({ item }) => (
    <View>
      <ThemedText>{`Date: ${item.date}, Distance: ${item.distance} km, Time: ${item.time} min, Pace: ${item.pace} min/km, Effort: ${item.effort}`}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ThemedText>Progress Tracking</ThemedText>
      <LineChart
        data={data}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
      />

      <ThemedText>Run History</ThemedText>
      <FlatList
        data={runHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
};

export default RunHistoryScreen;
