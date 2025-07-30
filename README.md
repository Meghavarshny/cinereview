# MovieSearchApp:

A full-featured React application that allows users to search for movies using the OMDB API. Users can view detailed movie information, browse paginated results, filter by type (movie, series, episode), and manage a list of favorites.


## Features

1.Search movies using the OMDB API  
2.View detailed movie info like cast, plot, rating, etc.  
3.Paginated search results  
4.Dropdown filter by type (movie/series/episode) *(without using `array.filter()`)*  
5.Favorite list management  
6.Responsive and modern UI using **Tailwind CSS**  
7.Routing between search and detail pages using **React Router**  
8.Error handling and user-friendly messages  


## Technologies Used

- **ReactJS**
- **React Router**
- **Tailwind CSS**
- **OMDB API**
- **JavaScript (ES6+)**
- **HTML/CSS**



##  Project Structure:

```bash
movie-search-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── omdbService.js        # API integration logic
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Pagination.jsx
│   │   └── FilterDropdown.jsx
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   └── MovieDetail.jsx
│   ├── App.jsx
│   ├── index.js
│   └── App.css
├── .env                         # API Key stored here
├── tailwind.config.js
└── README.md
