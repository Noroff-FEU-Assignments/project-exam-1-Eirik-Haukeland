import makeCard from "./makeCard.js";
import {changeHidden} from "./carousel.js"

const root = document.querySelector(":root");
const query = document.location.search;
const title = document.querySelector("title");
const h1 = document.querySelector("h1");
const desc = document.querySelector('meta[name="description"]');
const article = document.querySelector("article");
const carousel_cards = document.querySelector('#carousel_content');

let response = await fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe?per_page=100")
const recipeArray = await response.json()

window.addEventListener("resize", () => {
  const zoomedImg = main.getElementsByClassName("zoom");
  sett_css_var__img_possitions_left_and_top(zoomedImg);
})

const sett_css_var__img_possitions_left_and_top = (img) => {
  const imgWidth = `${parseInt(getComputedStyle(img).getPropertyValue("width"))}`;
  const imgHeight = `${parseInt(getComputedStyle(img).getPropertyValue("height"))}`;
  root.style.setProperty("--zoom-img-left", `${(window.innerWidth / 2) - (imgWidth / 2)}px`);
  root.style.setProperty("--zoom-img-top", `${(window.innerHeight / 2) - (imgHeight / 2)}px`)
}

recipeArray.forEach(recipe => {
  if (recipe.id != query.split("=")[1]) {
    carousel_cards.appendChild(makeCard(recipe));
  } else {
    title.innerText = `Heb's recipes | ${recipe.title.rendered}`;
    h1.innerText = recipe.title.rendered;
    let apendLocation;

    if (recipe.recipe.type === "food") {
      desc.content = `learn how to make a ${recipe.title.rendered}`;

      article.innerHTML = `<section aria-labelledby="ingredients-id" id="ingredients-list">
                              <button id="open_or_close" class="pillshape">
                                <h2 id="ingredients-id">Ingredients</h2>
                              </button>
                              <ul id="hide_me" hidden="hidden"></ul>
                            </section>
                            <section aria-labelledby="steps-id" id="steps-list">
                              <h2 id="steps-id">Steps</h2>
                              <ol></ol>
                            </section>`

      const ingredients = article.querySelector("#ingredients-list > ul");
      const ingredentsBtn = document.querySelector("#open_or_close");

      const fixFistClumnIngredites = () => {
        const span_ones = document.querySelectorAll("#ingredients-list li > :first-child")

        let biggest_span = 0;
        span_ones.forEach(element =>{
            console.log(biggest_span + " - " + element.clientWidth)
          if (biggest_span < element.clientWidth) {
            biggest_span = element.clientWidth;
          }
        })

        root.style.setProperty("--ingredients-list-first-column", `${biggest_span}px`);
      }

      recipe.recipe.ingredients_flat.forEach(ingredient => {
        const notes = ingredient.notes ? ` (${ingredient.notes})` : ""
        ingredients.innerHTML += `<li><span>${ingredient.amount} ${ingredient.unit}</span><span>${ingredient.name}${notes}</span></li>`
      })

      ingredentsBtn.addEventListener("click", () => {
        ingredients.toggleAttribute("hidden");
        if (!ingredients.hasAttribute("hidden")) {
          setTimeout(() => fixFistClumnIngredites(), 100)
        }
      });

      fixFistClumnIngredites();

      apendLocation = article.querySelector("#steps-list > ol");
    } else if (recipe.recipe.type ==="howto") {
      desc.innerText = `learn how to make a ${recipe.title.rendered}`; // todo: when you sett up post

      article.innerHTML += `<ul id="how_to"></ul>`
      apendLocation = article.querySelector("#how_to");
    }
    recipe.recipe.instructions_flat.forEach(async instruction => {
      const li = document.createElement("li");
      li.innerHTML += instruction.text;
      apendLocation.appendChild(li);

      let imgResponse = await fetch(`https://examapi.ebh.fyi/wp-json/wp/v2/media/${instruction.image}`)
      const imageJson = await imgResponse.json()

      const img = document.createElement("img");
      img.src = imageJson.guid.rendered;
      img.alt = imageJson.alt_text
      img.addEventListener("click", (evt) => {
        const imgs = article.querySelectorAll("article li > img");
        let currentlyClosed = false;
        if (!evt.target.classList.contains("zoom")) {
          currentlyClosed = true;
        }

        imgs.forEach(element => {
          if (element.classList.contains("zoom")) {
            element.classList.remove("zoom")
          }
        })

        if (currentlyClosed) {
          evt.target.classList.add("zoom")
          sett_css_var__img_possitions_left_and_top(evt.target);
        }
      })
      li.appendChild(img)
    })
  }
  document.querySelector("main").classList.remove("loading")
})

changeHidden([...carousel_cards.children]);
