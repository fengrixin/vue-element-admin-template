# vue-template-admin

此项目是基于 vue-admin-template 的二次开发

1. 修改了权限路由的使用

2. 封装了 axios 请求

3. 添加 common.css

4. 加入 Tinymce

```
axios 封装后使用方法：

this.$get({
        url: '',
        data: {}
    }).then(res=>{
      console.log(res)
    }).catch(err=> {
      console.log(res)
    })
    
this.$post({
        url: '',
        data: {}
    }).then(res=>{
      console.log(res)
    }).catch(err=> {
      console.log(res)
    })
    
put, del 类似以上
```