const next_btn = document.querySelector("#carusell_next_btn");
const previus_btn = document.querySelector("#carusell_previus_btn");
const carusell_cards = document.querySelector('#carusell_content');

const changeHidden = (elements) => {
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

changeHidden([...carusell_cards.children]);
window.addEventListener("resize", () => {
  changeHidden([...carusell_cards.children]);
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

const move_carusell = (nodelist, dir) => {
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
  carusell_cards.innerHTML = "";
  nList.forEach(el => carusell_cards.appendChild(el))
}

previus_btn.onclick = () => {
  move_carusell([...carusell_cards.children], "previus");
  changeHidden([...carusell_cards.children]);
};

next_btn.onclick = () => {
  move_carusell([...carusell_cards.children], "next");
  changeHidden([...carusell_cards.children]);
};
