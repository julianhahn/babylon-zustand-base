'use client'
import './Visualizer.scss'
import { useEffect, useRef, useState } from 'react'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { Engine } from '@babylonjs/core/Engines/engine'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder'
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder'
import { Scene } from '@babylonjs/core/scene'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { useSceneStore } from '@/stores/sceneStore'
export function Visualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneStore = useSceneStore()
    const storeScene = sceneStore.scene
    const [engine, setEngine] = useState<Engine | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const engine = new Engine(canvasRef.current, true)
        setEngine(engine)
        const scene = new Scene(engine)
        sceneStore.setScene(scene)
    }, [canvasRef])

    useEffect(() => {
        if (!engine || !storeScene) return
        // This creates and positions a free camera (non-mesh)
        var camera = new FreeCamera(
            'camera1',
            new Vector3(0, 5, -10),
            storeScene
        )
        const newMaterial = new StandardMaterial('newMaterial', storeScene)
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero())

        // This attaches the camera to the canvas
        camera.attachControl(canvasRef.current, true)

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight(
            'light1',
            new Vector3(0, 1, 0),
            storeScene
        )

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7

        // Our built-in 'sphere' shape.
        var sphere = CreateSphere(
            'sphere',
            { diameter: 2, segments: 32 },
            storeScene
        )

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1
        sphere.material = newMaterial
        // Our built-in 'ground' shape.
        var ground = CreateGround('ground', { width: 6, height: 6 }, storeScene)
        // Render every frame

        let numberOfTimes = 0
        //...
        // Render loop
        const renderLoop = () => {
            if (numberOfTimes--) {
                engine.resize()
            }
            storeScene.render()
        }

        // on resize needed callback -
        const onResizeNeeded = () => {
            numberOfTimes = 5
        }
        engine.runRenderLoop(renderLoop)
    }, [storeScene])

    return (
        <canvas
            ref={canvasRef}
            id="renderCanvas"
            touch-action="none"
            tabIndex={0}
        />
    )
}
