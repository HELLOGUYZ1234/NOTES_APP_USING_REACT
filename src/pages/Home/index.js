import React, { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar"; 
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";


export const Home = () => {
  const { title, text, notes, notesDispatch } = useNotes();

  const onTitleChange = (e) => {
    notesDispatch({ type: "TITLE", payload: e.target.value });
  };
  const onTextChange = (e) => {
    notesDispatch({ type: "TEXT", payload: e.target.value });
  };

  const onAddClick = () => {
    if (title.trim().length === 0 && text.trim().length === 0) return;
    notesDispatch({ type: "ADD_NOTE" });
  };

  const pinnedNotes = notes?.filter(({ isPinned }) => isPinned) || [];
  const otherNotes = notes?.filter(({ isPinned }) => !isPinned) || [];

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-4">
        <Sidebar />
        <div className="flex flex-col w-full p-6">
          <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-sm">
            <input
              value={title}
              onChange={onTitleChange}
              className="w-full border-b border-neutral-200 p-2 focus:outline-none"
              placeholder="Enter title (use !important to mark)"
            />
            <textarea
              value={text}
              onChange={onTextChange}
              className="w-full mt-2 p-2 h-28 border border-neutral-200 rounded-md focus:outline-none"
              placeholder="Enter text (type !important anywhere)"
            />
            <div className="flex justify-end mt-3 gap-2">
              <button
                onClick={() => notesDispatch({ type: "CLEAR_INPUT" })}
                className="px-3 py-1 rounded-md border"
              >
                Clear
              </button>
              <button
                disabled={title.trim().length === 0 && text.trim().length === 0}
                onClick={onAddClick}
                className="px-4 py-1 bg-indigo-800 text-white rounded-md disabled:opacity-50"
              >
                Add Note
              </button>
            </div>
          </div>

          <div className="mt-8">
            {pinnedNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Pinned</h3>
                <div className="flex flex-wrap gap-4">
                  {pinnedNotes.map((n) => (
                    <NotesCard key={n.id} {...n} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              {otherNotes.length > 0 && <h3 className="text-lg font-semibold mb-3">Others</h3>}
              <div className="flex flex-wrap gap-4">
                {otherNotes.map((n) => (
                  <NotesCard key={n.id} {...n} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
