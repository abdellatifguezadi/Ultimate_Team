function toggleStats() {
    const position = document.getElementById('position').value;
    const normalStats = document.getElementById('normalStats');
    const gkStats = document.getElementById('gkStats');

    if (position === 'GK') {
        normalStats.style.display = 'none';
        gkStats.style.display = 'grid';
    } else {
        normalStats.style.display = 'grid';
        gkStats.style.display = 'none';
    }
}