import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border,
  },
  info: {
    flex: 1,
    paddingHorizontal: SPACING.sm,
  },
  titulo: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
  },
  categoria: {
    fontSize: FONTS.size.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textTransform: 'capitalize',
  },
  preco: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  favoritar: {
    padding: SPACING.sm,
  },
  heart: {
    fontSize: 22,
    color: COLORS.textLight,
  },
  heartAtivo: {
    color: COLORS.secondary,
  },
});
