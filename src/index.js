require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ],
  ],
});

require('./server');
