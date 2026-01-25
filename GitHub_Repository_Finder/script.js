// Language to GitHub search term mapping
const languageMap = {
    javascript: 'language:javascript',
    python: 'language:python',
    java: 'language:java',
    cpp: 'language:c++',
    csharp: 'language:csharp',
    ruby: 'language:ruby',
    go: 'language:go',
    rust: 'language:rust',
    typescript: 'language:typescript',
    php: 'language:php',
    kotlin: 'language:kotlin',
    swift: 'language:swift'
};

// State management
let currentState = 'empty';
let currentLanguage = '';
let currentRepository = null;

// DOM Elements
const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const successState = document.getElementById('successState');

const primarySelect = document.getElementById('languageSelect');
const loadingSelect = document.getElementById('languageSelect2');
const errorSelect = document.getElementById('languageSelect3');
const successSelect = document.getElementById('languageSelect4');

const retryBtn = document.getElementById('retryBtn');
const refreshBtn = document.getElementById('refreshBtn');
const repositoryInfo = document.getElementById('repositoryInfo');

// Event listeners
primarySelect.addEventListener('change', handleLanguageSelect);
retryBtn.addEventListener('click', handleLanguageSelect);
refreshBtn.addEventListener('click', fetchRandomRepository);

// Handle language selection
function handleLanguageSelect() {
    const selectedLanguage = primarySelect.value;
    
    if (!selectedLanguage) {
        setState('empty');
        return;
    }
    
    currentLanguage = selectedLanguage;
    fetchRandomRepository();
}

// Set application state
function setState(newState) {
    currentState = newState;
    
    // Hide all states
    emptyState.classList.remove('active');
    loadingState.classList.remove('active');
    errorState.classList.remove('active');
    successState.classList.remove('active');
    
    // Show active state
    switch(newState) {
        case 'empty':
            emptyState.classList.add('active');
            primarySelect.value = '';
            break;
        case 'loading':
            loadingState.classList.add('active');
            loadingSelect.value = currentLanguage;
            break;
        case 'error':
            errorState.classList.add('active');
            errorSelect.value = currentLanguage;
            break;
        case 'success':
            successState.classList.add('active');
            successSelect.value = currentLanguage;
            break;
    }
}

// Fetch random repository from GitHub API
async function fetchRandomRepository() {
    if (!currentLanguage) return;
    
    setState('loading');
    
    try {
        // Use GitHub API with pagination to get random results
        const page = Math.floor(Math.random() * 10) + 1;
        const perPage = 100;
        
        const query = `${languageMap[currentLanguage]} stars:>1000 sort:stars`;
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}&page=${page}`;
        
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            throw new Error('No repositories found');
        }
        
        // Select a random repository from the results
        const randomIndex = Math.floor(Math.random() * data.items.length);
        currentRepository = data.items[randomIndex];
        
        displayRepository(currentRepository);
        setState('success');
        
    } catch (error) {
        console.error('Error fetching repository:', error);
        setState('error');
    }
}

// Display repository information
function displayRepository(repo) {
    const languageDisplay = currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1);
    
    repositoryInfo.innerHTML = `
        <div class="repo-name">
            <a href="${repo.html_url}" class="repo-link" target="_blank">${repo.name}</a>
        </div>
        <p class="repo-description">${repo.description || 'No description available'}</p>
        <div class="repo-stats">
            <div class="stat">
                <span class="stat-value">⭐ ${formatNumber(repo.stargazers_count)}</span>
                <span class="stat-label">Stars</span>
            </div>
            <div class="stat">
                <span class="stat-value">🔀 ${formatNumber(repo.forks_count)}</span>
                <span class="stat-label">Forks</span>
            </div>
            <div class="stat">
                <span class="stat-value">⚠️ ${formatNumber(repo.open_issues_count)}</span>
                <span class="stat-label">Issues</span>
            </div>
        </div>
    `;
}

// Format large numbers (e.g., 24,442)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Initialize app
setState('empty');
