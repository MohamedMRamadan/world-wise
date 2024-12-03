<h1 align="center">🌐 The World Wise 🌐 </h1> 

<div align="center">
<img src="https://img.shields.io/npm/v/npm.svg?logo=npm"/>
<img src="https://img.shields.io/badge/react-v18.2.0-blue?logo=react"/>
<img src="https://img.shields.io/badge/reactrouterdom-v6.20.1-red?logo=reactrouter"/>
<img src="https://img.shields.io/badge/leaflet-v1.9.4-green?logo=leaflet"/>
</div>  

<p align="center">WorldWise is an interactive web application built with React that allows users to explore cities, register visited locations, and manage their personal city collection. The app features map-based navigation, geolocation support, and user authentication to personalize the experience.
</p>

</br>

## Authentication

- **Protected Routes**: Certain routes, such as the city management interface, are protected and require user login.
- **FakeAuthContext**: Provides basic login/logout functionality, allowing access to secure areas of the application.

## How It Works

1. **Map Interaction**: Users can click on any city or country on the map to add it to their list.
2. **Geolocation**: Clicking "Use your position" will fetch the user's current location and display it on the map.
3. **URL Positioning**: Users can share a link with specific latitude and longitude, and the map will center on those coordinates.
4. **Authentication**: Only logged-in users can add cities or view their city lists. Non-authenticated users are prompted to log in.
   
## Technologies Used

- **React**: Core library for building user interfaces.
- **React Router**: Handles navigation and routing across pages.
- **Context API**: For state management and sharing data across components.
- **useReducer & useContext**: Manages complex state logic and access to global state.
- **React Hooks**: Custom hooks for URL handling and geolocation features.
- **Leaflet**: Interactive maps for city selection and map-based operations.
- **OpenStreetMap**: Provides map tiles and data.
- **CSS Modules**: Ensures that styles are scoped locally to each component.
- **JavaScript (ES6+)**: Modern JavaScript syntax and features.
- **Lazy Loading (React Suspense)**: Dynamically load components like pages to optimize performance.

## Quick Start

To clone and run this application, you'll need [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```
# Clone this repository 
$ git clone https://github.com/MohamedMRamadan/world-wise.git

# Go into the repository
$ cd WorldWise

# Install dependencies
$ npm install

# Run the app
$ npm run start
```

> [!NOTE]  
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Video

https://github.com/MohamedMRamadan/world-wise/assets/80196691/328e8195-1e75-40ae-8057-b5afdc90cd23

## Future Enhancements

- Integration with a real authentication service (OAuth or Firebase).
- Adding features like city ratings, reviews, and sharing visited cities with friends.
- Performance improvements for handling large datasets of cities.

