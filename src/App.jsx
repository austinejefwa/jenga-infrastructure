import SurveyCursor from './components/SurveyCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectsSlider from './components/ProjectsSlider'
import LayerReveal from './components/LayerReveal'
import Structure3DSection from './components/Structure3DSection'
import ExplodedStructure from './components/ExplodedStructure'
import ImmersiveZoom from './components/ImmersiveZoom'
import Capabilities3D from './components/Capabilities3D'
import ParallaxStory from './components/ParallaxStory'
import About from './components/About'
import Footer from './components/Footer'
import LoadingIntro from './components/LoadingIntro'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <LoadingIntro />
      <ScrollProgress />
      <SurveyCursor />
      <Nav />
      <Hero />
      <ProjectsSlider />
      <LayerReveal />
      <Structure3DSection />
      <ExplodedStructure />
      <ImmersiveZoom />
      <Capabilities3D />
      <ParallaxStory />
      <About />
      <Footer />
    </div>
  )
}