import addArticles from "./addArticles.js";
import addTags from "./addTags.js";
const articles_tags = document.querySelector("section.articles > fieldset")
const articles_section = document.querySelector("section.articles > div");
const moreArticlesBtn = document.querySelector("#more_articles_btn")
const recipeSearch = document.querySelector("#recipe-search")
const query = document.location.search;

const filterSerch = (searchVaule) => {
  const meetsSearchValue = [];
  response.forEach(element => {
    if (element.recipe.name.includes(searchVaule)) {
      meetsSearchValue.push(element)
    }
  })
  articles_section.innerHTML = "";
  if (meetsSearchValue.length <= 9) {
    moreArticlesBtn.setAttribute("data-recipe-to-show", 0);
    moreArticlesBtn.hidden = true;
  }

  if (meetsSearchValue.length === 0) {
    articles_section.innerHTML += `<div class="card error" data-style="large">
                                            <img src="img/ops.jpeg" alt="embarrassed emoji">
                                            <h3>sorry we can not find somting maching your search.</h3>
                                        </div>`
  } else {
    addArticles(meetsSearchValue, articles_section, moreArticlesBtn)
  }
}

fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe?per_page=100")
  .then(response => response.json())
  .then(response => {
    addArticles(response, articles_section, moreArticlesBtn)
    moreArticlesBtn.addEventListener("click", () => addArticles(response, articles_section, moreArticlesBtn));

    addTags(response, articles_tags, articles_section, moreArticlesBtn)

    document.querySelector("main").classList.remove("loading")

    recipeSearch.addEventListener("keyup", (evt) => filterSerch())
    console.log(query);
  })

