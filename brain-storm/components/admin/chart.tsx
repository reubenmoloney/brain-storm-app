interface chartProps{
    week1: number,
    week2: number,
    week3: number,
    week4: number,
}

function Example({week1,week2,week3,week4}: chartProps) {
    
    


    return (
        <>
            {/* Filled line chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Filled line Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;