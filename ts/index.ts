function calculateMonthlyPayment(P: number, r: number, n: number): number {
  // Beräkna den månatliga betalningen enligt formeln
  const monthlyInterestRate = r / 100 / 12;
  const numerator = P * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n);
  const denominator = Math.pow(1 + monthlyInterestRate, n) - 1;

  const monthlyPayment = numerator / denominator;
  return monthlyPayment;
}

function calculateTotalInterest(P: number, monthlyPayment: number, n: number): number {
  // Beräkna den totala räntekostnaden över låneperioden
  return (monthlyPayment * n) - P;
}

function calculateAmortizationSchedule(P: number, r: number, n: number, monthlyPayment: number): string {
  // Beräkna amorteringsplanen för lånet
  let remainingBalance = P;
  let amortizationSchedule = '<h3>Amorteringsplan:</h3><table><tr><th>Månad</th><th>Återbetald belopp</th><th>Räntekostnad</th><th>Resterande skuld</th></tr>';
  
  for (let month = 1; month <= n; month++) {
    const interestPayment = remainingBalance * r / 100 / 12;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    amortizationSchedule += 
    `<tr>
    <td>${month}</td>
    <td>${principalPayment.toFixed(2)}</td>
    <td>${interestPayment.toFixed(2)}</td>
    <td>${remainingBalance.toFixed(2)}</td>
    </tr>`;
  }

  amortizationSchedule += '</table>';
  return amortizationSchedule;
}

function calculateLoanPayment() {
  // Hämta inputvärden från HTML-formuläret
  const loanAmount = parseFloat((<HTMLInputElement>document.getElementById('amount')).value) || 0;
  const annualInterestRate = parseFloat((<HTMLInputElement>document.getElementById('rent')).value) || 0;
  let loanPeriodInYears = parseFloat((<HTMLInputElement>document.getElementById('years')).value) || 0;

  // Begränsa avbetalningsperioden till högst 50 år
  if (loanPeriodInYears > 50) {
    loanPeriodInYears = 50;
    alert('Avbetalningsperioden har begränsats till högst 50 år.');
  }

  // Beräkna antalet betalningar
  const numberOfPayments = loanPeriodInYears * 12;

  // Beräkna månadskostnaden, totala räntekostnaden och amorteringsplanen
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, numberOfPayments);
  const totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, numberOfPayments);
  const amortizationTable = calculateAmortizationSchedule(loanAmount, annualInterestRate, numberOfPayments, monthlyPayment);

  // Visa resultat på webbsidan
  const resultDiv = document.getElementById('result')!;
  const amortizationDiv = document.getElementById('amortization')!;

  resultDiv.innerHTML = `Månadskostnaden är: ${monthlyPayment.toFixed(2)}<br>
                        Totala räntekostnaden över hela låneperioden är: ${totalInterest.toFixed(2)}`;
  
  amortizationDiv.innerHTML = amortizationTable;
}

// Lyssna på klickhändelsen för knappen och beräkna lånekostnaden när användaren klickar på den
document.getElementById('count')!.addEventListener('click', calculateLoanPayment);
