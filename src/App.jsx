import Background from './components/Background'
import Cmf from './components/Cmf'
import Concept from './components/Concept'
import CorePlay from './components/CorePlay'
import DesignOpportunity from './components/DesignOpportunity'
import DetailDesign from './components/DetailDesign'
import EducationValue from './components/EducationValue'
import FinalSummary from './components/FinalSummary'
import FormLanguage from './components/FormLanguage'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import PrintDeliverables from './components/PrintDeliverables'
import ProductFinal from './components/ProductFinal'
import ProductSystem from './components/ProductSystem'
import ProductValue from './components/ProductValue'
import ProjectOverview from './components/ProjectOverview'
import SafetyDesign from './components/SafetyDesign'
import UserInsight from './components/UserInsight'
import UserScenario from './components/UserScenario'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-grain text-moon-ink">
      <Navigation />
      <main>
        <Hero />
        <ProjectOverview />
        <Background />
        <UserInsight />
        <DesignOpportunity />
        <Concept />
        <ProductFinal />
        <ProductSystem />
        <CorePlay />
        <UserScenario />
        <FormLanguage />
        <DetailDesign />
        <Cmf />
        <SafetyDesign />
        <EducationValue />
        <ProductValue />
        <PrintDeliverables />
        <FinalSummary />
      </main>
    </div>
  )
}

export default App
