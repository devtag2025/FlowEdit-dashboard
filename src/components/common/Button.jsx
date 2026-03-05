export const Button = ({ children, className = "", ...props }) => {
  const baseStyles = "cursor-pointer text-xs md:text-base";
  return (
    <button {...props} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};
