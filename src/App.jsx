import React, { useEffect, useRef } from 'react';


export default function App() {
  const mainRef = useRef(null);
  const s1Ref = useRef(null);
  const s2TrackRef = useRef(null);
  const s3Ref = useRef(null);

  useEffect(() => {

    const gsapObj = window.gsap || gsap;
    const ScrollTriggerObj = window.ScrollTrigger || ScrollTrigger;

    if (!gsapObj || !ScrollTriggerObj) return;

    gsapObj.registerPlugin(ScrollTriggerObj);

    const ctx = gsapObj.context(() => {
      const tl = gsapObj.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Section 1 Expands from box to full width/height
      tl.to(s1Ref.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: 1,
        ease: 'power2.inOut',
      });

      // Phase 2: Section 2 Horizontal Scroll (s4 -> s7)
      tl.to(s2TrackRef.current, {
        xPercent: -80, // Move across 4 sections (100% * 3/4 shift)
        duration: 3,
        ease: 'none',
      });

      // Phase 3: Section 3 Footer slides up from bottom
      tl.to(s3Ref.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power2.out',
      });
    }, mainRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={mainRef} className="relative w-full h-screen overflow-hidden font-sans">
      

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none ">
        <div
          ref={s1Ref}
          className="w-250 h-80  flex items-center justify-center overflow-hidden shadow-2xl transition-all bg-blue-950 z-11"
        >
          <div ref={s2TrackRef} className="flex w-[500vw] h-full absolute top-0 left-0">
            <section className= "w-screen h-full flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-bold text-white">Pass the limit</h2>
            </section>
            <section className="w-screen h-full bg-transparent flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-bold text-white">01. Discovery</h2>
            </section>
            <section className="w-screen h-full bg-transparent flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-bold text-white">02. Design</h2>
            </section>
            <section className="w-screen h-full bg-transparent flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-bold text-white">03. Build</h2>
            </section>
            <section className="w-screen h-full bg-transparent flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-bold text-white">04. Launch</h2>
            </section>
          </div>            

        </div>

        <section ref={s3Ref} className="absolute top-full left-0 w-full h-full bg-transparent z-20 flex flex-col justify-center items-center">
          <div className="w-250 h-100 bg-white flex flex-col justify-center items-center p-8 shadow-2xl">
            <h2 className="text-black text-2xl font-black mb-4">Get In Touch</h2>
          </div>
        </section>


      </div>
    </div>
  );
}