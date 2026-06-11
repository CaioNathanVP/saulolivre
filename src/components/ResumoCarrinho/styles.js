import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  label: {
    fontSize: FONTS.size.md,
    color: COLORS.textLight,
  },
  valor: {
    fontSize: FONTS.size.md,
    color: COLORS.text,
    fontWeight: FONTS.weight.medium,
  },
  separador: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  totalValor: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
  },
});
