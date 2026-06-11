import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
