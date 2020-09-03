// Listen for submit
document.getElementById("loan-form").addEventListener('submit', function (e) {
  // Hide results and show loader
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  // Clear errors
  clearError();

  setTimeout(calculateResults, '2000');
  e.preventDefault()
});

// Calculate results
function calculateResults() {
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Calculation Vars
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // Show results & hide loader
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers.');
  }
}

// Show Error
function showError(error) {
  // Hide results and loader
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  // create div
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card');
  const loading = document.querySelector('#loading');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above loading
  card.insertBefore(errorDiv, loading);
}

// Clear error
function clearError() {
  alert = document.querySelector('.alert');
  if (alert) alert.remove();
}