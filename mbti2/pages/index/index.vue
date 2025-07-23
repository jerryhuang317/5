<template>
  <!-- 整个登录页容器 -->
  <view class="login-page">
    <!-- 顶部标题区域 -->
    <view class="title-area">
      <text class="main-title">MBTI交友</text>
      <text class="sub-title">找到与你匹配的灵魂伴侣</text>
    </view>

    <!-- 登录表单卡片 -->
    <view class="login-card">
      <!-- 手机号输入框 -->
      <view class="input-item">
        <text class="input-label">手机号</text>
        <input 
          type="number" 
          placeholder="请输入手机号" 
          class="input-box"
          v-model="phoneNumber"
        />
      </view>

      <!-- 验证码输入框 + 获取按钮 -->
      <view class="input-item">
        <text class="input-label">验证码</text>
        <view class="code-container">
          <input 
            type="number" 
            placeholder="请输入验证码" 
            class="code-input"
            v-model="verifyCode"
          />
          <button 
            class="get-code-btn" 
            @click="getVerifyCode"
            :disabled="isCodeDisabled"
          >
            {{ codeText }}
          </button>
        </view>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="login">登录/注册</button>

      <!-- 分隔线 -->
      <view class="divider">
        <view class="line"></view>
        <text class="divider-text">或使用其他方式登录</text>
        <view class="line"></view>
      </view>

      <!-- 微信登录按钮 -->
      <button class="wechat-login-btn" @click="wechatLogin">
        <image src="/static/wechat.png" class="wechat-icon" mode="widthFix" />
        <text>微信登录</text>
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '', // 存储手机号
      verifyCode: '', // 存储验证码
      codeText: '获取验证码', // 验证码按钮文字
      isCodeDisabled: false, // 验证码按钮是否禁用
      countdown: 60 // 倒计时秒数
    }
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      // 简单验证手机号格式
      if (!this.phoneNumber || this.phoneNumber.length !== 11) {
        // 弹出提示
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }

      // 禁用按钮，开始倒计时
      this.isCodeDisabled = true
      this.codeText = `${this.countdown}s后重新获取`
      
      // 倒计时逻辑
      const timer = setInterval(() => {
        this.countdown--
        this.codeText = `${this.countdown}s后重新获取`
        
        if (this.countdown <= 0) {
          clearInterval(timer)
          this.codeText = '获取验证码'
          this.isCodeDisabled = false
          this.countdown = 60 // 重置倒计时
        }
      }, 1000)

      // 模拟发送验证码
      uni.showToast({
        title: '验证码已发送',
        icon: 'none'
      })
    },

    // 手机号登录
    login() {
      // 验证输入
      if (!this.phoneNumber) {
        uni.showToast({ title: '请输入手机号', icon: 'none' })
        return
      }
      if (!this.verifyCode) {
        uni.showToast({ title: '请输入验证码', icon: 'none' })
        return
      }

      // 模拟登录成功，跳转到测试页
      uni.showToast({ title: '登录成功', icon: 'none' })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/mbti-test/index'
        })
      }, 1000)
    },

    // 微信登录
    wechatLogin() {
      // 模拟微信登录
      uni.showToast({ title: '微信登录中...', icon: 'none' })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/mbti-test/index'
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>
/* 页面整体样式 */
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 80rpx 40rpx 40rpx;
  box-sizing: border-box;
}

/* 标题区域 */
.title-area {
  text-align: center;
  margin-bottom: 80rpx;
}
.main-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #4F46E5;
}
.sub-title {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-top: 10rpx;
}

/* 登录卡片 */
.login-card {
  background-color: white;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

/* 输入项样式 */
.input-item {
  margin-bottom: 30rpx;
}
.input-label {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}
.input-box {
  width: 100%;
  height: 80rpx;
  border: 2rpx solid #eee;
  border-radius: 10rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

/* 验证码区域 */
.code-container {
  display: flex;
}
.code-input {
  flex: 1;
  height: 80rpx;
  border: 2rpx solid #eee;
  border-radius: 10rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}
.get-code-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #4F46E5;
  color: white;
  font-size: 26rpx;
  border-radius: 10rpx;
  margin-left: 20rpx;
  padding: 0;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #4F46E5;
  color: white;
  font-size: 32rpx;
  border-radius: 10rpx;
  margin-top: 40rpx;
  padding: 0;
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  margin: 40rpx 0;
}
.line {
  flex: 1;
  height: 2rpx;
  background-color: #eee;
}
.divider-text {
  font-size: 26rpx;
  color: #999;
  padding: 0 20rpx;
}

/* 微信登录按钮 */
.wechat-login-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #07C160;
  color: white;
  font-size: 32rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.wechat-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 15rpx;
}
</style>
    