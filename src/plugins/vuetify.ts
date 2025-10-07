import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export const vuetify = createVuetify({
  display: {
    thresholds: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2E2E2E',
          secondary: '#FF7B54',
          accent: '#00BFA6',
        },
      },
    },
  },
});
