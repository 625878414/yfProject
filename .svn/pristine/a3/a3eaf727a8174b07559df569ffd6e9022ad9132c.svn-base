import $http from 'axios';
//根据机构类型获取机构字典
export const RenderOfficeSelect = function (id, callback) {
  $http({
    url: '/zuul/upm/office/select/' + id,
    method: 'get'
  }).then(result => {
    callback && callback(result.data)
  })
};

//根据机构类型获取机构字典
export const RenderOfficeDict = function (callback) {
  $http({
    url: '/zuul/upm/office/dict',
    method: 'get'
  }).then(result => {
    callback && callback(result.data.data)
  })
};
