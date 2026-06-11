import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numero: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  status: {
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.semibold,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    backgroundColor: COLORS.border,
    color: COLORS.textLight,
  },
  data: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  total: {
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.bold,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
});
