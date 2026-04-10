const HomeFooter = () => {
    return (
        <>
            <footer className="bg-[#1a1a1a] text-white py-16 sm:py-20">
                <div className="px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid gap-12 mb-12 sm:mb-16 md:grid-cols-2 xl:grid-cols-4 md:gap-10 xl:gap-20">
                        {/* Menu Bar */}
                        <div>
                            <h3 className="text-lg font-medium mb-6">Menu Bar</h3>
                            <ul className="space-y-3 text-gray-400 font-light text-base">
                                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                                <li><a href="#tours" className="hover:text-white transition">Tours</a></li>
                                <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-medium mb-6">Contact Info</h3>
                            <div className="space-y-3 text-gray-400 font-light text-base">
                                <p>2464 Royal Ln. Mesa, New<br />Jersey 45463</p>
                                <p>(629) 555-0129</p>
                                <p>travely@pixproo.com</p>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-lg font-medium mb-6">Social Media</h3>
                            <ul className="space-y-3 text-gray-400 font-light text-base">
                                <li><a href="#facebook" className="hover:text-white transition">Facebook</a></li>
                                <li><a href="#instagram" className="hover:text-white transition">Instagram</a></li>
                                <li><a href="#youtube" className="hover:text-white transition">YouTube</a></li>
                                <li><a href="#twitter" className="hover:text-white transition">X (Twitter)</a></li>
                            </ul>
                        </div>

                        {/* Travely Section */}
                        <div>
                            <h3 className="text-2xl font-light text-gray-200 mb-4">travely</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">
                                Stay connected with us on social media! Follow our channels for exciting updates, insightful content, and the latest news from our industry.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 my-12"></div>

                    {/* Bottom Footer */}
                    <div className="flex flex-col gap-4 text-gray-400 font-light text-base md:flex-row md:justify-between md:items-center">
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#terms" className="hover:text-white transition">Terms and Conditions</a>
                        </div>
                        <p>© Copyright 2026, All Rights Reserved by Pixproo</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default HomeFooter;