import React from 'react'
import Layout from '../components/common/Layout'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Features from '../components/landing/Features'
import Benefits from '../components/landing/Benefits'
// import Testimonials from '../components/landing/Testimonials'
import MPESAIntegration from '../components/landing/MPESAIntegration'
import FAQ from '../components/landing/FAQ'
import CallToAction from '../components/landing/CallToAction'
import ImageScroller from '../components/landing/ImageScroller'

const Landing = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <Benefits />
      <MPESAIntegration />
      {/* <Testimonials /> */}
      <FAQ />
      <CallToAction />
      <ImageScroller />
    </Layout>
  )
}

export default Landing
