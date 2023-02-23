const next_btn = document.querySelector("#carousel_next_btn");
const previus_btn = document.querySelector("#carousel_previus_btn");
const carousel_cards = document.querySelector('#carousel_content');

export const changeHidden = (elements) => {
  elements.forEach((el, index) => {
    if (window.innerWidth <= 900) {
      el.removeAttribute("hidden");

    } else if (window.innerWidth > 900 && window.innerWidth <= 1200) {
      if (index < 3) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", true);
      }

    } else if (window.innerWidth >= 1200) {
      if (index < 4) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", true);
      }
    }
  })
}

changeHidden([...carousel_cards.children]);
window.addEventListener("resize", () => {
  changeHidden([...carousel_cards.children]);
});

const move_items = (list, dir, amount) => {
  const cards = []
  for (let i = 0; i < amount; i++) {
    if (dir === "next") {
      cards.push(list.shift())
    } else if (dir === "previus") {
      cards.unshift(list.pop())
    }
  }
    if (dir === "next") {
    return [...list, ...cards]
  } else if (dir === "previus") {
    return[...cards, ...list]
  }
}

const move_carousel = (nodelist, dir) => {
  let nList
  if (dir === "next" && window.innerWidth >= 900 && window.innerWidth <= 1200) {
    nList = move_items(nodelist, "next", 3);
  } else if (dir === "previus" && window.innerWidth >= 900 && window.innerWidth <= 1200) {
    nList = move_items(nodelist, "previus", 3);
  } else if (dir === "next" && window.innerWidth >= 1200) {
    nList = move_items(nodelist, "next", 4);
  } else if (dir === "previus" && window.innerWidth >= 1200) {
    nList = move_items(nodelist, "previus", 4);
  }
  carousel_cards.innerHTML = "";
  nList.forEach(el => carousel_cards.appendChild(el))
}

previus_btn.onclick = () => {
  move_carousel([...carousel_cards.children], "previus");
  changeHidden([...carousel_cards.children]);
};

next_btn.onclick = () => {
  move_carousel([...carousel_cards.children], "next");
  changeHidden([...carousel_cards.children]);
};
