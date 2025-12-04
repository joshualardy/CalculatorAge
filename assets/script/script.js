const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const calculate = document.getElementById('calculate');
const years = document.getElementById('years-value');
const months = document.getElementById('months-value');
const days = document.getElementById('days-value');
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');
const today = new Date();

// Function to clear all errors
function clearAllErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
    day.classList.remove('error');
    month.classList.remove('error');
    year.classList.remove('error');
}

// Function to set error for a specific field
function setError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
}

// Function to clear error for a specific field
function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
}


calculate.addEventListener('click', () => {
    // Clear all previous errors
    clearAllErrors();
    
    let hasError = false;
    
    // Check for empty fields
    if (day.value === '') {
        setError(day, dayError, 'This field is required');
        hasError = true;
    }
    if (month.value === '') {
        setError(month, monthError, 'This field is required');
        hasError = true;
    }
    if (year.value === '') {
        setError(year, yearError, 'This field is required');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    /*Convert inputs to numbers*/
    const dayNum = parseInt(day.value, 10);
    const monthNum = parseInt(month.value, 10);
    const yearNum = parseInt(year.value, 10);
    
    /*Check if the input is a valid number*/
    if(isNaN(dayNum)) {
        setError(day, dayError, 'Must be a valid day');
        hasError = true;
    }
    if(isNaN(monthNum)) {
        setError(month, monthError, 'Must be a valid month');
        hasError = true;
    }
    if(isNaN(yearNum)) {
        setError(year, yearError, 'Must be a valid year');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    /*Check if the month is between 1 and 12*/
    if (monthNum < 1 || monthNum > 12) {
        setError(month, monthError, 'Must be a valid month');
        hasError = true;
    }
    
    /*Check if the year is in the future*/
    if (yearNum > today.getFullYear()) {
        setError(year, yearError, 'Must be in the past');
        hasError = true;
    }
    
    /*Check if the day is between 1 and 31*/    
    if (dayNum < 1 || dayNum > 31) {
        setError(day, dayError, 'Must be a valid day');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    /*Check if the date is valid*/
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    
    // Check if the date is actually valid (handles cases like Feb 30)
    if(birthDate.getDate() !== dayNum || birthDate.getMonth() !== (monthNum - 1) || birthDate.getFullYear() !== yearNum) {
        setError(day, dayError, 'Must be a valid date');
        hasError = true;
    }
    
    if(birthDate > today) {
        setError(year, yearError, 'Must be in the past');
        hasError = true;
    }
    
    if (hasError) {
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

// Clear errors when user starts typing
day.addEventListener('input', () => {
    clearError(day, dayError);
});

month.addEventListener('input', () => {
    clearError(month, monthError);
});

year.addEventListener('input', () => {
    clearError(year, yearError);
});