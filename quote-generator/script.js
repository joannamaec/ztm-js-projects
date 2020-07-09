const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const preloader = document.getElementById('loader');

function showPreloader() {
    preloader.hidden = false;
    quoteContainer.hidden = true;
}

function hidePreloader() {
    if (!preloader.hidden) {
        preloader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Using Twitter API
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterRequest = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;;
    
    window.open(twitterRequest, '_blank');
}

// Using Forismatic API with Proxy
async function getQuote() {
    const proxyUrl = `https://api.allorigins.win/get?url=`;
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
    const requestUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;
    showPreloader();

    try {
        const response = await fetch(requestUrl);
        if (response.ok) {
            const data = await response.json();
            const quote = JSON.parse(data.contents);
            
            if (quote.quoteText.length > 120) {
                quoteText.classList.add('quote-text-long');
            } else {
                quoteText.classList.remove('quote-text-long');
            }

            quoteText.innerText = quote.quoteText;
            quoteAuthor.innerText = quote.quoteAuthor;

            if (quote.quoteAuthor === '') {
                quoteAuthor.innerText = `(Unknown)`;
            }

            hidePreloader();
        }
    } catch (err) {
        if (err instanceof SyntaxError) {
            getQuote();
        } else {
            console.log(`Error: ${err}`);
        }
    }
}

// Click Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// Quote on load
getQuote();