module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      pink: '#DC759D',
      ['dark-purple']: '#896CC3',
      ['light-purple']: '#CEC0F9',
      ['blue-gray']: '#B8D8F0',
      ['sky-blue']: '#79BDDF',
      ['white']: '#FEFFFE',
      ['teal-blue']: '#78C9CA',
      ['green']: '#7ED077',
      ['yellow']: '#F6C858',
      ['orange']: '#EFA13B',
      ['red']: '#EC7F6A',

      ['black']: '#231F20',
    },
    extend: {
      fontFamily: {
        ['header']: ['Hoolister-Bold'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
