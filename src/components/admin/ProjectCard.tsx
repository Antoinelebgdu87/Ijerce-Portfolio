import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Play, Edit, Trash2, ExternalLink, Calendar, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(project.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="bg-[#292929] border-white/10 hover:border-[#f983e2]/50 transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Overlay badges */}
          <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-sm font-medium">
            {project.duration}
          </div>
          <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white">
            YOUTUBE
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#f983e2] rounded-full p-4 hover:bg-[#f983e2]/90 transition-colors"
            >
              <Play className="h-6 w-6 text-black fill-current" />
            </motion.a>
          </div>

          {/* Admin actions overlay */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit(project)}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#292929] border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#f8f8f8]">
                    Supprimer le projet
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[#f8f8f8]/60">
                    Êtes-vous sûr de vouloir supprimer "{project.title}" ? Cette
                    action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[#1a1a1a] border-[#f8f8f8]/30 text-[#f8f8f8] hover:bg-[#1a1a1a]/80 hover:border-[#f8f8f8]/50">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {isDeleting ? "Suppression..." : "Supprimer"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3 text-[#f8f8f8] line-clamp-2">
            {project.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-[#f8f8f8]/60 mb-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{project.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="bg-[#f983e2]/20 text-[#f983e2] border-[#f983e2]/30"
            >
              ID: {project.videoId}
            </Badge>

            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-[#f983e2] text-[#f983e2] hover:bg-[#f983e2] hover:text-black"
            >
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Voir</span>
              </a>
            </Button>
          </div>

          {project.updatedAt !== project.createdAt && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-[#f8f8f8]/40">
                Modifié le {formatDate(project.updatedAt)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
