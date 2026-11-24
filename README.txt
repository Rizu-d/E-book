STUDENT HANDBOOK FLIPBOOK
=========================
HOW TO RUN
1. Unzip this folder (right-click > Extract All).
2. Double-click  index.html  -> it opens in Chrome / Edge / Firefox / Safari.
No internet, no server and no PDF reader needed.

KEEP TOGETHER: index.html, style.css, script.js and the folders pages/ and thumbs/.

CONTROLS
- Next / previous: arrow keys, the < > buttons, click right/left side of the book, or swipe on a phone
- Jump: drag the slider, type a page number + Enter, or use the page list on the left (the menu button, top-left, shows/hides it)
- Zoom: + / - buttons or keys (drag to move around when zoomed)
- Single / double page view: book icon (top bar)
- Full screen: F key or the button

PUT IT ON A WEBSITE
Upload the whole folder to any web host (GitHub Pages, Netlify, your school server).
Link to  index.html.  Add #50 to the link to open on page 50.

EDIT THE TABLE OF CONTENTS
Open script.js and find  const TOC = [ ... ]  near the top.
Each line is  { t: 'Topic title', p: 12 }  (p = page number in the flipbook).
Sub-topics go inside  c: [ ... ]  and show as a collapsible group in the left menu.
