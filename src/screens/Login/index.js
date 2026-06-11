import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { UserService } from '../../api/mockapi';
import InputCampo from '../../components/InputCampo';
import BotaoPrimario from '../../components/BotaoPrimario';
import LinkTexto from '../../components/LinkTexto';
import styles from './styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      navigation.replace('App');
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      setLoading(true);
      const data = await UserService.login(email, senha);
      if (!data) {
        Alert.alert('Erro', 'Credenciais inválidas.');
        return;
      }
      setUser(data);
      navigation.replace('App');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.titulo}>Marketplace</Text>
        <Text style={styles.subtitulo}>Entre na sua conta</Text>

        <InputCampo
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          tipo="email-address"
          placeholder="seu@email.com"
        />
        <InputCampo
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          tipo="password"
          placeholder="••••••••"
        />

        <BotaoPrimario titulo="Entrar" onPress={handleLogin} loading={loading} />

        <View style={styles.linkContainer}>
          <Text style={styles.linkTexto}>Não tem conta? </Text>
          <LinkTexto texto="Criar conta" onPress={() => navigation.navigate('Cadastro')} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
