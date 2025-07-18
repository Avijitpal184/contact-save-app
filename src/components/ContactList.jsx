import { AiOutlineEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdDeleteOutline, MdContacts } from "react-icons/md";
import { useContactContext } from "../context/ContactContext";

export const ContactList = () => {
  const { searchData, deleteContact, openModal, setSelectedContact } =
    useContactContext();

  // console.log(data);

  return (
    <div
      id="contact-list"
      className="custom-scrollbar max-h-[500px] flex-1 overflow-y-auto scroll-smooth pr-2"
    >
      {/* this is for no contact found using searchdata.length */}
      {searchData?.length === 0 ? (
        <div className="mt-6 overflow-hidden text-gray-300 flex flex-row justify-center items-center gap-4">
          <span className="text-4xl">
            <MdContacts />
          </span>
          <p className="font-semibold  text-3xl">No contact found</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {searchData?.map((contact) => {
              return (
                <li
                  key={contact.id}
                  className="bg-lightGray flex-row flex items-center rounded-xl px-2 py-3"
                >
                  <span className="text-darkBlue cursor-pointer text-4xl">
                    <CgProfile />
                  </span>
                  <span className="ml-6">
                    <h1 className="text-primary text-[18px] font-semibold capitalize">
                      {contact.name}
                    </h1>
                    <p className="text-secondary lowercase">{contact.email}</p>
                  </span>
                  <span className="ml-auto flex gap-4 text-3xl">
                    <AiOutlineEdit
                      onClick={() => {
                        setSelectedContact(contact);
                        openModal();
                      }}
                      className="cursor-pointer text-[#29B6F6] transition-colors duration-150 hover:text-[#0288D1]"
                    />
                    <MdDeleteOutline
                      onClick={() => deleteContact(contact.id)}
                      className="cursor-pointer text-[#F44336] transition-colors duration-150 hover:text-red-700"
                    />
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
