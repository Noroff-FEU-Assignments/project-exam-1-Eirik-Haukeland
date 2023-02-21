const carousel_cards = document.querySelector('#carousel_content');
fetch("https://examapi.ebh.fyi/wp-json/wp/v2/wprm_recipe")
  .then(response => response.json())
  .then(response => {
    // console.log(response);
    response.forEach(recipe => {
      const card = document.createElement("a");
      card.innerHTML = `
                        <img src="img/test-imgs/smørgrøt" alt="butter porridge">
                        <h3>${recipe.title.rendered}</h3>
                        <span><img src="img/icons/time.svg" alt="time">30 min</span>`
      card.setAttribute("href", `aricle.html?id=${recipe.id}`)
      card.classList.add("card");
      carousel_cards.appendChild(card);
    })
  })
