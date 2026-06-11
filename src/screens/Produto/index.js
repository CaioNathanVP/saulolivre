import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { ProductService } from '../../api/mockapi';
import BotaoPrimario from '../../components/BotaoPrimario';
import styles from './styles';

const Produto = ({ route, navigation }) => {
  const { productId } = route?.params || {};
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToCart, toggleFavorite, isFavorite } = useContext(AppContext);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getById(productId);
        if (!cancelled) setProduto(data);
      } catch (error) {
        if (!cancelled) Alert.alert('Erro', 'Não foi possível carregar o produto.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (productId) fetchData();
    return () => { cancelled = true; };
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!produto) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: produto.imagem || 'https://via.placeholder.com/400' }}
          style={styles.imagem}
          resizeMode="cover"
        />
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>{produto.titulo}</Text>
          <Text style={styles.categoria}>{produto.categoria}</Text>
          <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2)}</Text>
          <Text style={styles.descricao}>{produto.descricao}</Text>
          <BotaoPrimario
            titulo="Adicionar ao Carrinho"
            onPress={() => {
              addToCart(produto);
              Alert.alert('Sucesso', 'Produto adicionado ao carrinho!');
            }}
          />
          <BotaoPrimario
            titulo={isFavorite(produto.id) ? '♥ Favoritado' : '♡ Favoritar'}
            onPress={() => toggleFavorite(produto)}
            variante="secundario"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Produto;
