import Link from 'next/link';
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';

const Programs = () => {
    const programCards = [
        {
            title: 'Boxing for Beginners',
            icon: <FiUsers size={36} className="text-boxing-red" />,
            description: 'Learn boxing fundamentals in a supportive environment. Perfect for those with no prior experience.',
            link: '/programs#beginners'
        },
        {
            title: 'Kids\' Boxing Program',
            icon: <FiHeart size={36} className="text-boxing-red" />,
            description: 'Age-appropriate training focused on discipline, confidence, and having fun.',
            link: '/programs#kids'
        },
        {
            title: 'Competitive Boxing',
            icon: <FiAward size={36} className="text-boxing-red" />,
            description: 'Advanced techniques and strategies for those interested in competitive boxing.',
            link: '/programs#competitive'
        },
        {
            title: 'Boxing Fitness',
            icon: <FiTarget size={36} className="text-boxing-red" />,
            description: 'High-intensity boxing workouts designed to improve overall fitness and conditioning.',
            link: '/programs#fitness'
        }
    ];

    return (
        <section className="py-20 bg-white" id="programs">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">PROGRAMS AT A GLANCE</h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        Discover our range of boxing programs designed for all ages and skill levels
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programCards.map((program, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-card shadow-card p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                        >
                            <div className="mb-4">
                                {program.icon}
                            </div>
                            <h3 className="font-primary font-semibold text-xl mb-3">{program.title}</h3>
                            <p className="text-caption-text mb-4 flex-grow">{program.description}</p>
                            <Link
                                href={program.link}
                                className="text-boxing-red font-semibold hover:text-black transition-colors inline-flex items-center"
                            >
                                Learn More
                                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/programs"
                        className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
                    >
                        View All Programs
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Programs;