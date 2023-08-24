
import { useEffect, useState } from "react";
import "./styles/Quotes.css";
export function Quotes() {


    const [quote, setQuote] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleNewQuote() {
        setLoading(true)
        const res = await fetch("https://api.quotable.io/quotes/random?maxLength=115")
        const quote = await res.json()
        setQuote(quote[0])
        console.log(quote[0])
        setLoading(false)
    }

    useEffect(() => {
        handleNewQuote()
    }, [])

    return (
        <div className="quotes-container">
            <div id="quote-box">
                {(loading) ?
                    <p id="text">Loading...</p>
                    :
                    <p id="text">&quot; {quote.content} &quot;</p>
                }
                <h2 id="author">-{quote.author}</h2>
            </div>

            <div className="actions">
                <button
                    id="new-quote"
                    className="button"
                    onClick={handleNewQuote}
                >
                    Next Quote
                </button>
                <a
                    href="https://twitter.com/intent/tweet"
                    id="tweet-quote"
                    target="_blank" rel="noreferrer"
                >
                    Tweet
                </a>
            </div>
        </div>
    )
}
export default Quotes