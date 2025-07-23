"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      phoneNumber: "",
      // 存储手机号
      verifyCode: "",
      // 存储验证码
      codeText: "获取验证码",
      // 验证码按钮文字
      isCodeDisabled: false,
      // 验证码按钮是否禁用
      countdown: 60
      // 倒计时秒数
    };
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      if (!this.phoneNumber || this.phoneNumber.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      this.isCodeDisabled = true;
      this.codeText = `${this.countdown}s后重新获取`;
      const timer = setInterval(() => {
        this.countdown--;
        this.codeText = `${this.countdown}s后重新获取`;
        if (this.countdown <= 0) {
          clearInterval(timer);
          this.codeText = "获取验证码";
          this.isCodeDisabled = false;
          this.countdown = 60;
        }
      }, 1e3);
      common_vendor.index.showToast({
        title: "验证码已发送",
        icon: "none"
      });
    },
    // 手机号登录
    login() {
      if (!this.phoneNumber) {
        common_vendor.index.showToast({ title: "请输入手机号", icon: "none" });
        return;
      }
      if (!this.verifyCode) {
        common_vendor.index.showToast({ title: "请输入验证码", icon: "none" });
        return;
      }
      common_vendor.index.showToast({ title: "登录成功", icon: "none" });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/mbti-test/index"
        });
      }, 1e3);
    },
    // 微信登录
    wechatLogin() {
      common_vendor.index.showToast({ title: "微信登录中...", icon: "none" });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/mbti-test/index"
        });
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.phoneNumber,
    b: common_vendor.o(($event) => $data.phoneNumber = $event.detail.value),
    c: $data.verifyCode,
    d: common_vendor.o(($event) => $data.verifyCode = $event.detail.value),
    e: common_vendor.t($data.codeText),
    f: common_vendor.o((...args) => $options.getVerifyCode && $options.getVerifyCode(...args)),
    g: $data.isCodeDisabled,
    h: common_vendor.o((...args) => $options.login && $options.login(...args)),
    i: common_assets._imports_0,
    j: common_vendor.o((...args) => $options.wechatLogin && $options.wechatLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
