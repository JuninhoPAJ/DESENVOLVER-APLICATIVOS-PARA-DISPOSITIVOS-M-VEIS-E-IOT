import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const changeName = () => {
    const [userLogged, setUserLogged] = useState('')
    const router = useRouter()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={styles.textInput} placeholderTextColor='black' onChangeText={(text) => setUserLogged(text)} value={userLogged} />
            <TouchableOpacity style={styles.button} onPress={() => router.replace({ pathname: '/chat', params: { userLogged } })}><Text>Enviar</Text></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        paddingLeft: 10,
    },
    button: {
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#0EDFBD',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default changeName