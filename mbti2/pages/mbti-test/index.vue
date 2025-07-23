<template>
  <view class="test-page">
    <!-- 顶部导航栏 -->
    <view class="title-bar">
      <text class="back-btn" @click="goBack">←</text>
      <text class="title">MBTI性格测试</text>
      <text class="progress">{{ currentIndex }}/{{ totalQuestions }}</text>
    </view>

    <!-- 进度条 -->
    <view class="progress-bar">
      <view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
    </view>

    <!-- 题目卡片 -->
    <view class="question-card" v-if="currentQuestion" :key="currentIndex">
      <text class="question-number">问题 {{ currentIndex }}</text>
      <text class="question-text">{{ currentQuestion.text.replace(/^\d+\./, '') }}</text>

      <!-- 选项按钮（已移除类型标签） -->
      <view class="options">
        <button 
          v-for="(option, index) in currentQuestion.options" 
          :key="index"
          class="option-btn" 
          :class="{ selected: selectedValue === option.value }"
          @click="handleOptionSelect(option.value)"
        >
          <text class="option-text">{{ option.text }}</text>
        </button>
      </view>
    </view>

    <!-- 上一题按钮 -->
    <view class="bottom-btn-area">
      <button 
        class="prev-btn" 
        :disabled="currentIndex === 1"
        @click="goPrev"
      >
        上一题
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      selectedValue: "",
      answers: {},
      // 20道题目（已移除选项中的"XX型"标签）
      questions: [
        {
          text: "1. 在社交场合中，你通常更倾向于：",
          options: [
            { value: "E", text: "主动与人交流，享受成为焦点" },
            { value: "I", text: "安静观察，只与熟悉的人深入交流" }
          ]
        },
        {
          text: "2. 你更喜欢：",
          options: [
            { value: "E", text: "参加热闹的聚会，认识新朋友" },
            { value: "I", text: "在家看书或与少数亲密朋友相处" }
          ]
        },
        {
          text: "3. 面对新的环境，你更关注：",
          options: [
            { value: "S", text: "具体的细节和实际情况" },
            { value: "N", text: "可能的发展和潜在机会" }
          ]
        },
        {
          text: "4. 你做决定时更依赖：",
          options: [
            { value: "S", text: "已有的经验和实际数据" },
            { value: "N", text: "灵感和可能性" }
          ]
        },
        {
          text: "5. 做决定时，你更重视：",
          options: [
            { value: "T", text: "逻辑分析和客观事实" },
            { value: "F", text: "他人感受和和谐关系" }
          ]
        },
        {
          text: "6. 你认为哪种方式更公平：",
          options: [
            { value: "T", text: "一视同仁，按规则办事" },
            { value: "F", text: "考虑个体差异，灵活处理" }
          ]
        },
        {
          text: "7. 你更倾向于：",
          options: [
            { value: "J", text: "提前规划，按计划行事" },
            { value: "P", text: "灵活应变，随遇而安" }
          ]
        },
        {
          text: "8. 对于日程安排，你更喜欢：",
          options: [
            { value: "J", text: "有明确的计划和时间表" },
            { value: "P", text: "保持开放，根据情况调整" }
          ]
        },
        {
          text: "9. 当你有空闲时间时，你会：",
          options: [
            { value: "E", text: "找朋友一起活动" },
            { value: "I", text: "独自做自己喜欢的事" }
          ]
        },
        {
          text: "10. 你对新事物的态度是：",
          options: [
            { value: "N", text: "充满好奇，想探索可能性" },
            { value: "S", text: "先了解清楚再决定是否尝试" }
          ]
        },
        {
          text: "11. 你更擅长：",
          options: [
            { value: "T", text: "分析问题，找出解决方案" },
            { value: "F", text: "理解他人情绪，提供支持" }
          ]
        },
        {
          text: "12. 你更喜欢的工作方式是：",
          options: [
            { value: "J", text: "有明确的目标和步骤" },
            { value: "P", text: "自由发挥，灵活安排" }
          ]
        },
        {
          text: "13. 在团队中，你更可能：",
          options: [
            { value: "E", text: "主动发言，带动讨论" },
            { value: "I", text: "认真倾听，最后总结" }
          ]
        },
        {
          text: "14. 你对细节的态度是：",
          options: [
            { value: "S", text: "注重细节，确保准确" },
            { value: "N", text: "更关注整体，不拘泥细节" }
          ]
        },
        {
          text: "15. 当与人意见不合时，你会：",
          options: [
            { value: "T", text: "理性讨论，找出对错" },
            { value: "F", text: "尽量妥协，维持关系" }
          ]
        },
        {
          text: "16. 对于最后期限，你会：",
          options: [
            { value: "J", text: "提前完成，避免匆忙" },
            { value: "P", text: "在截止前才开始，效率更高" }
          ]
        },
        {
          text: "17. 你更关注：",
          options: [
            { value: "E", text: "外部世界的人和事" },
            { value: "I", text: "自己的内心想法和感受" }
          ]
        },
        {
          text: "18. 你对抽象概念的态度是：",
          options: [
            { value: "N", text: "很感兴趣，容易理解" },
            { value: "S", text: "更关注实际应用，觉得抽象概念空洞" }
          ]
        },
        {
          text: "19. 你做决定时更倾向于：",
          options: [
            { value: "T", text: "冷静分析，不受情绪影响" },
            { value: "F", text: "考虑决策对他人的影响" }
          ]
        },
        {
          text: "20. 你对生活的态度是：",
          options: [
            { value: "J", text: "有规划，追求稳定" },
            { value: "P", text: "顺其自然，享受过程" }
          ]
        }
      ]
    };
  },
  computed: {
    totalQuestions() {
      return this.questions.length;
    },
    currentQuestion() {
      return this.questions[this.currentIndex - 1] || null;
    },
    progressPercent() {
      return (this.currentIndex / this.totalQuestions) * 100;
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    handleOptionSelect(value) {
      // 记录选择
      this.selectedValue = value;
      this.answers[this.currentIndex] = value;
      
      // 强制刷新UI
      this.$forceUpdate();
      
      // 延迟跳转
      setTimeout(() => {
        if (this.currentIndex < this.totalQuestions) {
          this.currentIndex++;
          this.selectedValue = this.answers[this.currentIndex] || "";
        } else {
          // 计算结果并跳转
          const result = this.calculateMBTI();
          uni.navigateTo({ 
            url: `/pages/result/index?type=${result}` 
          });
        }
      }, 300);
    },
    goPrev() {
      if (this.currentIndex > 1) {
        this.currentIndex--;
        this.selectedValue = this.answers[this.currentIndex] || "";
      }
    },
    calculateMBTI() {
      const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      Object.values(this.answers).forEach(answer => {
        if (counts[answer]) counts[answer]++;
      });
      return [
        counts.E >= counts.I ? "E" : "I",
        counts.S >= counts.N ? "S" : "N",
        counts.T >= counts.F ? "T" : "F",
        counts.J >= counts.P ? "J" : "P"
      ].join("");
    }
  }
};
</script>

<style>
.test-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
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
  color: #666;
  width: 50rpx;
  height: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.progress {
  font-size: 28rpx;
  color: #4F46E5;
  background-color: #f0f0ff;
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
}
.progress-bar {
  height: 8rpx;
  background-color: #eee;
  width: 100%;
}
.progress-fill {
  height: 100%;
  background-color: #4F46E5;
  transition: width 0.5s ease;
}
.question-card {
  flex: 1;
  background-color: white;
  margin: 30rpx;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 5rpx 20rpx rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}
.question-number {
  font-size: 26rpx;
  color: #888;
  display: block;
  margin-bottom: 20rpx;
}
.question-text {
  font-size: 34rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 40rpx;
  display: block;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.option-btn {
  width: 100%;
  padding: 30rpx;
  background-color: white;
  border: 2rpx solid #e0e0e0;
  border-radius: 16rpx;
  text-align: left;
  transition: all 0.3s ease;
}
.option-btn:hover {
  border-color: #4F46E5;
  background-color: #f9f9ff;
}
.option-btn.selected {
  border-color: #4F46E5;
  background-color: #f0f0ff;
}
.option-text {
  font-size: 30rpx;
  color: #333;
  display: block;
}
.bottom-btn-area {
  padding: 20rpx 30rpx 40rpx;
}
.prev-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 32rpx;
  border-radius: 16rpx;
  background-color: white;
  color: #666;
  border: 2rpx solid #e0e0e0;
}
</style>
    