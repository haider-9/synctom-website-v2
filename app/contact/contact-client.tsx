"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CTASection from "@/components/cta-section";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'help@synctom.com';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    inquiryPurpose: "",
    description: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    organization: "",
    companyName: "",
    phoneNumber: "",
    budget: "",
    projectType: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          inquiryPurpose: "",
          description: "",
          firstName: "",
          lastName: "",
          fullName: "",
          email: "",
          organization: "",
          companyName: "",
          phoneNumber: "",
          budget: "",
          projectType: "",
          message: "",
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Contact Hero Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Content */}
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 bg-clip-text text-transparent bg-linear-to-r from-[#0383CA] to-[#EF3A61] border-gray-200 bg-white">
                <span className="font-semibold text-sm sm:text-base">
                  Contact Us
                </span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Lets Build Something Great Together
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We would love to hear about your project or idea. Whether you are
              looking for design, development, or a complete digital solution,
              our team is ready to help you get started.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}

      {/* Contact Information */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {/* Phone */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center">
                <Image
                  src="/contact/phone.svg"
                  alt="Phone icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600">
                  0514444599
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center">
                <Image
                  src="/contact/mail.svg"
                  alt="Email icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm sm:text-base text-gray-600 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center">
                <Image
                  src="/contact/map.svg"
                  alt="Location icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Sector I-9/4, Islamabad
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.4167347898215!2d73.05675407567769!3d33.65817563843544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95fdd65d590f%3A0xf294741e684bca4a!2sSynctom!5e1!3m2!1sen!2s!4v1762341633270!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full sm:h-80 md:h-96 lg:h-[400px]"
            />
          </div>
        </div>
      </div>
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center bg-clip-text text-transparent bg-linear-to-r from-[#0383CA] to-[#EF3A61] mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4 sm:px-0">
              Or fill out the form below
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Inquiry Purpose */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="inquiryPurpose"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Inquiry Purpose<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="inquiryPurpose"
                    name="inquiryPurpose"
                    value={formData.inquiryPurpose}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] appearance-none text-sm sm:text-base"
                    required
                  >
                    <option value="" disabled>
                      Choose one option
                    </option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="description"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Description that fits you
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] appearance-none text-sm sm:text-base"
                    required
                  >
                    <option value="" disabled>
                      Choose one option
                    </option>
                    <option value="startup">Startup</option>
                    <option value="small-business">Small Business</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="individual">Individual</option>
                    <option value="agency">Agency</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* First Name */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Email Address */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Budget */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="budget"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Budget<span className="text-red-500">*</span>
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g. $5000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Company Name */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="companyName"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Organization (Optional) */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="organization"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Enter your Organization (Optional)"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Project Type */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="projectType"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Project Type<span className="text-red-500">*</span>
                </label>
                <input
                  id="projectType"
                  name="projectType"
                  type="text"
                  placeholder="Web App, Mobile App, UI/UX Design..."
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md text-xs sm:text-sm">
                    🇵🇰 +92
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="3001234567"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 sm:py-3 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your Message here"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0383CA] focus:border-[#0383CA] placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  Sorry, there was an error sending your message. Please try again or contact us directly at {CONTACT_EMAIL} .
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Form'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - FAQ Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQs</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Everything you need to know about working with Synctom, from
                  pricing to project timelines and technical support.
                </p>
              </div>

              {/* Category Buttons */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-linear-to-r from-[#0383CA] to-pink-500 text-white">
                    Getting Started
                  </Button>
                  <Button variant="gradient">Pricing & Budget</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="gradient">Project Process</Button>
                  <Button variant="gradient">Technical & Support</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="gradient">Revisions & Delivery</Button>
                  <Button variant="gradient">Communication</Button>
                </div>
              </div>
            </div>

            {/* Right Column - FAQ Items */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    How long does it take to start a new project?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Once we finalize the project scope, we typically start
                    within 3-7 business days depending on availability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    What is the cost to design or develop a project?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Project costs vary based on scope, complexity, and timeline.
                    We provide detailed quotes after understanding your specific
                    requirements during our initial consultation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    Do you work with international clients?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, we work with clients globally. We have experience
                    managing projects across different time zones and provide
                    flexible communication schedules.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    Do you provide ongoing maintenance and support?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, we offer comprehensive maintenance packages and ongoing
                    support to ensure your project continues to perform
                    optimally after launch.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    Can you build both design and development?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Absolutely! We offer end-to-end services including UI/UX
                    design, web development, mobile app development, and
                    complete digital solutions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Still have questions section */}
              <div className="mt-8 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contact our support team and we will make sure everything is
                  clear and helpful.
                </p>
                <Button asChild variant={"default"}>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
}
