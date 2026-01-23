# Age Calculator - Installation & Setup Guide

## Quick Start

Follow these steps to get the Age Calculator running on your system.

### Prerequisites

- Node.js (v14.0 or higher)
- npm (comes with Node.js)

### Step 1: Navigate to Project Directory

```bash
cd "c:\Users\lokes\Desktop\Frontend_roadmap\Age_Calculator"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will download and install:
- **luxon** (v3.4.1) - For precise date calculations
- **flatpickr** (v4.6.13) - For the custom date picker
- Webpack and build tools

### Step 3: Start Development Server

```bash
npm start
```

OR

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:8080`

### Step 4: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder with all files ready for deployment.

## Verifying Installation

After running `npm install`, you should see:

```
node_modules/
├── luxon/
├── flatpickr/
├── webpack/
└── ... other dependencies
```

And `package-lock.json` should be created.

## Troubleshooting

### Issue: "npm: command not found"

**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 8080 already in use

**Solution**: Edit `webpack.config.js` and change the port:

```javascript
devServer: {
    port: 3000, // Try 3000, 8081, or any available port
}
```

### Issue: Module not found errors

**Solution**: 

```bash
npm cache clean --force
rm node_modules -r
rm package-lock.json
npm install
```

## File Structure After Installation

```
Age_Calculator/
├── src/
│   ├── index.html         # App structure
│   ├── index.js          # Main logic with AgeCalculator class
│   └── style.css         # Styles and responsive design
├── dist/                 # Generated after build
│   ├── index.html
│   ├── main.js
│   └── main.js.map
├── node_modules/         # Dependencies (created by npm install)
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
├── webpack.config.js     # Build configuration
└── README.md            # Documentation
```

## Key NPM Scripts

```bash
npm start      # Start dev server with hot reload
npm run dev    # Same as npm start
npm run build  # Create production build
```

## Using the Application

1. **Open browser** to `http://localhost:8080`
2. **Click the date input field** to open Flatpickr calendar
3. **Select your birth date** by clicking on it
4. **Click "Calculate Age" button**
5. **View results** showing your exact age and statistics

## Features Included

✅ Flatpickr custom date picker (not HTML default)
✅ Luxon library for calculations
✅ Years, months, and days calculation
✅ Total days and hours lived
✅ Next birthday countdown
✅ Form validation
✅ Error messages
✅ Responsive design
✅ Dark mode support

## Development Tips

### Hot Reload
While `npm start` is running, changes to any file in `src/` are automatically compiled and the browser refreshes.

### Console Debugging
The AgeCalculator instance is available globally:

```javascript
// In browser console:
ageCalculator.birthDate           // View selected birth date
ageCalculator.calculateAge()      // Get age calculation
ageCalculator.resetCalculator()   // Reset form
```

### Modifying Datepicker
Edit the Flatpickr options in `src/index.js`:

```javascript
flatpickr(this.birthdatePicker, {
    mode: 'single',
    maxDate: today,
    yearRange: [1900, today.getFullYear()],
    // ... customize as needed
});
```

## Next Steps

1. ✅ Install and run the project
2. ✅ Test with different birth dates
3. ✅ Customize colors in `style.css`
4. ✅ Modify validation rules in `index.js`
5. ✅ Build for production with `npm run build`
6. ✅ Deploy the `dist/` folder to hosting

## Need Help?

- Check `README.md` for feature documentation
- Review comments in `src/index.js` for code explanations
- Check browser console for error messages
- Verify Node.js and npm are installed: `node --version` and `npm --version`

Happy coding! 🎂📅
