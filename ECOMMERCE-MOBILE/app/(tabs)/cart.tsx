import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para carregar e salvar o carrinho

// Tipo para Produto no Carrinho (com a propriedade quantidade)
interface ProdutoCarrinho {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  quantidade: number;
}

const Cart = () => {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

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

  // Função para excluir um produto do carrinho
  const excluirProdutoCarrinho = async (id: number) => {
    const carrinhoAtualizado = carrinho.filter((produto) => produto.id !== id);

    try {
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no AsyncStorage
      setCarrinho(carrinhoAtualizado); // Atualiza o estado local
    } catch (error) {
      console.error('Erro ao excluir produto do carrinho:', error);
    }
  };

  useEffect(() => {
    carregarCarrinho(); // Carrega o carrinho ao abrir a tela
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
      ) : (
        carrinho.map((produto) => (
          <View key={produto.id} style={styles.productCard}>
            <Text style={styles.productName}>{produto.nome}</Text>
            <Text style={styles.productPrice}>
              {produto.preco} - Quantidade: {produto.quantidade}
            </Text>

            {/* Botão de excluir produto */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => excluirProdutoCarrinho(produto.id)} // Chama a função de exclusão
            >
              <Text style={styles.removeButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#777',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
