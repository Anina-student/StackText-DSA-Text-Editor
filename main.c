
#include <stdio.h>

int main()
{
    int choice;

    printf("================================\n");
    printf("       TEXT EDITOR\n");
    printf("================================\n");

    printf("1. Enter Text\n");
    printf("2. Undo\n");
    printf("3. Redo\n");
    printf("4. Display Text\n");
    printf("5. Exit\n");

    printf("\nEnter your choice: ");
    scanf("%d", &choice);

    printf("\nYou selected option: %d\n", choice);

    return 0;
}
