/**
 * 小数转百分数
 * @param point
 * @param fractionDigits
 * @returns {string}
 */
export function toPercent(point,fractionDigits) {
  if (!point) {
    return point;
  }
  let percent = Number(point * 100).toFixed(fractionDigits ?? 2);
  percent += "%";
  return percent;
}

/**
 * 延时
 * @param ms
 * @returns {Promise<unknown>}
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve()},ms)
  })
}

/**
 * 传入开始时间，获取距离开始的倒计时数，单位是秒
 * @param timestamp 开始时间的时间戳
 */
export function getCountDownSec(timestamp) {
  if (!timestamp) {
    return 0
  }
  // 当前时间戳
  const now = Date.now();
  const second = Math.trunc((timestamp - now) / 1000);
  return second < 0 ? 0 : second
}
