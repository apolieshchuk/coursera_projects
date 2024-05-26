const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if(input.includes('countr')){
                data = data.countries.flatMap(c => c.cities);
            } else if(input.includes('temple')){
                data = data.temples;
            } else if(input.includes('beach')){
                data = data.beaches;
            } else {
                return []
            }

            data.forEach((item) => {
                resultDiv.innerHTML += `<h2>${item.name}</h2>`;
                resultDiv.innerHTML += `<img src="${item.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<p><strong>Description:</strong> ${item.description}</p>`;
            })
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
function resetForm() {
    document.getElementById("conditionInput").value = "";
    searchCondition()
}

btnSearch.addEventListener('click', searchCondition);
btnReset.addEventListener('click', resetForm);