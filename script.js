// 1) All base‐game crops by season
const seasonCrops = {
  spring: [
    "bluejazz","carrot","cauliflower","coffeebean","garlic",
    "greenbean","kale","parsnip","potato","rhubarb",
    "strawberry","tulip","unmilledrice"
  ],
  summer: [
    "blueberry","corn","hops","hotpepper","melon",
    "poppy","radish","redcabbage","starfruit",
    "summerspangle","summersquash","sunflower","tomato","wheat"
  ],
  fall: [
    "amaranth","artichoke","beet","bokchoy","broccoli",
    "cranberries","eggplant","fairyrose","grape","pumpkin",
    "sweetgemberry","yam"
  ],
  winter: ["powdermelon"]
};

// 2) DOM refs
const seasonSelect   = document.getElementById("seasonSelect");
const cropGrid       = document.getElementById("cropGrid");
const cropCountInput = document.getElementById("cropCount");
const summaryDiv     = document.getElementById("selectionSummary");

// 3) Track selections
let selected = new Set();

// 4) Render the grid for current season
function renderGrid() {
  selected.clear();
  summaryDiv.textContent = "Select some crops and click “Calculate”";
  cropGrid.innerHTML = "";

  seasonCrops[seasonSelect.value].forEach(name => {
    const img = document.createElement("img");
    img.src = `images/${name}.png`;
    img.alt = name;
    img.title = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    img.addEventListener("click", () => {
      if (selected.has(name)) {
        selected.delete(name);
        img.classList.remove("selected");
      } else {
        selected.add(name);
        img.classList.add("selected");
      }
    });
    cropGrid.appendChild(img);
  });
}

// 5) Show summary when Calculate is clicked (and via onclick)
function updateSummary() {
  const count = cropCountInput.value;
  if (selected.size === 0) {
    summaryDiv.textContent = "No crop selected.";
    return;
  }
  const names = Array.from(selected).map(n =>
    n
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase())
  );
  summaryDiv.textContent = `Placing ${count} × ${names.join(", ")}`;
}

// 6) Event hookups
seasonSelect.addEventListener("change", renderGrid);

// 7) Initial load
renderGrid();
