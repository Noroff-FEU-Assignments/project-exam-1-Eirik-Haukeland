import addArticles from "./addArticles.js";
import addTags from "./addTags.js";
const articles_tags = document.querySelector("section.articles > fieldset")
const articles_section = document.querySelector("section.articles > div");
const moreArticlesBtn = document.querySelector("#more_articles_btn")

fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe")
  .then(response => response.json())
  .then(response => {
    addArticles(response, articles_section, moreArticlesBtn)
    moreArticlesBtn.addEventListener("click", () => addArticles(response, articles_section, moreArticlesBtn));

    addTags(response, articles_tags, articles_section, moreArticlesBtn)
  })
