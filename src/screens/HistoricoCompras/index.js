import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from '../../context/AppContext';
import { OrderService } from '../../api/mockapi';
import CardPedido from '../../components/CardPedido';
import styles from './styles';

const FILTROS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Pendente', value: 'pendente' },
  { label: 'Confirmado', value: 'confirmado' },
  { label: 'Cancelado', value: 'cancelado' },
];

const HistoricoCompras = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppContext);

  const pedidosFiltrados = filtro === 'todos'
    ? pedidos
    : pedidos.filter(p => p.status === filtro);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await OrderService.getByUser(user?.id);
        if (!cancelled) setPedidos(data);
      } catch (error) {
        if (!cancelled) Alert.alert('Erro', 'Não foi possível carregar o histórico.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (user) fetchData();
    return () => { cancelled = true; };
  }, [user]);

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
        data={pedidosFiltrados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CardPedido pedido={item} onPress={() => {}} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>}
      />
    </SafeAreaView>
  );
};

export default HistoricoCompras;
