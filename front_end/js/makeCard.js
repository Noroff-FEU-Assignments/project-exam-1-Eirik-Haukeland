export default (recipeInfo) => {
  const card = document.createElement("a");
  card.innerHTML = `
  <img src="${recipeInfo.recipe.image_url}" alt="butter porridge">
  <h3>${recipeInfo.title.rendered}</h3>
  <span><img src="img/icons/time.svg" alt="time">30 min</span>`
  card.setAttribute("href", `aricle.html?id=${recipeInfo.id}`)
  card.setAttribute("data-tags", `${recipeInfo.wprm_keyword}`)
  card.classList.add("card");
  return card;
}
