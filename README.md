# Tick Tock Timepieces

## Overview
A React-based e-commerce admin portal for a premium watch store. Users can browse watches, search and filter by brand, and administrators can add new watches and update prices through the admin portal.

## Setup

1. Fork and clone this repo
2. Run `npm install`
3. Run `npm run server` to start the backend at `http://localhost:6001`
4. In another terminal, run `npm run dev` to start the app at `http://localhost:5173`
5. Run `npm test` to run the test suite

## Features

- **Home** — landing page introducing the store
- **Shop** — browse all watches, search by name, and filter by brand
- **Admin Portal** — add new watches via form (POST) and update watch prices (PATCH)

## Hooks Used

- `useState` — manages form inputs, search query, and brand filter state
- `useEffect` — fetches watch data on component mount inside the custom hook
- `useRef` — persists a reference to the search input without causing re-renders
- `useId` — generates unique accessible IDs for form label/input pairs
- `useFetch` — custom hook that handles data fetching and loading state

## Routes

- `/` — Home page
- `/shop` — Shop page
- `/admin` — Admin Portal

## Component Structure

- `App` — sets up BrowserRouter and all routes
- `NavBar` — navigation links across all pages
- `Home` — hero landing page
- `Shop` — watch grid with search and brand filter sidebar
- `WatchCard` — displays individual watch details
- `AdminPortal` — form to add watches and list to edit prices
- `useFetch` — custom hook for data fetching

## CRUD Operations

- **GET** — fetches all watches on page load
- **POST** — adds a new watch via the admin form
- **PATCH** — updates an existing watch's price

## Testing

Tests are written with Vitest and React Testing Library covering:
- Display watches on page load
- Add a new watch via form submission
- Search and filter watches dynamically

## Technologies

- React
- React Router v6
- Vite
- JSON Server
- Vitest
- React Testing Library