import React, { createContext, useContext, useReducer, useEffect } from "react";
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const getInitialState = () => {
  const savedData = localStorage.getItem("notesAppData");
  return savedData
    ? JSON.parse(savedData)
    : {
        title: "",
        text: "",
        notes: [],
        archive: [],
        bin: []
      };
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("notesAppData", JSON.stringify(state));
  }, [state]);

  return (
    <NotesContext.Provider value={{ ...state, notesDispatch: dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used inside NotesProvider");
  return ctx;
};
