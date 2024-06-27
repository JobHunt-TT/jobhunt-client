import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface PropsAlertNotification {
  show: boolean;
  title: string;
  message?: string | string[];
  onClose: () => void;
}

export const AlertNotification = ({
  show,
  title,
  message,
  onClose,
}: PropsAlertNotification) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <div
          className={`max-w-sm w-full p-4 bg-red-200 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transition-all transform ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex flex-row">
            <FontAwesomeIcon icon={faXmark} className="h-6 w-6 text-red-600" />
            <p className="ml-2 text-lg font-semibold text-red-600">{title}</p>
          </div>
          {message !== undefined && (
            <div className="pt-1 pl-1">
              {Array.isArray(message) ? (
                <ul className="list-disc pl-2">
                  {message.map((item, index) => (
                    <li className="ml-2 text-base text-left text-red-600" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-red-600">
                  {message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
