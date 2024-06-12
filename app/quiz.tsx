import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { router } from 'expo-router';

export default function Quiz() {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // Logic to process the quiz answers and estimate running level
    router.push('(tabs)');
  };

  return (
    <View>
      <Text>Quiz Screen</Text>
      {/* Example question */}
      <Text>How often do you run?</Text>
      <TextInput
        placeholder="e.g., 3 times a week"
        onChangeText={(text) => handleAnswerChange('runningFrequency', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}