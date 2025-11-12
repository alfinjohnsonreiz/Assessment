import React from 'react'

type Props = {
    children:React.ReactNode;
}

const ProtectedRoute = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute