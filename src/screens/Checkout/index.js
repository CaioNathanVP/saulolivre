import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, SafeAreaView, ScrollView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { CardService, OrderService } from '../../api/mockapi';
import ItemCarrinho from '../../components/ItemCarrinho';
import CardCartao from '../../components/CardCartao';
import ResumoCarrinho from '../../components/ResumoCarrinho';
import BotaoPrimario from '../../components/BotaoPrimario';
import styles from './styles';

const Checkout = ({ navigation }) => {
  const [cartoes, setCartoes] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const { user, cart, cartTotal, clearCart } = useContext(AppContext);

  const quantidadeItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  useEffect(() => {
    let cancelled = false;
    const fetchCartoes = async () => {
      try {
        setLoading(true);
        const data = await CardService.getByUser(user?.id);
        if (!cancelled) setCartoes(data);
      } catch {
        if (!cancelled) Alert.alert('Erro', 'Não foi possível carregar os cartões.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (user) fetchCartoes();
    return () => { cancelled = true; };
  }, [user]);

  const handleConfirmar = async () => {
    if (!cartaoSelecionado) {
      Alert.alert('Atenção', 'Selecione um cartão para pagamento.');
      return;
    }
    try {
      setConfirmando(true);
      await OrderService.create({
        userId: user.id,
        itens: cart,
        total: cartTotal,
        cartaoId: cartaoSelecionado,
        status: 'pendente',
      });
      clearCart();
      Alert.alert('Pedido realizado!', 'Seu pedido foi confirmado.', [
        { text: 'OK', onPress: () => navigation.navigate('HistoricoCompras') },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao confirmar pedido.');
    } finally {
      setConfirmando(false);
    }
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
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.secao}>Itens do Pedido</Text>
        {cart.map(item => (
          <ItemCarrinho key={item.id} item={item} soLeitura />
        ))}

        <ResumoCarrinho total={cartTotal} quantidadeItens={quantidadeItens} />

        <Text style={styles.secao}>Forma de Pagamento</Text>
        {cartoes.map(c => (
          <CardCartao
            key={c.id}
            cartao={c}
            selecionado={cartaoSelecionado === c.id}
            onSelecionar={() => setCartaoSelecionado(c.id)}
          />
        ))}
        <BotaoPrimario
          titulo="+ Adicionar Cartão"
          onPress={() => navigation.navigate('AdicionarCartao')}
          variante="secundario"
        />
        <BotaoPrimario
          titulo="Confirmar Pedido"
          onPress={handleConfirmar}
          loading={confirmando}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
