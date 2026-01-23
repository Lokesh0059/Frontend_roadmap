# Age Calculator - Quick Start Guide

## ✅ Installation Complete!

The Age Calculator project has been successfully set up with all npm dependencies installed.

### Installed Dependencies

- **luxon** (3.4.1) - For precise date/time calculations
- **flatpickr** (4.6.13) - Custom datepicker component
- **webpack** & **webpack-cli** - Module bundler
- **webpack-dev-server** - Development server
- **html-webpack-plugin** - HTML generation
- **style-loader & css-loader** - CSS processing

### Quick Start Commands

```bash
# Navigate to the project
cd "C:\Users\lokes\Desktop\Frontend_roadmap\Age_Calculator"

# Start development server (recommended)
npm start

# Or use:
npm run dev

# Build for production
npm run build
```

## What This Project Does

1. **Custom Date Picker**: Users select their birth date using Flatpickr (not the default HTML date picker)
2. **Age Calculation**: Uses Luxon library to calculate exact age in:
   - Years
   - Months
   - Days
   - Total days lived
   - Total hours lived
   - Days until next birthday

3. **Validation**: Ensures birth date is:
   - Valid and properly formatted
   - In the past (not future)
   - Reasonable (after 1900)

4. **Responsive Design**: Works on desktop, tablet, and mobile

## Project Structure

```
Age_Calculator/
├── src/
│   ├── index.html         # HTML structure with form and results
│   ├── index.js          # Main application with AgeCalculator class
│   └── style.css         # Responsive styling + dark mode
├── dist/                 # Build output (created by webpack)
├── node_modules/         # Dependencies (created by npm install)
├── package.json          # Project config
├── webpack.config.js     # Build configuration
├── README.md             # Full documentation
├── SETUP.md              # Setup instructions
└── .gitignore           # Git ignore rules
```

## File Descriptions

### `src/index.html`
- Form with Flatpickr datepicker
- Results display section
- Additional info (total days, hours, next birthday)
- Features showcase section

### `src/index.js`
- **AgeCalculator class** with methods:
  - `init()` - Initialize datepicker and listeners
  - `handleFormSubmit()` - Process form submission
  - `calculateAge()` - Use Luxon for exact age calculation
  - `calculateStatistics()` - Extra info (next birthday, total hours, etc.)
  - `validateDate()` - Validate birth date input
  - `resetCalculator()` - Clear form and results
- Uses Luxon's `DateTime` and `diff()` for precise calculations
- Integrates Flatpickr for date selection

### `src/style.css`
- Modern gradient background
- Responsive grid layouts
- Mobile-first design
- Dark mode support (@media prefers-color-scheme: dark)
- Smooth animations and transitions
- Flatpickr custom styling

## How to Use

1. **Open the app**: Run `npm start` and browser opens to `http://localhost:8080`
2. **Select birth date**: Click input field, Flatpickr calendar appears
3. **Calculate**: Click "Calculate Age" button
4. **View results**: See years, months, days, and additional statistics
5. **Reset**: Click "Calculate Another Age" to try again

## Key Features

✅ **Custom Datepicker** - Flatpickr, not HTML default
✅ **Luxon Calculations** - Accurate date math
✅ **Complete Results** - Years, months, days, total days, total hours, next birthday
✅ **Validation** - Prevents invalid dates
✅ **Responsive** - Mobile, tablet, desktop
✅ **Dark Mode** - Auto-adjusts to system preference
✅ **No Framework Dependencies** - Pure vanilla JavaScript + libraries
✅ **Webpack Bundled** - Production-ready setup

## Customization Ideas

### Change Colors
Edit `src/style.css` gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Datepicker Range
Edit `src/index.js` Flatpickr options:
```javascript
yearRange: [1900, today.getFullYear()],
```

### Add More Statistics
Extend `calculateStatistics()` method in `src/index.js`

## Troubleshooting

**Port 8080 in use?**
Edit `webpack.config.js`, change `port: 8080` to another number like 3000

**Dependencies not working?**
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

**Need production build?**
```bash
npm run build
# Creates optimized files in dist/ folder
```

## Next Steps

1. ✅ Run `npm start` to see it in action
2. ✅ Try different birth dates
3. ✅ Inspect the code in `src/index.js` to learn Luxon
4. ✅ Modify styling in `src/style.css`
5. ✅ Build with `npm run build` when ready to deploy

## Technology Stack

- **Luxon** - Date/time library (similar to Moment.js but modern)
- **Flatpickr** - Lightweight datepicker (4KB, no dependencies)
- **Webpack** - Module bundler and dev server
- **ES6+** - Modern JavaScript
- **CSS3** - Flexbox, Grid, animations

## Console Commands (when app is running)

Open browser console and try:

```javascript
// View current birth date
ageCalculator.birthDate

// Manually calculate age
ageCalculator.calculateAge()

// Get open panel index
ageCalculator.getOpenPanelIndex()

// Reset the calculator
ageCalculator.resetCalculator()
```

## Learning Resources

- **Luxon Docs**: https://moment.github.io/luxon/
- **Flatpickr Docs**: https://flatpickr.js.org/
- **Webpack Docs**: https://webpack.js.org/

---

**Happy coding!** 🎂📅

For detailed documentation, see `README.md` and `SETUP.md`
