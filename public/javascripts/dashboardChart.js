const tChart = document.getElementById('timeChart');
const myChart = new Chart(tChart, {
    type: 'doughnut',
    data: {
        labels: ['Time spent on Reading'],
        datasets: [{
            // label: '# of Votes',
            data: [12,7], //[total hours, goal hours]
            backgroundColor: [
                'rgba(96, 150, 186, 0.8)',
                'rgba(231, 236, 239, 0.8)'
            ],
            borderColor: [
                'rgba(96, 150, 186, 1)',
                'rgba(231, 236, 239, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});