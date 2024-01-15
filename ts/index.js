function calculateMonthlyPayment(P, r, n) {
    // Beräkna den månatliga betalningen enligt formeln
    var monthlyInterestRate = r / 100 / 12;
    var numerator = P * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n);
    var denominator = Math.pow(1 + monthlyInterestRate, n) - 1;
    var monthlyPayment = numerator / denominator;
    return monthlyPayment;
}
function calculateTotalInterest(P, monthlyPayment, n) {
    // Beräkna den totala räntekostnaden över låneperioden
    return (monthlyPayment * n) - P;
}
function calculateAmortizationSchedule(P, r, n, monthlyPayment) {
    // Beräkna amorteringsplanen för lånet
    var remainingBalance = P;
    var amortizationSchedule = '<h3>Amorteringsplan:</h3><table><tr><th>Månad</th><th>Återbetald belopp</th><th>Räntekostnad</th><th>Resterande skuld</th></tr>';
    for (var month = 1; month <= n; month++) {
        var interestPayment = remainingBalance * r / 100 / 12;
        var principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        amortizationSchedule +=
            "<tr>\n    <td>".concat(month, "</td>\n    <td>").concat(principalPayment.toFixed(2), "</td>\n    <td>").concat(interestPayment.toFixed(2), "</td>\n    <td>").concat(remainingBalance.toFixed(2), "</td>\n    </tr>");
    }
    amortizationSchedule += '</table>';
    return amortizationSchedule;
}
function calculateLoanPayment() {
    // Hämta inputvärden från HTML-formuläret
    var loanAmount = parseFloat(document.getElementById('amount').value) || 0;
    var annualInterestRate = parseFloat(document.getElementById('rent').value) || 0;
    var loanPeriodInYears = parseFloat(document.getElementById('years').value) || 0;
    // Begränsa avbetalningsperioden till högst 50 år
    if (loanPeriodInYears > 50) {
        loanPeriodInYears = 50;
        alert('Avbetalningsperioden har begränsats till högst 50 år.');
    }
    // Beräkna antalet betalningar
    var numberOfPayments = loanPeriodInYears * 12;
    // Beräkna månadskostnaden, totala räntekostnaden och amorteringsplanen
    var monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, numberOfPayments);
    var totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, numberOfPayments);
    var amortizationTable = calculateAmortizationSchedule(loanAmount, annualInterestRate, numberOfPayments, monthlyPayment);
    // Visa resultat på webbsidan
    var resultDiv = document.getElementById('result');
    var amortizationDiv = document.getElementById('amortization');
    resultDiv.innerHTML = "M\u00E5nadskostnaden \u00E4r: ".concat(monthlyPayment.toFixed(2), "<br>\n                        Totala r\u00E4ntekostnaden \u00F6ver hela l\u00E5neperioden \u00E4r: ").concat(totalInterest.toFixed(2));
    amortizationDiv.innerHTML = amortizationTable;
}
// Lyssna på klickhändelsen för knappen och beräkna lånekostnaden när användaren klickar på den
document.getElementById('count').addEventListener('click', calculateLoanPayment);
