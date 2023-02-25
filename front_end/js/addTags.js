import addArticles from "./addArticles.js";

const makeTagList = (list) => {
  const tagList = [];
  const hasBeenAdded = [];
  list.forEach(item => {
      const itemTags = item.recipe.tags.keyword;
      itemTags.forEach(tag => {
        if (!hasBeenAdded.includes(tag.term_id)) {
          tagList.push(tag)
          hasBeenAdded.push(tag.term_id)
        }
      })
  })
  return tagList;
}

const tagFitering = (target, list, cardappendLocation, cardMoreBtn) => {
  target.classList.toggle("checked")
  target.lastChild.toggleAttribute("checked");

  const allSibligs = [...target.parentNode.children];
  const allCheckedTags = [];

  allSibligs.forEach(tag => {
    if (tag.classList.contains("checked")) {
      allCheckedTags.push(tag.lastChild.value);
    }
  })

  const recipeList = [];

  list.forEach(recipe => {
    const recipeTagList = [];
    recipe.recipe.tags.keyword.forEach(recipeTag => {
      recipeTagList.push(recipeTag.term_id)
    })

    let hasAllTags = true;
    allCheckedTags.forEach(checked => {
      if (!recipeTagList.includes(parseInt(checked, 10))) {
        hasAllTags = false
      }
    })

    if (hasAllTags) {
      recipeList.push(recipe);
    }
  })

  console.log(recipeList);

  cardMoreBtn.setAttribute("data-recipe-to-show", 0);
  cardappendLocation.innerHTML = "";
  addArticles(recipeList, cardappendLocation, cardMoreBtn);
  cardMoreBtn.addEventListener("click", () => addArticles(recipeList, cardappendLocation, cardMoreBtn));

  const availableTagObjects = makeTagList([...recipeList]);
  const availableTags = [];
  availableTagObjects.forEach(obj => {
    availableTags.push(obj.term_id);
  })

  allSibligs.forEach(sibling => {
    if (!availableTags.includes(parseInt(sibling.lastChild.value, 10))) {
      sibling.setAttribute("hidden", true)
    } else {
      sibling.removeAttribute("hidden")
    }
  })
}

export default (list, appendLocation, cardappendLocation, cardMoreBtn) => {
  let tagList = makeTagList(list);

  tagList.forEach(tag => {
    const label = document.createElement("label")
    label.classList.add("pillshape", "tag");
    label.innerText = tag.name;

    const checkBox = document.createElement("input")
    checkBox.classList.add("visually-hidden");
    checkBox.type = "checkbox";
    checkBox.value = tag.term_id;

    label.appendChild(checkBox);

    label.addEventListener("mousedown", (evt) => tagFitering(evt.target, list,  cardappendLocation, cardMoreBtn));

    appendLocation.appendChild(label)
  })
}
