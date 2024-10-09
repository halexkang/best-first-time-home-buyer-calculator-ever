export function InterestInput({ label, interestRate, setInterestRate }) {
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) {
        return;
    }
    const parts = value.split('.');
    if (parts.length > 1 && parts[1].length > 3) {
        return;
    }
    setInterestRate(value);
  };
  const handleBlur = () => {
    if (interestRate === "") {
      setInterestRate("0");
    }
  };
  const formatPercentage = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "";
    const decimalPlaces = (value.split(".")[1] || "").length;
    if (decimalPlaces === 0) {
      if (value.includes(".")) {
        return `${number}.%`;
      }
      return `${number}%`;
    } else if (decimalPlaces === 1) {
      return number.toFixed(1) + "%";
    } else if (decimalPlaces === 2) {
      return number.toFixed(2) + "%";
    } else {
      return number.toFixed(3) + "%";
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      setInterestRate((prev) => {
        return prev.slice(0, -1);
      });
    }
  };

  return (
    <div>
      <div className="w-full">
        <p className="text-sm py-1">{label}</p>
        <input
          className="w-full bg-transparent text-md border border-slate-200 px-3 py-2"
          placeholder="%"
          value={formatPercentage(interestRate)}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
