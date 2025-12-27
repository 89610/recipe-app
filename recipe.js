// 🔹 Helper function – MUST be at top
function splitTextByLength(text, maxLength = 1000) {
    let parts = [];
    let current = "";

    text.split(" ").forEach(word => {
        if ((current + word).length <= maxLength) {
            current += word + " ";
        } else {
            parts.push(current.trim());
            current = word + " ";
        }
    });

    if (current.trim()) parts.push(current.trim());
    return parts;
}

// saved recipe




const recipeContainer = document.getElementById("recipeContainer");
const sidebar = document.getElementById("sidebar");

let currentInstructions = "";

// Toggle sidebar
function toggleMenu() {
    sidebar.classList.toggle("active");
}

// wrong button clear input

const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value ? "block" : "none";
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.focus();
});



// Check login before showing page
// if (localStorage.getItem("isLoggedIn") !== "true") {
//   window.location.href = "index.html"; 
//   login.html

// logout function
// function logout() {
//   localStorage.removeItem("isLoggedIn");
//   window.location.href = "index.html";
// }

// --------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const searchInputs = document.getElementById("searchInput");
const infoText = document.getElementById("InfoText");

searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
        infoText.style.display = "none";
    } else {
        infoText.style.display = "block";
    }
});


// Search recipe
async function searchRecipe() {
    const query = document.getElementById("searchInput").value;
    if (!query) return alert("Enter recipe name");

    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`

    );
    const data = await res.json();
    displayRecipes(data.meals);
}

const searchInputss = document.getElementById("searchInput");

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // stop form reload
        searchRecipe();
    }
});

// automatic dissappearing of Recipe

const searchInputk = document.getElementById("searchInput");
const recipeContainers = document.getElementById("recipeContainer");
const infoTexts = document.getElementById("InfoText");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();

    if (value === "") {
        // 🔥 Clear recipes automatically
        recipeContainer.innerHTML = "";

        // Show info text again
        infoText.style.display = "block";
    }
});


// Random recipe
async function randomRecipe() {
    const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    displayRecipes(data.meals);
}

// Display recipes
function displayRecipes(meals) {
    recipeContainer.innerHTML = "";

    if (!meals) {
        recipeContainer.innerHTML = "<p style='text-align:center; font-weight: bold; font-family: \"Poppins\", sans-serif; color: red;'>No recipe found.</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h4>${meal.strMeal}</h4>
        `;

        card.onclick = () => openRecipe(meal);
        recipeContainer.appendChild(card);
    });
}

// Open recipe modal
function openRecipe(meal) {
    document.getElementById("recipeModal").style.display = "block";
    document.getElementById("modalTitle").innerText = meal.strMeal;
    document.getElementById("modalImage").src = meal.strMealThumb;

    currentInstructions = meal.strInstructions;
    document.getElementById("modalInstructions").innerText = currentInstructions;

    if (meal.strYoutube) {
        const videoId = meal.strYoutube.split("v=")[1];
        document.getElementById("modalVideo").src =
            `https://www.youtube.com/embed/${videoId}`;
    }
}

// Close modal
function closeModal() {
    document.getElementById("recipeModal").style.display = "none";
    document.getElementById("modalVideo").src = "";
}

// Save recipe (placeholder function)
function saveRecipe() {
    alert("Recipe saved!");
}

// Line break for instructions
function showInstructionsAsBullets(instructionsText) {
    const list = document.getElementById("instructionList");
    list.innerHTML = "";

    // Split by sentence endings
    const steps = instructionsText
        .replace(/\n/g, " ")
        .split(/\. |\.\n|। |! |\? /)
        .filter(step => step.trim() !== "");

    steps.forEach((step, index) => {
        const li = document.createElement("li");
        li.textContent = `Step ${index + 1}: ${step.trim()}.`;
        list.appendChild(li);
    });
}



// Language toggle
function setLanguage(lang) {
    if (lang === "en") {
        document.getElementById("modalInstructions").innerText =
            currentInstructions;
    } else if (lang === "ta") {
  
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(currentInstructions)}&langpair=en|ta`)
    .then(response => response.json()).then(data => {
    const translatedText = data.responseData.translatedText;
    document.getElementById("modalInstructions").innerText = translatedText;
        
    });
        
  }
}
