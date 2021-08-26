import _ from 'lodash'
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
 * 金额提交转换 万元转换为元
 * @param obj
 * @returns {{}}
 */
export function yuan(obj) {
  return _.transform(
    obj,
    function (result, value, key) {
      result[key] = value * 10000;
    },
    {},
  );
}
