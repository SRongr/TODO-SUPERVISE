/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @NAMEor Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


const { validDate } = require("../utils")

const DEFAULT_WARNLINE = 2
module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "disallow unnecessary semicolons",
      category: "Possible Errors",
      recommended: true,
      url: "https://eslint.org/docs/rules/no-extra-semi",
    },
    schema: [
      // 定义 第一个参数为枚举，制定输入 true， false
      {
        enum: [true, false],
      },
      // 定义 第二个参数为对象，属性key 为 warnLine， value 值类型为数字
      {
        type: "object",
        properties: {
          warnLine: {
            type: "number"
          }
        }
      }
  ],
  },
  relus: {
   
  },
  create: function (context) {
    // context对象包含与规则上下文相关的信息
    // 返回一个SourceCode对象，你可以使用该对象处理传递给 ESLint 的源代码
    const sourceCode = context.getSourceCode()

    let [advanceWarning, params] = context.options || []
    let { warnLine } = params || {}
    // if ((advanceWarning || advanceWarning === 0) &&  warnLine) {

    // }

    if (advanceWarning) {
      if (warnLine !== 0) {
        warnLine = warnLine || DEFAULT_WARNLINE
      }
    }
    // 获取所有注释的节点
    const comments = sourceCode.getAllComments()

    const report = context.report

  
    /**
     * TODO
     * NAME: wang
     * DATE: 2032-7-15
     */
    
    const needHaveDesc = ["NAME", "DATE"]
    const todoComments = comments.filter((comment) => {
      return comment.value.includes("TODO")
    })
    return {
      //  Program(node) {
      Program() {
        let errorMsg = ""
        // 判断是否块级注释
        todoComments.forEach((comment) => {
          const value = String(comment.value)

          if (comment.type !== "Block") {
            return report({
              node: comment,
              message: "TODO WARN: 请使用块级注释书写TODO"
            })
          }
          const haveAllDesc = needHaveDesc.every(desc => {
            if (!value.includes(desc)) {
              errorMsg = `TODO WARN: 请添加 ${desc}: xxx`
            }
            return value.includes(desc)
          })

          // 如果不全 直接报错，退出
          if (!haveAllDesc) {
            return report({
              node: comment,
              message: errorMsg
            })
          }

          const lineComment = value.split("\n")
          lineComment.forEach((lineDesc) => {
            if (lineDesc.includes("NAME")) {
              if (lineDesc.trim().length < 6) {
                errorMsg = "TODO WARN: 请完善NAME信息"
              }
            }
            if (lineDesc.includes("DATE")) {
              const date = lineDesc.split(":")[1]
              // return
              const msg = validDate(date, warnLine)
              errorMsg = msg
            }
          })
          if (errorMsg) {
            return report({
              node: comment,
              message: errorMsg
            })
          }

        })
        

      }
    };
  },
};
