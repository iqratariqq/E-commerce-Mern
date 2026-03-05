import { Children } from "react"
import Navbar from "./Navbar"


const Layout = ({children}) => {
  return (
    <div className="">
{console.log("rendering layout component with children", children)}
      <Navbar/>
      <main>{children}</main>
    </div>
  )
}

export default Layout
