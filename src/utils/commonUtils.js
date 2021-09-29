import _ from 'lodash';

/**
 * 小数转百分数
 * @param point
 * @param fractionDigits
 * @returns {string}
 */
export function toPercent(point, fractionDigits) {
  if (!point) {
    return point;
  }
  let percent = Number(point * 100).toFixed(fractionDigits ?? 2);
  percent += '%';
  return percent;
}

/**
 * 延时
 * @param ms
 * @returns {Promise<unknown>}
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * 数组去重
 * @param arr
 * @returns {unknown[]}
 */
export function unique(arr) {
  const n = [];
  for (let i = 0; i < arr.length; i++) {
    if (n.indexOf(arr[i]) === -1) n.push(arr[i]);
  }
  return n;
}

/**
 * 判断是否数字
 * @param val
 * @returns {boolean}
 */
export function isNumber(val) {
  if (val === '' || val == null) {
    return false;
  }
  return !isNaN(val);
}

/**
 * 金额提交转换 万元转换为元
 * @param obj
 * @returns {{}}
 */
export function yuan(obj) {
  return _.transform(
    obj,
    function (result, value, key) {
      if (typeof value === 'number') {
        result[key] = value * 10000;
      } else {
        result[key] = value;
      }
      // result[key] = value * 10000;
    },
    {},
  );
}
