// src/MortgageChart.js

import React from 'react';
// import { Line } from 'react-chartjs-2';

export function MortgageChart(loanAmount, interestRate, loanYears, paymentSchedule) {
    const monthlyRate = interestRate / paymentSchedule;
    const totalPayments = loanYears * paymentSchedule; // Total number of payments
    const beginningBalances = [];
    const endingBalances = [];
    const labels = [];
    const amortizationSchedule = [];
    
    let balance = loanAmount;

    for (let month = 1; month <= totalPayments; month++) {
        const interest = balance * monthlyRate;
        const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        const principal = monthlyPayment - interest;

        beginningBalances.push(balance);
        balance -= principal;
        endingBalances.push(balance);
        labels.push(`Month ${month}`);

        amortizationSchedule.push({
            month: month,
            beginningBalance: balance + principal,
            interest: interest.toFixed(2),
            principal: principal.toFixed(2),
            endingBalance: balance.toFixed(2),
        });
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'Remaining Balance',
            data: endingBalances,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Remaining Balance ($)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Payment Month',
                },
            },
        },
    };

    return (
        <div>
            <h2>Mortgage Amortization Chart</h2>
            {/* <Line data={data} options={options} /> */}
            
            <h2>Amortization Schedule</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Month</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Beginning Balance</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Interest</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Principal</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Ending Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {amortizationSchedule.map((item) => (
                        <tr key={item.month}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.month}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>${item.beginningBalance.toFixed(2)}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>${item.interest}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>${item.principal}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>${item.endingBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
