module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        loose: true
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        'styleLibraryName': 'theme-chalk'
      },
      'syntax-dynamic-import'
    ]
  ]
}
