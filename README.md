# 📝  TypeOnMe: A Powerful Stupid Simple Unobtrusive Textarea

<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/01cc15fd-4dd9-4443-b0be-7161e5897715" />

## How to Use

TypeOnMe is designed to be simple, fast, and unobtrusive. Everything happens locally in your browser with automatic saving.
The most important command to know is ```Ctrl + Shift + F```

#### Creating Notes

* Press ```Alt + N``` or select New from settings or the command menu.

* A new note is created instantly and becomes the active note.

* Your notes are saved automatically as you type.

#### Switching Between Notes

* Use the arrow keys with shortcuts:

    * ```Alt + ArrowUp``` – Move to the previous note.

    * ```Alt + ArrowDown``` – Move to the next note.

* You can also select a note through the Command Palette by searching its title.

#### Editing Notes

* Type inside the editor as you would in any text editor.

* Formatting is powered by Tiptap and is saved automatically.

* Each note has a unique ID and persistent content stored locally (IndexedDB (Dexie.js)).

#### Using the Command Palette

Open the command palette with ```Ctrl + Shift + F``` (or ```Cmd + Shift + F``` on macOS).

Inside the palette you can:

* Search for notes by title.

* Create a new note.

* Delete a note.

* Run backup, import, and export operations.

* Jump directly to any note.

Selecting a command will close the palette and execute the action immediately.

#### Importing and Exporting Notes

Export:

* Press ```Ctrl + E``` or select "Export" from the dropdown menu.

* A JSON file containing the current note or notes will download automatically.

Backup (all notes):

* Press ```Ctrl + Shift + B``` or select "Backup" from the dropdown.

* A complete JSON backup of the entire local database will be downloaded.

Import:

* Press ```Ctrl + I``` or choose "Import" from the dropdown.

* Upload a JSON file previously exported from the app.

* Notes are merged safely without overwriting existing IDs.

#### Deleting Notes

* Notes can only be deleted through the Command Palette.

* The delete button appears only when there are more than one note.

* If there is exactly one note, delete is disabled to prevent an empty state loop.

* When deleting a note, the next or previous available note becomes active.

#### Theme Selection

* Theme automatically follows system settings on the first visit.

* You can toggle between light and dark theme from the dropdown menu.

* The selected theme is saved locally and applied instantly.

<img width="1920" height="899" alt="Screenshot (54)" src="https://github.com/user-attachments/assets/b0a5f90d-6ea8-42f4-bc70-3011e30fd2f4" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/338abe17-6c85-43b3-a764-2c877dcb14c6" />

