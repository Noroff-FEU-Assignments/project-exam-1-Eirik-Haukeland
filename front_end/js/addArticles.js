import makeCard from "./makeCard.js";

export default (list, appendLocation, button) => {

  let lastUsedcard = Number(button.getAttribute("data-recipe-to-show"));
  let workingCards = list.slice(lastUsedcard, lastUsedcard + 9);

  workingCards.forEach((recipe, i) => {
    const numbToWorkWith = workingCards.length
    const card = makeCard(recipe);
    const index = i + 1;

    if ( index === 1 && [9, 8, 7, 6, 5, 4, 3, 2].includes(numbToWorkWith)) {
      card.setAttribute("data-style", "large");
    } else if (index === 1) {
      card.setAttribute("data-style", "wide");
    }

    if ( index === 2 && [4, 3, 2].includes(numbToWorkWith)) {
      card.setAttribute("data-style", "wide");
    }

    if ( index === 4 && numbToWorkWith === 4) {
      card.setAttribute("data-style", "wide");
    }

    if ( index === 5 && numbToWorkWith === 5) {
      card.setAttribute("data-style", "wide");
    }

    if (index === 6 && [6, 7, 8].includes(numbToWorkWith)) {
      card.setAttribute("data-style", "wide");
    } else if (index === 6 && numbToWorkWith === 9) {
      card.setAttribute("data-style", "large");
    }

    if (index === 7 && numbToWorkWith === 7) {
      card.setAttribute("data-style", "wide");
    }

    if (index === 8 && numbToWorkWith === 8) {
      card.setAttribute("data-style", "wide");
    }

    appendLocation.appendChild(card);
  })

  lastUsedcard = lastUsedcard + workingCards.length;
  button.setAttribute("data-recipe-to-show", lastUsedcard);

  if (list.length === appendLocation.children.length) {
    button.hidden = true;
  }
}