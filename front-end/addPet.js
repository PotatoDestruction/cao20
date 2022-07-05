const addPet = async (pet) =>{
    await fetch(`http://localhost:8080/v1/pets`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(pet)
    })
};

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let clientEmail = document.getElementById("email").value;

    let pet = {
        name: name,
        dob: dob,
        client_email: clientEmail,
        archived: false
    }
    console.log(pet)
    addPet(pet)

    setTimeout(() => window.open("./index.html", "_self"), 650);

})