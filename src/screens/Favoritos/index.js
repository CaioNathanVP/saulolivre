import React, { useContext } from 'react';
import { View, Text, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import { AppContext } from '../../context/AppContext';
import CardProduto from '../../components/CardProduto';
import styles from './styles';

const Favoritos = ({ navigation }) => {
  const { favorites, toggleFavorite, isFavorite } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardProduto
            produto={item}
            onPress={() => navigation.navigate('Produto', { productId: item.id })}
            onFavoritar={() => toggleFavorite(item)}
            favoritado={isFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioIcone}>♡</Text>
            <Text style={styles.vazioTexto}>Nenhum favorito ainda.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Favoritos;
