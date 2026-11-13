# Text Editor with Undo and Redo Operations

## Project Overview
A console-based Text Editor developed using the C programming language. It uses the Stack data structure to implement Undo and Redo operations.

## Features
- Insert text at a specified position
- Delete characters
- Undo previous operations
- Redo undone operations
- Support multiple lines
- Save text into a file
- Open previously saved files
- Display Undo and Redo history

## Technologies Used
- Programming Language: C
- Data Structure: Stack
- Storage: Arrays
- File Handling: C File I/O

## DSA Concepts
- Stack
- LIFO (Last In, First Out)
- Push and Pop operations
- Two-stack implementation for Undo and Redo

## How to Compile
```bash
gcc text_editor.c -o text_editor.exe
```

## How to Run
```bash
./text_editor.exe
```

On Windows PowerShell:
```powershell
.\text_editor.exe
```

## Time Complexity
- Push and Pop: O(n), where n is the text length
- Insert: O(n)
- Delete: O(n)
- Undo: O(n)
- Redo: O(n)

## Project Type
Data Structures and Algorithms Mini Project