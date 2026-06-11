import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  banner: {
    height: 160,
    backgroundColor: COLORS.border,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    marginHorizontal: 3,
  },
  dotAtivo: {
    backgroundColor: COLORS.primary,
    width: 16,
  },
});
