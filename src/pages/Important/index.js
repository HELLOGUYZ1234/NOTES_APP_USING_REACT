import React, { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export const Important = () => {
  const { notes, archive, notesDispatch } = useNotes();

  // combine notes + archive to show all important items
  const importantNotes = [
    ...(notes?.filter((n) => n.isImportant) || []),
    ...(archive?.filter((n) => n.isImportant) || [])
  ];

  // function to toggle important status
  const toggleImportant = (id) => {
    notesDispatch({ type: "TOGGLE_IMPORTANT", payload: { id } });
  };

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-4">
        <Sidebar />
        <div className="flex flex-col w-full p-6">
          <h2 className="text-2xl font-semibold mb-4">Important</h2>

          {importantNotes?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {importantNotes.map((n) => (
                <NotesCard
                  key={n.id}
                  {...n}
                  onImportantToggle={() => toggleImportant(n.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              No important notes yet. Add a note with <code>!important</code>.
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};
