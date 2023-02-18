const next_btn = document.querySelector("#carusell_next_btn");
const previus_btn = document.querySelector("#carusell_previus_btn");
const carusell_cards = document.querySelector('#carusell_content');

console.log(carusell_cards.childNodes);

console.log(carusell_cards.childNodes.filter(t => t.innerText !== "text"));

// const test = carusell_cards.childNodes.filter(item => item !== "#text");
// console.log(test)
// previus_btn.onclick(() => console.log("previus"));


console.log(`${next_btn}, ${previus_btn}, ${carusell_cards}`);