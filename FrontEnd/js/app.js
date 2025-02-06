async function getWorks(filter = "all") {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }
    const json = await response.json();

    //Filtrage des données selon le filtre selectionné
    const filterWorks =
      filter === "all"
        ? json
        : json.filter((data) => data.categoryId === filter);
    // vide la gallery avant d'ajouter de nouvel élément
    const gallery = document.querySelector(".gallery");
    // console.log(gallery);
    if (gallery) {
      gallery.innerHTML = "";

      filterWorks.forEach((work) => Figures(work));
    } else {
      console.error("la gallerie est introuvable");
    }
  } catch (erreur) {
    console.error(erreur.message);
  }
}
getWorks();

function Figures(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>`;
  document.querySelector(".gallery")?.append(figure);
}

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }

    const categories = await response.json();
    setFilter({ id: "all", name: "Tous" });
    categories.forEach((category) => setFilter(category));
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des catégories :",
      erreur.message
    );
  }
}
getCategories();

function setFilter(category) {
  const div = document.createElement("div");
  div.innerHTML = `${category.name}`;
  div.className = category.id;
  div.addEventListener("click", () => {
    getWorks(category.id === "all" ? "all" : category.id);
  });

  document.querySelector(".div-container")?.append(div);
}
// document.querySelector(".all")?.addEventListener("click", () => getWorks());
