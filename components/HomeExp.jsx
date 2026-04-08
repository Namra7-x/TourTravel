import { useEffect, useRef } from "react";

const HomeExp = ({ videoSrc = "https://framerusercontent.com/assets/vcDo4jaVBqJXArUO9845j1SDy8.mp4" }) => {
    const reviews = [
        {
            id: 1,
            rating: "★★★★★",
            text: "I cannot recommend Waned Roust Travels enough. Their commitment to excellence truly sets them apart. ",
            image: "https://framerusercontent.com/images/rHuTnm1v0Vb0oSSEKRLkakYnwE.png",
            name: "Olivia Brown",
            role: "Art Director"
        },
        {
            id: 2,
            rating: "★★★★★",
            text: "Amazing experience! The team made our honeymoon truly unforgettable. Every detail was perfectly arranged. Highly recommend!",
            image: "https://framerusercontent.com/images/nV5WEF7nPAK2yHDYLtV5KR0wnsg.png",
            name: "James Wilson",
            role: "Software Engineer"
        },
        {
            id: 3,
            rating: "★★★★★",
            text: "Best travel agency I've ever worked with. Professional, attentive, and truly cares about customers. Will book again!",
            image: "https://framerusercontent.com/images/mqLBSH1K6DwM5POqQly1QKlYoA.png",
            name: "Sarah Chen",
            role: "Marketing Manager"
        },
        {
            id: 4,
            rating: "★★★★★",
            text: "Our family vacation was perfectly planned. The kids had the time of their lives! Thank you for an amazing experience!",
            image: "https://framerusercontent.com/images/SRhEBTB8JYJYmoYQJlksgXDLmQ.png",
            name: "Michael Davis",
            role: "Business Owner"
        },
        {
            id: 5,
            rating: "★★★★★",
            text: "Incredible service from start to finish. The team went above and beyond. Will definitely book again!",
            image: "https://framerusercontent.com/images/1EZnmq1gugNHCDHYVOG4rNUQt4.png",
            name: "Emily Taylor",
            role: "Designer"
        }
    ];

    const swiperRef = useRef(null);

    // Initialize Swiper after component mounts
    useEffect(() => {
        swiperRef.current = new Swiper('.mySwiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            autoplay: true,
            loop: true,
        });
    }, []);

    const goNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const goPrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    return (
        <>
            <section className="Experience py-16">
                <header>
                    <h1 className="text-center text-5xl font-medium text-[#161618]">
                        <span className="text-[#558ffc]">450+</span> Share Experiences
                    </h1>
                    <p className="w-[40%] text-center font-light mt-4 text-[rgb(86,87,92)] m-auto">
                        Join 9600 travelers sharing experiences!
                    </p>
                </header>

                {/* Swiper Container */}
                <div className="my-12 px-10">
                    <div className="swiper mySwiper">
                        <div className="swiper-wrapper">
                            {reviews.map((review) => (
                                <div key={review.id} className="swiper-slide">
                                    <div className="card border-2 py-8 px-8 rounded-2xl border-gray-200 h-full min-h-[320px]">
                                        <h1 className="text-amber-300 text-2xl">{review.rating}</h1>
                                        <p className="my-6 text-lg leading-relaxed">"{review.text}"</p>
                                        <div className="profile gap-5 flex items-center mt-4">
                                            <img className="w-14 h-14 rounded-full" src={review.image} alt={review.name} />
                                            <div className="name">
                                                <h2 className="font-medium">{review.name}</h2>
                                                <p className="text-gray-500">{review.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={goPrev}
                        className="w-12 h-12 rounded-full border-2 border-[#558ffc] text-[#558ffc] flex items-center justify-center hover:bg-[#558ffc] hover:text-white transition-all duration-300"
                    >
                        ←
                    </button>
                    <button
                        onClick={goNext}
                        className="w-12 h-12 rounded-full border-2 border-[#558ffc] text-[#558ffc] flex items-center justify-center hover:bg-[#558ffc] hover:text-white transition-all duration-300"
                    >
                        →
                    </button>
                </div>
            </section>
            <section className="relative">
                <video
                    className="w-full"
                    src={videoSrc}
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    muted
                />

                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl">
                    Lets Start a Journey
                </h1>
            </section>
        </>
    );
}

export default HomeExp;
