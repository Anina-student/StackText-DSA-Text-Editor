
#include <string.h>
#include <emscripten/emscripten.h>

#define MAX 50
#define SIZE 2000

char undoStack[MAX][SIZE];
char redoStack[MAX][SIZE];

int undoTop = -1;
int redoTop = -1;

char text[SIZE] = "";

// Push a document state onto a stack
int push(char stack[MAX][SIZE], int *top, const char value[])
{
    if (*top == MAX - 1)
        return 0;

    strcpy(stack[++(*top)], value);
    return 1;
}

// Pop a document state from a stack
int pop(char stack[MAX][SIZE], int *top, char value[])
{
    if (*top == -1)
        return 0;

    strcpy(value, stack[(*top)--]);
    return 1;
}

// Initialize the editor
EMSCRIPTEN_KEEPALIVE
void editor_init()
{
    undoTop = -1;
    redoTop = -1;
    text[0] = '\0';
}

// Get the current document
EMSCRIPTEN_KEEPALIVE
const char* editor_get_text()
{
    return text;
}

// Update the document and save the previous state
EMSCRIPTEN_KEEPALIVE
int editor_set_text(const char *newText)
{
    if (newText == NULL)
        return 0;

    if (strlen(newText) >= SIZE)
        return -1;

    if (strcmp(text, newText) == 0)
        return 1;

    if (!push(undoStack, &undoTop, text))
        return 0;

    strcpy(text, newText);

    // A new edit clears redo history
    redoTop = -1;

    return 1;
}

// Undo operation
EMSCRIPTEN_KEEPALIVE
int editor_undo()
{
    if (undoTop == -1)
        return 0;

    if (redoTop == MAX - 1)
        return -1;

    push(redoStack, &redoTop, text);
    pop(undoStack, &undoTop, text);

    return 1;
}

// Redo operation
EMSCRIPTEN_KEEPALIVE
int editor_redo()
{
    if (redoTop == -1)
        return 0;

    if (undoTop == MAX - 1)
        return -1;

    push(undoStack, &undoTop, text);
    pop(redoStack, &redoTop, text);

    return 1;
}

// Get undo history count
EMSCRIPTEN_KEEPALIVE
int editor_undo_count()
{
    return undoTop + 1;
}

// Get redo history count
EMSCRIPTEN_KEEPALIVE
int editor_redo_count()
{
    return redoTop + 1;
}

// Get an undo history item (0 = newest)
EMSCRIPTEN_KEEPALIVE
const char* editor_get_undo_item(int index)
{
    if (index < 0 || index > undoTop)
        return "";

    return undoStack[undoTop - index];
}

// Get a redo history item (0 = newest)
EMSCRIPTEN_KEEPALIVE
const char* editor_get_redo_item(int index)
{
    if (index < 0 || index > redoTop)
        return "";

    return redoStack[redoTop - index];
}
