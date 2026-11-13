# Muzaffar Ali — Portfolio

A responsive Next.js portfolio built with React, TypeScript, Framer Motion and Lucide icons. The existing portfolio was updated in place against the reference's navy/cyan design and interaction style.

## Run in VS Code

1. Install Node.js 20 or newer from https://nodejs.org/.
2. Extract the ZIP and open the `portfolio` folder in VS Code.
3. Open **Terminal → New Terminal** and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000. Stop the server with Ctrl+C.
5. For a production check, run `npm run build` followed by `npm start`.

## Edit content and images

- Change the name, introduction, education, focus, contact details and other personal information in `lib/content.ts`. The hero statistics and project details are also configured there.
- The uploaded portrait is in `public/images/profile.webp`; its original is `profile.png`. Replace the file or change `photo` in `lib/content.ts`. Set `photo` to an empty string to use the included profile placeholder.
- Replace `public/images/task-and-notes-manager.png` with an updated TaskFlow screenshot as needed. Change project names, descriptions, technology badges, live demo URLs, and GitHub URLs in `lib/content.ts`. Demo and code buttons stay disabled until URLs are supplied.
- Add a real email address and GitHub profile URL to `profile.email` and `profile.github` in `lib/content.ts`. The corresponding contact links activate when configured. Check the optional LinkedIn URL before publishing.
- Add a résumé file to `public/`, then set `resume` to its path, for example `/resume.pdf`. Until then the résumé button is disabled.
- Skill percentages are supplied by the portfolio owner and can be edited in `lib/content.ts`, e.g. `skill('React', 95)`. Bars animate to their configured values. **View All** shows any additional skills configured in a category.
- Category emoji graphics are from [Twemoji](https://github.com/twitter/twemoji), licensed under CC BY 4.0. Existing technology icons are stored locally under `public/images/tech/`; their license files are included there.

## Contact form

The form validates required fields. Once an email address is configured, it opens the visitor's email application with a prepared message; it does **not** send email directly or claim delivery. Direct sending requires a server-side email integration. Until configured, the form displays a clear error.

The ZIP excludes generated `node_modules` and `.next` directories. `package.json` and `package-lock.json` are included so `npm install` can recreate dependencies.
