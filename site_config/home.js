export default {
  'zh-cn': {
    brand: {
      brandName: 'Dragonfly',
      briefIntroduction: '一个开源的基于P2P镜像及文件分发系统',
      buttons: [
        {
          text: '快速入门',
          link: '/zh-cn/docs/quickstart.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/dragonflyoss/Dragonfly',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: '什么是 Dragonfly？',
      desc: '随着企业数字化大潮席卷全球，行业应用纷纷向微服务架构演进，并通过云化平台优化业务管理。由阿里巴巴开源的云原生镜像分发系统 Dragonfly，面向以 Kubernetes 为核心的分布式应用编排系统，前瞻性地解决了云原生镜像分发的下列三大难题：',
      list: [
        '效率：借助 P2P 与 CDN 技术，缩减镜像传输时间，提升分发效率，加速业务应用交付；',
        '流控：借助智能分析技术，动态平衡分发负载与业务运行态，实现流量动态控制，保障业务稳定运行；',
        '安全：支持私有镜像仓库 HTTPS 协议，加密内容传输，确保信息安全。',
      ],
      img: '/img/architecture.png',
    },
    features: {
      title: '特色功能',
      list: [
        {
          img: 'https://img.alicdn.com/tfs/TB1D4EMt4naK1RjSZFtXXbC2VXa-96-96.png',
          title: '基于 P2P 的文件分发',
          content: '利用 P2P 技术，支持文件的大规模分发，提高文件的下载速度和成功率，有效减小带宽，尤其是跨机房带宽。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1eGErtYvpK1RjSZPiXXbmwXXa-96-96.png',
          title: '无侵入支持各种容器技术',
          content: '不用修改容器服务的任何代码，只需简单配置就可使用。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1qYUjt8LoK1RjSZFuXXXn0XXa-96-96.png',
          title: '被动式 CDN',
          content: '利用 CDN 技术，避免重复下载同一个文件。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1Tvwkt9zqK1RjSZFLXXcn2XXa-96-96.png',
          title: '机器级别的限流',
          content: '同一台机器上的所有任务的速率总和受限。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1DMQCt4jaK1RjSZFAXXbdLFXa-96-96.png',
          title: '对文件源无压力',
          content: '通常，仅有超级节点会从源下载，对源基本无压力。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1gWErtYvpK1RjSZPiXXbmwXXa-96-96.png',
          title: '简单易用',
          content: '仅需简单配置，使用方式基本类似于 curl。',
        },
      ],
    },
    users: {
      title: '他们都在用',
      list: [
        '/img/adopters/alibaba-cloud.svg',
        '/img/adopters/alibaba-group.svg',
        '/img/adopters/amap.svg',
        '/img/adopters/ant-financial.svg',
        '/img/adopters/cainiao.svg',
        '/img/adopters/china-mobile.svg',
        '/img/adopters/didi.png',
        '/img/adopters/huya.png',
        '/img/adopters/iflytek.svg',
        '/img/adopters/jd0.jpeg',
        '/img/adopters/lazada.svg',
        '/img/adopters/meituan.png',
        '/img/adopters/qunar.png',
        '/img/adopters/yahoo.svg',
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'Dragonfly',
      briefIntroduction: 'An Open-source P2P-based Image and File Distribution System',
      buttons: [
        {
          text: 'Get Started',
          link: '/en-us/docs/quickstart.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/dragonflyoss/Dragonfly',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'What is Dragonfly?',
      desc: 'In the era of digital transformation, businesses are migrating to micro-service frameworks, and streamlining business management with cloud platforms. Dragonfly, an open-source project from Alibaba Group, with distributed orchestration systems based on Kubernetes in mind, proactively solves the following problems in cloud native image distribution:',
      list: [
        'Efficiency: with P2P and CDN technology, reduce image distribution time significantly and expedite delivery;',
        'Traffic control: with intelligent analysis technology, dynamically balance distribution workload and business running, implement dynamic traffic control, and guarantee business stability;',
        'Security: support HTTPs protocol in private image registry, encrypt distribution content, and safeguard data security.',
      ],
      img: '/img/architecture.png',
    },
    features: {
      title: 'Why Dragonfly?',
      list: [
        {
          img: 'https://img.alicdn.com/tfs/TB1D4EMt4naK1RjSZFtXXbC2VXa-96-96.png',
          title: 'A P2P-Based File Distribution System',
          content: 'By harnessing the power of P2P technology, it supports large-scale file distribution with improved downloading speed and success rate and lower consumption of bandwidth, especially cross-IDC bandwidth.',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1eGErtYvpK1RjSZPiXXbmwXXa-96-96.png',
          title: 'Non-Invasive Support for Various Container Technologies',
          content: 'Get it up and running with a few simple configurations, without touching the code of container services.',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1qYUjt8LoK1RjSZFuXXXn0XXa-96-96.png',
          title: 'Passive CDN',
          content: 'It avoids downloading the same files repeatedly by taking advantage of the CDN technology.',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1Tvwkt9zqK1RjSZFLXXcn2XXa-96-96.png',
          title: 'Host-Level Traffic Throttling',
          content: 'Cap the total traffic of all jobs on a host at a certain level.',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1DMQCt4jaK1RjSZFAXXbdLFXa-96-96.png',
          title: 'Little Pressure upon File Sources',
          content: 'Normally only supernodes download from the source, hence little pressure upon file sources.',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1gWErtYvpK1RjSZPiXXbmwXXa-96-96.png',
          title: 'User-Friendly',
          content: 'Get everything done with a few simple configurations. Use it in a way similar to Curl.',
        }
      ]
    },
    users: {
      title: 'Who Is Using Dragonfly?',
      list: [
        '/img/adopters/alibaba-cloud.svg',
        '/img/adopters/alibaba-group.svg',
        '/img/adopters/amap.svg',
        '/img/adopters/ant-financial.svg',
        '/img/adopters/cainiao.svg',
        '/img/adopters/china-mobile.svg',
        '/img/adopters/didi.png',
        '/img/adopters/huya.png',
        '/img/adopters/iflytek.svg',
        '/img/adopters/jd0.jpeg',
        '/img/adopters/lazada.svg',
        '/img/adopters/meituan.png',
        '/img/adopters/qunar.png',
        '/img/adopters/yahoo.svg',
      ],
    },
  },
};
