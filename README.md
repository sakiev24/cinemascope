# CinemaScope

A movie discovery app inspired by Letterboxd. Browse trending films, view details, and write reviews that save directly to your browser.

## Features

- **Browse Movies:** View trending and popular films.
- **Search:** Find specific movies by title.
- **Reviews:** Write star-rated reviews.
- **Local Persistence:** Reviews are saved to Local Storage, so they survive page reloads.
- **Dark Mode:** Clean, cinematic interface.

## API Used

- **TMDB API:** Used for all movie data (titles, posters, details).
  - Documentation: [https://developer.themoviedb.org/docs](https://developer.themoviedb.org/docs)

## Tech Stack

- **React / TypeScript:** Frontend framework and type safety.
- **Vite:** Build tool.
- **Tailwind CSS:** Styling.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Letterboxd
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Create a `.env` file and add your TMDB API key:
    ```
    VITE_TMDB_API_KEY=your_key_here
    ```

4.  **Start the app:**
    ```bash
    npm run dev
    ```

## Known Limitations

- **Browser Storage Only:** Reviews are stored on your specific device and browser. They are not shared with other users or devices.
- **No User Accounts:** There is no login system; anyone using the browser can see the reviews stored there.
- **Read-Only Movie Data:** Movie information comes from TMDB and cannot be edited.
