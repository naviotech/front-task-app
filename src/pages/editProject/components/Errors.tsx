const Errors = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="p-3 my-4 text-sm font-bold text-center text-red-500 bg-red-100 rounded-xl">
      {children}
    </div>
  )
}

export default Errors