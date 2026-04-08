const HomeTrustedPartner = () => {
    return (
        <>
            <section className="TrustedPartner   bg-[#f0f2f7]  py-[6rem]">
                <div className="px-12 py-16">
                    <div className="flex gap-12 items-center max-w-7xl mx-auto">
                        {/* Left: Image */}
                        <div className="flex-1 min-w-0">
                            <img 
                                
                                src="https://framerusercontent.com/images/yYupIXRGBwdTKkxHwUm3XdGnvlg.png?scale-down-to=1024"
                                className=" aspect-[4/3]  w-full h-auto rounded-3xl object-cover"
                                alt="travel"
                            />
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1">
                            <h1 className="text-5xl font-medium text-[#161618] mb-6">
                                Your Trusted Travel Partner is Here
                            </h1>
                            <p className="text-lg font-light text-[rgb(86,87,92)] mb-12 leading-relaxed">
                                We're more than just a travel agency, we're your trusted partner in creating unforgettable journeys. Our commitment to personalized service, expert advice, and competitive pricing sets us apart.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <h2 className="text-4xl font-semibold text-[#558ffc] mb-2">10k+</h2>
                                    <p className="text-[rgb(86,87,92)] font-light">Happy Travelers</p>
                                </div>
                                <div>
                                    <h2 className="text-4xl font-semibold text-[#558ffc] mb-2">15+</h2>
                                    <p className="text-[rgb(86,87,92)] font-light">Years of Expertise</p>
                                </div>
                                <div>
                                    <h2 className="text-4xl font-semibold text-[#558ffc] mb-2">99%</h2>
                                    <p className="text-[rgb(86,87,92)] font-light">Positive Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeTrustedPartner;