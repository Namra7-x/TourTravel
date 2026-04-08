import BtnBlue from './Btn-Blue';

const HomeAdventureCTA = () => {
  return (
    <section className="adventure-cta py-24 px-4">
      <div className="relative max-w-7xl mx-auto aspect-[1140/578] rounded-3xl overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://framerusercontent.com/images/UqwbnrbwQ7sNsDpw7kihreAsBc.png?scale-down-to=2048"
            className="w-full h-full object-cover"
            alt="Adventure"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/5"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-8">
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-6">
            Are You Ready to Start Your Adventure?
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl leading-relaxed">
            Don't wait any longer. Start planning your dream vacation today. Contact us
            to discuss your travel needs and let us handle the details.
          </p>

          <BtnBlue
            title="Join a Moment"
            size="lg"
            className="bg-[#558ffc] text-white hover:bg-black"
          />
        </div>

      </div>
    </section>
  );
};

export default HomeAdventureCTA;