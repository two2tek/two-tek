import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useLanguage from "../../public/LanguageContext";
import { getTranslatedContent } from "./TranslateRoToRu";

const Review = () => {
  const { language, setLanguage } = useLanguage();
  const content = getTranslatedContent(language);
  const myRef = useRef<HTMLDivElement | null>(null);
  const h1Ref = useRef<HTMLDivElement | null>(null);
  const h2Ref = useRef<HTMLDivElement | null>(null); // Update this line
  const h3Ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    mainImage: "/images/misha.png",
  });

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");

    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      console.log(`language is ${selectedLanguage}`);
      const content = getTranslatedContent(selectedLanguage);
      setReviewData({
        title: content.ReviewApiSudexTitle,
        description: content.ReviewApiSudexText,
        mainImage: "/images/misha.png",
      });
    }
  }, [setLanguage]);

  useEffect(() => {
    if (myRef.current && !hasAnimated) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.unobserve(myRef.current!); // Use the non-null assertion operator here
        }
      });
      observer.observe(myRef.current!); // Use the non-null assertion operator here
    }

    if (h1Ref.current && !hasAnimated) {
      const h1Observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible2(true);
          setHasAnimated(true);
          h1Observer.unobserve(h1Ref.current!); // Use the non-null assertion operator here
        }
      });
      h1Observer.observe(h1Ref.current!); // Use the non-null assertion operator here
    }
    if (h2Ref.current && !hasAnimated) {
      const h2Observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible3(true);
          setHasAnimated(true);
          h2Observer.unobserve(h2Ref.current!); // Use the non-null assertion operator here
        }
      });
      h2Observer.observe(h2Ref.current!); // Use the non-null assertion operator here
    }
    if (h3Ref.current && !hasAnimated) {
      const h3Observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible4(true);
          setHasAnimated(true);
          h3Observer.unobserve(h3Ref.current!); // Use the non-null assertion operator here
        }
      });
      h3Observer.observe(h3Ref.current!); // Use the non-null assertion operator here
    }
  }, [hasAnimated]);

  const handleImageClick = (
    newData: React.SetStateAction<{
      title: string;
      description: string;
      mainImage: string;
    }>
  ) => {
    setReviewData(newData);
  };

  return (
    <>
      <div className="flex justify-around items-center bg-black border-white border-y-[.1px] text-black p-7 sm:p-20">
        <div>
          <div className=" bg-white p-10 rounded-bl-[20%] rounded-tr-[20%] rounded-md shadow-md shadow-white mb-10">
            <h1
              ref={myRef}
              className={`text-start font-semibold text-xl sm:text-4xl mb-5
${isVisible ? "fade-in-top " : ""}`}
            >
              {reviewData.title}
            </h1>
            <p
              ref={h1Ref}
              className={`text-start sm:text-xl sm:max-w-[700px]
${isVisible2 ? "fade-in-left" : ""}`}
            >
              {reviewData.description}
            </p>
          </div>
          <div
            ref={h2Ref}
            className={`flex justify-between
${isVisible3 ? "scale-in-center" : ""}`}
          >
            <div
              onClick={() =>
                handleImageClick({
                  title: `${content.ReviewApiSudexTitle}`,
                  description: `${content.ReviewApiSudexText}`,
                  mainImage: "/images/misha.png",
                })
              }
              className="rounded-[50px]  shadow-md shadow-white hover:scale-[0.9] transition duration-500 ease-in-out cursor-pointer"
            >
              <Image
                src="/images/misha.png"
                alt=""
                width={307}
                height={298}
                className="rounded-[50%] w-[24vw] sm:w-[9vw]"
              />
            </div>
            <div
              onClick={() =>
                handleImageClick({
                  title: `${content.ReviewADTitle}`,
                  description: `${content.ReviewADText}`,
                  mainImage: "/images/viorel.png",
                })
              }
              className="rounded-[50px]  shadow-md shadow-white hover:scale-[0.9] transition duration-500 ease-in-out cursor-pointer"
            >
              <Image
                src="/images/viorel.png"
                alt=""
                width={307}
                height={298}
                className="rounded-[50%] w-[24vw] sm:w-[9vw]"
              />
            </div>
            <div
              onClick={() =>
                handleImageClick({
                  title: `${content.ReviewSandutaArtTitle}`,
                  description: `${content.ReviewSAText}`,
                  mainImage: "/images/vasea.png",
                })
              }
              className="rounded-[50px]  shadow-md shadow-white hover:scale-[0.9] transition duration-500 ease-in-out cursor-pointer"
            >
              <Image
                src="/images/vasea.png"
                alt=""
                width={307}
                height={298}
                className="rounded-[50%] w-[24vw] sm:w-[9vw]"
              />
            </div>
          </div>
        </div>
        <div
          ref={h3Ref}
          className={` hidden sm:block ${isVisible4 ? "tilt-in-fwd-br" : ""}`}
        >
          <Image src={reviewData.mainImage} alt="" width={307} height={298} />
        </div>
      </div>
    </>
  );
};

export default Review;
