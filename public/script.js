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
    console.log(recipe);
};

showRecipes();