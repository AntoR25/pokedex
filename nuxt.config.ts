// https://nuxt.com/docs/api/configuration/nuxt-config

const defaultTheme = require("tailwindcss/defaultTheme");

export default defineNuxtConfig({
  build: {
    transpile: ["tslib"],
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss", "@nuxt/image"],
  apollo: {
    clients: {
      default: {
        httpEndpoint:
          "https://eu-west-2.cdn.hygraph.com/content/clpgpyruar0m401uk5otke57w/master",
      },
    },
  },
  css: ["assets/font.css"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Oswald", ...defaultTheme.fontFamily.sans],
            serif: ["Libre Baskerville", ...defaultTheme.fontFamily.serif],
          },
        },
      },
    },
  },
});