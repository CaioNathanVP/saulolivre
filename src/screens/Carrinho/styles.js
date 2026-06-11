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
    paddingBottom: SPACING.sm,
  },
  rodape: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioIcone: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  vazioTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textLight,
  },
});
