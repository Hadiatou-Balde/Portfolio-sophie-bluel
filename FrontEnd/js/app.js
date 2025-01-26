async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }
    const json = await response.json();
    // on continue le traitement des données
    for (let i = 0; i < json.length; i++) {
      Figures(json[i]);
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
    const json = await response.json();
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      setFilter(json[i]);
    }
  } catch (erreur) {
    console.error(erreur.message);
  }
}
getCategories();

function setFilter(data) {
  const div = document.createElement("div");
  div.innerHTML = `${data.name}`;
  document.querySelector(".div-container")?.append(div);
}
