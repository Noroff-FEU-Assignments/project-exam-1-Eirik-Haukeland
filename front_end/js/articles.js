import addArticles from "./addArticles.js";
import addTags from "./addTags.js";
const articles_tags = document.querySelector("section.articles > fieldset")
const articles_section = document.querySelector("section.articles > div");
const moreArticlesBtn = document.querySelector("#more_articles_btn")
const recipeSearch = document.querySelector("#recipe-search")
const query = document.location.search;

const filterSerch = (searchVaule, response, placement) => {
  const meetsSearchValue = [];
  response.forEach(element => {
    if (element.recipe.name.includes(searchVaule)) {
      meetsSearchValue.push(element)
    }
  })
  placement.innerHTML = "";
  if (meetsSearchValue.length <= 9) {
    moreArticlesBtn.setAttribute("data-recipe-to-show", "0");
    moreArticlesBtn.hidden = true;
  }

  if (meetsSearchValue.length === 0) {
    placement.innerHTML += `<div class="card error" data-style="large">
                                            <img src="img/ops.jpeg" alt="embarrassed emoji">
                                            <h3>sorry we can not find somting maching your search.</h3>
                                        </div>`
  } else {
    addArticles(meetsSearchValue, placement, moreArticlesBtn)
  }
}

fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe?per_page=100")
  .then(response => response.json())
  .then(response => {
    addArticles(response, articles_section, moreArticlesBtn)
    moreArticlesBtn.addEventListener("click", () => addArticles(response, articles_section, moreArticlesBtn));

    addTags(response, articles_tags, articles_section, moreArticlesBtn)

    document.querySelector("main").classList.remove("loading")


    recipeSearch.addEventListener("keyup", (evt) => {
      evt.preventDefault()
      filterSerch(evt.target.value, response, articles_section)
    })



    const queryarray = query.slice(1).split("&")

    queryarray.forEach(q => {
      const searchKey = q.split("=")[0]
      const searchTerm = q.split("=")[1];

      if (searchKey === "search" && typeof searchTerm === "string") {
        recipeSearch.value = searchTerm;
        filterSerch(searchTerm, response, articles_section);
      } else if (searchKey || !searchTerm === undefined) {
        console.error(`ERROR: query "${searchKey}=${searchTerm}" not recongised`)
      }
    })

  })

