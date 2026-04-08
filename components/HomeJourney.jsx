const HomeJourney = () => {

    const data = [{
        id: 1, img: "https://framerusercontent.com/images/J67o6ELj2iHdl0g8FXfRJ656r9U.png", head: "Medical Seaport", info: "We manage planning and booking for your adventure. Our services ensure a smooth travel experience."
    },
    {
        id : 2,
        img:"https://framerusercontent.com/images/SLQUmE3NhHzEJ5qqGOLyeodhReo.png",
        head:"Cultural Tours",
        info:"We handle the planning and booking for your adventure, ensuring every detail is covered for a seamless travel experience."
    },
    {
        id : 3,
        img:"https://framerusercontent.com/images/pyhj5Ifd2SEmV02rkNsX1YwSg.png",
        head:"Honeymoon Planning",
        info:"Let us take care of your adventure planning and bookings, so you can enjoy a hassle-free travel journey."
    }
]
    return (
        <>
            <section className="journey  bg-[#f0f2f7]  py-[6rem]">
                <header>
                    <h1 className="text-center text-5xl font-medium">Journey Solutions</h1>
                    <p className="text-center font-light mt-4  text-[rgb(86,87,92)] m-auto">We manage planning and booking for your adventure. <br /> Our services ensure a smooth travel experience.</p>
                </header>

                <div className="journey-cards flex justify-center gap-7 mt-15 ">
                    {
                        data.map((data)=>{
                            return ( 
                                <div className="card w-90  ">
                                    <img src={`${data.img}`} alt="" />
                                    <h1 className="font-medium text-3xl my-3">{data.head}</h1>
                                    <p className=" font-light mt-4  text-[rgb(86,87,92)] ">{data.info}</p>
                                </div>
                        )
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default HomeJourney;