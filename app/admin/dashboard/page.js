"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState({});
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState({ type: "", message: "" });
    const router = useRouter();

    useEffect(() => {
        checkUser();
        fetchData();
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/admin");
        } else {
            setUser(user);
        }
    }

    async function fetchData() {
        setLoading(true);
        const { data: settingsData } = await supabase.from("site_settings").select("*");
        const { data: skillsData } = await supabase.from("skills").select("*").order("id");
        const { data: servicesData } = await supabase.from("services").select("*").order("id");
        const { data: projectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

        const s = {};
        settingsData?.forEach(item => s[item.key] = item.value);
        setSettings(s);
        setSkills(skillsData || []);
        setServices(servicesData || []);
        setProjects(projectsData || []);
        setLoading(false);
    }

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setStatus({ type: "info", message: "Saving settings..." });

        const updates = Object.keys(settings).map(key => ({
            key,
            value: settings[key]
        }));

        const { error } = await supabase.from("site_settings").upsert(updates);

        if (error) {
            setStatus({ type: "error", message: error.message });
        } else {
            setStatus({ type: "success", message: "Settings saved successfully!" });
        }
    };

    const handleUpdateSkill = async (id, field, value) => {
        await supabase.from("skills").update({ [field]: value }).eq("id", id);
        fetchData();
    };

    const handleUpdateService = async (id, field, value) => {
        await supabase.from("services").update({ [field]: value }).eq("id", id);
        fetchData();
    };

    const handleAddProject = async () => {
        const { error } = await supabase.from("projects").insert([{
            title: "New Project",
            description: "Project description",
            tags: ["React"]
        }]);
        if (!error) fetchData();
    };

    const handleUpdateProject = async (id, field, value) => {
        let finalValue = value;
        if (field === "tags") finalValue = value.split(",").map(t => t.trim());

        await supabase.from("projects").update({ [field]: finalValue }).eq("id", id);
        fetchData();
    };

    const handleDeleteProject = async (id) => {
        if (confirm("Delete this project?")) {
            await supabase.from("projects").delete().eq("id", id);
            fetchData();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio CMS</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-xl text-center font-medium ${status.type === "success" ? "bg-green-100 text-green-700" : status.type === "error" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                        {status.message}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* General Settings */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Site Text & Links</h2>
                            <button
                                onClick={handleSaveSettings}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 font-semibold"
                            >
                                Save Changes
                            </button>
                        </div>
                        <form className="space-y-4 max-h-[1000px] overflow-y-auto pr-2">
                            {Object.keys(settings).sort().map(key => (
                                <div key={key}>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                        {key.replace(/_/g, " ")}
                                    </label>
                                    {key.includes("bio") || key.includes("description") ? (
                                        <textarea
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                            rows={2}
                                            value={settings[key]}
                                            onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                            value={settings[key]}
                                            onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                    </div>

                    <div className="space-y-8">
                        {/* Projects Management */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                                <button
                                    onClick={handleAddProject}
                                    className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold uppercase"
                                >
                                    + Add New
                                </button>
                            </div>
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                                {projects.map(project => (
                                    <div key={project.id} className="p-4 bg-gray-50 rounded-xl space-y-3 relative group">
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <input
                                            type="text"
                                            className="w-full font-bold bg-transparent border-b focus:border-purple-500 outline-none"
                                            value={project.title}
                                            onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)}
                                        />
                                        <textarea
                                            className="w-full text-xs text-gray-600 bg-transparent border rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none"
                                            rows={2}
                                            value={project.description}
                                            onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                                        />
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <input
                                                type="text"
                                                placeholder="Image URL"
                                                className="w-full text-[10px] p-1 border rounded"
                                                value={project.image_url || ""}
                                                onChange={(e) => handleUpdateProject(project.id, "image_url", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Live Link"
                                                className="w-full text-[10px] p-1 border rounded"
                                                value={project.project_url || ""}
                                                onChange={(e) => handleUpdateProject(project.id, "project_url", e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Tags (comma separated)"
                                            className="w-full text-[10px] p-1 border rounded"
                                            value={project.tags?.join(", ") || ""}
                                            onChange={(e) => handleUpdateProject(project.id, "tags", e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Management */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                            <div className="space-y-4">
                                {skills.map(skill => (
                                    <div key={skill.id} className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-1 border rounded-lg text-sm"
                                                value={skill.name}
                                                onChange={(e) => handleUpdateSkill(skill.id, "name", e.target.value)}
                                            />
                                        </div>
                                        <div className="w-24">
                                            <input
                                                type="number"
                                                className="w-full px-3 py-1 border rounded-lg text-sm"
                                                value={skill.level}
                                                onChange={(e) => handleUpdateSkill(skill.id, "level", parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services Management */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Services</h2>
                            <div className="space-y-6">
                                {services.map(service => (
                                    <div key={service.id} className="space-y-2 border-b pb-4 last:border-0">
                                        <input
                                            type="text"
                                            className="w-full font-semibold px-2 py-1 border-b border-transparent focus:border-gray-300"
                                            value={service.title}
                                            onChange={(e) => handleUpdateService(service.id, "title", e.target.value)}
                                        />
                                        <textarea
                                            className="w-full text-sm text-gray-600 px-2 py-1 border border-gray-100 rounded"
                                            rows={2}
                                            value={service.description}
                                            onChange={(e) => handleUpdateService(service.id, "description", e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
