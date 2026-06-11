import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.sm,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  texto: {
    color: COLORS.card,
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.semibold,
  },
  textoSecundario: {
    color: COLORS.primary,
  },
});
