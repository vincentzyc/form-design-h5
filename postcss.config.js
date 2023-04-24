//rem自动转px，根据实际情况决定是否使用
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');
 
module.exports = {
  plugins: [
  autoprefixer(),
  px2rem({
    rootValue: 50,
    propList: ["*"]
  })], 
};