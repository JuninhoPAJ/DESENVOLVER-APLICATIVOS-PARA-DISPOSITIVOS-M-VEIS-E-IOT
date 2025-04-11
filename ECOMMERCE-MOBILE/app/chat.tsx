import React, { Fragment, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useLocalSearchParams } from 'expo-router'

class Message {
    text: string
    sentBy: string

    constructor(text: string, sentBy: string) {
        this.text = text
        this.sentBy = sentBy
    }
}

const ws = new WebSocket('ws://192.168.0.195:3000')
const chat = () => {
    const params = useLocalSearchParams()
    const [userLogged, setUserLogged] = useState(params.userLogged)
    const [chatData, setChat] = useState<{ messages: Message[] }>({ messages: [] })
    const [message, setMessage] = useState('')

    useEffect(() => {
        ws.onopen = () => {
            console.log('Conectado ao servidor WebSocket')
        }
        ws.onmessage = ({data}) => {
            chatData.messages.push(JSON.parse(data))
            setChat({ messages: chatData.messages })
            setMessage('')
        }
    }, [])

    const sendMessage = () => {
        const jsonString: string = JSON.stringify({ text: message, sentBy: userLogged })
        ws.send(jsonString)
    }

    return (
        <Fragment>
            <FlatList
                style={styles.scrollViewContainer}
                data={chatData.messages}
                renderItem={({ item }) => <Balloon message={item} currentUser={userLogged}></Balloon>}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text style={{ alignSelf: 'center', color: '#848484' }}>Sem mensagens no momento</Text>}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.messageTextInputContainer}>
                <TextInput
                    style={styles.messageTextInput}
                    placeholder='Digite sua mensagem'
                    placeholderTextColor={Colors.light}
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                />
                <TouchableOpacity onPress={() => sendMessage()} style={styles.sendButton} disabled={!message}>
                    <Text style={{ color: Colors.white }}><Ionicons name='send' size={28} color='white' /></Text>
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}

const Balloon = ({ message, currentUser }: any) => {
    const sent = currentUser === message.sentBy;
    const balloonColor = sent ? styles.balloonSent : styles.balloonReceived;
    const balloonTextColor = sent ? styles.balloonTextSent : styles.balloonTextReceived;
    const bubbleWarpper = sent ? styles.bubbleWarpperSent : styles.bubbleWarpperReceive;


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
        borderColor: 'trasparent',
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

export default chat