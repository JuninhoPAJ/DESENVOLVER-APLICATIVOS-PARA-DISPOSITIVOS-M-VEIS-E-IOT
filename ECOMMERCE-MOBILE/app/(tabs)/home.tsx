import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity?: number; // Adicionando 'quantity' como opcional
};

type HomeNavigationProp = StackNavigationProp<any, 'Home'>;

interface HomeProps {
  navigation: HomeNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([
    {
      id: 1,
      name: 'Furadeira Elétrica',
      description: 'Furadeira de alta performance para perfuração em diversos materiais.',
      price: 'R$ 199,90',
      image: 'https://img.lojadomecanico.com.br/IMAGENS/21/223/90547/Parafusadeira--Furadeira-38-Pol-280W-220-vonder-fpv3001.JPG',
    },
    {
      id: 2,
      name: 'Serra Circular',
      description: 'Serra circular para cortes precisos em madeira e outros materiais.',
      price: 'R$ 289,90',
      image: 'https://d296pbmv9m7g8v.cloudfront.net/Custom/Content/Products/10/70/1070391_serra-circular-bosch-gks130-manual-1300w-10010317_l29_638689220704812643.webp',
    },
    {
      id: 3,
      name: 'Martelo de Borracha',
      description: 'Martelo de borracha, ideal para trabalhos delicados.',
      price: 'R$ 79,90',
      image: 'https://images.tcdn.com.br/img/img_prod/469103/martelo_borracha_60mm_40684_060_tramontina_master_141693_1_fbd1e5510d1b187b3de55ca9b71a5436.jpg',
    },
    {
      id: 4,
      name: 'Chave Inglesa',
      description: 'Chave ajustável de alta resistência, ideal para apertar e afrouxar porcas.',
      price: 'R$ 59,90',
      image: 'https://conceptferramentas.com.br/wp-content/uploads/2020/11/chave_inglesa_6.png',
    },
    {
      id: 5,
      name: 'Alicate de Corte',
      description: 'Alicate de corte para fios e cabos elétricos.',
      price: 'R$ 45,90',
      image: 'https://cdn.b4c.inf.br/storage/minasferramentas/1000/alicate-de-corte-diagonal-rente-5-hikari-hk170162235276725.jpg',
    },
    {
      id: 6,
      name: 'Parafusadeira',
      description: 'Parafusadeira elétrica com múltiplas velocidades.',
      price: 'R$ 239,90',
      image: 'https://link-da-imagem-da-parafusadeira.jpg',
    },
    {
      id: 7,
      name: 'Esmerilhadeira Angular',
      description: 'Esmerilhadeira para corte e desbaste de metais.',
      price: 'R$ 319,90',
      image: 'https://link-da-imagem-da-esmerilhadeira.jpg',
    },
    {
      id: 8,
      name: 'Serra Tico-Tico',
      description: 'Serra tico-tico para cortes rápidos e precisos em madeira e plástico.',
      price: 'R$ 179,90',
      image: 'https://link-da-imagem-da-serra-tico.jpg',
    },
    {
      id: 9,
      name: 'Lixadeira Orbital',
      description: 'Lixadeira orbital para acabamentos suaves e sem marcas.',
      price: 'R$ 169,90',
      image: 'https://link-da-imagem-da-lixadeira.jpg',
    },
    {
      id: 10,
      name: 'Furadeira e Parafusadeira 2 em 1',
      description: 'Equipamento multifuncional com 2 modos de operação.',
      price: 'R$ 249,90',
      image: 'https://link-da-imagem-da-furadeira-2-em-1.jpg',
    },
  ]);

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
      const items = await loadCart();
      setCartItems(items); // Atualiza o estado com os itens carregados do AsyncStorage
    };

    fetchData(); // Carrega os dados no primeiro render
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
            <Text style={styles.productPrice}>{produto.price}</Text>

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
