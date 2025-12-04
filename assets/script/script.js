const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const calculate = document.getElementById('calculate');
const years = document.getElementById('years-value');
const months = document.getElementById('months-value');
const days = document.getElementById('days-value');
const today = new Date();


calculate.addEventListener('click', () => {
 if (day.value === '' || month.value === '' || year.value === '') {
        alert('Please fill in all fields');
        return;
    }
    /*Convert inputs to numbers*/
    const dayNum = parseInt(day.value, 10);
    const monthNum = parseInt(month.value, 10);
    const yearNum = parseInt(year.value, 10);
    
    /*Check if the input is a valid number*/
    if(isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
        alert('Please enter a valid date');
        return;
    }
    /*Check if the day is between 1 and 31*/    
    if (dayNum < 1 || dayNum > 31) {
        alert('Please enter a valid day');
        return;
    }

    /*Check if the month is between 1 and 12*/
    if (monthNum < 1 || monthNum > 12) {
        alert('Please enter a valid month');
        return;
    }

    /*Check if the year is in the future*/
    if (yearNum > today.getFullYear()) {
        alert('Please enter a valid year');
        return;
    }
    /*Check if the date is valid*/
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    if(isNaN(birthDate.getTime())) {
        alert('Please enter a valid date');
        return;
    }
    if(birthDate > today) {
        alert('Birth date cannot be in the future');
        return;
    }
    function calculateAge(birthDate) {
        let newYear = today.getFullYear() - birthDate.getFullYear();
        let newMonth = today.getMonth() - birthDate.getMonth();
        let newDay = today.getDate() - birthDate.getDate();
        
        // Handle negative days (borrow from months)
        if (newDay < 0) {
            newMonth--;
            // Get the last day of the previous month
            const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            newDay += lastDayOfPrevMonth;
        }
        
        // Handle negative months (borrow from years)
        if (newMonth < 0) {
            newYear--;
            newMonth += 12;
        }
        
        return { newYear, newMonth, newDay };
    }
    const { newYear, newMonth, newDay } = calculateAge(birthDate);
    
    // Remove animation class if it exists
    years.classList.remove('animate');
    months.classList.remove('animate');
    days.classList.remove('animate');
    
    // Trigger reflow to restart animation
    void years.offsetWidth;
    void months.offsetWidth;
    void days.offsetWidth;
    
    // Update values
    years.textContent = newYear;
    months.textContent = newMonth;
    days.textContent = newDay;
    
    // Add animation class
    years.classList.add('animate');
    months.classList.add('animate');
    days.classList.add('animate');

    day.value = '';
    month.value = '';
    year.value = '';
  
  
});