import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Navegação para outras telas
    const replacePath = (path: any) => {
        router.replace(path);
    };

    // Função para lidar com a pesquisa
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            // Aqui você pode adicionar lógica para pesquisa
            console.log('Pesquisando por:', searchQuery);
        }
    };

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f5d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* Barra de Pesquisa */}
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar por produtos..."
                        placeholderTextColor="#ccc"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <AntDesign name="search1" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Saudação */}
                <View style={styles.greeting}>
                    <Text style={styles.greetingText}>Bem-vindo ao Ecommerce IA!</Text>
                    <Text style={styles.subtitle}>Explore nossos produtos e ofertas exclusivas</Text>
                </View>

                {/* Carrossel de Produtos em Destaque */}
                <View style={styles.carousel}>
                    <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
                        <View style={styles.carouselItem}>
                            <Image style={styles.carouselImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                            <Text style={styles.carouselItemText}>Produto 1</Text>
                        </View>
                        <View style={styles.carouselItem}>
                            <Image style={styles.carouselImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                            <Text style={styles.carouselItemText}>Produto 2</Text>
                        </View>
                        <View style={styles.carouselItem}>
                            <Image style={styles.carouselImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                            <Text style={styles.carouselItemText}>Produto 3</Text>
                        </View>
                    </ScrollView>
                </View>

                {/* Categorias de Produtos */}
                <View style={styles.categories}>
                    <Text style={styles.sectionTitle}>Categorias</Text>
                    <View style={styles.categoryItems}>
                        <TouchableOpacity style={styles.categoryItem} onPress={() => replacePath('/category/eletronics')}>
                            <Text style={styles.categoryText}>Eletrônicos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} onPress={() => replacePath('/category/fashion')}>
                            <Text style={styles.categoryText}>Moda</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,  // Permite que o ScrollView ocupe o espaço necessário
        paddingBottom: 20, // Para garantir que o conteúdo tenha espaço nas bordas
        alignItems: 'center',
    },
    searchBar: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    searchButton: {
        paddingLeft: 10,
    },
    greeting: {
        alignItems: 'center',
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
    },
    carousel: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center', // Centraliza os produtos
    },
    sectionTitle: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    carouselContainer: {
        alignItems: 'center', // Centraliza os itens dentro do carrossel
    },
    carouselItem: {
        marginRight: 15,
        alignItems: 'center',
    },
    carouselImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    carouselItemText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
    },
    categories: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center', // Centraliza as categorias
    },
    categoryItems: {
        flexDirection: 'row',
        justifyContent: 'center', // Centraliza os itens das categorias
        width: '100%',
        paddingHorizontal: 20,
    },
    categoryItem: {
        backgroundColor: '#3b5998',
        padding: 15,
        borderRadius: 5,
        width: '48%', // Ajuste de largura para que os itens fiquem lado a lado
        alignItems: 'center',
        marginHorizontal: 5,
    },
    categoryText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Home;
