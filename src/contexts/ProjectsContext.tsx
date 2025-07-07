import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/types/project";

interface ProjectsContextType {
  projects: Project[];
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "MON HISTOIRE DANS LE MONTAGE VIDEO",
    thumbnail: "https://img.youtube.com/vi/BSwtm2mBYUg/maxresdefault.jpg",
    duration: "À voir",
    views: "Nouveau",
    youtubeUrl: "https://youtu.be/BSwtm2mBYUg",
    videoId: "BSwtm2mBYUg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "GRENADES et POINGS CONTRE FUGU_FPS",
    thumbnail: "https://img.youtube.com/vi/4jkMgut_1hc/maxresdefault.jpg",
    duration: "À voir",
    views: "Nouveau",
    youtubeUrl: "https://youtu.be/4jkMgut_1hc",
    videoId: "4jkMgut_1hc",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Charger les projets depuis localStorage ou utiliser les projets par défaut
    const storedProjects = localStorage.getItem("admin_projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        setProjects(parsedProjects);
      } catch (error) {
        setProjects(defaultProjects);
        localStorage.setItem("admin_projects", JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem("admin_projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("admin_projects", JSON.stringify(newProjects));
    // Déclencher un événement pour informer les autres onglets/fenêtres des changements
    window.dispatchEvent(
      new CustomEvent("projectsUpdated", { detail: newProjects }),
    );
  };

  const addProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newProjects = [newProject, ...projects];
    saveProjects(newProjects);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    const newProjects = projects.map((project) =>
      project.id === id
        ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
        : project,
    );
    saveProjects(newProjects);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);
    saveProjects(newProjects);
  };

  const getProject = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  // Écouter les changements venant d'autres onglets/fenêtres
  useEffect(() => {
    const handleProjectsUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setProjects(customEvent.detail);
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdate);
    return () =>
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
