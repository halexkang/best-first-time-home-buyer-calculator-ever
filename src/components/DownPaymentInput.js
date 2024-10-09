import { useEffect } from "react";

export function DownPaymentInput({ label, sharedHomeDollar, percent, setPercent, downPaymentDollar, setDownPaymentDollar, defaultPercent }) {
  const sharedHomeNumber = parseInt(sharedHomeDollar) || 0;
  const downPaymentNumber = parseInt(downPaymentDollar) || 0;
  const isError = downPaymentNumber > sharedHomeNumber;

  useEffect(() => {
    if (sharedHomeNumber > 0) {
      const newPercent = Math.min(
        ((downPaymentNumber / sharedHomeNumber) * 100).toFixed(0),
        999
      ).toFixed(0);
      setPercent(newPercent);
    } else {
      setPercent("0");
    }
  }, [downPaymentNumber, sharedHomeNumber, setPercent]);

  const handleDollarChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDownPaymentDollar(value);
    if (value === "" || sharedHomeDollar === "0") {
      setPercent("0");
    } else {
      setPercent(
        ((parseInt(value) / parseInt(sharedHomeDollar)) * 100).toFixed(0)
      );
    }
  };

  const handlePercentChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const number = parseInt(value) || 0;
    setPercent(value);
    if (number === 0) {
      setDownPaymentDollar("0");
    } else {
      setDownPaymentDollar(((number / 100) * sharedHomeDollar).toFixed(0));
    }
  };
  const handleDollarBlur = () => {
    if (downPaymentDollar === "") {
      setDownPaymentDollar("0");
    }
  };
  const handlePercentBlur = () => {
    if (percent === "") {
      setPercent("0");
      setDownPaymentDollar("0");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      setPercent((prev) => {
        const newValue = prev.slice(0, -1);
        if (newValue === "") {
          setDownPaymentDollar("0");
        } else {
          setDownPaymentDollar(((newValue / 100) * sharedHomeDollar).toFixed(0));
        }
        return newValue;
      });
    }
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value.replace(/,/g, ""));
    return isNaN(number)
      ? ""
      : number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
  };
  const formatPercentage = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? "" : number.toFixed(0) + "%";
  };

  return (
    <div>
      <div className="w-full">
        <p className="text-sm py-1">{label}</p>
        <div className="flex">
          <input
            className={`w-2/3  text-md border px-3 py-2 ${
              isError ? "border-red-500 bg-red-100" : "bg-transparent border-slate-200"
            }`}
            placeholder="$"
            value={formatCurrency(downPaymentDollar)}
            onChange={handleDollarChange}
            onBlur={handleDollarBlur}
          />
          <input
            className="w-1/3 bg-transparent text-md border border-slate-200 px-3 py-2 ml-2"
            placeholder="%"
            value={formatPercentage(percent)}
            onChange={handlePercentChange}
            onBlur={handlePercentBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
