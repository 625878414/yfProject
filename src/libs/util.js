import Cookies from 'js-cookie'
/**
 * cookie写入
 * @param key
 * @param value
 * @constructor
 */
export const WriteCookie = (key, value, time) => {
    Cookies.set(key, value, { expires: time || 1 })
};
/**
 * cookie读取
 * @param key
 * @returns {T | ActiveX.IXMLDOMNode | Promise<any> | V | string | IDBRequest | any | FormDataEntryValue | MediaKeyStatus}
 * @constructor
 */
export const ReadCookie = (key) => {
    return Cookies.get(key)
};
/**
 * 删除cookie
 * @param key
 * @constructor
 */
export const DelCookie = (key) => {
    Cookies.remove(key);
};
/**
 * LocalStorage操作
 * @param {*} key 
 * @returns 
 */
export const ReadLocalStorage = (key) => {
    return localStorage.getItem(key);
};
export const WriteLocalStorage = (key,value) => {
    localStorage.setItem(key,value);
};
export const DelLocalStorage = (key) => {
    localStorage.removeItem(key);
}
/**
 * url参数部分转化成json对象
 * @param url
 */
export const parseQueryString = (url) => {
    let reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url),
        ret = {};
    if (arr_url && arr_url[1]) {
        let str_para = arr_url[1],
            result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
};
/**
 * 获取href
 * @returns {string}
 */
export const getLocationHash = () => {
    return window.location.href;
};
/**
 * 前缀补充0
 * @param num
 * @param n
 * @returns {string}
 * @constructor
 */
export const PrefixInteger = function(num, n) {
    return (Array(n).join(0) + num).slice(-n)
};

/**
 *生成guid
 *
 */
export const GetGuid = function guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
};

/**
 * 如果此条数据为当前页面最后一条数据,则删除成功后当前页码减一
 * @param page 当前页码
 * @param length table绑定的data长度
 * @param del 删除数据的长度 删除单个填1 删除多个填勾选的数组长度
 * @return {number}
 */
export const GetPageByDelete = function(page, length, del) {
    if (length === del && page > 0) {
        return page - 1
    }
    return page
}


/*  */

//地图相关函数----Start----
/**
 * wgs84_to_gcj02
 */

 export const  wgs84_to_gcj02 = function(lon, lat) {
    var pi = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    // console.log("lat:" + lat + "lon:" + lon);
    if (outOfChina(lat, lon)) {
      return null;
    }
    var dLat = transformLat(lon - 105.0, lat - 35.0);
    var dLon = transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var mgLat = parseFloat(lat) + parseFloat(dLat);
    var mgLon = parseFloat(lon) + parseFloat(dLon);
    return [mgLon,mgLat];
  }
  function transformLat(x, y) {
    var pi = 3.1415926535897932384626;
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
  }
  function transformLon(x, y) {
    var pi = 3.1415926535897932384626;
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
  }
  function outOfChina(lat, lon){
    if (lon < 72.004 || lon > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  }

  //地图相关函数----End----

  