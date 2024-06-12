import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ThemedText } from './ThemedText';

const SpeedometerGauge = ({ speed, units }) => {
  const maxSpeed = 20; // Define the maximum speed for the gauge

  const calcSpeed = () => {
    if (speed < 0) {
        return 0;
    }
    return speed.toFixed(1)
  }
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={30}
        fill={(speed / maxSpeed) * 100}
        tintColor="#00C853"
        backgroundColor="#d3d3d3"
        rotation={-120}
        lineCap="round"
        arcSweepAngle={240}
      >
        {
          (fill) => (
            <ThemedText style={styles.speedText}>
              {calcSpeed()} {units}/h
            </ThemedText>
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 24,
  },
});

export default SpeedometerGauge;
