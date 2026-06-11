import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  selecionado: {
    borderColor: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numero: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    letterSpacing: 2,
  },
  check: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: FONTS.weight.bold,
  },
  titular: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textTransform: 'uppercase',
  },
  validade: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  tipo: {
    fontSize: FONTS.size.xs,
    color: COLORS.primary,
    fontWeight: FONTS.weight.semibold,
    marginTop: SPACING.xs,
    textTransform: 'capitalize',
  },
});
