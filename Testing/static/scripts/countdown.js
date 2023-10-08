
function test(initialCountdownTimeN) {
    const countdownTimer = document.getElementById('countdown-timer');
    // convert the string to a number
    let initialCountdownTime = Number(initialCountdownTimeN);
    
    // Get the initial countdown time from the Jinja parameter
    
    // Function to update the countdown timer.
    function updateTimer() {
        const remainingTime = calculateTimeUnits(initialCountdownTime);
        countdownTimer.textContent = formatTime(remainingTime);
        
        if (remainingTime.totalSeconds > 0) {
            initialCountdownTime--;
            setTimeout(updateTimer, 1000); // Update every second
        }
    }
    
    // Function to calculate time units (seconds, minutes, hours, days, months).
    function calculateTimeUnits(totalSeconds) {
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInMonth = secondsInDay * 30; // Assuming 30 days per month
        const secondsInYear = secondsInMonth * 12; // Assuming 12 months per year
        
        const years = Math.floor(totalSeconds / secondsInYear);
        const months = Math.floor(totalSeconds / secondsInMonth);
        const days = Math.floor((totalSeconds % secondsInMonth) / secondsInDay);
        const hours = Math.floor((totalSeconds % secondsInDay) / secondsInHour);
        const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);
        const seconds = totalSeconds % secondsInMinute;
        
        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            totalSeconds,
        };
    }
    
    // Function to format time as "MM months, DD days, HH:MM:SS".
    function formatTime(time) {
        const { years, months, days, hours, minutes, seconds } = time;
        const formattedTime = [];
        
        if (years > 0) {
            formattedTime.push(`${years} years`);
        }
        if (months > 0) {
            formattedTime.push(`${months} months`);
        }
        if (days > 0) {
            formattedTime.push(`${days} days`);
        }
        formattedTime.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        
        return formattedTime.join(', ');
    }
    
    // Start the countdown timer.
    updateTimer();
}
