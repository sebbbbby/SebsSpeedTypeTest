# Speed Typing Test

### Starting Out

Once files are installed locally
**START** with Welcome.HTML, open with LiveServer and enjoy.
No packages required for download/NPM install

Typing Speed Test app that allows users to test their typing speed and accuracy. The app will retrieve text from a public API (PoetryDB API).

### Requirements

-   Using fetch to retrieve a random piece of text from a public API or a custom collection of various English words or text pieces in JSON format.
-   Display the text for the user to type.
-   When a user starts typing, start a timer and run it for 60 seconds.
-   Highlight each correctly typed character in a shade of green and every incorrectly typed character in a shade of red.
-   Either highlight the current word or display it in a separate area.
-   Allow the use of backspace to undo typed characters.
-   When the timer ends, calculate and display the user's typing speed (WPM) and word accuracy (%). You can also calculate these metrics in real-time. Do not count words that were not typed correctly.
-   Allow the user to reset and start again with a new piece of text.
-   Allow using the "enter" key for restarting and the "esc" key for resetting the test.
-   Store the user's metrics (speed and accuracy).
-   Display the user's metrics over time in a visually appealing way (a table or a chart).
-   After each attempt, indicate whether the user has improved over their previous attempts.
-   Use module imports (and exports) to organize your code.

## Optimizations

-   User Profiles (setting up a BE)
-   Fix minor bugs
    -   backspace issue
    -   last letter allowed to be corrected without backspace
-   Improve UI/UX
-   Refactoring some of the logic (add comments)
-   show a specified amount of word then erase/add when needed
-   if user types additional letters, display letters

## Lessons Learned

The main focus and takeaways for me was DOM manipulation and utilizing class.

Although the usage of Classes may not have been optimal, I had set a personal goal to use them as a form of practice.
as of Nov 20, 2023 it sits at version 1.
