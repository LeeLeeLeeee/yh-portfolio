'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { LottieLoader } from '@/lottie-loader';
import bgImage from '@/public/bg.jpg';

import styles from './page.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const ref = useRef<HTMLDivElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !ScrollTrigger) return;
        let isHorizontal = false;
        const lenis = new Lenis({
            wrapper: ref.current,
            content: ref.current.firstElementChild as HTMLElement,
            autoRaf: true,
            smoothWheel: true,
            lerp: 0.1,
        });

        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });

        ScrollTrigger.scrollerProxy(ref.current, {
            scrollTop(value) {
                return arguments.length ? lenis.scrollTo(value as number, { immediate: true }) : lenis.scroll;
            },
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            }),
        });

        // const snap = new Snap(lenis, {
        //     type: 'mandatory',

        //     onSnapStart: (e) => {
        //         console.log(e, 'start');
        //     },
        //     onSnapComplete: (e) => {
        //         console.log(e, 'complete');
        //     },
        // });

        // snap.addElements(Array.from(document.querySelectorAll(`.${styles.snap}`)) as HTMLElement[], {
        //     align: 'center',
        // });

        if (horizontalWrapperRef.current) {
            const horizontalSection = horizontalWrapperRef.current;
            const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
            const totalScrollWidth = horizontalSection!.clientWidth * (cards.length - 1); // 가로 총 길이

            const onWheel = (e: WheelEvent) => {
                e.preventDefault();
                if (!isHorizontal) return;
                console.log(horizontalSection.scrollLeft, totalScrollWidth);
                if (
                    horizontalSection.scrollLeft + e.deltaY > totalScrollWidth ||
                    horizontalSection.scrollLeft + e.deltaY < 0
                ) {
                    lenis.start();
                    isHorizontal = false;
                    return;
                }
                horizontalSection.scrollLeft += e.deltaY; // 휠 세로 → 가로
            };
            ref.current!.addEventListener('wheel', onWheel, { passive: false });
            gsap.to(cards, {
                xPercent: -100 * cards.length,
                ease: 'none',
                scrollTrigger: {
                    trigger: horizontalSection,
                    scroller: ref.current,
                    start: '+=2',

                    scrub: 1,

                    markers: true,
                    onEnter: () => {
                        console.log('enter 1');
                        isHorizontal = true;
                        lenis.stop();
                    },
                    onLeaveBack: () => {
                        console.log('leave back 1');
                        isHorizontal = true;
                        lenis.stop();
                    },
                },
            });

            // ScrollTrigger.create({
            //     trigger: horizontalSection,
            //     scroller: ref.current,
            //     start: '-=10',
            //     end: '-=10',
            //     scrub: 1,
            //     markers: true,
            //     pin: true,
            //     pinSpacing: false,
            //     onUpdate: (e) => {
            //         console.log('update --->', e.progress);
            //     },
            //     onEnter: () => {
            //         console.log('enter 2');
            //         isHorizontal = true;
            //         ref.current!.addEventListener('wheel', onWheel, { passive: false });
            //         lenis.stop();
            //     },
            //     onLeave: () => {
            //         console.log('leave 2');
            //         isHorizontal = false;
            //         ref.current!.removeEventListener('wheel', onWheel);
            //         // lenis.start();
            //     },
            //     onEnterBack: () => {
            //         console.log('enter back 2');
            //         isHorizontal = true;
            //         ref.current!.addEventListener('wheel', onWheel, { passive: false });
            //         lenis.stop();
            //     },
            //     onLeaveBack: () => {
            //         console.log('leave back 2');
            //         isHorizontal = false;
            //         ref.current!.removeEventListener('wheel', onWheel);
            //         // lenis.start();
            //     },
            // });
        }

        return () => {
            lenis.destroy();

            ScrollTrigger.getAll().forEach((trigger) => {
                trigger.kill();
            });
            // ref.current?.removeEventListener('wheel');
            // snap.destroy();
        };
    }, []);
    return (
        <div className={styles.page}>
            <div className={styles.runLottie}></div>
            <span className={styles.container}>
                <Image className="bg-image" src={bgImage} alt="bg" />
                <div ref={ref} className={styles.content}>
                    코드 품질과 아키텍처로 팀의
                    <br />
                    생산성과 성장을 이끄는 시니어 개발자입니다.
                    <div className={styles.lottie}>
                        <LottieLoader src="/scroll.lottie" />
                    </div>
                    {/* <div className={styles.scroll}></div> */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            ref={index === 2 ? horizontalWrapperRef : null}
                            key={index}
                            data-snap={index}
                            className={`${styles.snap} ${index === 2 ? styles.horizontalSection : ''}`}
                        >
                            {index}
                            {index === 2 && (
                                <div className={styles.horizontalWrapper}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={styles.card}>
                                            Card {i + 1}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </span>
        </div>
    );
}
