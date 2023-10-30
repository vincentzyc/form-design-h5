import Vue from 'vue'

const vm = new Vue()

let formData = {}

const ruleList = {
  phone: value => {
    if (!value) return '请输入手机号';
    if (/^1[0-9]{10}$/.test(value)) return true;
    return '手机号码不正确'
  },
  verifyCode: value => {
    if (!value) return '请输入验证码';
    if (value.length === 6) return true;
    return "验证码错误";
  },
  name: value => {
    if (!value) return '请输入姓名';
    if (/^[\u4e00-\u9fa5]{2,20}$/.test(value)) return true;
    if (value.length < 2 || value.length > 20) return '姓名长度不能小于2或超过20';
    return '姓名必须为汉字'
  },
  mail: value => {
    if (!value) return '请输入邮箱';
    // eslint-disable-next-line no-useless-escape
    if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) return true;
    return '邮箱格式不正确'
  },
  shootPlace: value => {
    if (value.length === 0) return '请选择旅拍城市';
    return true;
  },
  sex: value => {
    if (!value) return '请选择性别';
    return true;
  },
  loanTimeList: value => {
    if (!value) return '请选择贷款时间';
    return true;
  },
  educationLevel: value => {
    if (!value) return '请选择教育程度';
    return true;
  },
  profession: value => {
    if (!value) return '请选择职业身份';
    return true;
  },
  socialSecurity: value => {
    if (!value) return '请选择是否有社保';
    return true;
  },
  age: value => {
    if (!value) return '请选择年龄';
    return true;
  },
  amount: value => {
    if (!value) return '请选择金额';
    return true;
  },
  birthday: value => {
    if (!value) return '请选择生日';
    return true;
  },
  idCardValidity: value => {
    if (!value) return '请选择身份证有效期';
    return true;
  },
  idCard: value => {
    if (!value) return '请输入身份证号';
    if (/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(value)) return true;
    return '请输入正确的身份证号码'
  },
  city: value => {
    if (!value) return '请选择城市';
    return true;
  },
  agreement: value => {
    if (!value) return '请勾选同意相关协议';
    return true;
  },
  randomCode: (value, item) => {
    if (!value) return '请输入验证码';
    if (item.value.toUpperCase() !== item.codeValue.toUpperCase()) {
      item.getCode()
      return '验证码错误';
    }
    return true
  },
  dragVerify: value => {
    if (!value) return '请按住滑块拖动校验';
    return true;
  },
}

export function valiDate(obj) {
  if (typeof (obj.isRequired) !== 'boolean') obj.isRequired = true; //默认必填
  if (obj.isRequired && obj.value === '') return obj.placeholder || '请完善信息';
  if (!ruleList[obj.apiKey]) return true;
  if (obj.apiKey === 'phone') {
    if (ruleList[obj.apiKey](obj.value) === true) {
      return obj.showCode ? ruleList[obj.codeKey](obj.codeValue) : true
    }
  }
  if (obj.isRequired === false && (obj.value === '' || obj.value === false)) return true;
  return ruleList[obj.apiKey](obj.value, obj)
}


export function handleSubmit() {
  let valiDateRes = vm.BUS.valiPopupDate ? valiPopupDate(vm.BUS.pageData.list) : valiAllDate(vm.BUS.pageData.list);
  if (valiDateRes !== true) return vm.$toast(valiDateRes)
  submit(formData);
}


export function submit(data) {
  console.log('提交数据', data);
  vm.$loading.open({
    text: "正在提交...",
    type: "sandglass"
  });
  setTimeout(() => {
    vm.$loading.close();
    vm.$dialog.alert({
      message: '提交成功'
    })
  }, 2500);
}

function valiPopupDate(list) {
  for (const item of list) {
    if (Array.isArray(item.list) && item.list.length > 0) {
      let res = valiPopupDate(item.list, false);
      if (res !== true) return res;
    }
    if (Array.isArray(item.popupList) && item.popupList.length > 0 && item.showPopup) {
      return valiAllDate(item.popupList, false);
    }
  }
  return true;
}

function valiAllDate(list, scrollIntoView = true) {
  for (const item of list) {
    if (Array.isArray(item.list) && item.list.length > 0) {
      let res = valiAllDate(item.list, scrollIntoView);
      if (res !== true) return res;
    }
    if (!item.apiKey) continue;
    let res = valiDate(item);
    if (res === true) {
      formatParam(item);
      continue
    }
    if (scrollIntoView) vm.$util.scrollIntoView(document.getElementById(item.key))
    return res;
  }
  return true;
}

function formatParam(item) {
  if (!Object.prototype.hasOwnProperty.call(item, 'apiKey')) return;
  if (item.type === 'phone' && item.showCode) {
    formData[item.codeKey] = item.codeValue;
  }
  formData[item.apiKey] = item.value;
}