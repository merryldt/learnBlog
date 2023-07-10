window.onload = function() {
    themeDefaultContent = $(
      '#app > .theme-container>.page > .theme-default-content'
    );
   
    themeDefaultContent.attr('id', 'container');
    btw = new BTWPlugin(); // 注意btw需要是个全局变量,把const去掉
    btw.init({
      id: 'container',
      blogId: '31775-1688968394546-491',
      name: '游牧人坎布里奇',
      qrcode: 'http://picture.snowflakefloar.cn/blog/admin/jpg/2023/7/10/1688968378919.jpg',
      keyword: '验证码',
    });
  };
  