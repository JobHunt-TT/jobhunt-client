interface FormLayoutProps {
  title: string
  children?: JSX.Element
}

export const FormLayout = ({ children, title }: FormLayoutProps) => {
  return(
    <div className="h-full">
      <div className="h-screen flex justify-center items-center flex-col bg-politectico text-white">
        <img src="./img/Lupa.png" alt="Lupa" className="w-32 sm:w-44 md:w-52" />
        <div className="font-bold text-center text-7xl sm:text-8xl md:text-9xl mt-6">{title}</div>
      </div>
      <div className="flex items-center flex-col my-20">
        {children}
        <div className="flex items-center flex-col mx-4 sm:px-0">
          <div className="text-politectico text-xl sm:text-3xl font-bold mb-10">
            Estás a un clic del talento que necesitas
          </div>
          <div className="mb-4">
            <i className="fa-brands fa-square-facebook text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-x-twitter text-3xl text-politectico mx-1"></i>
            <i className="fa-brands fa-instagram text-3xl text-politectico mx-1"></i>
          </div>
          <div className="text-politectico font-semibold">&copy; 2023</div>
        </div>
      </div>
    </div>
  )
}