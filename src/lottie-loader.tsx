'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const LottieLoader = ({
    src,
    autoplay = true,
    loop = true,
}: {
    src: string;
    autoplay?: boolean;
    loop?: boolean;
}) => {
    return <DotLottieReact src={src} autoplay={autoplay} loop={loop} />;
};
