const addMedication = async (med) =>{
    await fetch(`http://localhost:8080/v1/medications`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(med)
    })
};


let form = document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;

    let newMed = {
        name: name,
        description: description
    }



    console.log(newMed)
    name = ""
    description = ""
    
    addMedication(newMed)

    setTimeout(() => window.open("./viewMedications.html", "_self"), 650);
    
})