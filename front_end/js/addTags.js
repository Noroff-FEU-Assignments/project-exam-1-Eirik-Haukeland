import addArticles from "./addArticles.js";

const makeTagList = (list) => {
  let tagList = []

  list.forEach(e => {
    let keywords = [];
    if (e.recipe) {
      keywords = [...e.recipe.tags.keyword];
    } else {
      const data = e.getAttribute("data-tags");
      [...data.split(",")].forEach(t => {
        const obj = {term_id: t}
        keywords.push(obj)
      })
    }
    keywords.forEach(tag => {
      let addTag = true;

      tagList.forEach(tItem => {
        if (tItem.term_id === tag.term_id) {
          addTag = false;
        }
      })

      if (addTag) {
        tagList.push(tag)
      }
    })
  })

  return tagList
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
    label.addEventListener("click", (evt) => {
      const checkbox = evt.target.lastChild;
      const label = evt.target;
      const parrent = evt.target.parentNode;

      // todo: finn ut hva som er feil
      /*console.log(checkbox.hasAttributes("checked"))
      if (checkbox.hasAttributes("checked")) {
        checkbox.removeAttribute("checked");
      } else {
        checkbox.setAttribute("checked", true);
      }*/
      label.classList.toggle("checked")


      const hasTag = [];
      list.forEach(item => {
        if (item.wprm_keyword.includes(Number(checkbox.value))) {
          hasTag.push(item);
        }
      })

      cardMoreBtn.setAttribute("data-recipe-to-show", 0);
      cardappendLocation.innerHTML = "";
      addArticles(hasTag, cardappendLocation, cardMoreBtn);

      const theNewList = makeTagList([...cardappendLocation.children]);

      [...parrent.children].forEach(siblig => {
        let hideThisTag = true;
        [...theNewList].forEach(t => {
          if (siblig.lastChild.value === t.term_id) {
            hideThisTag = false
          }
        })
        if (hideThisTag) {
          siblig.hidden = true;
        }
      })

    })

    appendLocation.appendChild(label)
  })
}
