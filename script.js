const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');
const apiUrl = 'https://type.fit/api/quotes';

let apiQuotes = [];


// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    authorText.textContent = quote.author || 'Unknown'
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //  Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();

}


//  Get Quotes From API

async function getQuotes() {
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        alert(error);
        // Catch Error Here
    }
}


// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}


// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();