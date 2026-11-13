

const editor = document.getElementById("editor");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

const downloadBtn = document.getElementById("downloadBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const clearBtn = document.getElementById("clearBtn");

const undoHistory = document.getElementById("undoHistory");
const redoHistory = document.getElementById("redoHistory");

const saveStatus = document.querySelector(".save-status");

let Module;
let setText;
let getText;
let undo;
let redo;
let undoCount;
let redoCount;
let getUndoItem;
let getRedoItem;

let editTimer = null;

// Update word and character counts
function updateCounts() {
    const text = editor.value;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    wordCount.textContent = `${words} words`;
    charCount.textContent = `${text.length} characters`;
}

// Display undo and redo history
function updateHistory() {
    undoHistory.textContent = "";
    redoHistory.textContent = "";

    const uCount = undoCount();
    const rCount = redoCount();

    for (let i = 0; i < uCount; i++) {
        const item = document.createElement("p");
        item.textContent = getUndoItem(i) || "(Empty document)";
        undoHistory.appendChild(item);
    }

    for (let i = 0; i < rCount; i++) {
        const item = document.createElement("p");
        item.textContent = getRedoItem(i) || "(Empty document)";
        redoHistory.appendChild(item);
    }

    undoBtn.disabled = uCount === 0;
    redoBtn.disabled = rCount === 0;
}

// Save the current editing session in C
function flushPendingEdit() {
    if (editTimer !== null) {
        clearTimeout(editTimer);
        editTimer = null;
    }

    if (editor.value !== getText()) {
        const result = setText(editor.value);

        if (result === 0 || result === -1) {
            saveStatus.textContent = "● Unable to save edit";
            editor.value = getText();
        }
    }

    updateHistory();
}

// Typing listener
editor.addEventListener("input", function () {
    updateCounts();
    saveStatus.textContent = "● Editing";

    if (editTimer !== null) {
        clearTimeout(editTimer);
    }

    // Group typing into one editing session
    editTimer = setTimeout(function () {
        flushPendingEdit();
        saveStatus.textContent = "● Saved";
    }, 500);
});

// Undo using C
undoBtn.addEventListener("click", function () {
    flushPendingEdit();

    const result = undo();

    if (result === 1) {
        editor.value = getText();
        saveStatus.textContent = "● Undo successful";
    }

    updateCounts();
    updateHistory();
});

// Redo using C
redoBtn.addEventListener("click", function () {
    flushPendingEdit();

    const result = redo();

    if (result === 1) {
        editor.value = getText();
        saveStatus.textContent = "● Redo successful";
    }

    updateCounts();
    updateHistory();
});

// Clear document using C
clearBtn.addEventListener("click", function () {
    flushPendingEdit();

    if (editor.value !== "") {
        const result = setText("");

        if (result === 1) {
            editor.value = "";
            saveStatus.textContent = "● Document cleared";
        }
    }

    updateCounts();
    updateHistory();
});

// Download document
downloadBtn.addEventListener("click", function () {
    flushPendingEdit();

    const file = new Blob([editor.value], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = "StackText_Document.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    saveStatus.textContent = "● Downloaded";
});

// Initialize WebAssembly and connect C functions
async function initializeStackText() {
    try {
        Module = await createStackTextModule();

        Module.ccall("editor_init", null, [], []);

        setText = Module.cwrap("editor_set_text", "number", ["string"]);
        getText = Module.cwrap("editor_get_text", "string", []);
        undo = Module.cwrap("editor_undo", "number", []);
        redo = Module.cwrap("editor_redo", "number", []);

        undoCount = Module.cwrap("editor_undo_count", "number", []);
        redoCount = Module.cwrap("editor_redo_count", "number", []);

        getUndoItem = Module.cwrap(
            "editor_get_undo_item", "string", ["number"]
        );

        getRedoItem = Module.cwrap(
            "editor_get_redo_item", "string", ["number"]
        );

        editor.value = getText();

        updateCounts();
        updateHistory();

        saveStatus.textContent = "● C + WebAssembly Ready";

        console.log("StackText WebAssembly initialized!");

    } catch (error) {
        console.error("WebAssembly initialization failed:", error);
        saveStatus.textContent = "● WebAssembly loading failed";
    }
}

initializeStackText();
