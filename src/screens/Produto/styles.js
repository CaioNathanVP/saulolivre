import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  imagem: {
    width: '100%',
    height: 280,
    backgroundColor: COLORS.border,
  },
  conteudo: {
    padding: SPACING.lg,
  },
  titulo: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  categoria: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textTransform: 'capitalize',
  },
  preco: {
    fontSize: FONTS.size.xxl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    marginVertical: SPACING.md,
  },
  descricao: {
    fontSize: FONTS.size.md,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
});
