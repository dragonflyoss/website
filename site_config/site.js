// 全局的一些配置
export default {
  rootPath: '/product', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  // domain: 'dubbo.apache.org', // 站点部署域名，无需协议和path等
  // defaultSearch: 'google', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'en-us',
  'en-us': {
    pageMenu: [
      {
        key: 'home', // 用作顶部菜单的选中
        text: 'HOME',
        link: '/en-us/index.html',
      },
      {
        key: 'docs',
        text: 'DOCS',
        link: '/en-us/docs/demo1.html',
      },
      {
        key: 'developers',
        text: 'DEVELOPERS',
        link: '/en-us/docs/developers/developer1.html',
      },
      {
        key: 'blog',
        text: 'BLOG',
        link: '/en-us/blog/index.html',
      },
      {
        key: 'community',
        text: 'COMMUNITY',
        link: '/en-us/community/index.html',
      },
      {
        key: 'download',
        text: 'DOWNLOAD',
        link: '/en-us/blog/download.html',
      },
    ],
    vision: {
      title: 'Vision',
      content: 'Dragonfly 致力于解决大规模文件分发的效率问题，打造容器镜像分发的第一解决方案和标准规范；为用户提供高可用、高效率以及简单易用的文件及镜像分发服务。',
    },
    documentation: {
      title: 'Documentation',
      list: [
        {
          text: 'Overview',
          link: '/en-us/docs/demo1.html',
        },
        {
          text: 'Quick start',
          link: '/en-us/docs/demo2.html',
        },
        {
          text: 'Developer guide',
          link: '/en-us/docs/dir/demo3.html',
        },
      ],
    },
    resources: {
      title: 'Resources',
      list: [
        {
          text: 'Blog',
          link: '/en-us/blog/index.html',
        },
        {
          text: 'Community',
          link: '/en-us/community/index.html',
        },
      ],
    },
    copyright: 'Copyright © 2018 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'home',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: 'docs',
        text: '文档',
        link: '/zh-cn/docs/demo1.html',
      },
      {
        key: 'developers',
        text: '开发者',
        link: '/zh-cn/docs/developers/developer1.html',
      },
      {
        key: 'blog',
        text: '博客',
        link: '/zh-cn/blog/index.html',
      },
      {
        key: 'community',
        text: '社区',
        link: '/zh-cn/community/index.html',
      },
      {
        key: 'download',
        text: '下载',
        link: '/zh-cn/blog/download.html',
      },
    ],
    vision: {
      title: '愿景',
      content: 'Dragonfly 致力于解决大规模文件分发的效率问题，打造容器镜像分发的第一解决方案和标准规范；为用户提供高可用、高效率以及简单易用的文件及镜像分发服务。',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: '概览',
          link: '/zh-cn/docs/demo1.html',
        },
        {
          text: '快速开始',
          link: '/zh-cn/docs/demo2.html',
        },
        {
          text: '开发者指南',
          link: '/zh-cn/docs/dir/demo3.html',
        },
      ],
    },
    resources: {
      title: '资源',
      list: [
        {
          text: '博客',
          link: '/zh-cn/blog/index.html',
        },
        {
          text: '社区',
          link: '/zh-cn/community/index.html',
        },
      ],
    },
    copyright: 'Copyright © 2018 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};
