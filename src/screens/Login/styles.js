import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  titulo: {
    fontSize: FONTS.size.xxl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitulo: {
    fontSize: FONTS.size.md,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  linkTexto: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
  },
});
