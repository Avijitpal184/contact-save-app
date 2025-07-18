/* eslint-disable react-refresh/only-export-components */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";

export const ContactContext = createContext();

export const ContactProvider = (props) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // console.log(selectedContact);

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //# this is a function to get all the contacts
  const fetchContacts = async () => {
    try {
      const contactCollection = collection(db, "contacts");
      const snapshot = await getDocs(contactCollection);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log(error);
    }
  };

  // # this is the function to add contact
  const addContactFireStore = async (newContact) => {
    const contactCollection = collection(db, "contacts");
    const contactRef = await addDoc(contactCollection, newContact);
    return { id: contactRef.id, ...newContact };
  };

  // # this is the function to Delete contact
  const deleteContactFiretore = async (contactId) => {
    const contactDoc = doc(db, "contacts", contactId);
    await deleteDoc(contactDoc);
  };

  // ! useQuery for fetch contacts
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    refetchInterval: 3600000,
  });

  // ! Add Contact Using UseMutation
  const addContactMutation = useMutation({
    mutationFn: addContactFireStore,
    onSuccess: (newContact) => {
      // console.log("User added successfully", newContact);

      queryClient.setQueryData(["contacts"], (oldContact) => [
        ...(oldContact || []),
        newContact,
      ]);
    },
  });

  // ! Detele contact using useMutation
  const deleteContactMutation = useMutation({
    mutationFn: deleteContactFiretore,
    onSuccess: (_, contactId) => {
      queryClient.setQueriesData(["contacts"], (curContact) =>
        curContact?.filter((contact) => contact.id !== contactId),
      );
    },
  });

  // # this is the function to update contact
  const updateContactFireStore = async (updatedContact) => {
    const contactDoc = doc(db, "contacts", updatedContact.id);
    await updateDoc(contactDoc, {
      name: updatedContact.name,
      email: updatedContact.email,
    });
    return updatedContact;
  };

  // ! Update contact using useMutation
  const updateContactMutation = useMutation({
    mutationFn: updateContactFireStore,
    onSuccess: (updatedContact) => {
      queryClient.setQueryData(["contacts"], (curContacts) =>
        curContacts?.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact,
        ),
      );
    },
  });

  // # Search functionality
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchContact = (contact) => {
    if (search) {
      return contact?.name.toLowerCase().includes(search.toLowerCase());
    }
    return contact;
  };
  const searchData = data?.filter((contact) => searchContact(contact));

  return (
    <ContactContext.Provider
      value={{
        searchData,
        isOpen,
        search,
        handleSearch,
        setIsOpen,
        openModal,
        closeModal,
        setSelectedContact,
        selectedContact,
        addContact: addContactMutation.mutate,
        deleteContact: deleteContactMutation.mutate,
        updateContact: updateContactMutation.mutate,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("Components must be wrapped in ContactProvider");
  }
  return context;
};
