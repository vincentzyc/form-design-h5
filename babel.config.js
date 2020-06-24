module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      },
      "vant"
    ],
    ["@babel/plugin-proposal-optional-chaining"]  //可选链语法
  ]
}
