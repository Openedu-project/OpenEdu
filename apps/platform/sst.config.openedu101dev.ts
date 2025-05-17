/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'openedu101dev',
      removal: input?.stage === 'openedu101dev' ? 'retain' : 'remove',
      // protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async run() {
    new sst.aws.Nextjs('openedu101dev', {
      // path: 'apps/platform',
      // router: {
      //   instance: oeTestnetRouter,
      //   domain: 'openedutest.net',
      // },
      domain: {
        name: 'openedu101dev.com',
        redirects: ['www.openedu101dev.com'],
        // dns: sst.aws.dns({
        //   zone: 'Z03666423OXCSCHYUQUDV',
        // }),
        dns: false,
        cert: process.env.DOMAIN_CERT || '',
      },
      regions: ['ap-southeast-1'],
      imageOptimization: {
        memory: '2048 MB', // Tăng bộ nhớ để xử lý hình ảnh tốt hơn
      },
      warm: 2,
      server: {
        architecture: 'arm64',
        memory: '1024 MB',
        timeout: '30 seconds',
        install: ['sharp'],
      },
      assets: {
        versionedFilesCacheHeader: 'public,max-age=31536000,immutable',
        nonVersionedFilesCacheHeader: 'public,max-age=0,s-maxage=86400,stale-while-revalidate=8640',
        fileOptions: [
          {
            files: ['**/*.css', '**/*.js'],
            cacheControl: 'public,max-age=31536000,immutable',
          },
          {
            files: ['**/*.jpg', '**/*.png', '**/*.webp'],
            cacheControl: 'public,max-age=31536000,immutable',
          },
        ],
      },
      invalidation: {
        paths: ['/*'],
        wait: true,
      },
      environment: {
        AUTH_SECRET: process.env.AUTH_SECRET || '',
      },
    });
  },
});
