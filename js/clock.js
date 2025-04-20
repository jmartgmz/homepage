/**
 * Clock functionality
 * Handles time display and formatting
 */

/**
 * Updates the clock with current date and time
 */
function updateClock() {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const now = new Date();
    
    // Format hours for 12-hour clock
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format full date string
    const dateString =
        days[now.getDay()] + " " +
        String(now.getDate()).padStart(2, '0') + "/" +
        String(now.getMonth() + 1).padStart(2, '0') + "/" +
        now.getFullYear() + " " +
        String(hours).padStart(2, '0') + ":" +
        String(now.getMinutes()).padStart(2, '0') + ":" +
        String(now.getSeconds()).padStart(2, '0') + " " +
        ampm;
    
    // Update the element with the formatted time
    const timeElement = document.getElementById('time-display');
    if (timeElement) {
        timeElement.textContent = dateString;
    }
    
    // Update every second
    setTimeout(updateClock, 1000);
}