import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity?: number;
};

type HomeNavigationProp = StackNavigationProp<any, 'Home'>;

interface HomeProps {
  navigation: HomeNavigationProp;
}



const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([]);

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fazendo a requisição para a API
      try {
        const response = await fetch('http://192.168.0.195:3000/api/product');
        const data = await response.json();
        setProdutos(data); // Atualiza o estado com os produtos recebidos da API
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }

      // Carrega os itens do carrinho
      const items = await loadCart();
      setCartItems(items); // Atualiza o estado com os itens carregados do AsyncStorage
    };

    fetchData(); // Chama a função fetchData para carregar os produtos e o carrinho
  }, []);

  const addToCart = async (product: Product) => {
    try {
      // Recupera o carrinho atual
      const cart = await AsyncStorage.getItem('cart');
      let cartItems: Product[] = cart ? JSON.parse(cart) : [];

      // Verifica se o produto já existe no carrinho
      const productIndex = cartItems.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        // Se o produto já existir, aumenta a quantidade
        cartItems[productIndex].quantity = (cartItems[productIndex].quantity || 0) + 1;
      } else {
        // Caso o produto não esteja no carrinho, adiciona o produto com quantidade 1
        cartItems.push({ ...product, quantity: 1 });
      }

      // Atualiza o AsyncStorage com o carrinho modificado
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

      // Atualiza o estado local para refletir imediatamente a adição
      setCartItems(cartItems);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <View style={styles.productsContainer}>
        {produtos.map((produto) => (
          
          <View key={produto.id} style={styles.productCard}>
            <Image
              source={{ uri: produto.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{produto.name}</Text>
            <Text style={styles.productPrice}>{`R$ ${produto.price}`}</Text>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => addToCart(produto)} // Chama a função para adicionar ao carrinho
            >
              <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '45%',
    maxWidth: 160,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
