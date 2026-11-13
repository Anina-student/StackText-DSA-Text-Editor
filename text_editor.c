

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAX 50
#define SIZE 2000

char undoStack[MAX][SIZE];
char redoStack[MAX][SIZE];

int undoTop = -1;
int redoTop = -1;

char text[SIZE] = "";

int push(char stack[MAX][SIZE], int *top, char value[])
{
    if (*top == MAX - 1)
        return 0;

    strcpy(stack[++(*top)], value);
    return 1;
}

int pop(char stack[MAX][SIZE], int *top, char value[])
{
    if (*top == -1)
        return 0;

    strcpy(value, stack[(*top)--]);
    return 1;
}


void insertText()
{
    char newText[SIZE] = "";
    char line[SIZE];
    int pos;
    int len = strlen(text);
    int addLen;

    printf("Enter insertion position (0 to %d): ", len);
    scanf("%d", &pos);
    getchar();

    if (pos < 0 || pos > len)
    {
        printf("Invalid position!\n");
        return;
    }

    printf("Enter text (type . on a new line to finish):\n");

    while (fgets(line, sizeof(line), stdin) != NULL)
    {
        if (strcmp(line, ".\n") == 0 ||
            strcmp(line, ".") == 0)
        {
            break;
        }

        if (strlen(newText) + strlen(line) >= SIZE)
        {
            printf("Text limit exceeded!\n");
            return;
        }

        strcat(newText, line);
    }

    addLen = strlen(newText);

    if (len + addLen >= SIZE)
    {
        printf("Text limit exceeded!\n");
        return;
    }

    if (!push(undoStack, &undoTop, text))
    {
        printf("Undo history is full!\n");
        return;
    }

    memmove(text + pos + addLen,
            text + pos,
            len - pos + 1);

    memcpy(text + pos, newText, addLen);

    redoTop = -1;

    printf("Text inserted successfully!\n");
}

void deleteText()
{
    int pos;
    int len = strlen(text);

    printf("Enter character position to delete (0 to %d): ", len - 1);
    scanf("%d", &pos);
    getchar();

    if (pos < 0 || pos >= len)
    {
        printf("Invalid position!\n");
        return;
    }

    if (!push(undoStack, &undoTop, text))
    {
        printf("Undo history is full!\n");
        return;
    }

    memmove(text + pos,
            text + pos + 1,
            len - pos);

    redoTop = -1;

    printf("Character deleted successfully!\n");
}

void undo()
{
    if (redoTop == MAX - 1)
    {
        printf("Redo history is full!\n");
        return;
    }

    if (undoTop == -1)
    {
        printf("Nothing to undo!\n");
        return;
    }

    push(redoStack, &redoTop, text);
    pop(undoStack, &undoTop, text);

    printf("Undo successful!\n");
}

void redo()
{
    if (undoTop == MAX - 1)
    {
        printf("Undo history is full!\n");
        return;
    }

    if (redoTop == -1)
    {
        printf("Nothing to redo!\n");
        return;
    }

    push(undoStack, &undoTop, text);
    pop(redoStack, &redoTop, text);

    printf("Redo successful!\n");
}

void displayText()
{
    printf("\nCurrent Text: %s\n", text);
}

void saveFile()
{
    FILE *fp;

    fp = fopen("document.txt", "w");

    if (fp == NULL)
    {
        printf("Unable to save file!\n");
        return;
    }

    fputs(text, fp);

    fclose(fp);

    printf("File saved successfully!\n");
}
void showHistory()
{
    int i;

    printf("\n========== EDIT HISTORY ==========\n");

    printf("\nUNDO HISTORY:\n");

    if (undoTop == -1)
    {
        printf("No undo history available.\n");
    }
    else
    {
        for (i = undoTop; i >= 0; i--)
        {
            printf("%d. %s\n", undoTop - i + 1, undoStack[i]);
        }
    }

    printf("\nREDO HISTORY:\n");

    if (redoTop == -1)
    {
        printf("No redo history available.\n");
    }
    else
    {
        for (i = redoTop; i >= 0; i--)
        {
            printf("%d. %s\n", redoTop - i + 1, redoStack[i]);
        }
    }

    printf("==================================\n");
}


void openFile()
{
    FILE *fp;
    char loadedText[SIZE];
    int ch;
    int i = 0;

    fp = fopen("document.txt", "r");

    if (fp == NULL)
    {
        printf("File not found!\n");
        return;
    }

    while ((ch = fgetc(fp)) != EOF)
    {
        if (i >= SIZE - 1)
        {
            printf("File exceeds editor capacity!\n");
            fclose(fp);
            return;
        }

        loadedText[i++] = (char)ch;
    }

    loadedText[i] = '\0';
    fclose(fp);

    if (!push(undoStack, &undoTop, text))
    {
        printf("Undo history is full!\n");
        return;
    }

    strcpy(text, loadedText);
    redoTop = -1;

    printf("File opened successfully!\n");
}


int main()
{
    int choice;

    do
    {
       printf("\n===== TEXT EDITOR =====\n");
printf("1. Insert Text\n");
printf("2. Delete Character\n");
printf("3. Undo\n");
printf("4. Redo\n");
printf("5. Display Text\n");
printf("6. Save File\n");
printf("7. Open File\n");
printf("8. Show Edit History\n");
printf("9. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);
        getchar();

        switch (choice)
        {
            case 1: insertText(); break;
            case 2: deleteText(); break;
            case 3: undo(); break;
            case 4: redo(); break;
            case 5: displayText(); break;
            case 6:
    saveFile();
    break;

case 7:
    openFile();
    break;

case 8:
    showHistory();
    break;

case 9:
    printf("Exiting Text Editor...\n");
    exit(0);
            default: printf("Invalid choice!\n");
        }

    } while (choice != 9);

    return 0;
}
