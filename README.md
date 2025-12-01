📒 NOTE ALL

NOTE ALL is a clean, responsive, and intuitive React-based note-taking application designed to help users create, organize, and manage notes effortlessly. With features like pinning, archiving, marking important notes, and a soft delete bin system, NOTE ALL provides a smooth and productive note-management workflow.

📑 Table of Contents

Introduction

Features

Tech Stack

Folder Structure

Installation

Usage

Configuration

Utilities

Testing

Troubleshooting

Contributors

License

📝 Introduction

NOTE ALL is built with React and utilizes the Context API + useReducer for scalable and predictable state management.
It features a structured note lifecycle:

Home → Important → Archive → Bin

This allows users to manage their notes across various states with ease and clarity.

⭐ Features

✏️ Create notes with a title and content

⭐ Mark notes as Important using the !important keyword in either the title or description

📌 Pin/unpin notes to keep priority items at the top

📦 Archive notes to declutter without losing them

🗑️ Soft delete notes to the Bin or permanently delete them

🔄 Restore notes from Archive or Bin

📱 Responsive UI with sidebar navigation:

Home

Important

Archive

Bin

🧰 Tech Stack

React – Frontend framework

React Router DOM – Client-side routing

React Context API + useReducer – State management

Tailwind CSS – Styling

uuid – Unique ID generation

React Testing Library – Unit & component testing

📁 Folder Structure
src/
├─ assets/               # Images and static assets
├─ components/           # UI components (Navbar, Sidebar, NotesCard, etc.)
├─ context/              # Notes Context (NotesProvider, NotesContext)
├─ pages/                # Page components (Home, Archive, Bin, Important)
├─ reducers/             # notesReducer for state transitions
├─ utils/                # Helper functions (e.g., findNotesInArchive)
├─ App.js                # Main routing setup
├─ index.js              # App entry point
├─ index.css             # Global CSS (Tailwind)
└─ tests/                # Test files

🛠 Installation
1. Clone the repository
git clone <repo-link>
cd <repo-folder>

2. Install dependencies
npm install

3. Run the development server
npm start


App will be available at:
👉 https://noteall.netlify.app/

🚀 Usage

Navigate between pages using the sidebar (Home, Important, Archive, Bin)

Create new notes using the input fields

Add !important in the title or content to classify a note as Important

Pin or unpin notes using the pin icon

Archive notes to declutter the Home view

Move notes to Bin for soft deletion, or delete them permanently

Restore notes from Archive or Bin anytime

⚙️ Configuration

No mandatory external configuration is required.

Optional customizations:

Modify Tailwind config for custom themes or design

Extend reducer logic to add new actions

Enhance Context Provider for features like authentication or multi-user support

🧩 Utilities

Located inside /utils:

findNotesInArchive – Determines whether a note exists in the archive

Other helper methods used for classification, filtering, and moving notes between states

🧪 Testing

NOTE ALL uses React Testing Library for component and interaction testing.

Run tests:

npm test


Challenges faced during development:
One of the most challenging problems I solved recently involved fixing a broken state-management flow in a React application where data kept disappearing after page refresh. The issue was tricky because the bug wasn't in one single component; it was conceptual, rooted in how the global context and reducer were designed. I had to trace the flow of actions across multiple pages, like Home, Archive, and Bin, just to identify where the state was getting lost. After pinpointing the issue, I redesigned the logic so that the reducer handled important actions consistently across all lists. LocalStorage was integrated with controlled initialization and automatic syncing, ensuring the whole app persisted data reliably. The change required careful updates to avoid infinite loops, performance issues, or mismatched states. In the end, the app turned fully stable, with all the notes maintaining their state even after refresh or navigation.



Test coverage includes:

Component rendering

Note creation and interactions

Reducer state transitions

Navigation behavior




🛠 Troubleshooting
Issue	Possible Fix
Tailwind classes not applying	Ensure index.css imports Tailwind directives
Notes not updating UI	Check reducer return values & ensure immutability
Routing breaks on refresh	Add basename or configure server to fallback to index.html
UUID errors	Reinstall the uuid package
