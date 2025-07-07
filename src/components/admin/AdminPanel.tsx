import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/contexts/ProjectsContext";
import { ProjectCard } from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";
import { Project } from "@/types/project";
import {
  Plus,
  LogOut,
  Video,
  Users,
  Eye,
  Home,
  Settings,
  BarChart3,
} from "lucide-react";

type View = "dashboard" | "projects" | "add-project" | "edit-project";

export const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => {
    addProject(projectData);
    setCurrentView("projects");
  };

  const handleUpdateProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(null);
      setCurrentView("projects");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentView("edit-project");
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
  };

  const handleLogout = () => {
    logout();
  };

  const stats = {
    totalProjects: projects.length,
    totalViews: projects.reduce((acc, project) => {
      const views = project.views.toLowerCase();
      if (views.includes("k")) {
        return acc + parseFloat(views) * 1000;
      } else if (views.includes("m")) {
        return acc + parseFloat(views) * 1000000;
      } else if (views === "nouveau") {
        return acc + 0;
      }
      return acc + parseInt(views) || 0;
    }, 0),
    recentProjects: projects.filter((p) => {
      const daysDiff =
        (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    }).length,
  };

  const navigation = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
    { id: "projects", label: "Projets", icon: Video },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-[#f8f8f8] mb-2">
                Tableau de bord
              </h1>
              <p className="text-[#f8f8f8]/60">
                Bienvenue, {user?.username}. Voici un aperçu de vos projets.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#292929] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <Video className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#f8f8f8]/60">Total Projets</p>
                      <p className="text-2xl font-bold text-[#f8f8f8]">
                        {stats.totalProjects}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#292929] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Eye className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#f8f8f8]/60">Vues Totales</p>
                      <p className="text-2xl font-bold text-[#f8f8f8]">
                        {stats.totalViews.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#292929] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Plus className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-[#f8f8f8]/60">Récents (7j)</p>
                      <p className="text-2xl font-bold text-[#f8f8f8]">
                        {stats.recentProjects}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects */}
            <Card className="bg-[#292929] border-white/10">
              <CardHeader>
                <CardTitle className="text-[#f8f8f8]">
                  Projets récents
                </CardTitle>
                <CardDescription className="text-[#f8f8f8]/60">
                  Vos derniers projets ajoutés
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.slice(0, 3).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-[#f8f8f8]/20 mx-auto mb-4" />
                    <p className="text-[#f8f8f8]/60 mb-4">
                      Aucun projet pour le moment
                    </p>
                    <Button
                      onClick={() => setCurrentView("add-project")}
                      className="bg-[#f983e2] hover:bg-[#f983e2]/90 text-black"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Créer votre premier projet
                    </Button>
                  </div>
                )}
                {projects.length > 3 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentView("projects")}
                      className="border-[#f983e2]/50 text-[#f983e2] hover:bg-[#f983e2] hover:text-black hover:border-[#f983e2]"
                    >
                      Voir tous les projets
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#f8f8f8] mb-2">
                  Mes Projets
                </h1>
                <p className="text-[#f8f8f8]/60">
                  Gérez vos {projects.length} projet
                  {projects.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button
                onClick={() => setCurrentView("add-project")}
                className="bg-[#f983e2] hover:bg-[#f983e2]/90 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Projet
              </Button>
            </div>

            {projects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Card className="bg-[#292929] border-white/10">
                <CardContent className="p-12 text-center">
                  <Video className="h-16 w-16 text-[#f8f8f8]/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#f8f8f8] mb-2">
                    Aucun projet
                  </h3>
                  <p className="text-[#f8f8f8]/60 mb-6">
                    Commencez par ajouter votre premier projet
                  </p>
                  <Button
                    onClick={() => setCurrentView("add-project")}
                    className="bg-[#f983e2] hover:bg-[#f983e2]/90 text-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un projet
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "add-project":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#f8f8f8] mb-2">
                Nouveau Projet
              </h1>
              <p className="text-[#f8f8f8]/60">
                Ajoutez un nouveau projet à votre portfolio
              </p>
            </div>
            <ProjectForm
              onSave={handleAddProject}
              onCancel={() => setCurrentView("projects")}
            />
          </div>
        );

      case "edit-project":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#f8f8f8] mb-2">
                Modifier le Projet
              </h1>
              <p className="text-[#f8f8f8]/60">
                Modifiez les informations de votre projet
              </p>
            </div>
            <ProjectForm
              project={editingProject || undefined}
              onSave={handleUpdateProject}
              onCancel={() => {
                setEditingProject(null);
                setCurrentView("projects");
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#161616] text-[#f8f8f8]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-xl font-bold bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] bg-clip-text text-transparent">
                Admin Panel
              </div>

              <nav className="hidden md:flex space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as View)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentView === item.id
                          ? "bg-[#f983e2]/20 text-[#f983e2]"
                          : "text-[#f8f8f8]/60 hover:text-[#f8f8f8] hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-[#292929] text-[#f8f8f8]"
              >
                {user?.username}
              </Badge>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-[#f983e2]/50 text-[#f983e2] hover:bg-[#f983e2]/10 hover:border-[#f983e2]"
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Home className="w-4 h-4 mr-2" />
                  Voir le site
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[#f8f8f8]/60 hover:text-[#f8f8f8] hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
