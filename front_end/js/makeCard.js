export default (recipeInfo) => {
  const card = document.createElement("a");
  let time = 5
  if (parseInt(recipeInfo.recipe.total_time, 10) > 5) {
    time = recipeInfo.recipe.total_time;
  }
  card.innerHTML = `
  <img src="${recipeInfo.recipe.image_url}" alt="butter porridge">
  <h3>${recipeInfo.title.rendered}</h3>
  <span><img src="img/icons/time.svg" alt="time">${time} min</span>` // todo: add time form api-call
  card.setAttribute("href", `aricle.html?id=${recipeInfo.id}`)
  card.setAttribute("data-tags", `${recipeInfo.wprm_keyword}`)
  card.classList.add("card");
  return card;
}
