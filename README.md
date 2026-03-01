www.roblox.com/home
npm install, npm run build, npm run preview



Search Functionality

A controlled input in the TopBar allows users to search experiences by title.
The input uses useState to manage the query.
As users type, the experience list dynamically filters in real time.
_Feed Filtering Tabs_
Users can toggle between:
**All
Continue Playing
Recommended**

_Friend Activity_
Clicking a tab updates state and conditionally renders the appropriate section(s).
_Sorting Control_
A dropdown allows users to sort experiences:
**By popularity
Alphabetically (A–Z)**
Sorting is handled using state and derived data with useMemo.
Site finalized, icons added, functionality improved.
**Potential Future improvements: Add several different page functionalities - create new games to show on homepage, open strictly friends page, potential catalog, etc.**
