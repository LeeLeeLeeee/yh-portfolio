import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { PageMapItem } from 'nextra';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout, Navbar } from 'nextra-theme-docs';

import 'nextra-theme-docs/style.css';

const notoSansKR = Noto_Sans_KR({
    variable: '--font-noto-sans-kr',
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: '이영현 포트폴리오',
    description: '이영현 포트폴리오',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const navbar = (
        <Navbar
            logo={
                <div>
                    <b>YH Portfolio</b>
                </div>
            }
        />
    );

    const [pageMap] = await getPageMap();

    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <Head faviconGlyph="✦" />
            <body className={`${notoSansKR.variable}`}>
                <Layout
                    navigation={{
                        prev: false,
                        next: false,
                    }}
                    navbar={navbar}
                    editLink={null}
                    footer={null}
                    sidebar={{ defaultMenuCollapseLevel: 1 }}
                    pageMap={[
                        {
                            ...pageMap,
                            title: 'Hello World 🚀',
                        } as unknown as PageMapItem,
                    ]}
                    search={false}
                    toc={{
                        title: 'Table of Contents',
                        extraContent: null,
                    }}
                >
                    {children}
                </Layout>
            </body>
        </html>
    );
}
