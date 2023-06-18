# Calorie-Tracker
A website to help you keep track of protein and caloric intake

## TODO
- [x] Set up database to read and write macros from
- [x] Implement calendar feature to select dates from a dropdown
- [ ] Make the website look [nicer](https://www.figma.com/proto/hrmTqFjzYzY06TEzsXt5zg/Calorie-Tracker?type=design&node-id=1-2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2)
- [ ] Set up Google Authentication so it's no longer just for my use
- [ ] Host the website

## Developer Notes (for Mac)
Follow these steps to get a working instance set up on your computer:

1) Run `npm install` to install all dependencies
2) Create a `.env` file with value `DATABASE_URL="file:./dev.db"` to specify where you want the SQLite database to live
3) There is a database schema outlined in `prisma/schema.prisma`. To create the database tables, run `npx prisma migrate dev --name init`
4) *Optional*: You can run a GUI to view and edit the SQLite data with `npx prisma studio`
5) Boot up the application with `npm run dev`
