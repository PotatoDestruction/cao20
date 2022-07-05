const url = new URL(document.location);
let petId = url.searchParams.get('petId');
let petName = url.searchParams.get('petName')
    
if(petId == null){
    console.log("no pet id")
    petId = "1"
    petName = "Potat1"
}
console.log(petId)
console.log(petName)
const fetchPetLogs = async () => {
    const res = await fetch(`http://localhost:8080/v1/prescriptions/${petId}`);
    let logs = await res.json();
    
    let h1 = document.querySelector("h1");
    h1.textContent = petName + ": Health Records"

    logs.forEach(log => {
        console.log(log)
        let logsMainContainer = document.getElementById("pet-log-container");
    let logContainer = document.createElement("div")
    logContainer.classList.add("logContainer");

    let status = document.createElement("h3");
        status.textContent = log.name
    let description = document.createElement("div");
    description.classList.add("description")
        description.textContent = log.description
    let dob = document.createElement("div");
        
    console.log(log.timestamp)
    var today = new Date(log.timestamp);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '.' + mm + '.' + dd;
        console.log(today)

    dob.classList.add("dob")
        dob.textContent = today

        let h1 = document.querySelector("h1");
    h1.textContent = petName + ": Health Records"

    logsMainContainer.append(logContainer)
    logContainer.append(status, description, dob)    
    });

    



}
fetchPetLogs();

let addPrescriptions = document.getElementById("addPrescription").addEventListener("click", () => {
    window.open(`./addPrescription.html?petId=${petId}`, "_self")
})