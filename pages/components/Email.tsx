import { useState, useEffect, useRef } from "react";
import { a, useTrail } from "react-spring";
import Image from "next/image";
import Link from "next/link";
import "animate.css";
import { observe } from "react-intersection-observer";

const Email = () => {
  const myRef = useRef<HTMLDivElement | null>(null);
  const h1Ref = useRef<HTMLDivElement | null>(null);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // State pentru a urmări dacă animația a fost deja activată

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const [[{ width, opacity }, { scale }], api] = useTrail(2, () => ({
    width: 200,
    opacity: 1,
    scale: 0,
  }));

  const openEmailInput = () => {
    api.start({
      width: 320,
      opacity: 0,
      scale: 1,
      onRest: () => setOpen(true),
    });
  };

  const closeEmailInput = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (emailValue === "") {
      setEmailError("Completați adresa de email!");
      return;
    }

    setFormVisible(false);
    setSubmitted(true);

    api.start({
      width: 200,
      opacity: 1,
      scale: 0,
      onRest: () => {
        setOpen(false);
      },
    });
  };

  const resetForm = () => {
    setFormVisible(true);
    setSubmitted(false);
    setEmailValue("");
    setEmailError("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("emailFormState") === "submitted") {
        setFormVisible(false);
        setSubmitted(true);
      } else {
        resetForm();
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (formVisible) {
        localStorage.setItem("emailFormState", "visible");
      } else {
        localStorage.setItem("emailFormState", "submitted");
      }
    }
  }, [formVisible]);

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
  }, [hasAnimated]);

  return (
    <>
      <div
        ref={myRef}
        className={`${
          isVisible ? "animate__animated animate__fadeInBottomLeft" : ""
        }`}
      >
        <div className="flex justify-between items-center bg-[#008DFD] mx-56 rounded-md px-20 py-5 mb-10">
          <div
            ref={h1Ref}
            className={`
${isVisible2 ? "animate__animated animate__fadeInLeft " : ""}`}
          >
            <h1 className="text-white text-3xl font-semibold mb-3 ">
              Rămâi la curent cu tendințele <br /> în design web și oferte
              exclusive
            </h1>
            <div className="flex items-center">
              <div className="relative w-[80%]">
                <div className="relative flex justify-center h-12">
                  {formVisible ? (
                    <a.form
                      style={{
                        width,
                        opacity: opacity.to((o) => 1 - o),
                        pointerEvents: open ? "unset" : "none",
                      }}
                      onSubmit={closeEmailInput}
                      className="w-80 absolute flex py-1 pl-4 pr-1 border rounded-full"
                    >
                      <input
                        name="email"
                        type="email"
                        className="focus:outline-none flex-grow bg-transparent "
                        placeholder="Email Address"
                        value={emailValue}
                        onChange={(e) => {
                          setEmailValue(e.target.value);
                          setEmailError("");
                        }}
                      />
                      <a.button
                        type="submit"
                        style={{ scale }}
                        className="px-4 py-1 text-gray-500 bg-white rounded-full"
                      >
                        Trimite
                      </a.button>
                    </a.form>
                  ) : (
                    <>
                      <a.button
                        onClick={resetForm}
                        className="text-white cursor-pointer mt-12 text-sm"
                      >
                        Completează din nou
                      </a.button>
                    </>
                  )}
                  <a.button
                    onClick={openEmailInput}
                    style={{
                      width,
                      opacity,
                      pointerEvents: open ? "none" : "unset",
                    }}
                    className="absolute px-4 py-2 border rounded-full font-semibold"
                  >
                    <a.span style={{ opacity }}>
                      {formVisible ? "Anunță-ne" : "Mulțumesc!"}
                    </a.span>
                  </a.button>
                </div>
                <div className="text-center font-semibold text-red-600">
                  {emailError}
                </div>{" "}
                {/* Centrare text eroare */}
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/images/send.png"
              alt=""
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;