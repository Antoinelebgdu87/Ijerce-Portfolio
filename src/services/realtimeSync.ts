// Service de synchronisation en temps réel pour les projets
export class RealtimeSyncService {
  private static instance: RealtimeSyncService;
  private syncInterval: NodeJS.Timeout | null = null;
  private lastSyncTime: number = 0;

  private constructor() {}

  static getInstance(): RealtimeSyncService {
    if (!RealtimeSyncService.instance) {
      RealtimeSyncService.instance = new RealtimeSyncService();
    }
    return RealtimeSyncService.instance;
  }

  // Démarrer la synchronisation automatique
  startAutoSync() {
    // Vérifier les changements toutes les 2 secondes
    this.syncInterval = setInterval(() => {
      this.checkForUpdates();
    }, 2000);
  }

  // Arrêter la synchronisation automatique
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Vérifier s'il y a des mises à jour
  private checkForUpdates() {
    const stored = localStorage.getItem("admin_projects_last_update");
    const lastUpdate = stored ? parseInt(stored) : 0;

    if (lastUpdate > this.lastSyncTime) {
      this.lastSyncTime = lastUpdate;
      // Déclencher un événement de synchronisation
      window.dispatchEvent(
        new CustomEvent("projectsSyncUpdate", {
          detail: { timestamp: lastUpdate },
        }),
      );
    }
  }

  // Marquer une mise à jour
  markUpdate() {
    const timestamp = Date.now();
    localStorage.setItem("admin_projects_last_update", timestamp.toString());
    this.lastSyncTime = timestamp;
  }

  // Forcer une synchronisation
  forcSync() {
    this.checkForUpdates();
  }
}

// Instance globale
export const realtimeSync = RealtimeSyncService.getInstance();
