const loginApi = "http://localhost:5678/api/users/login";

let emailEl, passwordEl;
document.addEventListener("DOMContentLoaded", () => {
  emailEl = document.querySelector("#email");
  passwordEl = document.querySelector("#password");

  document
    .querySelector("#login-form")
    ?.addEventListener("submit", async (event) => {
      event.preventDefault();
      await handlesubmit();
    });
});
async function handlesubmit() {
  if (!emailEl || !passwordEl) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const user = {
    email: emailEl.value.trim(),
    password: passwordEl.value.trim(),
  };
  // console.log("données envoyées", user);

  try {
    const response = await fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    const token = result.token;
    if (response.ok) {
      // console.log("Connexion réussie :", result);
      alert("connexion réussie");

      if (token) {
        sessionStorage.setItem("authToken", token);
        window.location.href = "index.html";
      } else {
        console.log("Connexion réussie, mais aucun token reçu");
      }
    } else {
      alert(
        "Échec de la connexion : " +
          (result.message || "Identifiants incorrects")
      );
    }
  } catch (error) {
    console.error("Erreur de la connexion", error);
    alert("Une erreur est survenue, veuillez vérifier votre connexion");
  }
}
