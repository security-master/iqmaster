import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Contact } from './pages/Contact'
import { DisplayResults } from './pages/DisplayResults'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { IqScore } from './pages/IqScore'
import { Pricing } from './pages/Pricing'
import { SampleCertificate } from './pages/SampleCertificate'
import { SampleReport } from './pages/SampleReport'
import { ForOrganizations } from './pages/ForOrganizations'
import { Packages } from './pages/Packages'
import { AgeSelect } from './pages/AgeSelect'
import { KidsIntro } from './pages/KidsIntro'
import { CreditHistory } from './pages/dashboard/CreditHistory'
import { OrgDashboard } from './pages/dashboard/OrgDashboard'
import { TestComplete } from './pages/TestComplete'
import { TestPayment } from './pages/TestPayment'
import { TestQuestion } from './pages/TestQuestion'
import { TestResults } from './pages/TestResults'
import { ProgressBoard } from './pages/ProgressBoard'
import { TestStart } from './pages/TestStart'

const routerBasename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={routerBasename === '/' ? undefined : routerBasename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="progress" element={<ProgressBoard />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="packages" element={<Packages />} />
          <Route path="for-organizations" element={<ForOrganizations />} />
          <Route path="dashboard/org" element={<OrgDashboard />} />
          <Route path="dashboard/credits" element={<CreditHistory />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="iq-score" element={<IqScore />} />
          <Route path="sample-certificate" element={<SampleCertificate />} />
          <Route path="sample-report" element={<SampleReport />} />
          <Route path="display-results" element={<DisplayResults />} />
          <Route path="age-groups" element={<AgeSelect />} />
          <Route path="kids-intro" element={<KidsIntro />} />
          <Route path="kids-test" element={<Navigate to="/iq-test?track=kids" replace />} />
          <Route path="iq-test" element={<TestStart />} />
          <Route path="iq-test/:testId/complete" element={<TestComplete />} />
          <Route path="iq-test/:testId/payment" element={<TestPayment />} />
          <Route path="iq-test/:testId/results" element={<TestResults />} />
          <Route path="iq-test/:testId/:number" element={<TestQuestion />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
