import { StandardMaterial } from '@babylonjs/core'
import { create } from 'zustand'

interface spherePosition {
    x: number
    y: number
    z: number
}

interface sphereSize {
    diameter: number
    segments: number
}

class Sphere {
    position: spherePosition
    size: sphereSize
    material?: StandardMaterial
    constructor(
        position: spherePosition,
        size: sphereSize,
        material?: StandardMaterial
    ) {
        this.position = position
        this.size = size
        this.material = material
    }
}

interface SphereStore {
    sphere: Sphere
}

interface SphereActions {
    setPosition: (position: spherePosition) => void
    setSize: (size: sphereSize) => void
    setMaterial: (material: StandardMaterial) => void
}

export const useSphereStore = create<SphereStore & SphereActions>()((set) => ({
    sphere: new Sphere({ x: 0, y: 0, z: 0 }, { diameter: 2, segments: 32 }),
    setPosition: (position) =>
        set((state) => {
            return {
                ...state,
                sphere: {
                    ...state.sphere,
                    position: position,
                },
            }
        }),
    setSize: (size) =>
        set((state) => {
            return {
                ...state,
                sphere: {
                    ...state.sphere,
                    size: size,
                },
            }
        }),
    setMaterial: (material) =>
        set((state) => {
            return {
                ...state,
                sphere: {
                    ...state.sphere,
                    material: material,
                },
            }
        }),
}))
