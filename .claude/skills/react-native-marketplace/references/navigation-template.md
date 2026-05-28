# Navegação — Stack + Drawer

## Dependências necessárias

```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
```

---

## navigation/AppNavigator.js

```js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import StackNavigator from './StackNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
```

---

## navigation/StackNavigator.js

```js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';

// Telas de Auth
import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';

// Telas de Detalhe (fora do Drawer)
import ProdutoScreen from '../screens/Produto';
import CheckoutScreen from '../screens/Checkout';
import AdicionarCartaoScreen from '../screens/AdicionarCartao';

// Drawer (raiz do app autenticado)
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6C63FF' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      {!user ? (
        // ── Fluxo de autenticação ──────────────────────────────────────
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: 'Criar Conta' }}
          />
        </>
      ) : (
        // ── Fluxo autenticado ──────────────────────────────────────────
        <>
          <Stack.Screen
            name="App"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Produto"
            component={ProdutoScreen}
            options={{ title: 'Produto' }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: 'Finalizar Compra' }}
          />
          <Stack.Screen
            name="AdicionarCartao"
            component={AdicionarCartaoScreen}
            options={{ title: 'Novo Cartão' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
```

---

## navigation/DrawerNavigator.js

```js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Telas do Drawer
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
```

---

## Passagem de Parâmetros

**Via navigation.navigate (parâmetros simples):**
```js
navigation.navigate('Produto', { productId: '123' });

// Na tela destino:
const { productId } = route.params;
```

**Via Context (dados complexos / estado compartilhado):**
```js
// Na tela origem:
const { addToCart } = useContext(AppContext);
addToCart(produto); // salva no context
navigation.navigate('Carrinho');

// Na tela destino:
const { cart } = useContext(AppContext); // lê do context
```

**Regra:** Use `navigation.navigate(rota, params)` para IDs e flags simples. Use `AppContext` para objetos ricos (produto completo, usuário, carrinho).
