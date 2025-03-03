const squares = document.getElementsByClassName("square");
let player = 1;

for (let square of squares) {
  square.addEventListener("click", (event) => {
    if (square.childNodes.length === 0) {
      const icon = document.createElement("img");
      if (player === 1) {
        icon.src = "img/x.png";
        player++;
      } else {
        icon.src = "img/o.png";
        player--;
      }
      event.target.appendChild(icon);
      event.target.classList.remove("hover:bg-stone-300");
    }
  });
}
