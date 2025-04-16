import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
    StyleSheet, Text, TextInput, TouchableOpacity, View,
    KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import httpService from './services/htthService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    const SERVER_URL = 'http://192.168.0.195:3000'
    const router = useRouter()

    const [email, setEmail] = useState({ value: '', dirty: false })
    const [password, setPassword] = useState({ value: '', dirty: false })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <Text style={styles.error}>Campo obrigatório</Text>
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <Text style={styles.error}>E-mail inválido</Text>
        } else {
            return <Text style={styles.error}></Text>
        }
    }

    const handleErrorPassword = () => {
        if (!password.value && password.dirty) {
            return <Text style={styles.error}>Campo obrigatório</Text>
        } else if (password.value.length < 6 && password.dirty) {
            return <Text style={styles.error}>A senha deve ter no mínimo 6 caracteres</Text>
        } else {
            return <Text style={styles.error}></Text>
        }
    }

    const handleErrorForm = async () => {
        let hasError = false

        if (!email.value) {
            setEmail({ value: email.value, dirty: true })
            hasError = true
        } else if (!emailRegex.test(email.value)) {
            setEmail({ value: email.value, dirty: true })
            hasError = true
        }

        if (!password.value || password.value.length < 6) {
            setPassword({ value: password.value, dirty: true })
            hasError = true
        }

        if (!hasError) {
            try {
                const response = await httpService.post(`${SERVER_URL}/api/login`, {
                    email: email.value,
                    password: password.value,
                })

                if (response.status === 200) {
                    const userData = response.data.user;
                    await AsyncStorage.setItem('user', JSON.stringify(userData))
                    Alert.alert('Sucesso', 'Login realizado com sucesso!')
                    router.replace('/(tabs)/home')
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    Alert.alert('Erro', 'Credenciais inválidas!')
                } else if (error.response?.status === 404) {
                    Alert.alert('Erro', 'Credenciais inválidas!')
                } else {
                    Alert.alert('Erro', 'Credenciais inválidas!')
                    console.error('Erro no login:', error)
                }
            }
        }
    }

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.content}>
                        <AntDesign style={styles.logo} name="bank" />
                        <Text style={styles.title}>Loja de ferramentas</Text>
                        <Text style={styles.subtitle}>Faça login para continuar</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#ccc"
                            value={email.value}
                            onChangeText={(text) => setEmail({ value: text, dirty: true })}
                        />
                        {handleErrorEmail()}

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#ccc"
                            secureTextEntry
                            value={password.value}
                            onChangeText={(text) => setPassword({ value: text, dirty: true })}
                        />
                        {handleErrorPassword()}

                        <TouchableOpacity style={styles.loginButton} onPress={handleErrorForm}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/welcome')}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.replace('/register')}>
                            <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

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
    logo: {
        fontSize: 100,
        color: 'white',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        paddingHorizontal: 100,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#3b5998',
    },
    backButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#8b9dc3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        color: 'white',
        fontSize: 14,
        marginTop: 10,
    },
    error: {
        width: '100%',
        marginBottom: 20,
        color: '#FF6347',
        fontWeight: 'bold',
        height: 20,
        fontSize: 14,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Login
