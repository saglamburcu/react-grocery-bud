import { useEffect } from "react";

function Alert({ message, type, showAlert, list }) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert()
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list])

  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
    </div>
  )
};

export default Alert;