export function HomePriceInput({ label, sharedHomeDollar, setSharedHomeDollar }) {
    const handleChange = (e) => {
      setSharedHomeDollar(e.target.value.replace(/[^0-9]/g, ""));
    };
    const handleBlur = () => {
      if (sharedHomeDollar === "") {
        setSharedHomeDollar("0");
      }
    };
    const formatCurrency = (value) => {
      const number = parseInt(value);
      return isNaN(number)
        ? ""
        : number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
    };
    return (
      <div>
        <div className="w-full">
          <p className="text-sm py-1">{label}</p>
          <input
            className="w-full bg-transparent text-md border border-slate-200 px-3 py-2"
            placeholder="$"
            value={formatCurrency(sharedHomeDollar)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  }
  