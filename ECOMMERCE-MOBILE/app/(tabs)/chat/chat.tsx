import React, { Fragment, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Balloon from './baloon'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const chat = () => {
    const [userLogged, setUserLogged] = useState({})
    const options: any = { messages: [] }
    const [chat, setChat] = useState(options)
    const [message, setMessage] = useState('')
    return (
        <Fragment>
            <ScrollView contentContainerStyle={styles.container}>
                {
                    chat.messages.length > 0 ? chat.messages.map((m: any) => {
                        return <Balloon message={m} currentUser={userLogged}></Balloon>
                    }) :
                        <Text style={{ alignSelf: 'center', color: '#848484' }}>Sem mensagens no momento</Text>
                }
            </ScrollView>
            <SafeAreaView>
                <View style={styles.messageTextInputContainer}>
                    <TextInput
                        style={styles.messageTextInput}
                        placeholder='Digite sua mensagem'
                        placeholderTextColor={Colors.light}
                        value={message}
                        onChangeText={(message) => setMessage(message)}
                    />
                    <TouchableOpacity style={styles.sendButton} disabled={!message}>
                        <Text style={{ color: Colors.white }}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({

    sendButton: {
        backgroundColor: Colors.primary,
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
})

export default chat