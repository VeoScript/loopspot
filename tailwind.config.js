const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-1': '#FFFFFF',
        'accent-2': '#222222',
        'accent-3': '#FFE1A8',
        'accent-4': '#C9CBA3',
        'accent-5': '#E26D5C',
        'accent-6': '#723D46',
        'accent-7': '#472D30',
        'accent-8': '#FFD586',
      },
      fontFamily: {
        'vina-sans': 'VinaSans-Regular',
        'dosis': 'Dosis-Regular',
        'dosis-light': 'Dosis-Light',
        'dosis-medium': 'Dosis-Medium',
        'dosis-semibold': 'Dosis-SemiBold',
        'dosis-bold': 'Dosis-Bold',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.default-text-color': `text-accent-2`,
        '.default-text-input': `w-full px-3 font-dosis rounded-xl border border-accent-8 text-accent-2`,
      });
    }),
  ],
};
