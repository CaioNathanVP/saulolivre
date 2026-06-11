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
  scroll: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  secao: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
});
