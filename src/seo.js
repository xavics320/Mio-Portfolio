export const HOME_META = {
  title: "Xavier Paredes · Front-End Developer",
  description: "Xavier Paredes, sviluppatore front-end a Milano. Creo siti web in React per piccole imprese e artigiani italiani. Design moderno, codice pulito, risultati concreti.",
  path: "/",
};

export function getProjectMeta(project) {
  return {
    title: `${project.title} · Case Study | Xavier Paredes`,
    description: project.desc,
    path: `/progetti/${project.slug}`,
    image: project.photos?.[0]
      ? `https://xavierparedes-dev.it${project.photos[0]}`
      : undefined,
  };
}

// Risolve i meta tag per un path noto a build time — usato dallo script
// di prerendering (nessun accesso al DOM, deve girare in Node).
export function resolveMetaForPath(pathname, projects) {
  if (pathname === "/") return HOME_META;
  const match = pathname.match(/^\/progetti\/([^/]+)\/?$/);
  if (match) {
    const project = projects.find(p => p.slug === match[1]);
    if (project) return getProjectMeta(project);
  }
  return null;
}
