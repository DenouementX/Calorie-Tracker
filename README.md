# Calorie-Tracker
A website to help you keep track of protein and caloric intake. The frontend is built using React and Tailwind CSS while the backend is powered by Next.js, Prisma to run an instance of a PostgreSQL database hosted with Amazon RDS, and OAuth 2.0 to access Google APIs.

## TODO
- [x] Set up database to read and write macros from
- [x] Implement calendar feature to select dates from a dropdown
- [x] Make the website look [nicer](https://www.figma.com/proto/hrmTqFjzYzY06TEzsXt5zg/Calorie-Tracker?type=design&node-id=73-239&scaling=scale-down&page-id=0%3A1&starting-point-node-id=73%3A239&show-proto-sidebar=1)
- [x] Set up Google Authentication so it's no longer just for my use
    - [x] Create an authentication/sign-in page
    - [x] Fix rows not rerendering
    - [x] Create log out button in tracker page
- [x] Migrate from SQLite to PostgreSQL with Amazon RDS
- [x] Deploy the website on Vercel

## Developer Notes (for Mac)
Follow these steps to get a working instance set up on your computer:

1) Run `npm install` to install all dependencies
2) Follow [this guide](https://aws.amazon.com/getting-started/hands-on/create-connect-postgresql-db/) to set up an Amazon RDS instance
3) On the AWS console, navigate to the RDS database security group and under the `inbound` tab, delete the existing rule and create a new one allowing connections from source 0.0.0.0/0 (everyone). *In general, this is not safe but ok for development*
2) Create a `.env` file with value `DATABASE_URL="postgres[ql]://[username[:password]@][host[:port],]/database[?parameter_list]"` to specify the connection to Amazon RDS. Information about formatting the connection URI can be found [here](https://www.prisma.io/dataguide/postgresql/setting-up-postgresql-on-rds)
3) Moreover, in `.env`, add the key `NEXT_PUBLIC_CLIENT_ID="someID.apps.googleusercontent.com"` and enter your OAuth client ID
4) There is a database schema outlined in `prisma/schema.prisma`. To create the database tables, run `npx prisma migrate dev --name init`
5) Boot up the application with `npm run dev`
