import { useState } from "react";
import { HomePriceInput } from "./HomePriceInput";
import { DownPaymentInput } from "./DownPaymentInput";
import { InterestInput } from "./InterestInput";
import { LoanYearsInput } from "./LoanYearsInput";
import { MortgageChart } from "./MortgageChart";

export function MortgageForm() {
  function PMT(fv, type) {
    var mir = parseFloat(interestRate) || 0;
    var ps = parseInt(paymentSchedule) || 0;
    var ly = parseInt(loanYears);
    var shd = parseInt(sharedHomeDollar) || 0;
    var dpd = parseFloat(downPaymentDollar) || 0;
  
    var ir = mir / 100 / ps;
    var np = ly * ps;
    var pv = shd - dpd;
    if (parseInt(loanYears) <= 0) {
      return "$0";
    }
    var pmt, pvif;
    fv || (fv = 0);
    type || (type = 0);
    if (ir === 0) {
      console.log("herro!")
      return "$0";
      
    } 
    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);
    if (type === 1) pmt /= 1 + ir;
    return isNaN(pmt) || (-pmt) < 0
      ? "$0"
      : (-pmt).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  }

  const HOME_PRICE = "300000";
  const DEFAULT_PERCENTAGE = "20";
  const [sharedHomeDollar, setSharedHomeDollar] = useState(HOME_PRICE);
  const [percent, setPercent] = useState(DEFAULT_PERCENTAGE);

  const calculateDownPaymentDollar = (percent) => {
    const homePriceNumber = parseInt(sharedHomeDollar) || 0;
    const percentNumber = parseInt(percent) || 0;
    const downPayment = ((homePriceNumber * percentNumber) / 100).toFixed(0);
    return downPayment;
  };

  const [downPaymentDollar, setDownPaymentDollar] = useState(
    calculateDownPaymentDollar(DEFAULT_PERCENTAGE)
  );

  const calculateLoanAmount = () => {
    const homePriceNumber = parseInt(sharedHomeDollar) || 0;
    const downPaymentNumber = parseInt(downPaymentDollar) || 0;
    return (homePriceNumber - downPaymentNumber).toFixed(0);
  };

  const loanAmount = calculateLoanAmount();
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanYears, setLoanYears] = useState("30");
  const [paymentSchedule, setPaymentSchedule] = useState("12");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex flex-col p-5 bg-red-500 w-full md:w-2/5">
        <h1 className="font-bold">Loan details</h1>
        <HomePriceInput
          label="Home price"
          sharedHomeDollar={sharedHomeDollar}
          setSharedHomeDollar={setSharedHomeDollar}
        />
        <DownPaymentInput
          label="Down Payment"
          sharedHomeDollar={sharedHomeDollar}
          percent={percent}
          setPercent={setPercent}
          downPaymentDollar={downPaymentDollar}
          setDownPaymentDollar={setDownPaymentDollar}
          defaultPercent={DEFAULT_PERCENTAGE}
        />
        <InterestInput
          label="Interest rate"
          interestRate={interestRate}
          setInterestRate={setInterestRate}
        />
        <LoanYearsInput
          label="Loan term (years)"
          loanYears={loanYears}
          setLoanYears={setLoanYears}
        />
        <div className="w-full">
          <p className="text-sm py-1">Payment schedule</p>
          <select
            className="w-full bg-transparent text-md border border-slate-200 px-3 py-2"
            value={paymentSchedule}
            onChange={(e) => setPaymentSchedule(e.target.value)}
          >
            <option value="12">Monthly</option>
            <option value="26">Biweekly</option>
          </select>
        </div>
        <div className="w-full">
          <p className="text-sm py-1">Start date</p>
          <input
            className="w-full bg-transparent text-md border border-slate-200 px-3 py-2"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col p-5 bg-green-500 w-full md:w-3/5">
        <h1 className="font-bold pt-2">Your loan estimate</h1>
        <h1 className="text-bold text-lg pt-2">Total monthly payments</h1>
        <p className="text-2xl pt-2">{PMT()}</p>
        <MortgageChart loanAmount={loanAmount} interestRate={interestRate} paymentSchedule={paymentSchedule} loanYears={loanYears} />
      </div>
    </div>
  );
}
