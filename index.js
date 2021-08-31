
const todayContainer = document.getElementById('today')
const todayTweetContainer = document.getElementById('todayTweet')
const prevTweetContainer = document.getElementById('prevTweets')

let foundToday = false

fetch(`https://twitter-proxy.hawkbar.workers.dev/`)
    .then(r => r.json())
    .then(d => {
        const tweets = d.data
        return Promise.all(tweets.map(t => {
            const tweetContainer = document.createElement('div')
            const d = new Date(t.created_at)
            const isToday = d.toDateString() === new Date().toDateString()
            if (isToday) {
                todayTweetContainer.append(tweetContainer)
                const day = /gmdm (\b.*\b!*)/.exec(t.text)[1]
                todayContainer.textContent = day
                foundToday = true
            } else {
                prevTweetContainer.append(tweetContainer)
            }
            return twttr.widgets.createTweet(t.id, tweetContainer, {
                conversation: 'none',
                cards: 'hidden',
                linkColor: '',
                theme: 'dark',
            })
        }))
    }).then(() => {
        if (!foundToday) {
            todayContainer.textContent = 'unknown??? no gmdm tweet yet :('
        }
    })