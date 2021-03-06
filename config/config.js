import slash from 'slash2';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import themePluginConfig from './themePluginConfig';

const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

/*
  local dev proxy
*/
const serveUrlMap = {
  local: 'http://localhost:3000',
  // dev: 'http://36.110.117.58:8000',
  dev: 'http://10.3.69.26:9000',
};

// const rewriteMap = {
//   local: {
//     '/api/sinoapi': '/sinoapi/',
//     '/api/report': '/report/',
//   },
//   dev: {
//     '/api/sinoapi': '/sinoapi/',
//     '/api/report': '/report/',
//   },
// };

const { SERVE_ENV = 'local' } = process.env;

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['super', 'admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/cargo/cargolist',
            },
            {
              name: 'category.cargo',
              icon: 'table',
              path: '/cargo',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'list.cargo-list',
                  icon: 'UnorderedListOutlined',
                  path: '/cargo/cargolist',
                  component: './CargoList',
                },
                {
                  name: 'list.out-cargo-list',
                  icon: 'UnorderedListOutlined',
                  path: '/cargo/outcargolist',
                  component: './OutCargoList',
                },
                {
                  name: 'list.cargo-list-ivt',
                  icon: 'UnorderedListOutlined',
                  path: '/cargo/cargolistivt',
                  component: './CargoListIvt',
                },
              ],
            },
            {
              name: 'category.order',
              icon: 'table',
              path: '/order',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'list.order-goods',
                  icon: 'UnorderedListOutlined',
                  path: '/order/ordergoods',
                  component: './OrderGoods',
                },
                {
                  name: 'list.op-list',
                  icon: 'UnorderedListOutlined',
                  path: '/order/oplist',
                  component: './OpList',
                },
                {
                  name: 'list.op-list-by-time',
                  icon: 'UnorderedListOutlined',
                  path: '/order/oplistbytime',
                  component: './OpListByTime',
                },
              ],
            },
            {
              name: 'category.workloads',
              icon: 'HistoryOutlined',
              path: '/workloads',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'list.day-workloads',
                  icon: 'UnorderedListOutlined',
                  path: '/workloads/dayworkloads',
                  component: './KcWorkloads',
                },
                {
                  name: 'list.month-workloads',
                  icon: 'UnorderedListOutlined',
                  path: '/workloads/monthworkloads',
                  component: './KcMonthWorkloads',
                },
                {
                  name: 'list.year-workloads',
                  icon: 'UnorderedListOutlined',
                  path: '/workloads/yearworkloads',
                  component: './KcYearWorkloads',
                },
              ],
            },
            {
              name: 'cargoinfo',
              icon: 'table',
              path: '/cargoinfo',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'cargobroken-by-inorder',
                  icon: 'UnorderedListOutlined',
                  path: '/cargoinfo/cargobrokenbyinorder',
                  component: './Cargoinfo/CargobrokenByInorder',
                },
                {
                  name: 'shelf-utilization',
                  icon: 'BarChartOutlined',
                  path: '/cargoinfo/shelfutilization',
                  component: './Cargoinfo/ShelfUtilization',
                },
              ],
            },
            {
              name: 'category.report',
              icon: 'table',
              path: '/report',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'list.workloads-staff',
                  icon: 'UnorderedListOutlined',
                  path: '/report/workloadsstaff',
                  component: './Report/WorkloadsStaff',
                },
                {
                  name: 'list.workloads-dev',
                  icon: 'UnorderedListOutlined',
                  path: '/report/workloadsdev',
                  component: './Report/WorkloadsDev',
                },
                {
                  name: 'list.cargo-broken',
                  icon: 'UnorderedListOutlined',
                  path: '/report/cargobroken',
                  component: './Report/Cargobroken',
                },
                {
                  name: 'list.cargo-status',
                  icon: 'UnorderedListOutlined',
                  path: '/report/cargostatus',
                  component: './Report/Cargostatus',
                },
              ],
            },
            {
              name: 'config',
              icon: 'UserOutlined',
              path: '/config',
              authority: ['super', 'admin'],
              routes: [
                {
                  name: 'email',
                  icon: 'MailOutlined',
                  path: '/config/email',
                  routes: [
                    {
                      name: 'sending',
                      icon: 'SendOutlined',
                      path: '/config/email/sending',
                      component: './Configuration/Email/Sending',
                    },
                    {
                      name: 'receiving',
                      icon: 'UsergroupAddOutlined',
                      path: '/config/email/recipients',
                      component: './Configuration/Email/Recipients',
                    },
                  ],
                },
                {
                  name: 'sino-user',
                  icon: 'UserOutlined',
                  path: '/config/sinouser',
                  component: './Configuration/SinoUser',
                },
                {
                  name: 'account',
                  icon: 'UsergroupAddOutlined',
                  path: '/config/account',
                  component: './Configuration/Account',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu: true,
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  proxy: {
    // '/api/auth/authenticate': {
    //   target: serveUrlMap[SERVE_ENV],
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/': '' },
    // },
    // '/api/currentUser': {
    //   target: serveUrlMap[SERVE_ENV],
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/': '' },
    // },
    // '/api/sinoapi': {
    //   target: serveUrlMap[SERVE_ENV],
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/sinoapi/': '' },
    // },
    // '/api/report': {
    //   target: serveUrlMap[SERVE_ENV],
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/report/': '' },
    // },
    '/api/': {
      target: serveUrlMap[SERVE_ENV],
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
};
