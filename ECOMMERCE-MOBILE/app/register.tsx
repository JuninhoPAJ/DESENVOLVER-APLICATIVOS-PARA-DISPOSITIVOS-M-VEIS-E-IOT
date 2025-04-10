import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import httpService from './services/htthService';

const Register = () => {
    const SERVER_URL = 'http://192.168.0.195:3000'
    const navigate = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [cpfDirty, setCpfDirty] = useState(false);
    const [fullNameDirty, setFullNameDirty] = useState(false); // Variável dirty para Nome Completo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{11}$/; // Regex simples para validar o CPF (apenas números e 11 dígitos)

    const handleErrorFullName = () => {
        if (fullNameDirty && !fullName) {
            return <Text style={styles.error}>Campo obrigatório</Text>;
        } else if (fullNameDirty && fullName.length < 2) {
            return <Text style={styles.error}>Nome completo deve ter no mínimo 2 caracteres</Text>;
        }
        return null;
    };

    const handleErrorEmail = () => {
        if (emailDirty && !email) {
            return <Text style={styles.error}>Campo obrigatório</Text>;
        } else if (emailDirty && !emailRegex.test(email)) {
            return <Text style={styles.error}>E-mail inválido</Text>;
        }
        return null;
    };

    const handleErrorCpf = () => {
        if (cpfDirty && !cpf) {
            return <Text style={styles.error}>Campo obrigatório</Text>;
        } else if (cpfDirty && !cpfRegex.test(cpf)) {
            return <Text style={styles.error}>CPF inválido</Text>;
        }
        return null;
    };

    const handleErrorPassword = () => {
        if (passwordDirty && !password) {
            return <Text style={styles.error}>Campo obrigatório</Text>;
        } else if (passwordDirty && password.length < 6) {
            return <Text style={styles.error}>A senha deve ter pelo menos 6 caracteres</Text>;
        }
        return null;
    };

    const handleErrorConfirmPassword = () => {
        if (passwordDirty && !confirmPassword) {
            return <Text style={styles.error}>Campo obrigatório</Text>;
        } else if (passwordDirty && confirmPassword !== password) {
            return <Text style={styles.error}>As senhas não coincidem</Text>;
        }
        return null;
    };
    

    const handleErrorForm = () => {
        let hasError = false;
        // Verificação de campos obrigatórios e validações
        if (!fullName || fullName.length < 2) {
            setFullNameDirty(true);
            hasError = true;
        }

        if (!email) {
            setEmailDirty(true);
            hasError = true;
        }

        if (!emailRegex.test(email)) {
            setEmailDirty(true);
            hasError = true;
        }

        if (!cpf) {
            setCpfDirty(true);
            hasError = true;
        }

        if (!cpfRegex.test(cpf)) {
            setCpfDirty(true);
            hasError = true;
        }

        if (!password) {
            setPasswordDirty(true);
            hasError = true;
        }

        if (password.length < 6) {
            setPasswordDirty(true);
            hasError = true;
        }

        if (!confirmPassword) {
            setPasswordDirty(true);
            hasError = true;
        }

        if (confirmPassword !== password) {
            setPasswordDirty(true);
            hasError = true;
        }

        // Se não houver erro, procede com o registro
        if (!hasError) {
            sendForm()
            replacePath('login');
        }
    };

    const sendForm = async () => {
        const json = {
            name: fullName,
            email,
            cpf,
            password,
        };
        try {
            const registerUserURL = `${SERVER_URL}/api/user`;
            await httpService.post(registerUserURL, json);
            alert('Registro bem-sucedido!');
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

    const replacePath = (path: any) => {
        navigate.replace(path);
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.content}>
                        <MaterialCommunityIcons name="account-circle" size={120} color="white" />
                        <Text style={styles.title}>Crie sua Conta</Text>
                        <Text style={styles.subtitle}>Preencha os dados abaixo para começar</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            placeholderTextColor="#ccc"
                            value={fullName}
                            onChangeText={(text) => {
                                setFullName(text);
                                setFullNameDirty(true);
                            }}
                        />
                        {handleErrorFullName()}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailDirty(true);
                            }}
                        />
                        {handleErrorEmail()}

                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={cpf}
                            onChangeText={(text) => {
                                setCpf(text);
                                setCpfDirty(true);
                            }}
                        />
                        {handleErrorCpf()}

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#ccc"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordDirty(true);
                            }}
                        />
                        {handleErrorPassword()}

                        <TextInput
                            style={styles.input}
                            placeholder="Repetir Senha"
                            placeholderTextColor="#ccc"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setPasswordDirty(true);
                            }}
                        />
                        {handleErrorConfirmPassword()}

                        <TouchableOpacity style={styles.registerButton} onPress={() => handleErrorForm()}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => replacePath('welcome')}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => replacePath('login')}>
                            <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

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
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        width: '85%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    registerButton: {
        width: '85%',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#3b5998',
    },
    backButton: {
        width: '85%',
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
    loginText: {
        color: 'white',
        fontSize: 14,
        marginTop: 10,
    },
    error: {
        width: '85%',
        marginBottom: 10,
        color: '#FF6347',
        fontWeight: 'bold',
        fontSize: 14,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Register;
