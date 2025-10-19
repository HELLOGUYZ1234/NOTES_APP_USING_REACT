import React, { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";  
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";


export const Bin = () => {
  const { bin } = useNotes();

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-4">
        <Sidebar />
        <div className="flex flex-col w-full p-6">
          <h2 className="text-2xl font-semibold mb-4">Bin</h2>

          {bin?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {bin.map((n) => (
                <NotesCard key={n.id} {...n} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500">Bin is empty.</div>
          )}
        </div>
      </main>
    </Fragment>
  );
};
