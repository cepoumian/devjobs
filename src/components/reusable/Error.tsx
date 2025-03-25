import { CircleX } from "lucide-react";
import Button from "./Button";

interface ErrorProps {
  error: Error | null;
  message?: string;
  retry?: (() => void) | null;
  className?: string;
}

const Error = ({
  error,
  message = "Something went wrong",
  retry = null,
  className = "",
}: ErrorProps) => {
  return (
    <div className={`error ${className}`}>
      <div className="error__content">
        <div className="error__icon">
          <CircleX size={64} />
        </div>
        <div className="error__message">
          <h3>{message}</h3>
          {error && process.env.NODE_ENV !== "production" && (
            <div className="error__details">{error.toString()}</div>
          )}
        </div>
      </div>
      {retry && (
        <div className="error__actions">
          <Button onClick={retry}>Try again</Button>
        </div>
      )}
    </div>
  );
};

export default Error;
