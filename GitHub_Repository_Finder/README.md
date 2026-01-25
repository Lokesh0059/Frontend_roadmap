# GitHub Repository Finder

A modern web application that allows users to discover random GitHub repositories by programming language using the GitHub API.

## Features

- **Language Selection**: Choose from 12 popular programming languages
- **Random Repository Discovery**: Fetches random repositories matching the selected language
- **Multiple UI States**: 
  - Empty state (initial)
  - Loading state with spinner
  - Error state with retry option
  - Success state with repository details
- **Repository Information**: Display name, description, stars, forks, and open issues
- **Refresh Functionality**: Get another random repository with a button click
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
GitHub_Repository_Finder/
├── index.html          # HTML structure with multiple states
├── style.css           # Styling and animations
├── script.js           # JavaScript logic and API calls
└── README.md           # Documentation
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, animations, gradients
- **JavaScript**: ES6+, async/await, fetch API
- **GitHub API**: Repository search endpoint

## How It Works

1. **Language Selection**: User selects a programming language from the dropdown
2. **API Request**: Application sends a request to GitHub's repository search API
3. **State Management**: UI transitions through loading, success, or error states
4. **Display Results**: Shows a random repository with relevant statistics
5. **Refresh Option**: Users can fetch another repository or select a different language

## UI States

### Empty State
- Initial state when the page loads
- Prompts user to select a language

### Loading State
- Displayed while fetching data from GitHub API
- Shows animated loading spinner
- Select dropdown is disabled

### Error State
- Displayed when API request fails
- Shows error message
- Includes "Click to retry" button
- Select dropdown is disabled

### Success State
- Displays the fetched repository
- Shows repository name (as clickable link), description
- Displays statistics: stars, forks, open issues
- Includes "Refresh" button for another repository

## API Used

**GitHub Repository Search API**
- Endpoint: `https://api.github.com/search/repositories`
- Query: `language:{language} stars:>1000 sort:stars`
- Returns repositories with over 1000 stars, sorted by popularity

## Getting Started

1. Open `index.html` in a web browser
2. Select a programming language from the dropdown
3. Wait for the repository to load
4. Click "Refresh" to get another repository or select a different language

## Features Implemented

✅ External API Integration (GitHub API)
✅ Asynchronous Request Handling (async/await)
✅ Multiple UI States (empty, loading, error, success)
✅ Error Handling with Retry
✅ Number Formatting (K for thousands, M for millions)
✅ Responsive Design
✅ Loading Animation
✅ Click to open repository on GitHub
✅ Random Repository Selection
✅ Language Selection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The application fetches repositories with over 1000 stars to ensure quality results
- GitHub API has rate limits (60 requests per hour for unauthenticated requests)
- Repository descriptions may not always be available for all repositories
