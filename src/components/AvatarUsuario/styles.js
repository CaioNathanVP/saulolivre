import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  avatar: {
    backgroundColor: COLORS.border,
  },
  placeholder: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    color: COLORS.card,
    fontWeight: FONTS.weight.bold,
  },
  nome: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
});
