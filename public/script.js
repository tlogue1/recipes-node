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
    openDialog("add-recipe-form");
}

const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredient-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);

}

showRecipes();
document.getElementById("add-link").onclick = showRecipeForm;
document.getElementById("add-ingredient").onclick = addIngredient;