import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: FONTS.size.md,
    color: COLORS.text,
  },
  inputErro: {
    borderColor: COLORS.danger,
  },
  erro: {
    fontSize: FONTS.size.xs,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});
