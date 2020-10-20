export const showToast = (
  type = "fail",
  content = "加载失败",
  duration = 2000
) => {
  return new Promise((resolve, reject) => {
    my.showToast({
      type,
      content,
      duration,
    });
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};
/**
 * 接口加载状态处理
 * @param {*} fn 接口方法,需要为rxjs订阅函数
 * @param {*} content 加载中的显示文字 默认加载中...
 * @param {*} delay 忽略时间 默认500
 * @param {*} timeout 超时时间 默认10000
 * @return {*} promise方法
 */
export const apiLoading = (
  fn,
  option = {
    content: "加载中...",
    delay: 500,
    timeout: 10000,
  }
) => {
  return new Promise((resolve, reject) => {
    let content = option.content ? option.content : "加载中...",
      delay = option.delay ? option.delay : 500,
      timeout = option.timeout ? option.timeout : 10000;
    let timer = setTimeout(() => {
      showToast({
        type: "fail",
        content: "加载失败",
        duration: 2000,
      }).then((e) => {
        my.hideLoading();
      });
    }, timeout);
    my.showLoading({
      content,
      delay,
    });
    fn.subscribe((v) => {
      clearTimeout(timer);
      my.hideLoading();
      resolve(v);
    });
  });
};
