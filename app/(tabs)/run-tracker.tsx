import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Switch } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import SpeedometerGauge from '@/components/SpeedometerGauge';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAnalytics } from '@/context/amplitudeConfig';
import { formatTime } from '@/utils/time';
import { useFirebase } from '@/context/firebaseContext';
import { router } from 'expo-router';
import haversine from 'haversine-distance';

const TrackRunScreen = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [prevLocation, setPrevLocation] = useState(null);
  const [time, setTime] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [units, setUnits] = useState(true);
  const { saveRunData } = useFirebase();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    let timer;
    if (tracking) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!tracking && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [tracking, time]);

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  const calculateDistance = (prevLocation, newLocation, unitCalc) => {
    if (!prevLocation) return 0;
    return haversine(prevLocation, newLocation) / unitCalc;
  };

  const startLocationTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500,
        distanceInterval: 1,
      },
      (location) => {
        if (location) {
          const unitCalc = units ? 1000 : 1609;
          if (prevLocation) {
            const distanceCovered = calculateDistance(prevLocation, location.coords, unitCalc);
            setDistance((prevDistance) => prevDistance + distanceCovered);
            console.log(`Distance covered: ${distanceCovered}`);
          } else {
            console.log('First location update, setting prevLocation.');
          }
          setPrevLocation(location.coords);
          const { speed } = location.coords;
          const unitSpeed = units ? speed * 3.6 : speed * 2.237;
          setSpeed(unitSpeed);
          console.log(`Speed: ${unitSpeed}`);
        }
      }
    );

    setLocationSubscription(subscription);
  };

  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
  };

  const toggleTracking = () => {
    if (tracking) {
      if (paused) {
        console.log('Resuming run...');
        startLocationTracking();
        trackEvent('Track Run: Resumed');
        providePacingGuidance('Resuming run');
        setPaused(false);
      } else {
        console.log('Pausing run...');
        stopLocationTracking();
        trackEvent('Track Run: Paused');
        providePacingGuidance('Pausing run');
        setPaused(true);
      }
    } else {
      console.log('Starting new run...');
      setPrevLocation(null); // Reset prevLocation only when starting a new run
      setDistance(0); // Ensure distance is reset when starting a new run
      setTime(0); // Reset time as well
      startLocationTracking();
      trackEvent('Track Run: Start');
      providePacingGuidance('Starting run');
      setPaused(false);
    }
    setTracking(!tracking || paused);
  };

  const providePacingGuidance = (message) => {
    Speech.speak(message);
  };

  const clearRun = () => {
    setDistance(0);
    setSpeed(0);
    setPrevLocation(null);
    setTime(0);
    setTracking(false);
    setPaused(false);
  };

  const endRun = () => {
    console.log('Ending run...');
    stopLocationTracking();
    trackEvent('Track Run Ended');
    saveRunData(distance, time, speed, units ? 'km' : 'miles');
    router.navigate({ pathname: 'run-summary', params: { distance, time, speed, units: units ? 'km' : 'miles' } });
    clearRun();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.gaugeContainer}>
        <SpeedometerGauge speed={speed} units={units ? "km" : "m"} />
      </View>
      <View style={styles.metricsContainer}>
        <View style={styles.metricsItem}>
          <ThemedText style={styles.statsText}>Distance: {distance.toFixed(2)} {units ? "km" : "miles"}</ThemedText>
        </View>
        <View>
          <ThemedText style={styles.statsText}>Time: {formatTime(time)}</ThemedText>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={toggleTracking}
          mode='contained'
          buttonColor={tracking || paused ? '#FFA500' : '#00c853'}
          style={styles.startButton}
        >
          {tracking && !paused ? <Icon source={'pause'} size={32} /> : paused ? <Icon source={'play'} size={32} /> : <ThemedText style={{ fontWeight: 'bold' }}>Start</ThemedText>}
        </Button>
        {paused && (
          <Button
            style={styles.startButton}
            onPress={endRun}
            mode='contained'
          >
            <Icon source={'stop'} size={32} />
          </Button>
        )}
      </View>
      <View style={styles.voiceGuidanceContainer}>
        <ThemedText style={styles.voiceGuidanceText}>Metric Units</ThemedText>
        <Switch
          value={units}
          onValueChange={setUnits}
          disabled={tracking}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
  },
  statsText: {
    fontSize: 18,
  },
  gaugeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  metricsItem: {
    width: '45%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    margin: 50,
  },
  startButton: {
    borderRadius: 100,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  voiceGuidanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  voiceGuidanceText: {
    fontSize: 18,
  },
});

export default TrackRunScreen;
