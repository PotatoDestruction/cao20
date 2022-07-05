var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '.' + dd + '.' + yyyy;
console.log(today)

const url = new URL(document.location);
let petId = url.searchParams.get('petId');
console.log(petId)

const addPrescription = async (prescription) =>{
    await fetch(`http://localhost:8080/v1/prescriptions`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(prescription)
    })
};

const fetchMedications = async () => {
    const res = await fetch(`http://localhost:8080/v1/medications`);
    let medication = await res.json();

    medication.forEach(med => {
        let select = document.getElementById("select")
        let option = document.createElement("option");
        option.value = med.id
        option.textContent = med.name

        select.append(option)
    })
    
}
fetchMedications();

let addPrescriptionButton = document.getElementById("addPrescriotion-button").addEventListener("click", () => {
    console.log(select.value)

    let comment = document.getElementById("comment").value
    let newPrescription = {
        medication_id: Number(select.value),
        pet_id: Number(petId),
        comment: comment,
        timestamp: today
    }
    console.log(newPrescription)
    console.log(123123)
    addPrescription(newPrescription)
    setTimeout(() => window.open(`./log.html?petId=${petId}`, "_self"), 650);

})