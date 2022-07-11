# eslint-plugin-rong

检测代码中的todo项 是否描述清楚，时间是否在允许范围内

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-rong`:

```sh
npm install eslint-plugin-rong --save-dev
```

## Usage

Add `todo-supervise` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "todo-supervise"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "todo-supervise/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


