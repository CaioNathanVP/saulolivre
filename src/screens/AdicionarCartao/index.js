import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { CardService } from '../../api/mockapi';
import InputCampo from '../../components/InputCampo';
import BotaoPrimario from '../../components/BotaoPrimario';
import SeletorTipoCartao from '../../components/SeletorTipoCartao';
import VisualizacaoCartao from '../../components/VisualizacaoCartao';
import styles from './styles';

const AdicionarCartao = ({ navigation }) => {
  const [numero, setNumero] = useState('');
  const [titular, setTitular] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [tipo, setTipo] = useState('credito');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppContext);

  useEffect(() => {
    setNumero('');
    setTitular('');
    setValidade('');
    setCvv('');
    setTipo('credito');
  }, []);

  const formatarNumero = (texto) => {
    const limpo = texto.replace(/\D/g, '').slice(0, 16);
    return limpo.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleSalvar = async () => {
    if (!numero || !titular || !validade || !cvv) {
      Alert.alert('Atenção', 'Preencha todos os campos do cartão.');
      return;
    }
    try {
      setLoading(true);
      await CardService.create({
        numero: numero.replace(/\s/g, ''),
        titular,
        validade,
        cvv,
        tipo,
        userId: user?.id,
      });
      Alert.alert('Sucesso', 'Cartão salvo!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao salvar cartão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <VisualizacaoCartao numero={numero} titular={titular} validade={validade} tipo={tipo} />
          <InputCampo
            label="Número do Cartão"
            value={numero}
            onChangeText={t => setNumero(formatarNumero(t))}
            tipo="numeric"
            placeholder="0000 0000 0000 0000"
          />
          <InputCampo label="Titular" value={titular} onChangeText={setTitular} placeholder="NOME COMPLETO" />
          <InputCampo label="Validade (MM/AA)" value={validade} onChangeText={setValidade} placeholder="MM/AA" />
          <InputCampo label="CVV" value={cvv} onChangeText={setCvv} tipo="numeric" placeholder="•••" />
          <SeletorTipoCartao value={tipo} onValueChange={setTipo} />
          <BotaoPrimario titulo="Salvar Cartão" onPress={handleSalvar} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdicionarCartao;
