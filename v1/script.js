console.log('Hello World');
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
// Selecting DOM elements
const btn = document.querySelector('.btn-open')
const form = document.querySelector('.fact-form')
const factList = document.querySelector('.facts-list')

// Create DOM elements: Render facts in list
factList.innerHTML = ""

const htmlArr = initialFacts.map((fact) => `<li class="fact">${fact.text}</li>`);
console.log(htmlArr);
const html = htmlArr.join("");
factList.insertAdjacentHTML("afterbegin", html);

loadFacts();

async function loadFacts() {
  const res = await fetch("https://jgle0m51v7.execute-api.us-east-1.amazonaws.com/dev/notes", {
    headers:{'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
  })
  const data = await res.json();
  console.log(data);
};



// Toggle form visibility
btn.addEventListener('click', () => {
  if(form.classList.contains('hidden')) {
    form.classList.remove('hidden')
    btn.textContent="Close"
  } else {
    form.classList.add('hidden')
    btn.textContent="Share a fact"
  }
})