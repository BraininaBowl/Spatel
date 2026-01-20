// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: false,
    },
  },

  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/a11y",
    "@nuxt/eslint",
    "nuxt-auth-utils",
  ],

  nitro: {
    storage: {
      recipeStore: {
        driver: "fs",
        base: "server/data/recipes",
      },
      userStore: {
        driver: "fs",
        base: "server/data/users",
      },
      userWhitelistStore: {
        driver: "fs",
        base: "server/data/user_whitelist",
      },
      userBlacklistStore: {
        driver: "fs",
        base: "server/data/user_blacklist",
      },
    },
  },
});