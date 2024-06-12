import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFirebase } from "@/context/firebaseContext";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";

const SignUp = () => {
    const { register } = useFirebase();
    
    const [loading, setLoading] = useState(false);
    const [visible, setVisibility] = useState(false);

    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')

    const handleSignUp = async () => {
        setLoading(true);
        if(!emailRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Please Enter Your Email Address')
            return;
        }
        if(!nameRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Please Enter Your Name')
            return;
        }
        if(!passwordRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Please Enter Your Password')
            return;
        }
        if(!confirmPasswordRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Please Confirm Your Password')
            return;
        }
        if(passwordRef.current !== confirmPasswordRef.current){
            setLoading(false);
            Alert.alert('Sign Up', 'Passwords Don\'t Match')
            return;
        }
        
        const response = await register(emailRef.current, passwordRef.current, nameRef.current)
        setLoading(false)

        if(!response.success){
            Alert.alert("Sign Up Error", response.msg)
        }
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
                    placeholder="Name"
                    style={styles.input}
                    placeholderTextColor="#888"
                    activeUnderlineColor="#FFA500"
                    textColor="#fff"
                    left={<TextInput.Icon icon="account"/>}
                    onChangeText={value => nameRef.current=value}
                />
                <TextInput 
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={!visible}
                    placeholderTextColor="#888"
                    activeUnderlineColor="#FFA500"
                    textColor="#fff"
                    left={<TextInput.Icon icon="key"/>}
                    right={<TextInput.Icon onPress={() => setVisibility(!visible)} icon={visible ? 'eye' : 'eye-off'}/>}
                    onChangeText={value => passwordRef.current=value}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry={!visible}
                    placeholderTextColor="#888"
                    activeUnderlineColor="#FFA500"
                    textColor="#fff"
                    left={<TextInput.Icon icon="key"/>}
                    right={<TextInput.Icon onPress={() => setVisibility(!visible)} icon={visible ? 'eye' : 'eye-off'}/>}
                    onChangeText={value => confirmPasswordRef.current=value}
                />
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    {
                        loading ? 
                        <ActivityIndicator  size={28}/>
                        :
                        <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/sign-in')}>
                    <ThemedText style={styles.loginButtonText}>Login Up</ThemedText>
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
      signupButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      },
      signupButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Oswald-Regular'
      },
      loginButton: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFA500',
        borderWidth: 1,
        marginVertical: 10,
      },
      loginButtonText: {
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
})
export default SignUp;