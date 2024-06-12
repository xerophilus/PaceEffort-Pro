import { useFirebase } from '@/context/firebaseContext';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

const ForgotPasswordScreen = () => {
    const { forgotPassword } = useFirebase();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef('');

    const handleForgotPassword = () => {
        setLoading(true);
        if(!emailRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Please Enter Your Email Address')
            return;
        }

        forgotPassword(emailRef.current)
    }
    
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.appName}>Outfitly</Text>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#888"
            activeUnderlineColor="#FFA500"
            textColor="#fff"
            left={<TextInput.Icon icon="email"/>}
            onChangeText={value => emailRef.current=value}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleForgotPassword}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backToLoginButton} onPress={() => router.navigate('/sign-in')}>
          <Text style={styles.backToLoginButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto'
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontFamily: 'Oswald-Bold', // Use a bold, gritty font
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 24,
    color: '#FFA500',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Oswald-Regular',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderColor: '#555',
    borderWidth: 1,
    color: '#fff',
    fontFamily: 'Oswald-Regular',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    fontFamily: 'Oswald-Regular',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Oswald-Regular',
  },
  backToLoginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#555', // Slightly different background color for visibility
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFA500', // Brighter border color
    borderWidth: 1,
    marginVertical: 10,
    fontFamily: 'Oswald-Regular',
  },
  backToLoginButtonText: {
    color: '#FFA500', // Brighter text color to match the border
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Oswald-Regular',
  },
});

export default ForgotPasswordScreen;
