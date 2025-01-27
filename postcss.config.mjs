export default {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true
      }
    },
    'autoprefixer': {},
    'cssnano': {
      preset: 'default',
    },
  },
};
