const buttonElement = document.getElementById('joke-button');
const audioElement = document.getElementById('joke-audio');

async function getJoke() {
    let textJoke = '';
    const jokeUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';

    try {
        const response = await fetch(jokeUrl);

        if (response.ok) {
            const jokeBody = await response.json();
    
            if (jokeBody.type === 'single') {
                textJoke = jokeBody.joke;
            }
    
            if (jokeBody.type === 'twopart') {
                textJoke = `${jokeBody.setup}...   ${jokeBody.delivery}`
            }
        }

        return textJoke;
    } catch (e) {
        console.error(e);
    }
}

async function tellJoke() {
    const textJoke = await getJoke();
    buttonElement.disabled = true;
    
    VoiceRSS.speech({
        key: '4f853f4cc0c942c29d5c2b30c2eb4945',
        src: textJoke.trim().replace(/ /g, '%20'),
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

buttonElement.addEventListener('click', tellJoke);
audioElement.addEventListener('ended', function () {
    buttonElement.disabled = false;
});