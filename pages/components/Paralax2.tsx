import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "animate.css";
import useLanguage from "../../public/LanguageContext";
import { getTranslatedContent } from "./TranslateRoToRu";

const Paralax2 = () => {
  const div1Ref = useRef<HTMLDivElement | null>(null);
  const div2Ref = useRef<HTMLDivElement | null>(null);
  const div3Ref = useRef<HTMLDivElement | null>(null);
  const h1Ref = useRef<HTMLDivElement | null>(null);
  const h2Ref = useRef<HTMLDivElement | null>(null);

  const { language, setLanguage } = useLanguage();
  const content = getTranslatedContent(language);

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.0001,
    };

    const observer1 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible1(true);
        observer1.unobserve(div1Ref.current!);
      }
    }, observerOptions);

    const observer2 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible2(true);
        observer2.unobserve(div2Ref.current!);
      }
    }, observerOptions);

    const observer3 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible3(true);
        observer3.unobserve(div3Ref.current!);
      }
    }, observerOptions);

    const observer4 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer4.unobserve(div3Ref.current!);
      }
    }, observerOptions);

    const observer5 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer5.unobserve(div3Ref.current!);
      }
    }, observerOptions);

    if (div1Ref.current) {
      observer1.observe(div1Ref.current);
    }

    if (div2Ref.current) {
      observer2.observe(div2Ref.current);
    }

    if (div3Ref.current) {
      observer3.observe(div3Ref.current);
    }

    if (h1Ref.current) {
      observer4.observe(h1Ref.current);
    }

    if (h2Ref.current) {
      observer5.observe(h2Ref.current);
    }
  }, []);

  return (
    <>
      <div className=" mt-72 sm:mt-64 sm:mx-64 p-4 md:p-8 lg:p-0">
        <h1
          ref={h1Ref}
          className={`text-center text-2xl sm:text-5xl font-semibold ${
            isVisible ? "slide-in-bck-top" : ""
          }`}
          style={{ color: "var(--carousel_h1)" }}
        >
          {content.HowTitle1}{" "}
          <span className="text-[#008DFD]">{content.HowTitle2}</span>{" "}
          {content.HowTitle3}
        </h1>
        <p
          ref={h2Ref}
          className={`text-center sm:text-2xl mb-10 sm:mb-20 sm:mt-7 px-2 mt-5 sm:leading-[35px] ${
            isVisible ? "slide-in-bck-bottom" : ""
          }`}
          style={{ color: "var(--carousel_p)" }}
        >
          {content.HowText}
        </p>
      </div>
      <div className="lg:flex lg:flex-wrap block justify-center">
        <div
          ref={div1Ref}
          className={`lg:w-[34%] w-full h-[full] mx-6 sm:mx-0 rounded-xl sm:p-4 ${
            isVisible1 ? "tilt-in-fwd-tl" : ""
          }`}
          style={{
            background:
              "linear-gradient(120deg, var(--carousel_gradient1), var(--carousel_gradient2))", // Keep the original colors or change them as needed
          }}
        >
          <div className="sm:text-3xl text-2xl text-start font-bold pt-6 pl-6 sm:leading-tight">
            {content.HowBoxTitle1}
          </div>
          <div className="flex items-center">
            <div
              className="sm:text-xl text-justify sm:mb-0 mb-2 p-6 sm:leading-normal"
              style={{ color: "var(--paralax_p)" }}
            >
              {content.HowBoxText}
            </div>
            <div className="lg:w-[100vw] w-[23%] rounded-[50%] circle-shape sm:w-[7.5%] float-rigth text-center">
              <Image src="/images/search.png" width={1024} height={1024} alt="" />
            </div>
          </div>
        </div>
        <div
          ref={div2Ref}
          className={`lg:w-[34%] h-[full] sm:mx-0 sm:ml-20 rounded-xl sm:p-4 ${
            isVisible2 ? "tilt-in-fwd-tr" : ""
          }`}
          style={{
            background:
              "linear-gradient(120deg, var(--carousel_gradient1), var(--carousel_gradient2))", // Keep the original colors or change them as needed
          }}
        >
          <div className="sm:text-3xl text-2xl text-start  font-bold pt-6 pl-6  sm:leading-tight">
            {content.HowBoxTitlev2}
          </div>
          <div className="flex">
            <div
              className="sm:text-xl text-justify sm:mb-0 mb-2 p-6 sm:leading-normal"
              style={{ color: "var(--paralax_p)" }}
            >
              {content.HowBoxTextv2}
            </div>
            <div className="lg:w-[100%] w-[25%] sm:w-[7.5%] right-0 mr-4 sm:mr-7">
              <Image src="/images/web.png" width={100} height={10} alt="" />
            </div>
          </div>
        </div>
        <div
          ref={div3Ref}
          className={`lg:w-[34%] h-[full] m-2 mt-10 rounded-xl p-4  ${
            isVisible3 ? "tilt-in-fwd-tl" : ""
          }`}
          style={{
            background:
              "linear-gradient(120deg, var(--carousel_gradient1), var(--carousel_gradient2))", // Keep the original colors or change them as needed
          }}
        >
          <div className="sm:text-3xl text-2xl text-center sm:text-start font-bold pt-6 pl-6 max-w-[390px] sm:leading-tight">
            {" "}
            {content.HowBoxTitlev3}
          </div>
          <div className="flex">
            <div
              className="sm:text-xl text-jstify sm:text-start sm:mb-0 mb-2 p-6 sm:leading-normal"
              style={{ color: "var(--paralax_p)" }}
            >
              {content.HowBoxTextv3}
            </div>
            <div className="lg:w-[100%] w-[15%] sm:w-[7.5%] right-0 mr-4">
              <Image src="/images/mobile.png" width={100} height={10} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paralax2;
