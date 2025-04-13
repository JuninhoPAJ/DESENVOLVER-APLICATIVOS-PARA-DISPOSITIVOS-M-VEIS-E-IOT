import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number
  _id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const navigation = useNavigation();

  const finalizePurchase = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const userData = await AsyncStorage.getItem('user');
  
      if (!cart || !userData) {
        return alert("Erro: usuário ou carrinho não encontrados");
      }
  
      const cartItems = JSON.parse(cart);
      const user = JSON.parse(userData);
  
      const formattedItems = cartItems.map((item: Product) => ({
        product: item._id ?? item.id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));
  
      const response = await fetch('http://192.168.0.195:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.id,
          userName: user.name,
          items: formattedItems,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Compra finalizada com sucesso!');
        await AsyncStorage.removeItem('cart');
        setCartItems([]);
      } else {
        alert('Erro ao finalizar compra: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro inesperado');
    }
  };

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

      const productIndex = cartItems.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        if (cartItems[productIndex].quantity > 1) {
          // Só diminui a quantidade
          cartItems[productIndex].quantity -= 1;
        } else {
          // Remove o produto se a quantidade for 1
          cartItems.splice(productIndex, 1);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        setCartItems(cartItems);
      }
    } catch (error) {
      console.error("Erro ao atualizar o carrinho:", error);
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
              <Text style={styles.itemPrice}>{`R$ ${item.price}`}</Text>
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
      {
        cartItems.length > 0 && (
          <TouchableOpacity style={styles.checkoutButton} onPress={finalizePurchase}>
            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

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
