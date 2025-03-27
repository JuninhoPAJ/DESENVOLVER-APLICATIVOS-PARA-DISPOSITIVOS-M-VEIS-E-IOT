import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const navigation = useNavigation();

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
      return [];
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartItems: Product[] = cart ? JSON.parse(cart) : [];

      // Filtra o produto a ser removido
      const updatedCart = cartItems.filter((item) => item.id !== productId);

      // Atualiza o AsyncStorage e o estado local
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao excluir produto do carrinho:", error);
    }
  };

  const increaseQuantity = async (productId: number) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartItems: Product[] = cart ? JSON.parse(cart) : [];

      // Encontra o produto no carrinho
      const productIndex = cartItems.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        // Aumenta a quantidade se o produto já existir
        cartItems[productIndex].quantity += 1;
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems)); // Atualiza o AsyncStorage
        setCartItems(cartItems); // Atualiza o estado local
      }
    } catch (error) {
      console.error("Erro ao aumentar a quantidade:", error);
    }
  };

  const fetchData = async () => {
    const items = await loadCart();
    setCartItems(items);
  };

  useEffect(() => {
    fetchData();

    const focusListener = navigation.addListener('focus', fetchData);

    return () => {
      focusListener();
    };
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Text style={styles.actionText}>Aumentar Qtde</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.actionText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Cart;
