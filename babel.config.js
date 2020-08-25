module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
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
