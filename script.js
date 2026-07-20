const input = document.querySelector('#servings-input');
const amount = document.querySelector('.amount');

input.addEventListener('input', () => {
    let value = this.value;

    // Save to local storage
    localStorage.setItem('globalServings', value);
    let updateServingsEvent = new CustomEvent('updateServings', {
        detail: {
            servings: value
        }   
    });
    window.dispatchEvent(updateServingsEvent);
});

// Update amount
window.addEventListener('updateServings', function (e) {
    amount.textContent  = e.detail.servings * 100;
});

// Update other tabs value
window.addEventListener('storage', (e) => {
    if (e.key === 'globalServings') {
        let updatedValue = e.newValue;
        // console.log(updatedValue);

        input.value = updatedValue;
        amount.textContent = updatedValue * 100;
    }
});