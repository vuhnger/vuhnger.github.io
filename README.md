# Victor Uhnger Portfolio

Personal portfolio website showcasing my work experience, projects, and activities.

## Live Site

🌐 [vuhnger.dev](https://vuhnger.dev)

## Features

- **Personal Information**: Work experience timeline and background
- **Projects**: Showcase of development projects
- **Strava Integration**: Real-time running and cycling statistics from Strava API
- **GitHub Activity**: Contribution calendar showing coding activity
- **Beer Stats**: Untappd integration for beer check-ins
- **Spotify Stats**: Currently listening statistics

## Tech Stack

- **Framework**: React 17
- **Language**: TypeScript
- **Styling**: Bootstrap 5, React Bootstrap
- **Build Tool**: react-scripts (Create React App)
- **Routing**: React Router v6
- **Visualizations**: react-github-calendar, custom D3.js components
- **Backend API**: FastAPI (Python) - [api.vuhnger.dev](https://api.vuhnger.dev)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vuhnger/vuhnger.github.io.git
cd vuhnger.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```bash
REACT_APP_API_URL=https://api.vuhnger.dev
```

### Development

Start the development server:
```bash
npm start
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

The build output will be in the `build/` directory.

### Deployment

This site is deployed to GitHub Pages. To deploy:

1. Ensure you're on the `main` branch
2. Build the production bundle:
```bash
npm run build
```
3. Commit and push changes:
```bash
git add .
git commit -m "Update site"
git push origin main
```

GitHub Actions will automatically deploy the site to GitHub Pages.

## Project Structure

```
vuhnger.github.io/
├── public/              # Static assets
├── src/
│   ├── Assets/         # Images, icons, SVGs
│   ├── components/     # React components
│   │   ├── About/      # About page with Strava stats
│   │   ├── Home/       # Landing page
│   │   ├── Projects/   # Projects showcase
│   │   ├── Navbar/     # Navigation bar
│   │   └── ...         # Other components
│   ├── services/       # API service layer
│   │   └── stravaService.ts  # Strava API integration
│   ├── App.tsx         # Main app component
│   └── index.tsx       # Entry point
├── .env               # Environment variables (not committed)
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Backend API

The site integrates with a custom backend API for:
- **Strava OAuth**: Handles authentication and token refresh
- **Data Caching**: Caches Strava stats to reduce API calls
- **Statistics Processing**: Aggregates activity data

Backend repository: Private (FastAPI + PostgreSQL)

API endpoints:
- `GET /strava/stats/ytd` - Year-to-date statistics
- `GET /strava/stats/activities` - Recent activities (last 30)
- `GET /strava/stats/monthly` - Monthly aggregated statistics
- `POST /strava/refresh-data` - Manually trigger data refresh (requires API key)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build production bundle |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App |

## Contributing

This is a personal portfolio project and is not accepting contributions.

## License

© 2025 Victor Rørslett Uhnger. All rights reserved.

## Contact

- **Email**: victor.uhnger@gmail.com
- **LinkedIn**: [Victor Uhnger](https://www.linkedin.com/in/victor-uhnger/)
- **GitHub**: [@vuhnger](https://github.com/vuhnger)
- **Strava**: [Victor Uhnger](https://www.strava.com/athletes/34349129)
