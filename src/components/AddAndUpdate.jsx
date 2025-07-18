import { useEffect, useState } from "react";
import { useContactContext } from "../context/ContactContext";

export const AddAndUpdate = () => {
  const {
    setIsOpen,
    addContact,
    updateContact,
    setSelectedContact,
    selectedContact,
  } = useContactContext();
  //   console.log(addContact);

  const [newContact, setNewContact] = useState(
    selectedContact || { name: "", email: "" },
  );

  useEffect(() => {
    if (selectedContact) {
      setNewContact(selectedContact);
    }
  },[selectedContact])

  //# this is a function to handle input value change 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  //# this is a function to handle form data submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.email) {
      alert("Please enter name and email");
    }
    console.log(newContact);

    if (selectedContact) {
      updateContact(newContact);
    } else {
      addContact(newContact);
    }
    setNewContact({ name: "", email: "" });
    setSelectedContact(null);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-between">
      <form onSubmit={handleSubmit}>
        <div className="mt-3 flex flex-col gap-2">
          <label htmlFor="name" className="text-lg text-white">
            Name
          </label>
          <input
            value={newContact.name}
            onChange={handleChange}
            required
            autoComplete="off"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="rounded-lg border-1 border-gray-300 px-3 py-2 text-gray-300 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <label htmlFor="email" className="text-lg text-white">
            E-mail
          </label>
          <input
            value={newContact.email}
            onChange={handleChange}
            required
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="rounded-lg border-1 border-gray-300 px-3 py-2 text-gray-300 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-darkBlue float-end mt-5 mb-2 cursor-pointer rounded-xl px-4 py-2 text-sm text-white"
        >
          {selectedContact ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};
