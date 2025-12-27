import { supabase } from "./supabase";

export async function getSiteContent() {
    const { data: settings } = await supabase.from("site_settings").select("*");
    const { data: skills } = await supabase.from("skills").select("*");
    const { data: services } = await supabase.from("services").select("*");
    const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

    const content = {};
    settings?.forEach(s => {
        content[s.key] = s.value;
    });

    return {
        settings: content,
        skills: skills || [],
        services: services || [],
        projects: projects || []
    };
}
