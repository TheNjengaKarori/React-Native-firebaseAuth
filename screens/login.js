import { useNavigation } from '@react-navigation/core';
import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {auth} from '../firebase'

const login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigation = useNavigation()

useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user =>{
        if (user) {
            navigation.replace('home')
        }
    })
    return unsubscribe
}, [])

const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered in whth :',user.email);
    })
    .catch(error => alert(error.message))
}

const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in whth :',user.email);
    })
    .catch(error => alert(error.message))
}

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                placeholder='email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='password'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default login

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'80%'
    },
input:{ 
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:5
},
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40
},
button:{
    width:'100%',
    backgroundColor:'#0782f9',
    padding:15,
    borderRadius:10,
    alignItems:'center'
},
buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:15
},
buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'#0782f9',
    borderWidth:2
},
buttonOutlineText:{
    color:'#0782f9',
    fontWeight:'700',
    fontSize:15
}
})
