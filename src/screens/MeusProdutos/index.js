import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from '../../context/AppContext';
import { ProductService } from '../../api/mockapi';
import CardMeuProduto from '../../components/CardMeuProduto';
import styles from './styles';

const FILTROS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Com estoque', value: 'ativo' },
  { label: 'Sem estoque', value: 'inativo' },
];

const MeusProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppContext);

  const produtosFiltrados = produtos.filter(p => {
    if (filtro === 'ativo') return p.estoque > 0;
    if (filtro === 'inativo') return p.estoque <= 0;
    return true;
  });

  const carregarProdutos = async () => {
    if (!user) return;
    let cancelled = false;
    try {
      setLoading(true);
      const data = await ProductService.getByUser(user.id);
      if (!cancelled) setProdutos(data);
    } catch (error) {
      if (!cancelled) Alert.alert('Erro', 'Não foi possível carregar seus produtos.');
    } finally {
      if (!cancelled) setLoading(false);
    }
    return () => { cancelled = true; };
  };

  useEffect(() => {
    const cleanup = carregarProdutos();
    return cleanup;
  }, [user]);

  const handleDeletar = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await ProductService.delete(id);
            setProdutos(prev => prev.filter(p => p.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o produto.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNPickerSelect
        onValueChange={setFiltro}
        value={filtro}
        items={FILTROS}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
      />
      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardMeuProduto
            produto={item}
            onEditar={() => {}}
            onDeletar={() => handleDeletar(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
    </SafeAreaView>
  );
};

export default MeusProdutos;
