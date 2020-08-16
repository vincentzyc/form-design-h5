//所有候选字体列表
const familyStyleList = ["Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]

//所有候选组成验证码的字符，当然也可以用中文的
const codeChars = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export function createCode() {
  const familyNum = parseInt(Math.random() * 10);
  const codeLength = 4; //验证码的长度
  let code = "";

  for (var i = 0; i < codeLength; i++) {
    const charNum = Math.floor(Math.random() * 62);
    code += codeChars[charNum];
  }

  return {
    font: familyStyleList[familyNum],
    code: code
  }
}

export default createCode