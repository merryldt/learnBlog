import { defineClientAppEnhance } from 'vuepress'

// 使用异步函数也是可以的
export default defineClientAppEnhance(({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  // 全局注入组件
  Vue.mixin({
    // 混合注入,加载全局文件
    mounted() {
      window.onload = function() {  const container = document.querySelector('.theme-reco-content.content__default');
        console.log('container',container)
        if (!container) return;
        container.setAttribute('id', 'container');
        btw = new BTWPlugin();
        btw.init({
          id: 'container',
          blogId: '31775-1688968394546-491',
          name: '游牧人坎布里奇',
          qrcode: 'http://picture.snowflakefloar.cn/blog/admin/jpg/2023/7/10/1688968378919.jpg',
          keyword: '验证码',
        });
      }
    },
  });
});
