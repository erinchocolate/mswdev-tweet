import { useEffect, useState } from "react";
import supabase from "./supabase"; 
import "./style.css";

function App() {
  // Define state variable
  const [showForm, setShowForm] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(function () {
    // Fetch tweets from supabase
    async function getTweets() {
      // Get all tweets from the table "tweets" and store them in a variable
      let query = supabase.from('tweets').select('*');
      // If current category isn't "all", show tweets that matches the category
      if (currentCategory !== "all") query = query.eq("category", currentCategory);
      // Get tweets from query and order them by agree votes
      const { data: tweets, error } = await query.order("voteAgree", {ascending: false}).limit(100);
      // If tweets are retrieved successfully, then show tweets
      if (!error) setTweets(tweets);
      else alert("Error loading data")
    }
    getTweets()
  }, [currentCategory]);
  
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/*Form is hidden unless user opens it*/}
      {showForm ? <NewTweetForm setShowForm={setShowForm} setTweets={setTweets} /> : null}
      <main data-testid="main" className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        <TweetList tweets={tweets} setTweets={setTweets} />
      </main>
    </>
  )
}

function Header({showForm, setShowForm}) {
  const appTitle = "MSwDev Tweet"
  return (
    <header data-testid="header" className="header">
      <div className="logo">
        <img src="logo.png" alt="Rocket Emoji" />
        <h1>{appTitle}</h1>
      </div>
      {/* The original button text is "Share your thought".
      Show form when user clicks the button.
      When the form is open, change the button text to "Close" */}
      <button className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}>{showForm ? "Close" : "Share your thought"}
      </button>
    </header>)
}

// Define categories fot tweets
const CATEGORIES = [
  { name: "all", color: "#f97316" },
  { name: "Course", color: "#3b82f6" },
  { name: "Lecturer", color: "#ef4444" },
  { name: "Program", color: "#db2777" },
  { name: "Assignment", color: "#14b8a6" },
  { name: "Other", color: "#8b5cf6" },
];

function NewTweetForm({setTweets, setShowForm}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
    // Prevent browser from reloading
    e.preventDefault();

    // Check if data is valid.If so, create a new tweet
    if(text && category && textLength <= 200) {
    // Upload new tweet to supabase
      const { data: newTweet, error } = await supabase.from('tweets').insert([{ text, category }]).select();
  
    // Add the new tweet to the UI: add the tweet to state
    if(!error) setTweets((tweets) => [newTweet[0], ...tweets]);

    // Reset input fields
      setText("");
      setCategory("");

    // Close the form
      setShowForm(false);
    }  
  }

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
    <input type="text" placeholder="Share your thought..." value={text} onChange={(e) => setText(e.target.value)} />
    <span>{200 - textLength}</span>  
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">Choose category: </option>
      {CATEGORIES.map((category) => (<option key={category.name} value={category.name}>{category.name.toUpperCase()}</option>))}
    </select>
      <button className="btn btn-large">Post</button></form>
  );
}

function CategoryFilter({setCurrentCategory}) {
  return (
    <aside>
      <ul>
        {/* <li className="category"><button className="btn btn-all-categories" onClick={() => setCurrentCategory("all")}>All</button>
        </li> */}
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category">
            <button className="btn btn-categories"
              style={{ backgroundColor: category.color }}
              onClick={() => setCurrentCategory(category.name)}>
              {category.name}       
            </button>
          </li>))}
      </ul>
    </aside>
  );
}

function TweetList({ tweets, setTweets }) {
  
  if (tweets.length === 0) {
    return (<p>No tweets for this category yet! Create the first one😁</p>)
  }
  return (
    <section data-testid="tweet">
      <ul className="tweets-list">
        {tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} setTweets={setTweets} />)}
      </ul>
      <p>There are {tweets.length} tweets in the database</p>
    </section>
  );
}

function Tweet({ tweet , setTweets}) {
  const isSolved = tweet.voteSolved >= 5;

  async function handleVote(columnName) {
    const { data: updatedTweet, error } = await supabase.from('tweets').update({[columnName]: tweet[columnName] + 1 }).eq('id', tweet.id).select();

    if (!error) setTweets((tweets) => tweets.map((f) => (f.id === tweet.id ? updatedTweet[0] : f))
    );
  }
  return(
  <li className="tweet">
    <p>
      {isSolved ? <span className="solved">🥳[SOLVED]</span> : null}
    {tweet.text}
    </p>
    <span className="tag" style={{ backgroundColor: CATEGORIES.find((category) => category.name === tweet.category).color }}>{tweet.category}</span>
    <div className="vote-buttons">
      <button onClick={()=>handleVote("voteAgree")}>👍 {tweet.voteAgree}</button>
      <button onClick={()=>handleVote("voteDisagree")}>👎 {tweet.voteDisagree}</button>
      <button onClick={()=>handleVote("voteSolved")}>✅ {tweet.voteSolved}</button>
    </div>
  </li>
)}

export default App;