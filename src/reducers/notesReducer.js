import { v4 as uuid } from "uuid";

/**
 * notesReducer - Handles notes, archive, bin, and input fields.
 *
 * Behavior:
 * - ADD_NOTE: inspects title/text for '!important' and sets isImportant. Strips '!important'.
 * - DELETE: moves a note to bin (removes from notes or archive).
 * - DELETE_PERMANENT: removes from bin permanently.
 * - RESTORE_FROM_BIN: restores note back to notes.
 * - ADD_TO_ARCHIVE / REMOVE_FROM_ARCHIVE work across notes <-> archive.
 * - PIN / UNPIN toggle isPinned.
 * - TITLE / TEXT manage input fields.
 */

const stripImportantFlag = (str = "") => str.replace(/!important/gi, "").trim();

export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "TITLE":
      return { ...state, title: payload };
    case "TEXT":
      return { ...state, text: payload };

    case "ADD_NOTE": {
      // detect !important in title or text
      const titleHas = /!important/i.test(state.title);
      const textHas = /!important/i.test(state.text);
      const isImportant = titleHas || textHas;

      const cleanTitle = stripImportantFlag(state.title);
      const cleanText = stripImportantFlag(state.text);

      const newNote = {
        id: uuid(),
        title: cleanTitle,
        text: cleanText,
        isPinned: false,
        isImportant
      };
      return {
        ...state,
        notes: [...state.notes, newNote],
        title: "",
        text: ""
      };
    }

    case "CLEAR_INPUT":
      return { ...state, title: "", text: "" };

    case "PIN":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, isPinned: true } : note
        )
      };
    case "UNPIN":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, isPinned: false } : note
        )
      };

    case "ADD_TO_ARCHIVE": {
      const note = state.notes.find(({ id }) => id === payload.id);
      if (!note) return state;
      return {
        ...state,
        archive: [...state.archive, note],
        notes: state.notes.filter(({ id }) => id !== payload.id)
      };
    }

    case "REMOVE_FROM_ARCHIVE": {
      const note = state.archive.find(({ id }) => id === payload.id);
      if (!note) return state;
      return {
        ...state,
        notes: [...state.notes, note],
        archive: state.archive.filter(({ id }) => id !== payload.id)
      };
    }

    case "DELETE": {
      // move to bin. whether source from notes or archive
      const inNotes = state.notes.find(({ id }) => id === payload.id);
      const inArchive = state.archive.find(({ id }) => id === payload.id);

      if (inNotes) {
        return {
          ...state,
          bin: [...state.bin, inNotes],
          notes: state.notes.filter(({ id }) => id !== payload.id)
        };
      } else if (inArchive) {
        return {
          ...state,
          bin: [...state.bin, inArchive],
          archive: state.archive.filter(({ id }) => id !== payload.id)
        };
      } else {
        return state;
      }
    }

    case "RESTORE_FROM_BIN": {
      const note = state.bin.find(({ id }) => id === payload.id);
      if (!note) return state;
      return {
        ...state,
        notes: [...state.notes, note],
        bin: state.bin.filter(({ id }) => id !== payload.id)
      };
    }

    case "DELETE_PERMANENT": {
      return {
        ...state,
        bin: state.bin.filter(({ id }) => id !== payload.id)
      };
    }

    case "MARK_IMPORTANT": {
      // toggle important for a note in notes or archive
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === payload.id ? { ...n, isImportant: true } : n
        ),
        archive: state.archive.map((n) =>
          n.id === payload.id ? { ...n, isImportant: true } : n
        )
      };
    }
   case "TOGGLE_IMPORTANT":
  return {
    ...state,
    notes: state.notes.map((note) =>
      note.id === payload.id ? { ...note, isImportant: !note.isImportant } : note
    ),
    archive: state.archive.map((note) =>
      note.id === payload.id ? { ...note, isImportant: !note.isImportant } : note
    ),
    bin: state.bin.map((note) =>
      note.id === payload.id ? { ...note, isImportant: !note.isImportant } : note
    ),
  };



    default:
      return state;
  }
};
