import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para salvar o carrinho

// Tipo para Produto
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

// Tipo para Produto no Carrinho (com a propriedade quantidade)
interface ProdutoCarrinho {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  quantidade: number; // A quantidade é obrigatória no carrinho
}

// Dados fictícios dos produtos mais vendidos
const produtosData: Produto[] = [
  {
    id: 1,
    nome: 'Furadeira Elétrica',
    descricao: 'Furadeira de alta performance para perfuração em diversos materiais.',
    preco: 'R$ 199,90',
    imagem: 'https://link-da-imagem-da-furadeira.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 2,
    nome: 'Serra Circular',
    descricao: 'Serra circular para cortes precisos em madeira e outros materiais.',
    preco: 'R$ 289,90',
    imagem: 'https://link-da-imagem-da-serra.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 3,
    nome: 'Martelo de Borracha',
    descricao: 'Martelo de borracha, ideal para trabalhos delicados.',
    preco: 'R$ 79,90',
    imagem: 'https://link-da-imagem-do-martelo.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 4,
    nome: 'Chave Inglesa',
    descricao: 'Chave ajustável de alta resistência, ideal para apertar e afrouxar porcas.',
    preco: 'R$ 59,90',
    imagem: 'https://link-da-imagem-da-chave.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 5,
    nome: 'Alicate de Corte',
    descricao: 'Alicate de corte para fios e cabos elétricos.',
    preco: 'R$ 45,90',
    imagem: 'https://link-da-imagem-do-alicate.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 6,
    nome: 'Parafusadeira',
    descricao: 'Parafusadeira elétrica com múltiplas velocidades.',
    preco: 'R$ 239,90',
    imagem: 'https://link-da-imagem-da-parafusadeira.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 7,
    nome: 'Esmerilhadeira Angular',
    descricao: 'Esmerilhadeira para corte e desbaste de metais.',
    preco: 'R$ 319,90',
    imagem: 'https://link-da-imagem-da-esmerilhadeira.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 8,
    nome: 'Serra Tico-Tico',
    descricao: 'Serra tico-tico para cortes rápidos e precisos em madeira e plástico.',
    preco: 'R$ 179,90',
    imagem: 'https://link-da-imagem-da-serra-tico.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 9,
    nome: 'Lixadeira Orbital',
    descricao: 'Lixadeira orbital para acabamentos suaves e sem marcas.',
    preco: 'R$ 169,90',
    imagem: 'https://link-da-imagem-da-lixadeira.jpg', // Coloque o link da imagem real aqui
  },
  {
    id: 10,
    nome: 'Furadeira e Parafusadeira 2 em 1',
    descricao: 'Equipamento multifuncional com 2 modos de operação.',
    preco: 'R$ 249,90',
    imagem: 'https://link-da-imagem-da-furadeira-2-em-1.jpg', // Coloque o link da imagem real aqui
  },
];

const Home = () => {
  const [produtos, setProdutos] = useState<Produto[]>(produtosData);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  // Função para salvar o carrinho no AsyncStorage
  const salvarCarrinho = async (novoCarrinho: ProdutoCarrinho[]) => {
    try {
      await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      setCarrinho(novoCarrinho); // Atualiza o estado local do carrinho
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  // Função para carregar o carrinho do AsyncStorage
  const carregarCarrinho = async () => {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo)); // Carrega o carrinho do AsyncStorage
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  // Chama a função de carregar o carrinho quando a página é carregada
  useEffect(() => {
    carregarCarrinho();
  }, []);

  // Função para adicionar o produto ao carrinho
  const handleBuy = async (produto: Produto) => {
    let carrinhoAtualizado = [...carrinho];
    const produtoExistente = carrinho.find((item) => item.id === produto.id);

    if (produtoExistente) {
      // Se já existir, aumenta a quantidade
      produtoExistente.quantidade += 1;
    } else {
      // Caso contrário, adiciona o produto com quantidade 1
      carrinhoAtualizado.push({ ...produto, quantidade: 1 });
    }

    // Atualiza o carrinho e salva no AsyncStorage
    salvarCarrinho(carrinhoAtualizado);
    console.log('Carrinho Atualizado:', carrinhoAtualizado);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Produtos Mais Vendidos</Text>

      <View style={styles.productsContainer}>
        {produtos.map((produto) => (
          <View key={produto.id} style={styles.productCard}>
            <Image
              source={{ uri: produto.imagem }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{produto.nome}</Text>
            <Text style={styles.productPrice}>{produto.preco}</Text>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuy(produto)} // Chama a função ao clicar no botão de compra
            >
              <Text style={styles.buttonText}>Comprar</Text>
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
