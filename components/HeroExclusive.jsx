const HeroExclusive = () => {
    // Data array with 3 cards
    const cards = [
        {
            id: 1,
            video: "https://framerusercontent.com/assets/rukqDCtd2p6B6fajjjteEduhLK0.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 30% Discounts for Previous Travelers",
            description: "Enjoy a 30% discount on exclusive travel packages for our valued travelers. Whether you want early bird specials or last-minute adventures, we have the perfect deal for you!"
        },
        {
            id: 2,
            video: "https://framerusercontent.com/assets/GDsApcBZ9JsDDZfuHDdXZE5dUbg.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 24% Discounts for Group Traveler",
            description: " Take advantage of a fantastic 24% discount on our exclusive group travel packages! Whether you're planning a fun getaway with friends or a family reunion, we have the ideal offers to make your journey unforgettable."
        },
        {
            id: 3,
            video: "https://framerusercontent.com/assets/k1yHHotiYaeEInlsOjdbV2btE.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 25% Exclusive Discounts for Couples",
            description: "Enjoy an exclusive 25% discount on our specially curated travel packages for couples! Whether you're looking for a romantic escape or a cozy weekend getaway, we have the perfect deals to create unforgettable memories together."
        }
    ];

    return (
        <>
            <section className="Exclusive py-[6rem]">
                <header>
                    <h1 className="text-center text-5xl font-medium text-[#161618]">Exclusive Deals & Discounts</h1>
                    <p className="w-[40%] text-center font-light mt-4 text-[rgb(86,87,92)] m-auto">
                       Embark on a journey to far-flung corners of the globe. From the bustling streets of Tokyo to the serene beaches of Bali, our curated selection of exotic destinations offers.
                    </p>
                </header>
                
                <div className="Exclusive-cards px-[12rem] py-16">
                    {cards.map((card, index) => (
                        <div 
                            key={card.id} 
                            className={`card flex gap-12 items-center max-w-7xl mx-auto mb-16 ${
                                index % 2 === 1 ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div className="video flex-1 min-w-0">
                                <video 
                                    className="w-full aspect-[3/2] h-auto rounded-2xl object-cover" 
                                    src={card.video} 
                                    autoPlay 
                                    playsInline 
                                    loop
                                    muted
                                    preload="auto"
                                ></video>
                            </div>
                            <div className="info flex-1">
                                <img src={card.icon} alt="" />
                                <h1 className="text-5xl font-medium text-[#161618]">{card.title}</h1>
                                <p className="font-light mt-4 text-[rgb(86,87,92)]">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HeroExclusive;
