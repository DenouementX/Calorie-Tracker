# Calorie-Tracker
A website to help you keep track of protein and caloric intake. The frontend is built using React and Tailwind CSS while the backend is powered by Next.js, Prisma to run an instance of a SQLite database, and OAuth 2.0 to access Google APIs.

## TODO
- [x] Set up database to read and write macros from
- [x] Implement calendar feature to select dates from a dropdown
- [x] Make the website look [nicer](https://www.figma.com/proto/hrmTqFjzYzY06TEzsXt5zg/Calorie-Tracker?type=design&node-id=73-239&scaling=scale-down&page-id=0%3A1&starting-point-node-id=73%3A239&show-proto-sidebar=1)
- [ ] Set up Google Authentication so it's no longer just for my use
    - [x] Create an authentication/sign-in page
    - [x] Fix rows not rerendering
    - [ ] Create log out button in tracker page
- [ ] Add finishing touches
    - [ ] Tab to enter on last column
- [ ] Host the website

## Developer Notes (for Mac)
Follow these steps to get a working instance set up on your computer:

1) Run `npm install` to install all dependencies
2) Create a `.env` file with value `DATABASE_URL="file:./dev.db"` to specify where you want the SQLite database to live
3) Moreover, in `.env`, add the key `NEXT_PUBLIC_CLIENT_ID="someID.apps.googleusercontent.com"` and enter your OAuth client ID
4) There is a database schema outlined in `prisma/schema.prisma`. To create the database tables, run `npx prisma migrate dev --name init`
5) *Optional*: You can run a GUI to view and edit the SQLite data with `npx prisma studio`
6) Boot up the application with `npm run dev`
