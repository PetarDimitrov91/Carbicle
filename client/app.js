console.log('yes')

document.getElementById('main').addEventListener('click', (ev) => {
    if (ev.target.textContent === 'Show more') {
        ev.target.nextElementSibling.style.display = 'block';
        ev.target.textContent = 'Hide'
    } else if (ev.target.textContent === 'Hide') {
        ev.target.nextElementSibling.style.display = 'none';
        ev.target.textContent = 'Show more';
    }
});

