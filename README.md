# 🎬 CinemaScope

A Letterboxd-inspired movie review platform built with React, TypeScript, and the TMDB API. Track films you've watched, discover new movies, and share your reviews with the community.

## 📋 Project Description

CinemaScope is a modern web application that allows users to browse popular films, search for specific movies, filter by genre, and write reviews. The app features a sleek, cinematic dark theme inspired by Letterboxd's design language, with a focus on letting movie posters shine.

### Main Features

- **Browse Popular Films** - Discover trending movies in a responsive poster grid
- **Search & Filter** - Find films by title or filter by genre
- **Movie Details** - View comprehensive information about each film including ratings, overview, and release date
- **Community Reviews** - Read and write reviews with star ratings
- **Dark Theme** - Cinematic dark mode with authentic Letterboxd color palette
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

## 🔌 API Used

### TMDB API (The Movie Database)
- **Purpose**: Fetching movie data (trending films, search, details, genres)
- **Documentation**: [https://developer.themoviedb.org/docs](https://developer.themoviedb.org/docs)
- **Type**: Read-only (GET requests)

### JSON Server (Mock API)
- **Purpose**: Local mock API for CRUD operations on reviews
- **Documentation**: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
- **Type**: Full CRUD (Create, Read, Update, Delete)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### API & Data
- **Axios** - HTTP client for API requests
- **TMDB API** - Movie database
- **JSON Server** - Mock REST API for reviews

### Styling
- **Inter Font** - Typography (similar to Letterboxd's Graphik)
- **Custom Color Palette** - Authentic Letterboxd colors (#14171C, #FF8000, #00E054)

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API key (free)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Letterboxd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a TMDB API key**
   - Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Create a free account
   - Navigate to Settings → API
   - Request an API key (choose "Developer" option)
   - Copy your API key

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   VITE_MOCK_API_URL=http://localhost:3001
   ```

5. **Start the development servers**
   
   Open **two terminal windows**:
   
   **Terminal 1 - Mock API Server:**
   ```bash
   npm run api
   ```
   This starts the JSON Server on `http://localhost:3001`
   
   **Terminal 2 - React App:**
   ```bash
   npm run dev
   ```
   This starts the Vite dev server on `http://localhost:5173`

6. **Open the application**
   - Navigate to `http://localhost:5173` in your browser
   - The app should load with the CinemaScope interface

### Available Scripts

- `npm run dev` - Start development server
- `npm run api` - Start mock API server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## ⚠️ Known Limitations

### API Limitations
- **TMDB Rate Limits** - Free tier has request limits (40 requests per 10 seconds)
- **Mock API Persistence** - Reviews are stored locally in `db.json` and will be lost if the file is deleted
- **No Authentication** - No user accounts or authentication system
- **No Backend** - Reviews are stored locally; not shared across devices

### Feature Limitations
- **No User Profiles** - Cannot create personal accounts or profiles
- **No Lists** - Cannot create custom movie lists or watchlists
- **No Social Features** - No following users, likes, or comments on reviews
- **Limited Review Features** - Cannot edit or delete reviews after submission
- **No Image Upload** - Cannot upload custom profile pictures or images

### Technical Limitations
- **Client-Side Only** - All data processing happens in the browser
- **No Offline Support** - Requires internet connection to fetch movie data
- **Browser Storage** - Reviews limited by JSON Server's file-based storage
- **No Real-Time Updates** - Reviews don't update in real-time across tabs

### Design Limitations
- **Desktop-First** - Optimized for desktop viewing; mobile experience is functional but not as polished
- **Single Theme** - Only dark mode available (light mode exists but not fully optimized)

## 📝 Future Improvements

- Implement user authentication and profiles
- Add ability to edit/delete reviews
- Create watchlist and favorites functionality
- Add pagination for large movie lists
- Implement real backend with database
- Add social features (follow users, like reviews)
- Improve mobile responsiveness
- Add movie recommendations based on ratings

## 📄 License

This project is for educational purposes only.

## 🙏 Acknowledgments

- Design inspired by [Letterboxd](https://letterboxd.com/)
- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Built as a front-end development project
