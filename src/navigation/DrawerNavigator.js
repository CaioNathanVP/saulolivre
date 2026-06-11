import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from '../screens/Dashboard';
import PerfilScreen from '../screens/Perfil';
import MeusProdutosScreen from '../screens/MeusProdutos';
import AnunciarProdutoScreen from '../screens/AnunciarProduto';
import CarrinhoScreen from '../screens/Carrinho';
import HistoricoComprasScreen from '../screens/HistoricoCompras';
import FavoritosScreen from '../screens/Favoritos';
import IdiomasScreen from '../screens/Idiomas';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#1A1A2E', width: 280 },
        drawerLabelStyle: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
        drawerActiveTintColor: '#6C63FF',
        drawerInactiveTintColor: '#9CA3AF',
        headerStyle: { backgroundColor: '#6C63FF' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Drawer.Screen name="Dashboard"        component={DashboardScreen}        options={{ title: 'Início' }} />
      <Drawer.Screen name="Perfil"           component={PerfilScreen}           options={{ title: 'Meu Perfil' }} />
      <Drawer.Screen name="MeusProdutos"     component={MeusProdutosScreen}     options={{ title: 'Meus Produtos' }} />
      <Drawer.Screen name="AnunciarProduto"  component={AnunciarProdutoScreen}  options={{ title: 'Anunciar Produto' }} />
      <Drawer.Screen name="Carrinho"         component={CarrinhoScreen}         options={{ title: 'Carrinho' }} />
      <Drawer.Screen name="HistoricoCompras" component={HistoricoComprasScreen} options={{ title: 'Histórico' }} />
      <Drawer.Screen name="Favoritos"        component={FavoritosScreen}        options={{ title: 'Favoritos' }} />
      <Drawer.Screen name="Idiomas"          component={IdiomasScreen}          options={{ title: 'Idioma' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
