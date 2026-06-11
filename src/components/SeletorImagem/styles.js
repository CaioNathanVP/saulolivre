import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  icone: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  texto: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
  },
});
