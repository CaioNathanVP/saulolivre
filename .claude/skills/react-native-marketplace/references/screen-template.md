# Template Completo de Tela

Substitua `[NomeTela]` e adapte a lógica. Este template é o padrão para TODAS as telas.

---

## screens/[NomeTela]/index.js

```js
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from '../../context/AppContext';
import CardProduto from '../../components/CardProduto';
import BotaoPrimario from '../../components/BotaoPrimario';
import InputCampo from '../../components/InputCampo';
import styles from './styles';
import { BASE_URL } from '../../utils/constants';

// ─── Componentes que esta tela usa (criar em components/) ──────────────────
// - CardProduto     → exibe card de produto na lista
// - BotaoPrimario   → botão padrão de ação
// - InputCampo      → campo de texto reutilizável
// (adicione/remova conforme necessidade da tela)

const [NomeTela] = ({ navigation, route }) => {
  // ── Estados locais ─────────────────────────────────────────────────────
  const [items, setItems] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(false);

  // ── Context global ─────────────────────────────────────────────────────
  const { user, cart, addToCart, favorites, toggleFavorite } = useContext(AppContext);

  // ── Parâmetros de rota (quando necessário) ─────────────────────────────
  const { productId } = route?.params || {};

  // ── Filtro: pai filtra, filho exibe ────────────────────────────────────
  const itemsFiltrados = filtro === 'todos'
    ? items
    : items.filter(item => item.categoria === filtro);

  // ── useEffect: fetch de dados + tratamento de efeitos colaterais ───────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) throw new Error('Falha ao buscar dados');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('[NomeTela] fetchData:', error);
        Alert.alert('Erro', error.message || 'Erro inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: cancelar subscriptions, listeners, timers se necessário
    return () => {};
  }, []); // adicione dependências se o fetch depender de algum valor

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleAcaoPrincipal = async (item) => {
    try {
      // lógica da ação principal
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  // ── Render item da FlatList ────────────────────────────────────────────
  const renderItem = ({ item }) => (
    <CardProduto
      produto={item}
      onPress={() => navigation.navigate('Produto', { productId: item.id })}
      onFavoritar={() => toggleFavorite(item)}
      favoritado={favorites.some(f => f.id === item.id)}
    />
  );

  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  // ── Render principal ───────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      {/* Header da tela */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Nome da Tela</Text>
      </View>

      {/* Filtro: RNPickerSelect no PAI */}
      <RNPickerSelect
        onValueChange={setFiltro}
        value={filtro}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        items={[
          { label: 'Todos', value: 'todos' },
          { label: 'Eletrônicos', value: 'eletronicos' },
          { label: 'Roupas', value: 'roupas' },
        ]}
      />

      {/* Lista filtrada: componente filho só exibe */}
      <FlatList
        data={itemsFiltrados}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum item encontrado.</Text>
        }
      />

      {/* Ação principal */}
      <BotaoPrimario
        titulo="Ação Principal"
        onPress={() => navigation.navigate('AnunciarProduto')}
      />
    </SafeAreaView>
  );
};

export default [NomeTela];
```

---

## screens/[NomeTela]/styles.js

```js
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titulo: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  picker: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.size.md,
    color: COLORS.text,
  },
  lista: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: FONTS.size.md,
    marginTop: SPACING.xl,
  },
});
```
