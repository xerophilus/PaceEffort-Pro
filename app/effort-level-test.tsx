import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';

const EffortLevelTestScreen = () => {
  const [effortLevels, setEffortLevels] = useState({});
  const [isTesting, setIsTesting] = useState(false);
  const [testStage, setTestStage] = useState(0);

  const testStages = [
    { name: 'Fastest Speed', description: 'Run at your fastest speed for 1 minute.' },
    { name: 'Comfortable Speed', description: 'Run at a comfortable pace for 1 minute.' },
    { name: 'Slowest Speed', description: 'Run at your slowest speed for 1 minute.' },
  ];

  const startTest = () => {
    setIsTesting(true);
    setTestStage(0);
  };

  const nextStage = (speed) => {
    const newEffortLevels = { ...effortLevels };
    newEffortLevels[testStages[testStage].name] = speed;
    setEffortLevels(newEffortLevels);

    if (testStage < testStages.length - 1) {
      setTestStage(testStage + 1);
    } else {
      setIsTesting(false);
      // Process the results
      calculateEffortLevels(newEffortLevels);
    }
  };

  const calculateEffortLevels = (levels) => {
    // Logic to calculate effort levels
    console.log('Effort Levels:', levels);
  };

  return (
    <View>
      <ThemedText>Effort Level Test</ThemedText>
      {isTesting ? (
        <View>
          <ThemedText>{testStages[testStage].description}</ThemedText>
          {/* Simulate the speed input for demonstration purposes */}
          <Button title="Submit Speed" onPress={() => nextStage(Math.random() * 10)} />
        </View>
      ) : (
        <Button title="Start Test" onPress={startTest} />
      )}
      {Object.keys(effortLevels).length > 0 && (
        <View>
          <ThemedText>Effort Levels:</ThemedText>
          {Object.keys(effortLevels).map((level) => (
            <ThemedText key={level}>{`${level}: ${effortLevels[level]} km/h`}</ThemedText>
          ))}
        </View>
      )}
    </View>
  );
};

export default EffortLevelTestScreen;
