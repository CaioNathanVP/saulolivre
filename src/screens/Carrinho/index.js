import React, { useContext } from 'react';
import { View, Text, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import { AppContext } from '../../context/AppContext';
import ItemCarrinho from '../../components/ItemCarrinho';
import ResumoCarrinho from '../../components/ResumoCarrinho';
import BotaoPrimario from '../../components/BotaoPrimario';
import styles from './styles';

const Carrinho = ({ navigation }) => {
  const { cart, removeFromCart, cartTotal } = useContext(AppContext);

  const quantidadeTotal = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <SafeAreaView style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioIcone}>🛒</Text>
          <Text style={styles.vazioTexto}>Seu carrinho está vazio.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ItemCarrinho item={item} onRemover={removeFromCart} />
            )}
            contentContainerStyle={styles.lista}
          />
          <View style={styles.rodape}>
            <ResumoCarrinho total={cartTotal} quantidadeItens={quantidadeTotal} />
            <BotaoPrimario
              titulo="Finalizar Compra"
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Carrinho;
