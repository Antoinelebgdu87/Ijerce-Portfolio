import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Project } from "@/types/project";
import { Save, X, Youtube, ExternalLink } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    youtubeUrl: "",
    duration: "À voir",
    views: "Nouveau",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoId, setVideoId] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        youtubeUrl: project.youtubeUrl,
        duration: project.duration,
        views: project.views,
      });
      setVideoId(project.videoId);
      setThumbnail(project.thumbnail);
    }
  }, [project]);

  const extractVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleYoutubeUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, youtubeUrl: url }));

    const extractedVideoId = extractVideoId(url);
    if (extractedVideoId) {
      setVideoId(extractedVideoId);
      setThumbnail(
        `https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`,
      );
      setError("");
    } else if (url) {
      setError("URL YouTube invalide");
      setVideoId("");
      setThumbnail("");
    } else {
      setVideoId("");
      setThumbnail("");
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Le titre est requis");
      return;
    }

    if (!formData.youtubeUrl.trim()) {
      setError("L'URL YouTube est requise");
      return;
    }

    if (!videoId) {
      setError("URL YouTube invalide");
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'un délai de sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const projectData = {
        title: formData.title.trim(),
        thumbnail,
        duration: formData.duration,
        views: formData.views,
        youtubeUrl: formData.youtubeUrl.trim(),
        videoId,
      };

      onSave(projectData);
    } catch (err) {
      setError("Erreur lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[#292929] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#f8f8f8]">
                {project ? "Modifier le projet" : "Nouveau projet"}
              </CardTitle>
              <CardDescription className="text-[#f8f8f8]/60">
                {project
                  ? "Modifiez les informations du projet"
                  : "Ajoutez un nouveau projet à votre portfolio"}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-[#f8f8f8]/60 hover:text-[#f8f8f8]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#f8f8f8]">
                Titre du projet *
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                placeholder="Mon super projet vidéo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeUrl" className="text-[#f8f8f8]">
                URL YouTube *
              </Label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                  className="pl-10 bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                  placeholder="https://youtu.be/VIDEO_ID ou https://youtube.com/watch?v=VIDEO_ID"
                  required
                />
              </div>
              {videoId && (
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <span>✓ Video ID détecté: {videoId}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[#f8f8f8]">
                  Durée
                </Label>
                <Input
                  id="duration"
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                  placeholder="10:25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="views" className="text-[#f8f8f8]">
                  Vues
                </Label>
                <Input
                  id="views"
                  type="text"
                  value={formData.views}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, views: e.target.value }))
                  }
                  className="bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                  placeholder="1.2K vues"
                />
              </div>
            </div>

            {thumbnail && (
              <div className="space-y-2">
                <Label className="text-[#f8f8f8]">Aperçu de la miniature</Label>
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src={thumbnail}
                    alt="Miniature"
                    className="w-full h-auto rounded-lg border border-white/10"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                    {formData.duration}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#f983e2] hover:bg-[#f983e2]/90 text-black font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading
                  ? "Sauvegarde..."
                  : project
                    ? "Mettre à jour"
                    : "Créer le projet"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-white/10 text-[#f8f8f8] hover:bg-white/5"
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
