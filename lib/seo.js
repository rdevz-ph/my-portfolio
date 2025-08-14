// SEO configuration for the portfolio
export const siteConfig = {
    name: "Portfolio",
    description: "Passionate full-stack developer with expertise in modern web technologies, creating innovative solutions with clean UI and practical backend implementations.",
    url: "https://romel-portfolio.vercel.app",
    ogImage: "/images/profile.jpg",
    author: {
        name: "Romel Brosas",
        twitter: "@rdevz_ph",
        github: "https://github.com/rdevz-ph",
        kofi: "https://ko-fi.com/romelbrosas"
    },
    keywords: [
        "Romel Brosas",
        "Full Stack Developer",
        "Web Developer",
        "React Developer",
        "Next.js Developer",
        "Laravel Developer",
        "PHP Developer",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Laravel",
        "PHP",
        "MySQL",
        "Tailwind CSS",
        "Portfolio",
        "Web Development",
        "Frontend Developer",
        "Backend Developer"
    ]
};

// Generate page-specific SEO data
export function generateSEO({
    title,
    description,
    path = "",
    ogImage,
    noindex = false
}) {
    const seo = {
        title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
        description: description || siteConfig.description,
        canonical: `${siteConfig.url}${path}`,
        ogImage: ogImage || `${siteConfig.url}${siteConfig.ogImage}`,
        noindex
    };

    return seo;
}
