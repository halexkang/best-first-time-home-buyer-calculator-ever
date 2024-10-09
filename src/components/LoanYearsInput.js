export function LoanYearsInput({ label, loanYears, setLoanYears }) {

    const isError = loanYears <= 0 || loanYears > 30;

    const handleChange = (e) => {
      setLoanYears(e.target.value.replace(/[^0-9]/g, ""));
    };
    const handleBlur = () => {
      if (loanYears === "") {
        setLoanYears("0");
      }
    };
    return (
      <div>
        <div className="w-full">
          <p className="text-sm py-1">{label}</p>
          <input
            className={`w-full  text-md border px-3 py-2 ${
              isError ? "border-red-500 bg-red-100" : "bg-transparent border-slate-200"
            }`}
            value={loanYears}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  }
  