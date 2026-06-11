import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';

import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';
import ProdutoScreen from '../screens/Produto';
import CheckoutScreen from '../screens/Checkout';
import AdicionarCartaoScreen from '../screens/AdicionarCartao';
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
