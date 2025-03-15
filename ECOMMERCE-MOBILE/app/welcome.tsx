import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const Welcome = () => {
    const navigate = useRouter()
    const replacePath = (path: any) => {
        navigate.replace(path)
    }
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
            <View style={styles.content}>
                <MaterialCommunityIcons name="account-circle" size={120} color="white" />
                <Text style={styles.title}>Bem-vindo à nossa Loja!</Text>
                <Text style={styles.subtitle}>Entre ou crie uma conta para começar</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => { replacePath('login') }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => { replacePath('register') }}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default Welcome;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    loginButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#3b5998',
    },
    registerButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#8b9dc3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

