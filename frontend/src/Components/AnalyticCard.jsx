

const AnalyticCard = ({ title, value, icon: Icon }) => {
    return (

        <div className={`rouded-lg p-6 overflow-hidden relative  bg-taupeDark/70`}>
            <div className="flex items-center justify-between">
                <div className="z-10">
                    <p className="text-sm text-offWhite/80 font-semibold mb-1">{title}</p>
                    <h3 className="text-3xl text-white font-bold">{value}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-pumpkinDark/40 to-pumpkinLight/20  "/>
                <div className=" text-pupkin_spice opacity-50 absolute -bottom-4 -right-4">
                    <Icon className="size-32 " />
                </div>
            </div>

        </div>
    )
}

export default AnalyticCard
