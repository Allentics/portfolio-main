import Image from "next/image";

export default function About({ content }) {
    const skills = content?.skills || [
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React/Next.js", level: 80 },
        { name: "Node.js", level: 75 },
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl transform rotate-6 opacity-30"></div>
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={content?.imageUrl || "/profile.png"}
                                    alt="Profile Picture"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <p className="text-purple-600 font-semibold text-lg">About Me</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            {content?.title || "Passionate Developer & Creative Thinker"}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {content?.bio1 || "Hello! I'm a web developer with 5+ years of experience creating modern, responsive websites and applications. I love turning ideas into reality through clean code and beautiful design."}
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {content?.bio2 || "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee."}
                        </p>

                        {/* Skills */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-xl font-semibold text-gray-900">My Skills</h3>
                            {skills.map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-gray-700">{skill.name}</span>
                                        <span className="text-purple-600">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
