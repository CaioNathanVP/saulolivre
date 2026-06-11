import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { COLORS } from '../../utils/constants';

const BotaoPrimario = ({ titulo, onPress, loading = false, variante = 'primario' }) => {
  return (
    <TouchableOpacity
      style={[styles.container, variante === 'secundario' && styles.secundario]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variante === 'secundario' ? COLORS.primary : COLORS.card} />
      ) : (
        <Text style={[styles.texto, variante === 'secundario' && styles.textoSecundario]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BotaoPrimario;
