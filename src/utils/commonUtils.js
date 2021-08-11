/**
 * 小数转百分数
 * @param point
 * @param fractionDigits
 * @returns {string}
 */
export function toPercent(point,fractionDigits){
  if (!point) {
    return point;
  }
  let percent = Number(point * 100).toFixed(fractionDigits ?? 2);
  percent += "%";
  return percent;
}
