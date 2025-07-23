"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      return this.currentIndex / this.totalQuestions * 100;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleOptionSelect(value) {
      this.selectedValue = value;
      this.answers[this.currentIndex] = value;
      this.$forceUpdate();
      setTimeout(() => {
        if (this.currentIndex < this.totalQuestions) {
          this.currentIndex++;
          this.selectedValue = this.answers[this.currentIndex] || "";
        } else {
          const result = this.calculateMBTI();
          common_vendor.index.navigateTo({
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
      Object.values(this.answers).forEach((answer) => {
        if (counts[answer])
          counts[answer]++;
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.t($data.currentIndex),
    c: common_vendor.t($options.totalQuestions),
    d: $options.progressPercent + "%",
    e: $options.currentQuestion
  }, $options.currentQuestion ? {
    f: common_vendor.t($data.currentIndex),
    g: common_vendor.t($options.currentQuestion.text.replace(/^\d+\./, "")),
    h: common_vendor.f($options.currentQuestion.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.text),
        b: index,
        c: $data.selectedValue === option.value ? 1 : "",
        d: common_vendor.o(($event) => $options.handleOptionSelect(option.value), index)
      };
    }),
    i: $data.currentIndex
  } : {}, {
    j: $data.currentIndex === 1,
    k: common_vendor.o((...args) => $options.goPrev && $options.goPrev(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mbti-test/index.js.map
