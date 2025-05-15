# Spotify Profile

A modern web application that displays your Spotify profile information, including your top tracks, built with React, TypeScript, and Tailwind CSS.

## Features

- 🎵 View your top tracks
- 🎨 Modern and responsive UI
- 🔒 Secure Spotify authentication
- ⚡ Fast and efficient with React Query
- 🎯 Type-safe with TypeScript

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Spotify Web API

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- pnpm (v8 or higher)
- A Spotify Developer account and application

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spotify-profile.git
cd spotify-profile
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with your Spotify credentials:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
spotify-profile/
├── src/
│   ├── api/          # API calls and utilities
│   ├── components/   # React components
│   ├── pages/        # Page components
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
└── ...config files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
