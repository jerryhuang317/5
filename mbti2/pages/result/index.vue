<template>
  <view class="result-page">
    <!-- 顶部导航栏 -->
    <view class="title-bar">
      <text class="back-btn" @click="goBack">← 返回</text>
      <text class="title">测试结果</text>
      <view class="empty"></view>
    </view>

    <!-- 加载状态 -->
    <view class="loading" v-if="isLoading">
      <view class="spinner"></view>
      <text>正在生成你的性格报告...</text>
    </view>

    <!-- 结果内容（确保一定显示） -->
    <view class="result-card" v-else>
      <!-- MBTI类型展示 -->
      <view class="type-container">
        <view class="type-badge">{{ mbtiType }}</view>
        <text class="type-name">{{ typeInfo.name }}</text>
        <text class="type-slogan">{{ typeInfo.slogan }}</text>
      </view>

      <!-- 性格分析 -->
      <view class="section">
        <text class="section-title">性格特质</text>
        <text class="section-content">{{ typeInfo.traits }}</text>
      </view>

      <!-- 适合职业 -->
      <view class="section">
        <text class="section-title">适合职业</text>
        <view class="career-tags">
          <text class="tag" v-for="(career, index) in typeInfo.careers" :key="index">
            {{ career }}
          </text>
        </view>
      </view>

      <!-- 匹配建议 -->
      <view class="section">
        <text class="section-title">最佳匹配</text>
        <view class="match-types">
          <text class="match-type" v-for="(type, index) in typeInfo.matches" :key="index">
            {{ type }}
          </text>
        </view>
      </view>

      <!-- 开始匹配按钮 -->
      <button class="match-btn" @click="goToMatch">
        寻找同频的人
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mbtiType: "",
      isLoading: true, // 增加加载状态，避免瞬间空白
      // 基础类型信息（确保至少有默认值）
      typeInfo: {
        name: "探索者",
        slogan: "用独特视角看待世界",
        traits: "你富有好奇心，善于观察，对世界充满探索欲...",
        careers: ["设计师", "分析师", "咨询师"],
        matches: ["INFJ", "ENFP"]
      },
      // 完整类型数据库
      typeDatabase: {
        "INFP": {
          name: "理想主义者",
          slogan: "用热情和理想改变世界",
          traits: "你敏感且富有创造力，重视个人价值观，对美和意义有深刻理解。善于理解他人情感，倾向于用温和的方式表达自己。",
          careers: ["作家", "心理咨询师", "艺术家", "教师"],
          matches: ["ENFJ", "ENTJ"]
        },
        "INFJ": {
          name: "咨询师",
          slogan: "洞察人心，指引方向",
          traits: "你富有洞察力和同理心，善于理解他人的需求和动机。有强烈的责任感，致力于帮助他人成长和实现潜能。",
          careers: ["心理咨询师", "导师", "社会工作者", "策划师"],
          matches: ["ENFP", "ENTP"]
        },
        "INTJ": {
          name: "战略家",
          slogan: "运筹帷幄，决胜千里",
          traits: "你理性且独立，具有强大的逻辑思维和规划能力。善于洞察事物本质，制定长远计划并坚定执行。",
          careers: ["科学家", "工程师", "管理者", "战略顾问"],
          matches: ["ENFP", "ENTP"]
        },
        "INTP": {
          name: "思考者",
          slogan: "探索真理，解构世界",
          traits: "你充满好奇心，善于抽象思考和逻辑分析。对知识有强烈追求，喜欢挑战传统观念，寻找事物的本质规律。",
          careers: ["科学家", "程序员", "哲学家", "分析师"],
          matches: ["ENTJ", "ENFJ"]
        },
        "ENFP": {
          name: "追梦人",
          slogan: "热情洋溢，点亮周围",
          traits: "你充满活力和创造力，善于激励他人，对新事物充满好奇。重视人际关系，能快速与他人建立连接。",
          careers: ["公关", "教师", "创业者", "设计师"],
          matches: ["INFJ", "INTJ"]
        },
        // 其他类型已省略，保持代码简洁
      }
    };
  },
  onLoad(options) {
    // 强制延迟，确保用户看到加载状态
    setTimeout(() => {
      // 1. 确保获取到类型参数，没有则用默认值
      this.mbtiType = options.type || "INFP";
      
      // 2. 确保能获取到类型信息，没有则用默认值
      this.typeInfo = this.typeDatabase[this.mbtiType] || this.typeInfo;
      
      // 3. 关闭加载状态
      this.isLoading = false;
    }, 800);
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    goToMatch() {
      uni.navigateTo({ url: "/pages/match/index" });
    }
  }
};
</script>

<style>
.result-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 30rpx;
  background-color: white;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}
.back-btn {
  font-size: 36rpx;
  color: #4F46E5;
  padding: 10rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.empty {
  width: 36rpx;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
}
.spinner {
  width: 60rpx;
  height: 60rpx;
  border: 6rpx solid #eee;
  border-top-color: #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20rpx;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 结果卡片 */
.result-card {
  background-color: white;
  border-radius: 24rpx;
  margin: 30rpx;
  padding: 40rpx;
  box-shadow: 0 5rpx 20rpx rgba(0,0,0,0.05);
}

/* 类型展示 */
.type-container {
  text-align: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 30rpx;
}
.type-badge {
  display: inline-block;
  font-size: 60rpx;
  font-weight: bold;
  color: #4F46E5;
  background-color: #f0f0ff;
  padding: 15rpx 40rpx;
  border-radius: 100rpx;
  margin-bottom: 20rpx;
  letter-spacing: 5rpx;
}
.type-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}
.type-slogan {
  font-size: 28rpx;
  color: #666;
  display: block;
}

/* 内容区块 */
.section {
  margin-bottom: 40rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
  border-left: 6rpx solid #4F46E5;
}
.section-content {
  font-size: 28rpx;
  color: #555;
  line-height: 1.8;
}

/* 职业标签 */
.career-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}
.tag {
  background-color: #f5f5f5;
  color: #555;
  padding: 10rpx 25rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  transition: all 0.3s;
}
.tag:hover {
  background-color: #f0f0ff;
  color: #4F46E5;
}

/* 匹配类型 */
.match-types {
  display: flex;
  gap: 15rpx;
  flex-wrap: wrap;
}
.match-type {
  background-color: #e8f4fd;
  color: #2196F3;
  padding: 10rpx 25rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
}

/* 匹配按钮 */
.match-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background-color: #4F46E5;
  color: white;
  font-size: 34rpx;
  border-radius: 16rpx;
  margin-top: 20rpx;
  padding: 0;
  box-shadow: 0 5rpx 15rpx rgba(79, 70, 229, 0.3);
  transition: all 0.3s;
}
.match-btn:hover {
  background-color: #4338ca;
  transform: translateY(-2rpx);
}
</style>
    