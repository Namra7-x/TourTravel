import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import  BtnBlue from '../components/Btn-Blue';
import useTourStore from "../store/Store";
const TourDetails = () => {

    const [Tour, setTour] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const FetchTour = async () => {
            try {
                const response = await fetch(`/data.json`);
                const data = await response.json();
                const tourData = data.find(item => item.id === parseInt(id));
                setTour(tourData)
            }
            catch (error) {
                console.log("error occured", error);
            }
        }
        FetchTour();
    }, [id])


    const addTour=useTourStore((state)=>state.addTour);
    function handleBooking(){
       addTour(Tour);
       alert("added");

    }
    return (
        <>
            {
                Tour ?
                    <>
                        <div className="details max-w-6xl mx-auto p-8">
                            <h1 className="text-[3.5rem] font-semibold text-center mb-4">{Tour.name}</h1>
                            <p className="text-center text-[#56575c] text-[1.4rem] max-w-3xl mx-auto leading-relaxed mb-8">{Tour.description}</p>
                            
                            <div className="image flex justify-center mt-6">
                                <img src={Tour.image} className="w-full max-h-[600px] object-cover rounded-3xl shadow-lg" alt={Tour.name} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                                <div className="highlights-section bg-blue-50 p-8 rounded-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">✨ Highlights</h3>
                                    <ul className="space-y-4">
                                        {Tour.highlights?.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-lg text-gray-700">
                                                <span className="text-blue-500 mt-1">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="inclusions-section bg-green-50 p-8 rounded-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">✔️ Inclusions</h3>
                                    <ul className="space-y-4">
                                        {Tour.inclusions?.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-lg text-gray-700">
                                                <span className="text-green-500 mt-1">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="pricing-footer text-center mt-20 p-10 border-t border-gray-100">
                                <p className="text-2xl text-gray-500">Price per person</p>
                                <h2 className="text-5xl font-bold text-[#161618] mt-2">${Tour.pricePerPerson}</h2>
                                <p className="text-blue-600 font-semibold mt-4 text-xl">{Tour.tag}</p>
                            </div>

                            <div onClick={handleBooking} className="bookingBtn text-center">
                                <BtnBlue title="Book"/>
                            </div>
                        </div>
                    </>
                    : <h1>Loading...</h1>
            }
        </>
    );
}
export default TourDetails; 