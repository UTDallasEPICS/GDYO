# Technologies needed

- VS Code (for auto linting and formatting)
- Docker (Virtual Machine for hosting local database)
- TablePlus (Recommended tool for viewing/editing database)
- WSL2 (Recommended for Windows users)

# How to setup and use VS Code

## Install extensions

- "Prettier - Code formatter" by Prettier
- "ESLint" by Microsoft
- "Prisma" by Prisma

# Run servers

**NOTE:** Always be at root directory when coding so that Prettier and Eslint works properly

## Database

Assuming currently at root directory:

1. `cd ./server`

2. `npm run dock -- -d`: Start Docker Desktop first. Then, use this command to boot up the container for PostgreSQL database

3. `npm run pdev`: Run this command the first time you create the database container and every time you adjust `schema.prisma` to apply/create the migrations to the database instance

4. `npm run pgen`: Run this command to apply ORM and generate database schema interfaces inside Typescript code

5. `npm run pseed` (Optional): Run this command to create initial data inside the database whenever you feel like it

6. `npm run pclean` (Optional): Run this command to reset the database migrations without seeding and ORM generating. You might want to run seed and ORM generation separately

## Run back-end

Assuming currently at root directory:

1. `cd ./server`

2. `npm install`: Install dependencies (`postinstall` script will automatically run after this and initialize all default environment variables)

3. `npm run dev`: Run the server in development mode

4. Create new terminal to continue using other commands if needed

## Run front-end (mobile app)

Assuming currently at root directory:

1. `cd ./client`

2. `npm install`: Install dependencies (`postinstall` script will automatically run after this and initialize all default environment variables)

3. Run the right build strategy **(EAS build or Local build)** to see the app. See [the doc](https://github.com/UTDallasEPICS/GDYO/wiki/EAS-Build-vs.-Local-Build) for more information

   - This step is quite complicated, so take time reading the docs and related resources
  
4. `npx expo start`: Run Expo app and choose the right simulator Android or IOS

   - One prerequisite for this is that you need to install and set up either Android Emulator or IOS Simulator before using. There are documentations regarding how to set this up with Expo online.
   - Android Emulator:  https://docs.expo.dev/workflow/android-studio-emulator/
   - IOS Simulator: https://docs.expo.dev/workflow/ios-simulator/

5. Create new terminal to continue using other commands if needed

# What's next?

You can read more about the tech stack and explanations inside Wiki docs named `[Overview] <Name>`.
