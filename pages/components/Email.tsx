import { useState, useEffect } from "react";
import { a, useTrail } from "react-spring";
import Image from "next/image";
import Link from "next/link";

const Email = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Starea pentru mesajul "Mulțumesc!"
  const [formVisible, setFormVisible] = useState(true); // Starea pentru a controla afișarea formularului
  const [emailValue, setEmailValue] = useState(""); // Starea pentru valoarea introdusă în câmpul de email

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

  const closeEmailInput = (e: { preventDefault: () => void; }) => {
    setFormVisible(false); // Ascundem formularul după trimitere
    setSubmitted(true); // Setăm submitted la true pentru a afișa "Mulțumesc!"

    e.preventDefault();

    api.start({
      width: 200,
      opacity: 1,
      scale: 0,
      onRest: () => {
        setOpen(false);
      },
    });
  };

  // Funcția pentru resetarea stării pentru a permite completarea formularului din nou
  const resetForm = () => {
    setFormVisible(true);
    setSubmitted(false);
    setEmailValue("");
  };

  // Salvăm starea în local storage pentru a o restabili după un refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("emailFormState") === "submitted") {
        setFormVisible(false);
        setSubmitted(true);
      } else {
        resetForm(); // Apelăm funcția de resetare dacă starea este "visible"
      }
    }
  }, []);

  // Salvăm starea formularului în local storage atunci când se schimbă
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (formVisible) {
        localStorage.setItem("emailFormState", "visible");
      } else {
        localStorage.setItem("emailFormState", "submitted");
      }
    }
  }, [formVisible]);

  return (
    <>
      <div className="flex justify-between items-center bg-[#008DFD] mx-56 rounded-md px-20 py-5 mb-10">
        <div>
          <h1 className="text-white text-3xl font-semibold mb-3 ">
            Rămâi la curent cu tendințele <br /> în design web și oferte exclusive
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
                      onChange={(e) => setEmailValue(e.target.value)}
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
                      className="text-white cursor-pointer mt-12 text-sm  "
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
    </>
  );
};

export default Email;
