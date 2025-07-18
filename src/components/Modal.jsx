import { createPortal } from "react-dom";
import { useContactContext } from "../context/ContactContext";
import { IoIosClose } from "react-icons/io";
import { AddAndUpdate } from "./AddAndUpdate";
import { useEffect } from "react";

export const Modal = () => {
  const { isOpen, closeModal, setSelectedContact  } = useContactContext();

  //# close the modal when isOpen is false and also set the selectedContact to null
  useEffect(() => {
    if (!isOpen) {
      setSelectedContact(null);
    }
  }, [isOpen, setSelectedContact])

  return createPortal(
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 z-40 h-screen w-screen backdrop-blur-sm"
          />

          {/* Modal Box */}
          <div className="fixed top-1/2 left-1/2 z-50 min-h-[200px] w-[390px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#4d4d4d] px-3 py-2 shadow-lg">
            <span onClick={closeModal} className="cursor-pointer">
              <IoIosClose className="absolute right-2 text-4xl text-white" />
            </span>
            <AddAndUpdate />
          </div>
        </>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};
