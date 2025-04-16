import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Message {
    text: string
    sentBy: string

    constructor(text: string, sentBy: string) {
        this.text = text
        this.sentBy = sentBy
    }
}

let ws: WebSocket

const Chat = () => {
    const scrowRef = useRef<FlatList>(null)
    const params = useLocalSearchParams()

    // Estado para armazenar os dados do usuário
    const [userLogged, setUserLogged] = useState<string | null>(null)
    const [chatData, setChat] = useState<{ messages: Message[] }>({ messages: [] })
    const [message, setMessage] = useState('')

    // Função para buscar os dados do usuário no AsyncStorage
    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setUserLogged(parsedUserData.name); // Atualiza o estado com o nome do usuário
            } else {
                console.log("Usuário não encontrado no AsyncStorage.");
            }
        } catch (error) {
            console.error("Erro ao obter dados do AsyncStorage:", error);
        }
    }

    useEffect(() => {
        // Carregar dados do usuário do AsyncStorage assim que o componente for montado
        fetchUserData();

        // Configuração do WebSocket
        ws = new WebSocket('ws://192.168.0.195:3000')
        ws.onopen = () => {
            console.log('Conectado ao servidor WebSocket')
        }
        ws.onmessage = ({ data }) => {
            const jsonMessage = JSON.parse(data)
            setChat((prev) => ({ messages: [...prev.messages, jsonMessage] }))
            if (userLogged === jsonMessage.sentBy) {
                setMessage('') // Limpa a caixa de texto se a mensagem foi enviada
            }
            scrowRef.current?.scrollToEnd({ animated: true })
        }

        return () => {
            // Fechar a conexão do WebSocket ao desmontar o componente
            ws.close()
        }
    }, [userLogged]) // Dependendo do `userLogged`, vai configurar o WebSocket e buscar os dados

    const sendMessage = () => {
        if (userLogged && message.trim()) {
            const jsonString: string = JSON.stringify({ text: message, sentBy: userLogged })
            ws.send(jsonString)
        }
    }

    return (
        <Fragment>
            <FlatList
                ref={scrowRef}
                style={styles.scrollViewContainer}
                data={chatData.messages}
                renderItem={({ item }) => <Balloon message={item} currentUser={userLogged} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text style={{ alignSelf: 'center', color: '#848484' }}>Sem mensagens no momento</Text>}
                showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} style={styles.messageTextInputContainer}>
                <TextInput
                    style={styles.messageTextInput}
                    placeholder='Digite sua mensagem'
                    placeholderTextColor={Colors.light}
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                />
                <TouchableOpacity onPress={() => sendMessage()} style={styles.sendButton} disabled={!message.trim()}>
                    <Text style={{ color: Colors.white }}><Ionicons name='send' size={28} color='white' /></Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Fragment>
    )
}

const Balloon = ({ message, currentUser }: any) => {
    const sent = currentUser === message.sentBy
    const balloonColor = sent ? styles.balloonSent : styles.balloonReceived
    const balloonTextColor = sent ? styles.balloonTextSent : styles.balloonTextReceived
    const bubbleWarpper = sent ? styles.bubbleWarpperSent : styles.bubbleWarpperReceive

    return (
        <View style={{ marginBottom: '2%' }}>
            <View style={{ ...styles.bubbleWarpper, ...bubbleWarpper }} >
                <View style={{ ...styles.balloon, ...balloonColor }}>
                    <Text>{message.sentBy}</Text>
                    <Text style={{ ...styles.balloonText, ...balloonTextColor }}>{message.text}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sendButton: {
        backgroundColor: '#0Edfbd',
        color: Colors.white,
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#848484',
        borderWidth: 1,
        marginTop: '3%',
        marginBottom: '5%',
        padding: 10
    },
    changeNameView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: 'white',
    },
    container: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    scrollViewContainer: {
        padding: 10,
        top: 10,
        marginBottom: 30,
    },
    messageTextInputContainer: {
        justifyContent: 'flex-end',
        padding: 5,
        borderColor: 'transparent',
        borderTopColor: Colors.light,
        alignItems: 'center',
        flexDirection: 'row',
    },
    messageTextInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 90,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        fontSize: 17,
        borderColor: Colors.light,
        borderWidth: 1,
        backgroundColor: Colors.white,
        borderRadius: 20,
    },
    bubbleWarpper: {
        flexDirection: 'column',
    },
    bubbleWarpperSent: {
        alignSelf: 'flex-end',
        marginLeft: 40,
    },
    bubbleWarpperReceive: {
        alignSelf: 'flex-start',
        marginRight: 40,
    },
    balloon: {
        padding: 8,
        borderRadius: 16,
    },
    balloonSent: {
        backgroundColor: '#0Edfbd',
    },
    balloonReceived: {
        backgroundColor: Colors.white,
    },
    balloonText: {
        fontSize: 18,
    },
    balloonTextSent: {
        color: Colors.white,
    },
    balloonTextReceived: {
        color: Colors.black,
    },
})

export default Chat
