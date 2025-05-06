import Link from 'next/link';
import { FiCalendar, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

const AboutPreview = () => {
    const features = [
        {
            icon: <FiCalendar size={24} className="text-boxing-red" />,
            title: 'Established 2020',
            description: 'Family-owned boxing gym serving the Clearfield community'
        },
        {
            icon: <FiUsers size={24} className="text-boxing-red" />,
            title: 'All Skill Levels',
            description: 'Programs designed for beginners to professional boxers'
        },
        {
            icon: <FiAward size={24} className="text-boxing-red" />,
            title: '20+ Years Experience',
            description: 'Expert coaching from professionals with decades in boxing'
        },
        {
            icon: <FiGlobe size={24} className="text-boxing-red" />,
            title: 'Latinx-Owned',
            description: 'Proud to represent diversity in the boxing community'
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="about-preview">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left column: Content */}
                    <div>
                        <h2 className="font-accent text-3xl md:text-4xl mb-4 text-boxing-black">
                            EXPERIENCE THE BOXFIT <span className="text-boxing-red">DIFFERENCE</span>
                        </h2>

                        <p className="text-lg mb-6">
                            At BoxFit Utah, we&#39;re passionate about boxing as both a competitive sport and a transformative fitness journey. Our experienced coaches guide you every step of the way, whether you&#39;re stepping into a gym for the first time or preparing for your next competition.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="mr-4 mt-1">{feature.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                                        <p className="text-caption-text">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/about"
                            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
                        >
                            Learn More About Us
                        </Link>
                    </div>

                    {/* Right column: Images */}
                    <div className="grid grid-cols-2 gap-4 relative">
                        <div className="col-span-2 lg:col-span-1">
                            <div className="relative h-80 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />
                                <div className="bg-boxing-black w-full h-full">
                                    {/* Replace with actual image when available */}
                                    <div className="w-full h-full bg-steel-gray opacity-40"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 space-y-4">
                            <div className="relative h-36 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />
                                <div className="bg-boxing-black w-full h-full">
                                    {/* Replace with actual image when available */}
                                    <div className="w-full h-full bg-steel-gray opacity-40"></div>
                                </div>
                            </div>
                            <div className="relative h-36 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />
                                <div className="bg-boxing-black w-full h-full">
                                    {/* Replace with actual image when available */}
                                    <div className="w-full h-full bg-steel-gray opacity-40"></div>
                                </div>
                            </div>
                        </div>

                        {/* Accent element */}
                        <div className="absolute -bottom-5 -right-5 lg:-left-5 w-20 h-20 bg-boxing-red z-0 hidden lg:block"></div>
                        <div className="absolute -top-5 -left-5 lg:-right-5 w-20 h-20 bg-accent-gold z-0 hidden lg:block"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;