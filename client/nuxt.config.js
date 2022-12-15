import colors from 'vuetify/es5/util/colors'
import { resolve } from 'path'

const isAppInDevelopment = /^dev(elopment)$/.test(process.env.NODE_ENV)

const nuxtConfig = {
  baseUrl: process.env.APP_HOST,
  dev: isAppInDevelopment,

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - client',
    title: 'store2go',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/notifier',
      mode: 'client',
    },
    {
      src: '~/plugins/format',
      mode: 'client',
    },
    {
      src: '~/plugins/auth',
      mode: 'client',
    },
    {
      src: '~/plugins/inventory',
      mode: 'client',
    },
    {
      src: '~/plugins/order',
      mode: 'client',
    },
    {
      src: '~/plugins/settings',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/App', '~/components/Modals'],
  },

  alias: {
    Component: resolve(__dirname, './components'),
    Assets: resolve(__dirname, './assets'),
    Data: resolve(__dirname, './data'),
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Poppins',
      },
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.deepPurple,
          accent: colors.grey.darken4,
          secondary: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.deepPurple,
          accent: colors.grey.lighten4,
          secondary: colors.grey.lighten3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['acebase-core', 'acebase-client', 'escpos', '@tauri-apps/api'],
    extend(config, {}) {
      config.node = {
        fs: 'empty',
      }
    },
  },
  server: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    timing: isAppInDevelopment,
  },
}

export default Object.freeze(nuxtConfig)
