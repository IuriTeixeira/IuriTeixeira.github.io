import '@mantine/core/styles.css';

import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
} from '@mantine/core';
import { eurostile } from './fonts/Eurostile/Eurostile';

const theme = createTheme({
  /*fontFamily: eurostile.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    // Use default theme if you want to provide default Mantine fonts as a fallback
    fontFamily: `${eurostile.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },*/
});

export {theme}