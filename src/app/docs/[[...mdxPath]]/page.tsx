/* eslint-disable @typescript-eslint/no-explicit-any */
import { importPage } from 'nextra/pages';

import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const Wrapper = getMDXComponents(undefined).wrapper;

export default async function Page(props: any) {
    const { params } = await props;
    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);

    return (
        <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    );
}
