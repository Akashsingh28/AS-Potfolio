# Portfolio

## Run locally

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string.
2. Run `npm run dev:server` in one terminal.
3. Run `npm run dev` in another terminal and open the Vite URL.

The contact form saves messages in the `contactMessages` collection in the
`portfolio` database. The API limits submissions to five per IP every 15
minutes.

## Free deployment

This project can run as one service on Render's free web-service plan, with
MongoDB Atlas's free shared cluster for contact messages. Render builds the
React site and the Node server serves both the site and `/api/contact`.

1. Push this project to a GitHub repository. Do not commit `.env` or any
   database credentials.
2. Create a free MongoDB Atlas shared cluster. Create a database user, add
   Render's outbound IP access as allowed by Atlas (or use `0.0.0.0/0` if your
   free Atlas setup requires it), then copy the application's connection URI.
   Replace its password placeholder and URL-encode special characters in the
   password.
3. In Render, choose **New → Blueprint**, connect the GitHub repository, and
   deploy the included `render.yaml`.
4. When prompted, set the secret `MONGODB_URI` to the Atlas connection URI.
   Keep it in Render's environment settings, not in source code. The database
   name defaults to `portfolio`.
5. Open the `*.onrender.com` URL shown in Render. The health endpoint is
   `/api/health`; contact form submissions use the same host.

The application itself has no required paid service or custom domain. Free
hosting plans have usage limits and may sleep when idle, so the first visit
after a quiet period can take longer. A custom domain may have a separate cost.

## Contact API development

Run `npm run db:test` to check the MongoDB connection. For production, Render
sets `NODE_ENV=production` and the server serves the built `dist` site itself.
