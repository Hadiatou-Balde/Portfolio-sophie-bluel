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
  div.dataset.id = category.id;
  div.className = "filter-category";

  div.addEventListener("click", () => {
    document.querySelectorAll(".filter-category").forEach((el) => {
      el.classList.remove("selected");
      el.style.backgroundColor = "";
      el.style.color = ""; // Réinitialiser le fond
    });

    div.classList.add("selected");
    div.style.backgroundColor = "#1d6154";
    div.style.color = "white";
    getWorks(category.id === "all" ? "all" : category.id);
  });

  document.querySelector(".div-container")?.append(div);
}

function displayAdminMode() {
  const authToken = sessionStorage.getItem("authToken");
  const editBanner = document.querySelector(".edit-banner");
  const categoryContainer = document.querySelector(".div-container");
  const navList = document.querySelector(".nav-list");
  if (authToken) {
    if (!editBanner) {
      const banner = document.createElement("div");
      banner.className = "edit-banner";
      banner.innerHTML =
        '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';
      document.body.prepend(banner);
    }
    if (categoryContainer) categoryContainer.style.display = "none";
    document.querySelector("#login-btn")?.classList.add("hidden");

    if (navList && !document.querySelector("#login-btn")) {
      const logoutLi = document.createElement("li");
      const logoutBtn = document.createElement("button");
      logoutBtn.id = "logout-btn";
      logoutBtn.textContent = "logout";
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("authToken");
        window.location.reload();
      });
      logoutLi.appendChild(logoutBtn);
      navList.appendChild(logoutLi);
    }
  } else {
    // if (categoryContainer) categoryContainer.style.display = "block";
    document.querySelector("#login-btn")?.classList.remove("hidden");
    document.querySelector("#logout-btn")?.remove();
  }
}

displayAdminMode();
