// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: false,
    },
  },
  app: {
    head: {
      title: "Spatel", // default fallback title
      htmlAttrs: {
        lang: "en",
      },

      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/a11y",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "nuxt-nodemailer",
  ],

  nodemailer: {
    from: '"Spatel" <spatel@braininabowl.com>',
    host: 'mail.braininabowl.com',
    port: 587,
    secure: false,
    auth: {
      user: 'spatel@braininabowl.com',
      pass: 'EcVsa6eJzW9FPT45rnj5FPT45rnj5Vsa6eJzW9FPT',
    },
  },

  nitro: {
    storage: {
      recipeStore: {
        driver: "fs",
        base: "server/data/recipes",
        ignore: ".*"
      },
      userStore: {
        driver: "fs",
        base: "server/data/users",
        ignore: ".*"
      },
      userAllowStore: {
        driver: "fs",
        base: "server/data/user_Allow",
        ignore: ".*"
      },
      userDenyStore: {
        driver: "fs",
        base: "server/data/user_Deny",
        ignore: ".*"
      },
    },
  },
});