import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

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
  picker: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.size.md,
    color: COLORS.text,
    paddingVertical: SPACING.sm + 2,
  },
  lista: {
    padding: SPACING.md,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: FONTS.size.md,
    marginTop: SPACING.xl,
  },
});
