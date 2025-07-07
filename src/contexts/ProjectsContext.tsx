import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/types/project";
import { realtimeSync } from "@/services/realtimeSync";

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

    // Démarrer la synchronisation en temps réel
    realtimeSync.startAutoSync();

    // Nettoyer lors du démontage
    return () => {
      realtimeSync.stopAutoSync();
    };
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("admin_projects", JSON.stringify(newProjects));

    // Marquer la mise à jour pour la synchronisation
    realtimeSync.markUpdate();

    // Système de sauvegarde en temps réel amélioré
    const updateEvent = {
      type: "projectsUpdated",
      timestamp: Date.now(),
      projects: newProjects,
      source: "admin",
    };

    // Déclencher l'événement pour les autres onglets/fenêtres
    window.dispatchEvent(
      new CustomEvent("projectsUpdated", { detail: updateEvent }),
    );

    // Déclencher aussi un événement de storage pour une synchronisation maximale
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "admin_projects",
        newValue: JSON.stringify(newProjects),
        storageArea: localStorage,
      }),
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

  // Écouter les changements venant d'autres onglets/fenêtres - Système amélioré
  useEffect(() => {
    const handleProjectsUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const updateData = customEvent.detail;

      // Vérifier si c'est une mise à jour récente pour éviter les boucles
      if (updateData.projects && Array.isArray(updateData.projects)) {
        setProjects(updateData.projects);
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "admin_projects" && event.newValue) {
        try {
          const updatedProjects = JSON.parse(event.newValue);
          if (Array.isArray(updatedProjects)) {
            setProjects(updatedProjects);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la synchronisation des projets:",
            error,
          );
        }
      }
    };

    // Écouter les événements personnalisés et les changements de storage
    window.addEventListener("projectsUpdated", handleProjectsUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
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
