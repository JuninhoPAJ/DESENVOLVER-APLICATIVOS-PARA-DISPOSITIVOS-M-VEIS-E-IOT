import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PaperProvider } from 'react-native-paper';
import HeaderMenu from '@/components/HeaderMenu';

export default function TabLayout() {

  return (
    <PaperProvider>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#4c669f',
            },
            tabBarStyle: {
              backgroundColor: '#3b5998',
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
              backgroundColor: '#4c669f',
            },
            tabBarStyle: {
              backgroundColor: '#3b5998',
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
