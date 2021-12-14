import $http from '../libs/axios';
//获取数据字典所有直接下级
export const RenderDictSelect = function (id, callback) {
  $http({
    url: '/zuul/upm/dict/select/' + id,
    method: 'get'
  }).then(result => {
    callback && callback(result.data)
  })
};

//获取外部数据字典所有直接下级
export const RenderExtDictSelect = function (type, callback) {
  $http({
    url: '/zuul/upm/dict/external/' + type,
    method: 'get'
  }).then(result => {
    callback && callback(result.data)
  })
};

//根据机构类型获取用户字典
export const RenderUserDict = function (callback) {
  $http({
    url: '/zuul/upm/user/dict',
    method: 'get'
  }).then(result => {
    callback && callback(result.data.data)
  })
};

/**
 * 根据value获取label,新页面将废弃
 * @return {string}
 */
export const GetDictLabelByValue = function (value, arr) {
  let label = '';
  arr.forEach(item => {
    if (item.value === value) {
      label = item.label
    }
  });
  if (label !== '') {
    return label
  } else {
    return value
  }
};

/**
 * 获取字典JSON对象
 */
export const GetDictByLabel = function (label) {
 return $http({
    url: '/zuul/upm/dict/new/item/code?code='+label,
  })
};