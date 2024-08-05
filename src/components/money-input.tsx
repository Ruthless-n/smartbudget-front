import { Input } from "./ui/input";

const MoneyInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
  
      // Remove any non-numeric characters (except for decimal point)
      const numericValue = inputValue.replace(/[^0-9.]/g, '');
  
      // Format the value to 2 decimal places
      const formattedValue = parseFloat(numericValue).toFixed(2);
  
      onChange(isNaN(Number(formattedValue)) ? '' : formattedValue);
    };
  
    return (
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        className="bg-transparent border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 w-full px-4 py-2 rounded-lg"
        placeholder="Enter amount"
      />
    );
  };
  
  export default MoneyInput;