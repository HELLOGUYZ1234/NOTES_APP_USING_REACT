import React from "react";
import { useNotes } from "../../context/notes-context";

import { findNotesInArchive } from "../../utils/findNotesInArchive";


export const NotesCard = ({ id, title, text, isPinned, isImportant }) => {
  const { notesDispatch, archive, bin } = useNotes();
  const isNotesInArchive = findNotesInArchive(archive, id);
  const isInBin = bin.some((n) => n.id === id);

  const onPinClick = (id) => {
    !isPinned
      ? notesDispatch({ type: "PIN", payload: { id } })
      : notesDispatch({ type: "UNPIN", payload: { id } });
  };

  const onArchiveClick = (id) => {
    !isNotesInArchive
      ? notesDispatch({ type: "ADD_TO_ARCHIVE", payload: { id } })
      : notesDispatch({ type: "REMOVE_FROM_ARCHIVE", payload: { id } });
  };

  const onDeleteClick = (id) => {
    // move to bin
    notesDispatch({ type: "DELETE", payload: { id } });
  };

  const onRestoreFromBin = (id) => {
    notesDispatch({ type: "RESTORE_FROM_BIN", payload: { id } });
  };

  const onDeletePermanent = (id) => {
    notesDispatch({ type: "DELETE_PERMANENT", payload: { id } });
  };

  return (
    <div className="w-[300px] bg-white border border-neutral-200 p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-indigo-800">
              {title || "Untitled"}
            </h4>
            {isImportant && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                IMPORTANT
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
            {text}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          {!isInBin ? (
            <>
           
              {!isNotesInArchive ? (
                <button onClick={() => onPinClick(id)}>
                  <span
                    className={
                      isPinned ? "material-icons" : "material-icons-outlined"
                    }
                  >
                    push_pin
                  </span>
                </button>
              ) : (
                <div className="h-6" />
              )}

              <button onClick={() => onArchiveClick(id)}>
                <span
                  className={
                    isNotesInArchive
                      ? "material-icons"
                      : "material-icons-outlined"
                  }
                >
                  archive
                </span>
              </button>

              <button onClick={() => onDeleteClick(id)}>
                <span className="material-icons-outlined">delete_outline</span>
              </button>
              <button
                onClick={() =>
                  notesDispatch({ type: "TOGGLE_IMPORTANT", payload: { id } })
                }
              >
                <span
                  className={
                    isImportant ? "material-icons" : "material-icons-outlined"
                  }
                >
                  label_important
                </span>
              </button>
            </>
          ) : (
            
            <>
              <button
                onClick={() => onRestoreFromBin(id)}
                className="text-sm px-3 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100"
              >
                Restore
              </button>
              <button
                onClick={() => onDeletePermanent(id)}
                className="text-sm px-3 py-1 rounded-md bg-red-50 hover:bg-red-100"
              >
                Delete Permanently
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
