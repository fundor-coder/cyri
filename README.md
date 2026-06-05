# Climate Youth Research Initiative Website

A bilingual CYRI website with structured article data, hash-based page tabs, a protected publishing backend, a contact-message backend and responsive Apple-inspired styling. CYRI publishes articles and does not conduct original research.

Run `npm start` and open `http://localhost:5173/` to view the site with the backend enabled.

Backend routes:
- `GET /api/articles` returns published articles from `data/articles.json`.
- `POST /api/auth/publish` checks the publish password and returns a temporary session token.
- `POST /api/articles` stores a new article when the session token is valid.
- `POST /api/contact` stores contact messages in `data/messages.json`.

Deployment:
- Node hosting: upload the full folder, run `npm start`, and point the domain to the Node app.
- PHP/Apache hosting: upload the full folder. The `api/index.php` backend and `.htaccess` files are included for normal webhosting uploads. Make sure the `data` folder is writable.
- Static-only hosting is not enough for publishing or contact messages, because those features need the backend.

For production, set `CYRI_PUBLISH_PASSWORD` or `CYRI_PUBLISH_PASSWORD_HASH` in the server environment instead of relying on the local default.

Photo sources:
- `assets/photos/coral-reef-bleaching-hd.jpg`: Jay Galvin via Wikimedia Commons, CC BY 2.0.
- `assets/photos/ocean-plastic-hd.jpg`: Kevin Krejci via Wikimedia Commons, CC BY 2.0.
- `assets/photos/mangrove-forest-hd.jpg`: Emonjnu via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/aletsch-glacier-hd.jpg`: Gzzz via Wikimedia Commons, CC BY-SA 4.0.
- `assets/photos/offshore-wind-hd.jpg`: U.S. Department of Energy via Wikimedia Commons, public domain.
