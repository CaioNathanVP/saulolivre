import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

export default StyleSheet.create({
  texto: {
    color: COLORS.primary,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
    textDecorationLine: 'underline',
  },
});
