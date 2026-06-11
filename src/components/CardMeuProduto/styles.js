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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 70,
    height: 70,
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
  preco: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    marginTop: 2,
  },
  estoque: {
    fontSize: FONTS.size.xs,
    color: COLORS.textLight,
    marginTop: 2,
  },
  acoes: {
    gap: SPACING.xs,
  },
  botaoEditar: {
    padding: SPACING.xs,
  },
  botaoEditarTexto: {
    fontSize: 20,
    color: COLORS.primary,
  },
  botaoDeletar: {
    padding: SPACING.xs,
  },
  botaoDeletarTexto: {
    fontSize: 18,
  },
});
