import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lista: {
    padding: SPACING.md,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  vazioIcone: {
    fontSize: 56,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  vazioTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textLight,
  },
});
