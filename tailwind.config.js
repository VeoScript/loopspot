// const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-1': '#FFFFFF',
        'accent-2': '#222222',
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
    // plugin(({addUtilities}) => {
    //   addUtilities({
    //     'border-line-top': {
    //       borderTopWidth: 1,
    //       borderColor: '#2E3032',
    //     },
    //   });
    // }),
  ],
};
