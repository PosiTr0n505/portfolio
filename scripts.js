window.addEventListener('DOMContentLoaded', event => {
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Visitor Counter
    const apiUrl = 'https://39y1vrgvv7.execute-api.eu-west-3.amazonaws.com/prod/CountAPI';
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const body = JSON.parse(data.body); 
        const target = body.count;
        
        const countElement = document.getElementById('visitor-count');
        let current = 0;
        
        const updateCounter = () => {
            const increment = Math.ceil(target / 50);
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                countElement.innerText = current;
                setTimeout(updateCounter, 20);
            } else {
                countElement.innerText = target;
            }
        };
        updateCounter();
    })
    .catch(error => {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitor-count').innerText = "—";
    });
 });
