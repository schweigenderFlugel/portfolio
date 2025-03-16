import type { Project } from "./interface";

export function createMapForProjects(projects: Project[]) {
  return projects.sort((a, b) => {
    const dateA = new Date(a.published.seconds * 1000);
    const dateB = new Date(b.published.seconds * 1000);

    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateB.getFullYear() - dateA.getFullYear();
    }
    
    return dateB.getMonth() - dateA.getMonth();
  });
}
