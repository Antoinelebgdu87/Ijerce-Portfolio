export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  youtubeUrl: string;
  videoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
