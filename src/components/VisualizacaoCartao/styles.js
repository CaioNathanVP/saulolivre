import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  cartao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  tipo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.semibold,
    letterSpacing: 2,
    marginBottom: SPACING.md,
    textAlign: 'right',
  },
  numero: {
    color: COLORS.card,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    letterSpacing: 3,
    marginBottom: SPACING.lg,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: FONTS.size.xs,
    letterSpacing: 1,
  },
  rValor: {
    color: COLORS.card,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    marginTop: 2,
  },
});
