# Climate Youth Research Initiative Website

A bilingual CYRI website with structured article data, hash-based page tabs, a protected publishing backend, a contact-message backend and responsive Apple-inspired styling. CYRI publishes articles and does not conduct original research.

Run `npm start` and open `http://localhost:5173/` to view the site with the backend enabled.

Backend routes:
- `GET backend.php?route=/articles` returns published articles from `data/articles.json`.
- `POST backend.php?route=/auth/publish` checks the publish password and returns a temporary session token.
- `POST backend.php?route=/articles` stores a new article when the session token is valid.
- `POST backend.php?route=/contact` stores contact messages in `data/messages.json`.
- `/api/...` paths also work on Node and through the root Apache rewrite.

Deployment:
- Node hosting: upload the full folder, run `npm start`, and point the domain to the Node app.
- PHP/Apache hosting: upload the full folder. The backend logic is in one file, `backend.php`. Make sure the `data` folder is writable; runtime JSON files are created automatically.
- Static-only hosting is not enough for publishing or contact messages, because those features need the backend.

Docker / Node server:
- Build the optimized Node image with `docker build -t cyri-website .`.
- Run it with `docker run -d --name cyri -p 5173:5173 -v cyri-data:/app/data -e CYRI_PUBLISH_PASSWORD='France2026!' cyri-website`.
- Open `http://localhost:5173/`. Published articles and contact messages are stored in the `cyri-data` volume.

For production, set `CYRI_PUBLISH_PASSWORD` or `CYRI_PUBLISH_PASSWORD_HASH` in the server environment instead of relying on the local default.

Photo sources:
- `assets/photos/coral-reef-bleaching-hd.jpg`: Jay Galvin via Wikimedia Commons, CC BY 2.0.
- `assets/photos/ocean-plastic-hd.jpg`: Kevin Krejci via Wikimedia Commons, CC BY 2.0.
- `assets/photos/mangrove-forest-hd.jpg`: Emonjnu via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/aletsch-glacier-hd.jpg`: Gzzz via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/offshore-wind-hd.jpg`: U.S. Department of Energy via Wikimedia Commons, public domain.
