import { Scene } from '@babylonjs/core'
import { create } from 'zustand'

interface sceneStore {
    scene: Scene | null
}

interface sceneActions {
    setScene: (scene: Scene) => void
}

export const useSceneStore = create<sceneStore & sceneActions>((set) => {
    return {
        scene: null,
        setScene: (scene) => set({ scene }),
    }
})
