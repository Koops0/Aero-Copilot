export type SiteConfig = typeof siteConfig

export const siteConfig = {
  // TODO: replace with name of the project
  name: "Aero Copilot",
  description:
    "STAR project for 2023 Space Apps Challenge. A web app that allows users to improve their documents.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Upload",
      href: "/upload",
    },


  ],
  links: {
    github: "https://github.com/Koops0/SpaceHack2K23-STAR",
  },
}
