

const AnalyticCard = ({title,value,icon:Icon}) => {
  return (
    <div className="bg-khakhi_beige ">
        <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-khakhi_beige/50">
                <Icon className="size-5 text-pupkin_spice"/>
            </div>
            <div>
                <h2 className="text-sm text-gray-500">{title}</h2>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
      
    </div>
  )
}

export default AnalyticCard
