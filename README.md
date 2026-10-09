# Smart Waste Segregation and Recycling Dashboard

A responsive front-end prototype for a municipal waste monitoring dashboard.

## Features
- KPI cards for monitored bins, pickup needs, collected waste, and recycling efficiency
- Waste category breakdown with period selector
- Priority alerts for high-fill bins
- Searchable and filterable smart-bin table
- Suggested collection priority list
- Illustrative environmental impact metrics
- CSV export for the demo bin data
- Responsive layout for desktop and mobile

## Run locally
No build tools are required. Open `index.html` in a web browser.

For a local development server, you can use VS Code Live Server or run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Publish on GitHub
1. Create or open your GitHub repository.
2. Choose **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
4. Click **Commit changes**.
5. To host this static prototype, open **Settings → Pages**, select the `main` branch and `/ (root)` folder, and save.

## Important notes
This is a newly prepared starter implementation based on the project description, not a download or exact copy of the code used by the existing Bolt-hosted website. Bin values, collection priorities, and environmental impact values are sample/demo data. They are not connected to real sensors, a database, GPS, or a backend. Replace them with verified project data before presenting results as real.
