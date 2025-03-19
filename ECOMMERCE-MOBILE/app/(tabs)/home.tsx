import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importando o ícone
import { useRouter } from 'expo-router'; // Importando o hook de navegação

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

// Dados fictícios dos produtos mais vendidos (10 produtos)
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
  const [searchText, setSearchText] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>(produtosData);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]); // Estado para armazenar os produtos no carrinho
  const router = useRouter(); // Hook de navegação

  // Função de pesquisa
  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text.trim() === '') {
      setProdutos(produtosData); // Se o campo estiver vazio, exibe todos os produtos
    } else {
      const filteredProducts = produtosData.filter((produto) =>
        produto.nome.toLowerCase().includes(text.toLowerCase())
      );
      setProdutos(filteredProducts); // Filtra os produtos conforme a pesquisa
    }
  };

  // Função para adicionar o produto ao carrinho e redirecionar para o carrinho
  const handleBuy = (produto: Produto) => {
    // Verificando se o produto já existe no carrinho
    const produtoExistente = carrinho.find((item) => item.id === produto.id);

    if (produtoExistente) {
      // Se o produto já estiver no carrinho, aumentamos a quantidade
      const updatedCarrinho = carrinho.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: (item.quantidade || 0) + 1 } // Garantindo que a quantidade não será undefined
          : item
      );
      setCarrinho(updatedCarrinho);
    } else {
      // Se o produto não estiver no carrinho, adicionamos ele com quantidade 1
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }

    // Redireciona para a tela do carrinho
    router.push('/cart');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Barra de pesquisa com ícone */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="O que você está procurando?"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={handleSearch} // Chama a função de pesquisa ao digitar
        />
      </View>

      {/* Título da seção */}
      <Text style={styles.title}>Produtos Mais Vendidos</Text>

      {/* Container dos produtos */}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
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
    width: '45%', // Produto menor, ajustado para ocupar 45% da tela
    maxWidth: 160, // Limitar o tamanho máximo
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
