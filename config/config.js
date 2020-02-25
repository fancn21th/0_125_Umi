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

// api server endpoint
const serveUrlMap = {
  local: 'http://localhost:3000',
  // dev: 'http://36.110.117.58:8000',
  dev: 'http://10.3.69.26:9000',
};

const rewriteMap = {
  local: {
    '/api/sinoapi': '/sinoapi/',
    '/api/report': '/report/',
  },
  dev: {
    '/api/sinoapi': '/sapi/sinoapi/',
    '/api/report': '/rapi/report/',
  },
};

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
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/cargo/cargolist',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            {
              name: 'category.cargo',
              icon: 'table',
              path: '/cargo',
              routes: [
                {
                  name: 'list.cargo-list',
                  icon: 'table',
                  path: '/cargo/cargolist',
                  component: './CargoList',
                },
                {
                  name: 'list.out-cargo-list',
                  icon: 'table',
                  path: '/cargo/outcargolist',
                  component: './OutCargoList',
                },
                {
                  name: 'list.cargo-list-ivt',
                  icon: 'table',
                  path: '/cargo/cargolistivt',
                  component: './CargoListIvt',
                },
              ],
            },
            {
              name: 'category.order',
              icon: 'table',
              path: '/order',
              routes: [
                {
                  name: 'list.order-goods',
                  icon: 'table',
                  path: '/order/ordergoods',
                  component: './OrderGoods',
                },
                {
                  name: 'list.op-list',
                  icon: 'table',
                  path: '/order/oplist',
                  component: './OpList',
                },
                {
                  name: 'list.op-list-by-time',
                  icon: 'table',
                  path: '/order/oplistbytime',
                  component: './OpListByTime',
                },
              ],
            },
            {
              name: 'category.workloads',
              icon: 'table',
              path: '/workloads',
              routes: [
                {
                  name: 'list.day-workloads',
                  icon: 'table',
                  path: '/workloads/dayworkloads',
                  component: './KcWorkloads',
                },
                {
                  name: 'list.month-workloads',
                  icon: 'table',
                  path: '/workloads/monthworkloads',
                  component: './KcMonthWorkloads',
                },
                {
                  name: 'list.year-workloads',
                  icon: 'table',
                  path: '/workloads/yearworkloads',
                  component: './KcYearWorkloads',
                },
              ],
            },
            {
              name: 'category.cargoinfo',
              icon: 'table',
              path: '/cargoinfo',
              routes: [
                {
                  name: 'list.cargobroken-by-inorder',
                  icon: 'table',
                  path: '/cargoinfo/cargobrokenbyinorder',
                  component: './CargobrokenByInorder',
                },
              ],
            },
            {
              name: 'config',
              icon: 'table',
              path: '/config',
              routes: [
                {
                  name: 'email',
                  icon: 'table',
                  path: '/config/email',
                  routes: [
                    {
                      name: 'sending',
                      icon: 'table',
                      path: '/config/email/sending',
                      component: './Configuration/Email/Sending',
                    },
                    {
                      name: 'receiving',
                      icon: 'table',
                      path: '/config/email/recipients',
                      component: './Configuration/Email/Recipients',
                    },
                  ],
                },
              ],
            },
            {
              name: 'category.report',
              icon: 'table',
              path: '/report',
              routes: [
                {
                  name: 'list.workloads-staff',
                  icon: 'table',
                  path: '/report/workloadsstaff',
                  component: './Report/WorkloadsStaff',
                },
                {
                  name: 'list.workloads-dev',
                  icon: 'table',
                  path: '/report/workloadsdev',
                  component: './Report/WorkloadsDev',
                },
                {
                  name: 'list.cargo-broken',
                  icon: 'table',
                  path: '/report/cargobroken',
                  component: './Report/Cargobroken',
                },
                {
                  name: 'list.cargo-status',
                  icon: 'table',
                  path: '/report/cargostatus',
                  component: './Report/Cargostatus',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
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
    '/api/login/account': {
      target: serveUrlMap['local'],
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    '/api/currentUser': {
      target: serveUrlMap['local'],
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    '/api/sinoapi': {
      target: serveUrlMap[SERVE_ENV],
      changeOrigin: true,
      pathRewrite: { '^/api/sinoapi/': rewriteMap[SERVE_ENV]['/api/sinoapi'] },
    },
    '/api/report': {
      target: serveUrlMap[SERVE_ENV],
      changeOrigin: true,
      pathRewrite: { '^/api/report/': rewriteMap[SERVE_ENV]['/api/report'] },
    },
  },
};
