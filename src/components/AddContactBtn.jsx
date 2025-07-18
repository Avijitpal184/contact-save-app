import { MdPersonAddAlt1 } from "react-icons/md";
import { useContactContext } from "../context/ContactContext";

export const AddContactBtn = () => {
  const { openModal } = useContactContext();

//   console.log(openModal);

  return (
    <div onClick={openModal} className="text-darkBlue bg-lightGray absolute right-6 bottom-8 cursor-pointer rounded-full p-2 text-3xl shadow-lg">
      <MdPersonAddAlt1 className="select-none" />
    </div>
  );
};
