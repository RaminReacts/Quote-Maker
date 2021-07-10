const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoading(){
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote(){
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {

        const response = await fetch(apiUrl);
        const data = await response.json();
        let randomInt = Math.floor(Math.random() * data.length);
        let generatedQuote = data[randomInt];
        // reduce font size for long quotes
        if (generatedQuote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = generatedQuote.text;
        // if Quote author is '', write "-Unknown"
        if (generatedQuote.author === null) {
            authorText.innerText = '-Unknown';
        } else {
            authorText.innerText = '-'+ generatedQuote.author;
        }
        removeLoading();
    } catch (error) {
        console.log('Woobs, no quote', error);
    }
}

// Twitt Quote
function twittThisQuote(){
    
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
    window.open(twitterUrl, '_blank');
}

// On load
getQuote();



// Event listener
twitterBtn.addEventListener('click', twittThisQuote)
newQuoteBtn.addEventListener('click', getQuote);
