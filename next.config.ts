import type { NextConfig } from 'next';
import nextra from 'nextra';

const withNextra = nextra({
    search: false,
    contentDirBasePath: '/docs',
});

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        dirs: ['src'], // Only run ESLint on the "pages" and "components" directories during production builds (next build)
    },
    devIndicators: false,
    experimental: {
        turbo: {
            resolveAlias: {
                'next-mdx-import-source-file': './src/mdx-components.tsx',
            },
        },
    },
};

export default withNextra(nextConfig);
