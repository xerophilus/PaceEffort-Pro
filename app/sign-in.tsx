import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFirebase } from "@/context/firebaseContext";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { TextInput } from "react-native-paper";
import { TouchableOpacity, ImageBackground } from 'react-native';

const Login = () => {
    const { login } = useFirebase();
    
    const [loading, setLoading] = useState(false);
    const [visible, setVisibility] = useState(false);

    const emailRef = useRef('')
    const passwordRef = useRef('')

    const handleLogin = async () => {
        setLoading(true);
        if(!emailRef.current ){
            setLoading(false);
            Alert.alert('Sign In', 'Please Enter Your Email Address')
            return;
        }
        if(!passwordRef.current){
            setLoading(false);
            Alert.alert('Sign In', 'Please Enter Your Password')
            return;
        }

        const response = await login(emailRef.current, passwordRef.current)
        setLoading(false)
        if(!response.success){
            Alert.alert("Sign In Error", response.msg)
        }
        console.log(response)
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.appName}>Outfitly</ThemedText>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="#888"
                    activeUnderlineColor="#FFA500"
                    textColor="#fff"
                    left={<TextInput.Icon icon="email"/>}
                    onChangeText={value => emailRef.current=value}
                />
                <TextInput 
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={!visible}
                    placeholderTextColor="#888"
                    activeUnderlineColor="#FFA500"
                    textColor="#fff"
                    left={<TextInput.Icon icon="key"/>}
                    right={<TextInput.Icon icon={visible ? 'eye-off' : 'eye'} onPress={() => setVisibility(!visible)}/>}
                    onChangeText={value => passwordRef.current=value}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    {
                        loading ? 
                        <ActivityIndicator  size={28}/>
                        :
                        <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace('/sign-up')}>
                    <ThemedText style={styles.signUpButtonText}>Sign Up</ThemedText>
                </TouchableOpacity>
                <ThemedView style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => router.navigate('/forgot-password')}>
                        <ThemedText style={styles.linkText}>Forgot Password?</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate('/privacy-policy')}>
                        <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
                <ThemedText style={styles.quote}>“The only limit to our realization of tomorrow is our doubts of today.”</ThemedText>
            </ThemedView>
        </SafeAreaView>
    )
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Oswald-Bold',
        lineHeight: 38
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
        color: '#fff'
      },
      loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Oswald-Regular'
      },
      signUpButton: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFA500',
        borderWidth: 1,
        marginVertical: 10,
      },
      signUpButtonText: {
        color: '#FFA500',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Oswald-Regular'
      },
      linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'rgba(50, 50, 50, 0.1)'
      },
      linkText: {
        color: '#ccc',
        fontSize: 14,
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        fontFamily: 'Oswald-Regular'
      },
      quote: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#999',
        marginTop: 20,
      },    
  });
  
export default Login;