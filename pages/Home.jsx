import Hero from "../components/Hero"
import HeroExclusive from "../components/HeroExclusive";
import HeroMarquee from "../components/HeroMarquee";
import HomeAdventureCTA from "../components/HomeAdventureCTA";
import HomeExp from "../components/HomeExp";

import HomeJourney from "../components/HomeJourney";
import HomeTrustedPartner from "../components/HomeTrustedPartner";


const Home=()=>{
    
    return(
        <>  

            <Hero/>
            <HomeJourney/>
            <HeroExclusive/>
            <HeroMarquee/>
            <HomeExp/>
            <HomeTrustedPartner/>
            <HomeAdventureCTA/>

        </>
    )
}

export default Home;