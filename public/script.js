const getRecipes = async() => {
    try {
        return (await fetch("api/recipes/")).json();
    } catch(error) {
        console.log(error);
    }
};

const showRecipes = async() => {
    const recipes = await getRecipes();
    const recipesDiv = document.getElementById("recipe-list");
    recipesDiv.innerHTML = "";

    recipes.forEach((recipe)=>{
        const section = document.createElement("section");
        section.classList.add("recipe");
        recipesDiv.append(section);

        //make the whole section clickable
        const a = document.createElement("a"); //a stands for anchor tag
        a.href="#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = recipe.name;
        a.append(h3);

        const img = document.createElement("img");
        img.src = recipe.img;
        a.append(img);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(recipe);
        };
    }); 
};

const displayDetails = (recipe) => {
    openDialog("recipe-details");

    const recipeDetails = document.getElementById("recipe-details");
    recipeDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = recipe.name;
    recipeDetails.append(h3);

    const p = document.createElement("p");
    p.innerHTML = recipe.description;
    recipeDetails.append(p);

    //creating list for each ingredient
    const ul = document.createElement("ul");
    recipeDetails.append(ul);

    recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.innerHTML = ingredient;
        ul.append(li);
    });

    const spoon = document.createElement("section");
    spoon.classList.add("spoon");
    recipeDetails.append(spoon);
};

const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item)=>{
        item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

const showRecipeForm = (e) => {
    e.preventDefault();
    resetForm();
    openDialog("add-recipe-form");
}

const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredient-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

const resetForm = () => {
    const form = document.getElementById("add-recipe-form");
    form.reset();
    document.getElementById("ingredient-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
};

const addRecipe = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-recipe-form");
    const formData = new FormData(form);
    formData.append("ingredients", getIngredients());
    console.log(...formData);//the "..." displays each of the different fields separately

    const response = await fetch("/api/recipes", {
        method: "POST",
        body: formData
    });

    if (response.status != 200){
        console.log("not getting it");
    }

    await response.json();
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showRecipes();

};

const getIngredients = () => {
    const inputs = document.querySelectorAll("#ingredient-boxes input");
    const ingredients = [];
    inputs.forEach((input)=> {
        ingredients.push(input.value);
    });

    return ingredients;
}

showRecipes();
document.getElementById("add-recipe-form").onsubmit = addRecipe;
document.getElementById("add-link").onclick = showRecipeForm;
document.getElementById("add-ingredient").onclick = addIngredient;
document.getElementById("img").onchange = (e) => {
    const prev = document.getElementById("img-prev");

    //they didnt pick an image
    if(!e.target.files.length){
        prev.src = "";
        return;
    }

    prev.src = URL.createObjectURL(e.target.files.item(0));
}