import makeCard from "./makeCard.js";
import {changeHidden} from "./carousel.js"
import addArticles from "./addArticles.js";
import addTags from "./addTags.js";
const carousel_cards = document.querySelector('#carousel_content');
const articles_tags = document.querySelector("section.articles > fieldset")
const articles_section = document.querySelector("section.articles > div");
const moreArticlesBtn = document.querySelector("#more_articles_btn")
const main = document.querySelector("main")

fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe?per_page=100")
  .then(response => response.json())
  .then(response => {
    response.forEach(recipe => {
      carousel_cards.appendChild(makeCard(recipe));
    })
    changeHidden([...carousel_cards.children]);

    addArticles(response, articles_section, moreArticlesBtn)
    moreArticlesBtn.addEventListener("click", () => addArticles(response, articles_section, moreArticlesBtn));

    addTags(response, articles_tags, articles_section, moreArticlesBtn)

    main.classList.remove("loading")
  })