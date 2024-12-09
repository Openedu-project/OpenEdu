declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace OE {
    function helperFunction(): void;
    const CONFIG: {
      API_URL: string;
      VERSION: string;
    };
    const serverAccessToken: string;
    const serverRefreshToken: string;
    const referrer: string;
  }

  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME: string;
      NEXT_PUBLIC_APP_COOKIE_DOMAIN: string;

      NEXT_PUBLIC_API_ORIGIN: string;
      NEXT_PUBLIC_API_UPLOAD_ORIGIN: string;
      NEXT_PUBLIC_WS_ORIGIN: string;

      NEXT_PUBLIC_APP_ORIGIN: string;
      NEXT_PUBLIC_APP_ADMIN_ORIGIN: string;
      NEXT_PUBLIC_APP_AFFILIATE_ORIGIN: string;
      NEXT_PUBLIC_APP_BLOG_ORIGIN: string;
      NEXT_PUBLIC_APP_CREATOR_ORIGIN: string;
      NEXT_PUBLIC_APP_LEARNER_ORIGIN: string;
      NEXT_PUBLIC_APP_LANDING_ORIGIN: string;

      NEXT_PUBLIC_MEDIA_CDN_HOST: string;
      NEXT_PUBLIC_MEDIA_S3_HOST: string;
      NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY: string;
      NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY: string;
      NEXT_PUBLIC_COOKIE_LOCALE_KEY: string;
      NEXT_PUBLIC_COOKIE_LOCALES_KEY: string;
      NEXT_PUBLIC_COOKIE_LOCALE_FILES_KEY: string;
      NEXT_PUBLIC_USER_URL_KEY: string;
      NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY: string;
      NEXT_PUBLIC_COOKIE_API_REFERRER_KEY: string;
    }
  }
}

export {};
