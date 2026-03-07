

const MenuCard = ({menu}) => {
    console.log("menu item in MenuCard", menu)
  return (
    <div className="bg-toupe/45 rounded-lg p-4 w-full max-w-sm border   hover:bg-toupe/60 transition-colors duration-300 cursor-pointer shadow-md border-beige/25 hover:shadow-lg"
    >
<h1>{menu.name}</h1>
    </div>
  )
}

export default MenuCard
