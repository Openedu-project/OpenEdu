/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'platform',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      // protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async run() {
    new sst.aws.Nextjs('oe', {
      domain: {
        name: 'openedutest.net',
        redirects: ['www.openedutest.net'],
        dns: sst.aws.dns({
          zone: 'Z03666423OXCSCHYUQUDV',
        }),
      },
      regions: ['ap-southeast-1'],
      // imageOptimization: {
      //   memory: '2048 MB', // Tăng bộ nhớ để xử lý hình ảnh tốt hơn
      // },
      // warm: 2,
      // server: {
      //   architecture: 'arm64',
      //   memory: '2048 MB',
      //   timeout: '30 seconds',
      //   install: ['sharp'],
      // },
      // assets: {
      //   versionedFilesCacheHeader: 'public,max-age=31536000,immutable',
      //   nonVersionedFilesCacheHeader: 'public,max-age=0,s-maxage=86400,stale-while-revalidate=8640',
      //   fileOptions: [
      //     {
      //       files: ['**/*.css', '**/*.js'],
      //       cacheControl: 'public,max-age=31536000,immutable',
      //     },
      //     {
      //       files: ['**/*.jpg', '**/*.png', '**/*.webp'],
      //       cacheControl: 'public,max-age=31536000,immutable',
      //     },
      //   ],
      // },
      // invalidation: {
      //   paths: ['/*'],
      //   wait: true,
      // },
    });
  },
});
