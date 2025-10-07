import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';


export const vuetify = createVuetify({
  display: {
    mobileBreakpoint: 'sm',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          accent: '#00BFA6',
          error: '#E53935',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});
