import { LuSearch } from "react-icons/lu";
import { ContactList } from "./ContactList";
import { AddContactBtn } from "./AddContactBtn";
import { Modal } from "./Modal";
import { useContactContext } from "../context/ContactContext";

export const ContactContainer = () => {
  const { search, handleSearch } = useContactContext();

  

  return (
    <div className="align relative flex min-h-[700px] w-full max-w-[450px] flex-col gap-4 place-self-center rounded-2xl bg-[#1E1E1E] px-4 py-4 select-auto">
      {/* Header */}
      <div className="bg-darkBlue flex h-14 flex-row content-center items-center justify-center gap-3 rounded-xl text-center">
        <img src="/images/firebase.svg" alt="" className="w-6" />
        <h1 className="text-2xl font-semibold text-[#FFFFFF] [word-spacing:10px]">
          Firebase Contact App
        </h1>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Search Bar */}
        {!search && (
          <LuSearch className="text-darkBlue absolute top-3 left-3 text-xl" />
        )}
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search contacts..."
          type="text"
          className="placeholder:text-darkBlue w-full rounded-xl border-2 border-[#9E9E9E] px-2 py-2 text-gray-300 outline-0 placeholder:pl-8"
        />

        {/* Contact List */}
        <ContactList />
      </div>

      {/* Add Contact Button */}
      <AddContactBtn />
      <Modal />
    </div>
  );
};
