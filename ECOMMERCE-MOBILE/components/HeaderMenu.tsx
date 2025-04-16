import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Divider, Menu } from 'react-native-paper'

const HeaderMenu = () => {
    const [visible, setVisible] = useState(false)
    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#FFF" />
                </TouchableOpacity>
            }
        >
            <Menu.Item title={<Text>Perfil</Text>} />
            <Menu.Item title={<Text>Configuration</Text>} />
            <Menu.Item onPress={() => router.replace('/chat')} title={<Text>Chat</Text>} />
            <Menu.Item onPress={() => router.replace('/chatIa')} title={<Text>Conversation with IA</Text>} />
            <Divider />
            <Menu.Item onPress={() => { router.replace('/login') }} title="Sair" />

        </Menu >
    )
}

export default HeaderMenu
