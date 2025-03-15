import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState({value: '', dirty: false})
    const [password, setPassword] = useState({value: '', dirty: false})
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
        } else {
            return <Text style={styles.error}></Text>
        }
    }

    const handleErrorForm = () => {
        let hasError = false
        if (!password.value) {
            setPassword({value: password.value, dirty: true})
            hasError = true
        }

        if (!email.value) {
            setEmail({value: email.value, dirty: true})
            hasError = true
        }

        if (!emailRegex.test(email.value)) {
            setEmail({value: email.value, dirty: true})
            hasError = true
        }

        if (!hasError) {
            router.replace('/(tabs)/home')
        }
    }

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f5d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
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
                            onChangeText={(text) => setEmail({value: text, dirty: true})}
                        />
                        {handleErrorEmail()}

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#ccc"
                            secureTextEntry
                            value={password.value}
                            onChangeText={(text) => setPassword({value: text, dirty: true})}
                        />
                        {handleErrorPassword()}

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => handleErrorForm()}
                        >
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.replace('/welcome')}
                        >
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
        width: '100%', // Largura ajustada para manter uniformidade
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
        backgroundColor: '#3b5998', // Cor de fundo para o botão de login
    },
    backButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#8b9dc3', // Cor diferente para o botão de voltar
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
        color: '#FF6347', // Cor para os erros
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
