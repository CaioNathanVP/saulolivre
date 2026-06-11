import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, Alert, SafeAreaView, FlatList, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from '../../context/AppContext';
import { ProductService } from '../../api/mockapi';
import CardProduto from '../../components/CardProduto';
import BarraBusca from '../../components/BarraBusca';
import BannerDestaque from '../../components/BannerDestaque';
import styles from './styles';

const BANNERS = [
  'https://picsum.photos/seed/b1/800/300',
  'https://picsum.photos/seed/b2/800/300',
  'https://picsum.photos/seed/b3/800/300',
];

const CATEGORIAS = [
  { label: 'Todas', value: 'todos' },
  { label: 'Eletrônicos', value: 'eletronicos' },
  { label: 'Roupas', value: 'roupas' },
  { label: 'Casa', value: 'casa' },
];

const Dashboard = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);

  const { toggleFavorite, isFavorite } = useContext(AppContext);

  const produtosFiltrados = produtos
    .filter(p => categoria === 'todos' || p.categoria === categoria)
    .filter(p => p.titulo?.toLowerCase().includes(busca.toLowerCase()));

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getAll();
        if (!cancelled) setProdutos(data);
      } catch (error) {
        if (!cancelled) Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <BannerDestaque banners={BANNERS} />
            <BarraBusca value={busca} onChangeText={setBusca} placeholder="Buscar produtos..." />
            <RNPickerSelect
              onValueChange={setCategoria}
              value={categoria}
              items={CATEGORIAS}
              style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            />
          </>
        }
        renderItem={({ item }) => (
          <CardProduto
            produto={item}
            onPress={() => navigation.navigate('Produto', { productId: item.id })}
            onFavoritar={() => toggleFavorite(item)}
            favoritado={isFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
