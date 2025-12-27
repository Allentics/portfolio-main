import Image from "next/image";

export default function Hero({ content }) {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>

            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
                        <p className="text-purple-600 font-semibold text-lg">{content?.welcome || "Welcome to my portfolio"}</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Hi, I'm{" "}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                {content?.name || "John Doe"}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                            {content?.subtitle || "A passionate web developer creating beautiful and functional digital experiences that make a difference."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#contact"
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Get In Touch
                            </a>
                            <a
                                href="#services"
                                className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                            >
                                View My Work
                            </a>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex justify-center animate-fade-in-up animation-delay-300">
                        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-pulse-slow"></div>
                            <Image
                                src={content?.imageUrl || "/hero-bg.png"}
                                alt="Hero Illustration"
                                fill
                                className="object-cover rounded-full p-2"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <a href="#about" className="text-gray-400 hover:text-purple-600 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
