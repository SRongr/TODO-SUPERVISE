const { RuleTester } = require('eslint')
const dayjs = require("dayjs")

// 获取自定义的规则
const rule = require('../../../lib/rules/todo-supervise')

// TESTS
// 加入默认配置
const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2018 }
})



ruleTester.run('todo-supervise', rule, {
    valid: [
      `myFunc().then(() => {return 2}).catch((err)=>{console.log(err)})`,
      `/*
      * TODO
      * NAME: 哈哈
      * DATE: 2033-2-2
      */`
    ],
    invalid: [
        {
            code: "// TODO",
            errors: [{ message: "TODO WARN: 请使用块级注释书写TODO" }]
        },
        {
          code: `/*
          * TODO
          * NAME: 哈哈
          */`,
          errors: [{ message: "TODO WARN: 请添加 DATE: xxx" }]
        },
        {
          code: `/*
          * TODO
          * NAME: 哈哈
          * DATE: 2022-七-81
          */`,
          errors: [{ message:"TODO WANR: 请检查日期格式,正确格式为可被 dayjs 识别的日期，如 2022-1-1 https://dayjs.fenxianglu.cn" }]
        },
        {
          code: `/*
          * TODO
          * NAME: 哈哈
          * DATE: 2022-2-8
          */`,
          options: [true, { warnLine: 2 }],
          errors: [{ message:"TODO WARN: 已到截止日期，请清理TODO" }]
        },
        {
          code: `/*
          * TODO
          * NAME: 哈哈
          * DATE: ${dayjs().add(9, "day").format("YYYY-MM-DD")}
          */`,
          options: [true, { warnLine: 10 }],
          errors: [{ message:"TODO WARN: 距离最终期限不到10天，请清理TODO" }]
        },
        {
          code: `/*
          * TODO
          * NAME: 哈哈
          * DATE: ${dayjs().add(1, "day").format("YYYY-MM-DD")}
          */`,
          options: [true],
          errors: [{ message:"TODO WARN: 距离最终期限不到2天，请清理TODO" }]
        }
    ]
})
