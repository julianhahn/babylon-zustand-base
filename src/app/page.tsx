import { Visualizer } from './Visualizer/Visualizer'
import './page.scss'
export default function Home() {
    return (
        <main>
            <Visualizer />
            <div className="overlay">
                <h1>WebGL Playground</h1>
                <p>Click and drag to rotate the camera</p>
            </div>
        </main>
    )
}
