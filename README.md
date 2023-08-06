# Jammming - Build and Save Custom Playlists with Spotify

Jammming is a React web application that allows users to search the Spotify library, create custom playlists, and save them to their personal Spotify accounts. With Jammming, users can easily discover and organize their favorite songs in personalized playlists.

![Preview of Jammming](https://danielnmyers.com/images/jammming.png)

## Table of Contents

    Project Overview
    Technologies Used
    Features
    Future Work
    Getting Started
    Contributing
    License

## Project Overview

Jammming was developed as my capstone project for Codecademy's React skill path. The goal of the project was to utilize React components, state management, and API integration to create a functional and user-friendly web application.

The main features of Jammming include:

- Search: Users can search for songs in the Spotify library by song title, artist name, genre, and more.
- Song Information: Jammming displays detailed information about each song, including title, artist, and album.
- Custom Playlists: Users can create their own custom playlists by adding songs from the search results.
- Spotify Integration: The application integrates with the Spotify API to authenticate users and save their custom playlists to their personal Spotify accounts.

## Technologies Used

The following technologies were used in the development of Jammming:

- HTML
- CSS
- JavaScript
- React
- Spotify API (for data retrieval and authentication)

## Features

    - Search for Songs: Users can search for songs by entering song titles, artist names, genres, or any other relevant criteria.
    - Song Information: The application displays detailed information about each song, including title, artist, and album.
    - Custom Playlists: Users can add songs to their custom playlists by selecting them from the search results.
    - Export to Spotify: Once users have created their custom playlist, they can export it directly to their personal Spotify account.
    - Responsive Design: Jammming is designed to be fully responsive, providing an optimal user experience across different devices and screen sizes.

## Future Work

Here are some potential areas for future enhancement and development of Jammming:

	- Song Previews: Include preview samples for each track
    - Search Results: Only display songs not currently present in the playlist in the search results
    - Loading Screen: Add a loading screen while playlist is saving
    - Access Token Expiration: Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
    - Restore Search Term: After user redirect on login, restoring the search term from before the redirect
    - Retain Playlist: Ensure playlist information doesn’t get cleared if a user has to refresh their access token
    - Existing Playlists: Provide a way to fetch and see all your existing playlists
    - User Authentication: Implement user authentication functionality to allow users to create and manage their own accounts within the application.
    - Playlist Sharing: Enable users to share their custom playlists with others through social media platforms or direct links.
    - Additional Music Sources: Expand the application's capabilities by integrating with other music streaming services, allowing users to search and add songs from multiple sources.

## Getting Started

To get a local copy of Jammming up and running, follow these steps:

    1. Clone the repository: git clone https://github.com/dnmyers/jammming.git
    2. Install the dependencies: npm install
    3. Obtain a Spotify API key and configure it in your project.
    4. Start the development server: npm run dev
    5. Open your browser and navigate to http://localhost:5173 to access Jammming.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

## License
This project is licensed under the MIT License. Feel free to modify and distribute it as needed.
