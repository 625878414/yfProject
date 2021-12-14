/*是否合法IP地址*/
export function validateIP(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}

/*是否车牌*/
export function validateVehicleNumber(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
      const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
      if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的车牌号码'));
        } else {
            callback();
        }
    }
}

/*是否合法行政区划编码*/
export function validateAreaCode(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        const reg1 = /[0-9]{2}(([^0][0-9])|([0-9][^0]))00/;//地级市(省辖市)（县以上）
        const reg2 = /[0-9]{2}[0]{4}/;//直辖市、省、自治区、行政区
        const reg3 = /[0-9]{2}(([^0][0-9])|([0-9][^0]))(([^0][0-9])|([0-9][^0]))/;//市辖区正则
        if ((!reg1.test(value) && !reg2.test(value) && !reg3.test(value)) && value != '') {
            callback(new Error('请输入正确的行政区划编码'));
        } else {
            callback();
        }
    }
}

/* 是否手机号码或者固话*/
/* 是否手机号码或者固话*/
export function validatePhoneTwo(rule, value, callback) {
  // const reg = /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
  const reg = /^((0\d{2,4}-\d{7,8})|([1][0-9]{10}))$/;
  // const reg = /^((d{3,4})|d{3,4}-|s)?d{7,14}|([1][0-9]{10})$/
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请填写正确手机号或固话(格式：区号+号码,如0100-12345678)'));
    } else {
      callback();
    }
  }
}

/* 是否固话*/
export function validateTelphone(rule, value, callback) {
    const reg = /0\d{2}-\d{7,8}/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
        } else {
            callback();
        }
    }
}

/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
    const reg = /^[1][0-9]{10}$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的号码'));
        } else {
            callback();
        }
    }
}

/* 是否身份证号码*/
export function validateIdNo(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    }
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/*验证内容是否英文数字以及下划线*/
export function isPassword(rule, value, callback) {
    const reg = /^[_a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('仅由英文字母，数字以及下划线组成'));
        } else {
            callback();
        }
    }
}

/*自动检验数值的范围*/
export function checkMax20000(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else if (!Number(value)) {
        callback(new Error('请输入[1,20000]之间的数字'));
    } else if (value < 1 || value > 20000) {
        callback(new Error('请输入[1,20000]之间的数字'));
    } else {
        callback();
    }
}

//验证数字输入框最大数值,32767
export function checkMaxVal(rule, value, callback) {
    if (value < 0 || value > 32767) {
        callback(new Error('请输入[0,32767]之间的数字'));
    } else {
        callback();
    }
}

//验证是否1-99之间
export function isOneToNinetyNine(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'));
        } else {
            const re = /^[1-9][0-9]{0,1}$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入正整数，值为【1,99】'));
            } else {
                callback();
            }
        }
    }, 0);
}

// 验证是否整数
export function isInteger(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'));
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入正整数'));
            } else {
                callback();
            }
        }
    }, 0);
}

// 验证是否整数,非必填
export function isIntegerNotMust(rule, value, callback) {
    if (!value) {
        callback();
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'));
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入正整数'));
            } else {
                callback();
            }
        }
    }, 1000);
}

// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入[0,1]之间的数字'));
        } else {
            if (value < 0 || value > 1) {
                callback(new Error('请输入[0,1]之间的数字'));
            } else {
                callback();
            }
        }
    }, 100);
}

// 验证是否是[1-10]的小数,即不可以等于0
export function isBtnOneToTen(rule, value, callback) {
    if (typeof value == 'undefined') {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数，值为[1,10]'));
        } else {
            if (!(value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9' || value == '10')) {
                callback(new Error('请输入正整数，值为[1,10]'));
            } else {
                callback();
            }
        }
    }, 100);
}

// 验证是否是[1-100]的小数,即不可以等于0
export function isBtnOneToHundred(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入整数，值为[1,100]'));
        } else {
            if (value < 1 || value > 100) {
                callback(new Error('请输入整数，值为[1,100]'));
            } else {
                callback();
            }
        }
    }, 100);
}

// 验证是否是[0-100]的小数
export function isBtnZeroToHundred(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入[1,100]之间的数字'));
        } else {
            if (value < 0 || value > 100) {
                callback(new Error('请输入[1,100]之间的数字'));
            } else {
                callback();
            }
        }
    }, 100);
}

// 验证端口是否在[0,65535]之间
export function isPort(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (value == '' || typeof (value) == undefined) {
            callback(new Error('请输入端口值'));
        } else {
            const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入在[0-65535]之间的端口值'));
            } else {
                callback();
            }
        }
    }, 100);
}

// 验证端口是否在[0,65535]之间，非必填,isMust表示是否必填
export function isCheckPort(rule, value, callback) {
    if (!value) {
        callback();
    }
    setTimeout(() => {
        if (value == '' || typeof (value) == undefined) {
            //callback(new Error('请输入端口值'));
        } else {
            const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入在[0-65535]之间的端口值'));
            } else {
                callback();
            }
        }
    }, 100);
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/*保留2为小数*/
export function validatetoFixedNew(str) {
    return str;
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/*特殊字符与空*/
export function validateSpecialFont(rule, value, callback) {
    const reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>《》/?~！@#￥……&*|{}【】‘；：”“'。，、？' ']");
    if (value == '' || value == undefined || value == null) {
        callback(new Error('必填字符不可为空'));
    } else {
        if ((reg.test(value))) {
            callback(new Error('请输入正确字符'));
        } else {
            callback();
        }
    }
}

/*仅针对特殊字符*/
export function validateOnlySpecial(rule, value, callback) {
    const reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>《》/?~！@#￥……&*|{}【】‘；：”“'。，、？' ']");
    if ((reg.test(value))) {
        callback(new Error('请输入正确字符'));
    } else {
        callback();
    }
}

/*仅针对密码验证包含至少一位大小写字母、数字、特殊符号*/
export function validatePassword(rule, value, callback) {
    const re = /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/;
    const rsCheck = re.test(value);
    if (!rsCheck) {
        callback(new Error('请输入正确密码，长度需大于等于8位，包含至少一位大小写字母、数字、特殊符号'));
    } else {
        callback();
    }
}
/*长度不能大于10*/
export function maxlength10(rule, value, callback) {
    let errors = []
    if (!!value) {
        if (value.length >= 10) {
            errors.push('长度不能大于10')
        }
    }
    callback(errors)
}
