import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';

const TIPOS = [
  { label: 'Crédito', value: 'credito' },
  { label: 'Débito', value: 'debito' },
];

const SeletorTipoCartao = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={TIPOS}
        value={value}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
        placeholder={{ label: 'Tipo do cartão...', value: null }}
      />
    </View>
  );
};

export default SeletorTipoCartao;
