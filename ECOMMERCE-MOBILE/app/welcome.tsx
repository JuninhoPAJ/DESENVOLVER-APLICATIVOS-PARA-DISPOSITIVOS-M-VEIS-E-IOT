import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const welcome = () => {
    return (
        <LinearGradient colors={['#0EDFBD', '#c60000']} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={styles.container}>
            <View style={styles.formContainer}>
                <MaterialCommunityIcons name='home' size={24} color="black" />
                <Text>Seja bem vindo!</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center'
    }
})

export default welcome
