async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

    let response = await fetch('http://127.0.0.1:9001/counter');
    let responseJson = await response.json();
    
    let countValue = responseJson.value;

    async function increment(){
        countValue++;
        countContainer.textContent = countValue;
        await fetch('http://127.0.0.1:9001/counter', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: countValue,
            })
        })
    }

    async function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        await fetch('http://127.0.0.1:9001/counter', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: countValue,
            })
        })
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    countContainer.textContent = countValue;

    let reset = document.getElementById('reset-button');
    reset.addEventListener('click', async function() {
        countValue = 0;
        countContainer.textContent = countValue;
        await fetch('http://127.0.0.1:9001/counter', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: countValue,
            })
        })
    })
}

main();