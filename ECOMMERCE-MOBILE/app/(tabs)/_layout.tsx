import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, PaperProvider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import HeaderMenu from '@/components/HeaderMenu';

export default function TabLayout() {
  const [visible, setVisible] = useState(false);

  return (
    <PaperProvider>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={'white'} />,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#0EDF8D',
            },
            tabBarStyle: {
              backgroundColor: '#0EDF8D',
            },
            tabBarActiveTintColor: 'white',

            headerRight: () => {
              return (<HeaderMenu />)
            }

          }} />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#0EDF8D',
            },
            tabBarStyle: {
              backgroundColor: '#0EDF8D',
            },
            tabBarActiveTintColor: 'white',
            headerRight: () => {
              return (<HeaderMenu />)
            }
          }}
        />
      </Tabs>

    </PaperProvider>
  );
}
