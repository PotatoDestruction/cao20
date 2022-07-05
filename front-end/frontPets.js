


const fetchPets = async () => {
    const res = await fetch(`http://localhost:8080/v1/pets`);
    let pets = await res.json();
    
    pets.forEach(pet => {
        console.log(pet)
    let petsMainContainer = document.getElementById("pet-list-container");
    
    let petContainer = document.createElement("div");
    petContainer.classList.add("petContainer");
        
        
        let name = document.createElement("h3");
        name.textContent = pet.name;

        var today = new Date(pet.dob);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '.' + mm + '.' + dd;
        console.log(today)

        let dob = document.createElement("div");
        dob.textContent = today;
        dob.classList.add("dob");

        let clientEmail = document.createElement("div");
        clientEmail.textContent = pet.client_email
        clientEmail.classList.add("clientEmail");

        let viewLogButton = document.createElement("button");
        viewLogButton.classList.add("view-log-button");
        viewLogButton.textContent = "VIEV LOG";

        viewLogButton.addEventListener("click", () => {
            window.open(`./log.html?petId=${pet.id}&petName=${pet.name}`, "_self")
        })

        let deletePetButton = document.createElement("button");
        deletePetButton.classList.add("delete-pet-button");
        deletePetButton.textContent = "DELETE";

        petsMainContainer.append(petContainer);
        petContainer.append(name, dob, clientEmail, viewLogButton, deletePetButton);

        deletePetButton.addEventListener("click", () => {
            const removePet = async () => {
                await fetch(`http://localhost:8080/v1/pets/${pet.id}`, {
                    method: 'DELETE'
                });
            }
            removePet();
            petContainer.remove();
        })


    });
};

let addPetButton = document.getElementById("addPet").addEventListener("click", () => {
    window.open("./addPet.html", "_self")
});
fetchPets();