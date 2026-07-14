import { Routes, Route } from 'react-router-dom'
import SurveyCursor from './components/SurveyCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectsSlider from './components/ProjectsSlider'
import ProgressDashboard from './components/ProgressDashboard'
import PortTracker3D from './components/PortTracker3D'
import LayerReveal from './components/LayerReveal'
import Structure3DSection from './components/Structure3DSection'
import BuildingZoomSection from './components/BuildingZoomSection'
import ExplodedStructure from './components/ExplodedStructure'
import ImmersiveZoom from './components/ImmersiveZoom'
import Capabilities3D from './components/Capabilities3D'
import ProjectMap from './components/ProjectMap'
import NCACalculator from './components/NCACalculator'
import SupplierPortal from './components/SupplierPortal'
import GridlockMap from './components/GridlockMap'
import Testimonials from './components/Testimonials'
import Accreditations from './components/Accreditations'
import Insights from './components/Insights'
import ParallaxStory from './components/ParallaxStory'
import About from './components/About'
import Footer from './components/Footer'
import LoadingIntro from './components/LoadingIntro'
import ScrollProgress from './components/ScrollProgress'
import CaseStudyPage from './components/CaseStudyPage'
import EngineeringAssistant from './components/EngineeringAssistant'

function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSlider />
      <ProgressDashboard />
      <PortTracker3D />
      <LayerReveal />
      <Structure3DSection />
      <BuildingZoomSection />
      <ExplodedStructure />
      <ImmersiveZoom />
      <Capabilities3D />
      <ProjectMap />
      <NCACalculator />
      <SupplierPortal />
      <GridlockMap />
      <Testimonials />
      <Accreditations />
      <Insights />
      <ParallaxStory />
      <About />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <LoadingIntro />
      <ScrollProgress />
      <SurveyCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
      </Routes>
      <EngineeringAssistant />
    </div>
  )
}