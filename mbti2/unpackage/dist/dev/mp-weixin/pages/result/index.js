"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      mbtiType: "",
      isLoading: true,
      // 增加加载状态，避免瞬间空白
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
        }
        // 其他类型已省略，保持代码简洁
      }
    };
  },
  onLoad(options) {
    setTimeout(() => {
      this.mbtiType = options.type || "INFP";
      this.typeInfo = this.typeDatabase[this.mbtiType] || this.typeInfo;
      this.isLoading = false;
    }, 800);
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToMatch() {
      common_vendor.index.navigateTo({ url: "/pages/match/index" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.isLoading
  }, $data.isLoading ? {} : {
    c: common_vendor.t($data.mbtiType),
    d: common_vendor.t($data.typeInfo.name),
    e: common_vendor.t($data.typeInfo.slogan),
    f: common_vendor.t($data.typeInfo.traits),
    g: common_vendor.f($data.typeInfo.careers, (career, index, i0) => {
      return {
        a: common_vendor.t(career),
        b: index
      };
    }),
    h: common_vendor.f($data.typeInfo.matches, (type, index, i0) => {
      return {
        a: common_vendor.t(type),
        b: index
      };
    }),
    i: common_vendor.o((...args) => $options.goToMatch && $options.goToMatch(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/index.js.map
