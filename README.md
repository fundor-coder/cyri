# Climate Youth Research Initiative Website

A bilingual, youth-led environmental education platform with interactive topic paths, a knowledge quiz, structured article data, an article-based AI learning assistant, a protected publishing backend and responsive Apple-inspired styling. CYRI publishes educational content and does not conduct original research.

Run `npm start` and open `http://localhost:5173/` to view the site with the backend enabled.

Funding notice:
- The action! funding notice is integrated site-wide before the footer.
- The supplied RGB funding logo remains unchanged, readable and displayed on a white background with protected spacing according to the funding guidelines.
- The accompanying text names the programme “action! Aktiv für eine globale Welt” and the funding by DSEE with BMZ funds.

Learning platform:
- The `Learn` page connects the existing CYRI articles to interactive topic paths.
- Visitors can switch between oceans, climate ecosystems and climate-ready cities.
- A personal learning journey tracks explored topics, opened learning articles and quiz completion.
- Learning progress is stored locally in the visitor's browser and includes a recommended next step.
- The knowledge check offers three selectable lengths with 3, 6 or 9 bilingual questions.
- The CYRI AI learning assistant is integrated into the `Learn` page instead of appearing as a separate navigation item.
- Each topic includes three interactive key-concept discoveries with animated explanations and locally saved discovery progress.
- Articles remain the source-based foundation; infographics and social explainers are presented as additional educational formats.

Backend routes:
- `GET backend.php?route=/articles` returns published articles from `data/articles.json`.
- `POST backend.php?route=/auth/publish` checks the publish password and returns a temporary session token.
- `POST backend.php?route=/translate` translates German article fields into English with OpenAI.
- `POST backend.php?route=/research` answers questions using published CYRI articles as the only content basis.
- `POST backend.php?route=/uploads` stores an optimized custom article photo in `data/uploads`.
- `POST backend.php?route=/articles` stores a new article immediately or with a future `publishAt` time.
- `POST backend.php?route=/contact` stores contact messages in `data/messages.json`.
- `/api/...` paths also work on Node and through the root Apache rewrite.

Deployment:
- Node hosting: upload the full folder, run `npm start`, and point the domain to the Node app. Set `CYRI_DATA_DIR` to a persistent server directory when the host uses ephemeral deployments.
- PHP/Apache hosting: upload the full folder. The backend logic is in one file, `backend.php`. Make sure the `data` folder is writable; runtime JSON files are created automatically. `CYRI_DATA_DIR` can point to storage outside the deployment folder.
- Static-only hosting is not enough for publishing, contact messages or AI answers, because those features need the backend.
- GitHub Pages can display the frontend, but it cannot run the AI learning assistant or store published articles. Use the Node/Docker or PHP deployment as the production website when these functions must work.

Scheduled publishing:
- Select `Schedule for later` in the protected publishing editor and choose a local date and time.
- The browser sends the time as UTC. Future articles remain hidden from the public API until their launch time.
- No cron job is required; the public article list is filtered whenever it is requested.

AI translation:
- Set `OPENAI_API_KEY` in the server environment. Never put the key in `app.js`, `index.html` or Git.
- The protected editor can translate the German title, summary and article text into English. Existing English fields are replaced only after clicking the translation button.
- The default model is `gpt-5.4-mini`. Override it with `OPENAI_TRANSLATION_MODEL` if needed.
- Translation requests are sent only from the Node or PHP backend. Review every translation before publishing.

AI learning assistant:
- Set `OPENAI_API_KEY` in the server environment. The key stays in the Node or PHP backend and is never sent to visitors.
- The backend selects up to three relevant published CYRI articles and instructs the model to answer only from that supplied material.
- Answers include links back to the CYRI articles used. Unsupported questions should receive a clear statement that the available articles do not contain enough information.
- The default model is `gpt-5.4-mini`. Override it with `OPENAI_RESEARCH_MODEL` if needed.
- Public research requests are limited to 12 questions per IP address in 10 minutes.
- Questions are transmitted to the configured AI provider. The interface tells visitors not to enter personal or confidential information.

Docker / Node server:
- Build the optimized Node image with `docker build -t cyri-website .`.
- Run it with `docker run -d --name cyri -p 5173:5173 -v cyri-data:/app/data -e CYRI_PUBLISH_PASSWORD='France2026!' -e OPENAI_API_KEY='your-key' cyri-website`.
- Or use `docker compose up -d --build`; `compose.yaml` automatically mounts the named `cyri-data` volume.
- Open `http://localhost:5173/`. Published articles, uploaded photos and contact messages are stored in the `cyri-data` volume.
- Do not delete the `cyri-data` volume during updates. `docker compose down` keeps it; `docker compose down -v` deletes it.

Persistent storage:
- Articles are stored in `articles.json`; uploaded photos are stored in `uploads`.
- Every JSON update keeps a complete mirrored copy in a `.bak` file.
- If the main JSON file becomes unreadable, the backend restores it automatically from that backup.

For production, set `CYRI_PUBLISH_PASSWORD` or `CYRI_PUBLISH_PASSWORD_HASH` in the server environment instead of relying on the local default.

Photo sources:
- `assets/photos/sponge-city-rain-garden-hd.jpg`: Jeremy Jeziorski / Oregon Convention Center via Wikimedia Commons, CC BY 2.0; resized for web delivery.
- `assets/photos/seagrass-meadow-zostera-hd.jpg`: Olivier Dugornay / Ifremer via Wikimedia Commons, CC BY 4.0; resized for web delivery.
- `assets/photos/coral-bleaching-florida-2023-hd.jpg`: Dan Eidsmoe / Symbiosis via Wikimedia Commons, CC BY 2.0; resized for web delivery.
- `assets/photos/coral-reef-bleaching-hd.jpg`: Jay Galvin via Wikimedia Commons, CC BY 2.0.
- `assets/photos/ocean-plastic-hd.jpg`: Kevin Krejci via Wikimedia Commons, CC BY 2.0.
- `assets/photos/mangrove-forest-hd.jpg`: Emonjnu via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/aletsch-glacier-hd.jpg`: Gzzz via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/offshore-wind-hd.jpg`: U.S. Department of Energy via Wikimedia Commons, public domain.
