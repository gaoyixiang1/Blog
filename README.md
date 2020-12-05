## 一、项目背景

此项目是`React`学习完的第一个项目，旨在锻炼使用`React`的使用，其中创建组件均使用`React Hooks`语法，后端使用`Egg.js`,`UI`使用`antd`，并配合`Mysql`数据库对数据进行存储管理
## 二、项目功能
分为用户端和管理端，分别对应`blog`和`admin`。
- 用户端实现了博客的分类展示、个人简介以及留言功能

- 管理端实现了对博客和留言的增删改查

    - 其中博客都以`markdown`的格式展示
## 三、项目规范

- 命名规范
   - 变量以驼峰式命名
   - 组件默认大写首字母

## 四、开发过程中遇到的问题
- 利用`axios`发送`post`请求一直未成功，在`stackoverflow上找到了答案`,应该将要发送的内容修改为`&`连接各个参数的格式
- 跨域问题
    - 使用egg.js的插件`egg-cors`来进行跨域
    - `npm i egg-cors --save`安装插件
    - 在`config/plugin.js`文件里面写入以下代码
    ```
    exports.cors= {
    enable: true,
    package: 'egg-cors'
    }
    ```

    - 在`config/config.default.js`文件再通过对`config.cors`来配置指定字段，例如请求方法等

