import { faCircle, faCirclePlus, faDeleteLeft, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface CardUserInfoProps<T> {
  titulo: string;
  data: T[];
  datos?: string;
  datos2?: string;
  datos3?: string;
  datos4?: string;
  experiencia?:[];
  keyName: string
  formCreate: JSX.Element;
}

export const CardUserInfo = <T,>({
  titulo,
  data,
  datos,
  datos2,
  datos3,
  datos4,
  keyName,
  formCreate,
}: CardUserInfoProps<T>) => {
  const handleAddItem = () => {
    MySwal.fire({
      html: formCreate,
      showCancelButton: false,
      showConfirmButton: false,
      preConfirm: () => {
        // const form = document.getElementById('my-form') as HTMLFormElement;
        // if (form) {
        //   return handleSubmit(submit)().then(() => null);
        // }
        return null;
      },
    });
  };

  return (
    <div className="bg-white rounded-md p-4 relative">
      <div className="text-xl text-politectico font-bold">{titulo}</div>
      
      <div className="mt-1">
        {data.map((item, index) => (
        <div className="flex items-center" key={index}>
          <button>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-[.7rem] mr-1"
            />
          </button>
          
          
          {String(item[keyName as keyof T])}
        </div>
      ))}
        {datos} {datos2} {datos3} {datos4}
      </div>
      <FontAwesomeIcon
        icon={faCirclePlus}
        onClick={handleAddItem}
        className="absolute top-4 right-4 text-politectico/60 text-xl cursor-pointer hover:text-politectico"
      />
    </div>
  );
};
