const fetchMedications = async () => {
    const res = await fetch(`http://localhost:8080/v1/medications`);
    let medications = await res.json();

    medications.forEach(med => {
        console.log(med)
        let logsMainContainer = document.getElementById("pet-log-container");
    let logContainer = document.createElement("div")
    logContainer.classList.add("logContainer");

    let status = document.createElement("h3");
        status.textContent = med.name
    let description = document.createElement("div");
    description.classList.add("comment")
        description.textContent = med.description
   



    logsMainContainer.append(logContainer)
    logContainer.append(status, description)    
    });
}
fetchMedications();

let addMedicationsButton = document.getElementById("addPrescription").addEventListener("click", () => {
    window.open("./addMedication.html", "_self")
})