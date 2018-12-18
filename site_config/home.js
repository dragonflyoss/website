export default {
  'zh-cn': {
    brand: {
      brandName: 'Dragonfly',
      briefIntroduction: '一个开源的基于P2P镜像及文件分发系统',
      buttons: [
        {
          text: '开始',
          link: '/zh-cn/docs/quickstart.html',
          type: 'primary',
        },
        {
          text: 'GITHUB',
          link: 'https://github.com/dragonflyoss/Dragonfly',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: '基于P2P的大规模文件分发系统',
      desc: 'Dragonfly 是一个由阿里巴巴开源的云原生镜像分发系统，主要解决以Kubernetes为核心的分布式应用编排系统的镜像分发难题。随着企业数字化大潮的席卷，行业应用纷纷朝微服务架构演进，并通过云化平台优化业务管理。Dragonfly 源于阿里巴巴，从实际落地场景出发，前瞻性地解决了云原生镜像分发的三大难题： 效率、流控与安全：',
      list: [
        '分发效率：借助 P2P 与 CDN 技术，缩减镜像传输时间，提升分发效率，加速业务应用交付；',
        '分发流控：借助智能分析技术，动态平衡分发负载与业务运行态，实现流量动态控制，保障业务稳定无干扰运行；',
        '分发安全：支持私有镜像仓库 HTTPS 协议，加密内容传输，确保信息安全。',
      ],
      img: '/img/architecture.png',
    },
    features: {
      title: '特色功能',
      list: [
        {
          img: 'https://img.alicdn.com/tfs/TB1D4EMt4naK1RjSZFtXXbC2VXa-96-96.png',
          title: '基于PSP的文件分发',
          content: '利用P2P技术，支持文件的大规模分发，提高文件的下载速度和成功率，有效减小带宽，尤其是跨机房带宽。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1eGErtYvpK1RjSZPiXXbmwXXa-96-96.png',
          title: '无侵入支持各种容器技术',
          content: '不用修改容器服务的任何代码，只需简单配置就可使用。',
        },
        {
          img: 'https://img.alicdn.com/tfs/TB1qYUjt8LoK1RjSZFuXXXn0XXa-96-96.png',
          title: '被动式CDN',
          content: '利用CDN技术，避免重复下载同一个文件。',
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
          content: '仅需简单配置，使用方式基本类似于curl。',
        },
      ],
    },
    users: {
      title: '他们都在用',
      list: [
        '/img/adopters/alibaba-cloud.png',
        '/img/adopters/alibaba-group.jpg',
        '/img/adopters/amap.png',
        '/img/adopters/ant-financial.png',
        '/img/adopters/cainiao.gif',
        '/img/adopters/china-mobile.png',
        '/img/adopters/didi.png',
        '/img/adopters/huya.png',
        '/img/adopters/iflytek.png',
        '/img/adopters/jd.jpeg',
        '/img/adopters/lazada.png',
        '/img/adopters/meituan.png',
        '/img/adopters/qunar.png',
        '/img/adopters/yahoo.png',
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'Dragonfly',
      briefIntroduction: 'An Open Source P2P-based Image and File Distribution System',
      buttons: [
        {
          text: 'GET STARTED',
          link: '/en-us/docs/quickstart.html',
          type: 'primary',
        },
        {
          text: 'GITHUB',
          link: 'https://github.com/dragonflyoss/Dragonfly',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'A P2P-based Large-scale File Distribution System',
      desc: 'Dragonfly is an open source project from Alibaba Group which aims to tackle image distribution problems in distributed orchestration systems based on Kubernetes. In the era of digital transformation, industry enterprises are all evolving to adopt micro-services, and try to take advantage of cloud platform to optimize business management. Dragonfly is sourced from Alibaba, trained in actual scenarios, and solves three aspects problems in cloud native image distribution proactively: efficiency, flow control and security:',
      list: [
        'distribution efficiency: with P2P and CDN technology, reduce image distribution time drastically, speed up business delivery;',
        'distribution flow control: with intelligent analysis technology, dynamically balance distribution workload and business running, realize load\'s dynamical control, guarantee business\'s stable running;',
        'distribution security: support HTTPs protocol in private image registry, encrypt distribution content, ensure security on data.',
      ],
      img: '/img/architecture.png',
    },
    features: {
      title: 'Feature List',
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
        '/img/adopters/alibaba-cloud.png',
        '/img/adopters/alibaba-group.jpg',
        '/img/adopters/amap.png',
        '/img/adopters/ant-financial.png',
        '/img/adopters/cainiao.gif',
        '/img/adopters/china-mobile.png',
        '/img/adopters/didi.png',
        '/img/adopters/huya.png',
        '/img/adopters/iflytek.png',
        '/img/adopters/jd.jpeg',
        '/img/adopters/lazada.png',
        '/img/adopters/meituan.png',
        '/img/adopters/qunar.png',
      ],
    },
  },
};
