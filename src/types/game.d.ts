import AudioManager from "@/services/audio/AudioManager";

export interface GameData {
    width: number;
    height: number;
    backgroundColor: string;
    reelsCount: number;
    audioManager: AudioManager | null;
}