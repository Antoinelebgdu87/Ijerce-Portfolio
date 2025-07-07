import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, User } from "lucide-react";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulation d'un délai d'authentification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(username, password);

    if (success) {
      onSuccess?.();
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#292929] border-white/10">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] rounded-full flex items-center justify-center mb-4"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[#f8f8f8]">
              Panneau d'Administration
            </CardTitle>
            <CardDescription className="text-[#f8f8f8]/60">
              Connectez-vous pour gérer vos projets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#f8f8f8]">
                  Nom d'utilisateur
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f8f8f8]/40" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#f8f8f8]">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f8f8f8]/40" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-[#1a1a1a] border-white/10 text-[#f8f8f8] focus:border-[#f983e2]"
                    placeholder="Mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f8f8f8]/40 hover:text-[#f8f8f8]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f983e2] hover:bg-[#f983e2]/90 text-black font-semibold"
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
