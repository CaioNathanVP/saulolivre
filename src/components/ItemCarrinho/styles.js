import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border,
  },
  info: {
    flex: 1,
    paddingHorizontal: SPACING.sm,
  },
  titulo: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
  },
  subtotal: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  remover: {
    padding: SPACING.sm,
  },
  removerTexto: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: FONTS.weight.bold,
  },
});
