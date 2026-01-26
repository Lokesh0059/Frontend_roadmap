# Custom Dropdown Menu Component

A fully functional, accessible dropdown menu component with multiple states and comprehensive event handling. Built with vanilla JavaScript, HTML, and CSS.

## Features

### ✨ Component States
- **Default State**: Closed dropdown with placeholder text
- **Open State (No Selection)**: Menu expanded showing all available options
- **Open State (With Selection)**: Selected item highlighted with checkmark
- **Selected State**: Chosen item displayed in trigger button, dropdown closes automatically

### 🎯 Core Functionality
- **Toggle Dropdown**: Click trigger to open/close menu
- **Item Selection**: Click any item to select it
- **Auto-Close**: Dropdown closes after item selection
- **Visual Feedback**: Selected item highlighted with checkmark and color change
- **Click Outside**: Dropdown closes when clicking outside the component
- **Smooth Animations**: Polished transitions for opening/closing and state changes

### ⌨️ Keyboard Navigation
- `Enter` or `Space`: Toggle dropdown / Select item
- `Arrow Down`: Open dropdown / Navigate to next item
- `Arrow Up`: Navigate to previous item
- `Escape`: Close dropdown
- `Home`: Jump to first item
- `End`: Jump to last item
- `Type Letter`: Search and jump to item starting with typed letter

### 📱 Responsive Design
- Adapts seamlessly to mobile and tablet screens
- Touch-friendly click targets
- Optimized scrolling for long lists
- Respects reduced motion preferences

### ♿ Accessibility
- ARIA attributes for screen readers
- Semantic HTML structure
- Keyboard navigation support
- Focus management
- High contrast colors
- Focus visible indicators

## File Structure

```
Dropdown_menu/
├── dropdown.html      # HTML structure with multiple state examples
├── dropdown.css       # Styling for all states and animations
└── dropdown.js        # JavaScript class and event handlers
```

## How to Use

### Basic Implementation

1. **Include the files** in your HTML:
```html
<link rel="stylesheet" href="dropdown.css">
<script src="dropdown.js"></script>
```

2. **Create a dropdown element**:
```html
<div class="dropdown" id="myDropdown">
    <button class="dropdown-trigger">
        <span class="dropdown-text">Select an Item</span>
        <span class="dropdown-icon">▼</span>
    </button>
    <div class="dropdown-menu">
        <div class="dropdown-item" data-value="first">First item</div>
        <div class="dropdown-item" data-value="second">Second item</div>
        <div class="dropdown-item" data-value="third">Third item</div>
    </div>
</div>
```

3. **The component auto-initializes** when the DOM is ready!

### JavaScript API

The `DropdownMenu` class provides methods for programmatic control:

```javascript
const dropdown = new DropdownMenu(document.querySelector('.dropdown'));

// Get selected value
const value = dropdown.getSelectedValue();

// Set value programmatically
dropdown.setValue('second');

// Reset dropdown
dropdown.reset();

// Toggle open/close
dropdown.toggleDropdown();

// Open dropdown
dropdown.openDropdown();

// Close dropdown
dropdown.closeDropdown();
```

### Custom Events

Listen for selection changes:

```javascript
document.getElementById('myDropdown').addEventListener('dropdown-change', (e) => {
    console.log('Selected:', e.detail.label);
    console.log('Value:', e.detail.value);
});
```

## DOM Manipulation Techniques Used

1. **DOM Querying**
   - `querySelector()` and `querySelectorAll()` for element selection
   - `getElementsByClassName()` for class selection

2. **DOM Modification**
   - `classList.add()` / `classList.remove()` for state management
   - `textContent` for updating text dynamically
   - `setAttribute()` for ARIA attributes

3. **Event Handling**
   - `addEventListener()` for multiple event types
   - Event delegation for item clicks
   - Custom events with `CustomEvent`

4. **DOM Traversal**
   - `parentElement` for accessing parent nodes
   - `contains()` for click-outside detection
   - Array methods with `Array.from()` for node lists

## Event Handling Features

### Click Events
- **Trigger Click**: Toggle dropdown visibility
- **Item Click**: Select item and close dropdown
- **Document Click**: Close dropdown on outside clicks

### Keyboard Events
- **keydown** on trigger: Open/toggle dropdown
- **keydown** on items: Navigate and select
- **Type-to-search**: Jump to items by first letter

### Custom Events
- **dropdown-change**: Fired when item is selected with detail object

## State Management

The component manages three main states:

```javascript
// Default state
{
    isOpen: false,
    selectedValue: null,
    classList: ['dropdown']
}

// Open state
{
    isOpen: true,
    selectedValue: null,
    classList: ['dropdown', 'open']
}

// Selected state
{
    isOpen: false,
    selectedValue: 'third',
    classList: ['dropdown'],
    selectedItem: HTMLElement with 'selected' class
}
```

## Styling Customization

### CSS Variables (Add to dropdown.css)
```css
:root {
    --primary-color: #667eea;
    --primary-dark: #5568d3;
    --border-color: #ddd;
    --hover-bg: #f0f0ff;
    --selected-bg: #f0f0ff;
}
```

### Key CSS Classes
- `.dropdown` - Container
- `.dropdown.open` - Open state
- `.dropdown-trigger` - Button element
- `.dropdown-menu` - Menu container
- `.dropdown-item` - Individual item
- `.dropdown-item.selected` - Selected item
- `.dropdown-item:hover` - Hover state

## Demo States

The HTML file includes four demonstrations:

1. **Default State** - Closed dropdown with placeholder
2. **Open State (No Selection)** - Menu expanded
3. **Open State (With Selection)** - Item selected and highlighted
4. **Interactive Dropdown** - Fully functional example with info display

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Considerations

- Uses event delegation where possible
- Efficient DOM queries with `querySelector`
- CSS transitions for smooth animations
- No external dependencies

## Accessibility Features

✓ ARIA labels and expanded state  
✓ Semantic HTML  
✓ Keyboard navigation support  
✓ Focus management  
✓ Screen reader friendly  
✓ High contrast colors  
✓ Respects prefers-reduced-motion  

## Common Use Cases

- Form field selection
- Navigation menus
- Filtering options
- Settings panels
- Select alternatives in web apps

## Tips & Tricks

1. **Disable a dropdown**: Add `disabled` attribute to trigger button
2. **Pre-select an item**: Add `selected` class to desired item in HTML
3. **Custom styling**: Override CSS variables or create custom classes
4. **Dynamic items**: Manipulate DOM and the component adapts
5. **Close on selection**: Automatic (built-in)

## Troubleshooting

**Dropdown not opening?**
- Check if JavaScript file is loaded
- Verify HTML structure matches expected format
- Check browser console for errors

**Keyboard navigation not working?**
- Ensure focus is on dropdown trigger or item
- Check if other libraries override event handlers

**Styling issues?**
- Clear browser cache
- Check CSS file is linked
- Verify no conflicting CSS rules

## License

Free to use and modify for personal and commercial projects.
