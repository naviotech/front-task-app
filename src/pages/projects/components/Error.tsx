const Error = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="text-center rounded-xl bg-red-100 text-red-500 font-bold p-3 my-4 text-sm">
      {children}
    </div>
  )
}

export default Error
