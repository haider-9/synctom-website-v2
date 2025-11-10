"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    budget: "",
    companyName: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          budget: "",
          companyName: "",
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
    <section
      className="w-full flex flex-col-reverse lg:flex-row justify-center py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-10 relative overflow-hidden min-h-screen sm:min-h-0 bg-center bg-no-repeat bg-cover sm:bg-contain"
      style={{
        backgroundImage: `url('/background.svg')`,
      }}
    >
      {/* LEFT: Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg md:max-w-lg bg-white ml-0 lg:ml-30 shadow-2xl rounded-lg border space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div>
            <label className="text-xs sm:text-sm font-medium">
              First Name<span className="text-red-500">*</span>
            </label>
            <Input 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name" 
              className="text-sm" 
              required 
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium">
              Last Name<span className="text-red-500">*</span>
            </label>
            <Input 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name" 
              className="text-sm" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Email<span className="text-red-500">*</span>
          </label>
          <Input 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com" 
            className="text-sm" 
            required 
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center border rounded-md px-2 sm:px-3 text-xs sm:text-sm bg-gray-50 shrink-0">
              🇵🇰 +92
            </div>
            <Input 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="3001234567" 
              className="text-sm" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Budget<span className="text-red-500">*</span>
          </label>
          <Input 
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="e.g. $5000" 
            className="text-sm" 
            required 
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Company Name<span className="text-red-500">*</span>
          </label>
          <Input 
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Company Name" 
            className="text-sm" 
            required 
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Project Type<span className="text-red-500">*</span>
          </label>
          <Input 
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            placeholder="Web App, Mobile App..." 
            className="text-sm" 
            required 
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium">
            Message<span className="text-red-500">*</span>
          </label>
          <Textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your message..." 
            className="text-sm" 
            required 
          />
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-xs sm:text-sm">
              Thank you! Your message has been sent successfully.
            </p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-xs sm:text-sm">
              Sorry, there was an error. Please try again.
            </p>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full text-sm sm:text-base py-2 sm:py-3"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </Button>
      </form>
      
      {/* RIGHT: Content */}
      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 text-white relative mb-6 lg:mb-0">
        <p className="uppercase tracking-widest text-xs sm:text-sm text-indigo-300 mb-2">
          Contact Form
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-3 sm:mb-4">
          Ready to Build Your Digital Future?
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6 max-w-xs sm:max-w-sm">
          Let's discuss your project and turn your ambitious ideas into
          scalable, beautiful software.
        </p>
        <Button asChild variant="default" className="w-fit mb-6 sm:mb-8 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
          <Link href="/contact">Start a Project</Link>
        </Button>

        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span>info@syntom.com</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span>+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span>info@syntom.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
