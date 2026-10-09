// 仅由密码门在校验成功后设置；禁用浏览器存储时仍可在当前页面内浏览。
// 刷新后模块重新加载，不能继承这份状态。
let verified = false
export function grantAccess() { verified = true }
export function hasSessionAccess() { return verified }
