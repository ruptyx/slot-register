'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Calendar, BarChart, CreditCard, Instagram } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from '@/hooks/use-toast';

// Initialize Supabase client
const supabase = createClient(
  'https://aharlnpcsatnlguswmon.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoYXJsbnBjc2F0bmxndXN3bW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDYyOTgsImV4cCI6MjAzMTE4MjI5OH0.7YrQYIm5S66-JEcgs2v18Coin3-TunnSggPoR9oAGfU'
);

interface FAQ {
  question: string;
  answer: string;
}

interface VendorFormData {
  business_name: string;
  owner_name: string;
  businessType: string;
  contact_number: string;
  email_address: string;
  web_inst: string;
  contanct_time: string;
}

const WaitlistPage = () => {
  const [formData, setFormData] = useState<VendorFormData>({
    business_name: '',
    owner_name: '',
    businessType: '',
    contact_number: '',
    email_address: '',
    web_inst: '',
    contanct_time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('slot_app')
        .insert([
          {
            business_name: formData.business_name,
            owner_name: formData.owner_name,
            contact_number: formData.contact_number,
            email_address: formData.email_address,
            web_inst: formData.web_inst,
            contanct_time: formData.contanct_time,
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setFormData({
        business_name: '',
        owner_name: '',
        businessType: '',
        contact_number: '',
        email_address: '',
        web_inst: '',
        contanct_time: ''
      });

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const benefits = [
    {
      icon: <Calendar className="w-8 h-8" />,
      text: "Manage appointments easily"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      text: "Secure prepayments"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      text: "Real-time analytics"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is Slots app?",
      answer: "Slots is a mobile app that connects beauty and health providers with customers in Kuwait, offering easy online bookings and business management tools."
    },
    {
      question: "How does it help my business?",
      answer: "Slots helps you manage appointments, secure prepayments to reduce no-shows, and access real-time analytics to improve your business performance."
    },
    {
      question: "What types of businesses can join?",
      answer: "We welcome all beauty and health providers in Kuwait, including salons, spas, barbershops, and wellness centers."
    }
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#FBF9ED] z-50 border-b border-[#304740]/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="relative h-16 w-48">
              <Image
                src="/slot-logo.svg"
                alt="Slots Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-[#FBF9ED] pt-16">
        {/* Rest of the sections */}
        <section className="py-8 md:py-16 border-b border-[#304740]/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 text-[#304740]">
              Grow Your Business with Easy Online Bookings
            </h1>
            <p className="text-lg md:text-xl mb-12 text-[#304740]/80 max-w-2xl mx-auto">
              Connect with customers in Kuwait through our simple, user-friendly booking system
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center p-6 rounded-lg border border-[#304740]/10 hover:border-[#304740]/20 transition-colors">
                  <div className="text-[#304740] mb-4">
                    {benefit.icon}
                  </div>
                  <span className="text-[#304740]/80">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Sign-Up Form */}
        <section className="py-8 md:py-16 border-b border-[#304740]/10">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#304740]">
              Join Slots Today
            </h2>
            {submitted ? (
              <div className="p-6 rounded-lg border border-[#304740] bg-[#304740]/5 text-[#304740] text-center">
                <p>Thanks for signing up! We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    name="business_name"
                    placeholder="Business Name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                  <Input
                    name="owner_name"
                    placeholder="Owner's Name (Optional)"
                    value={formData.owner_name}
                    onChange={handleInputChange}
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                  <Select name="businessType">
                    <SelectTrigger className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent">
                      <SelectValue placeholder="Business Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salon</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                  <Input
                    name="email_address"
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email_address}
                    onChange={handleInputChange}
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                  <Input
                    name="web_inst"
                    placeholder="Website/Instagram (Optional)"
                    value={formData.web_inst}
                    onChange={handleInputChange}
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                  <Input
                    name="contanct_time"
                    placeholder="Preferred Contact Time (Optional)"
                    value={formData.contanct_time}
                    onChange={handleInputChange}
                    className="w-full border-[#304740]/20 focus:border-[#304740] bg-transparent"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#304740] text-white hover:bg-[#304740]/90 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-32 border-b border-[#304740]/10">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#304740]">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-[#304740]/10 rounded-lg p-2"
                >
                  <AccordionTrigger className="text-left text-[#304740] hover:text-[#304740]/80">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#304740]/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[#304740]/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-[#304740]" />
                  <span className="text-[#304740]/80">+965 9676 7536</span>
                </div>
              </div>
              <div className="flex space-x-6">
                <a 
                  href="https://instagram.com/try.slots" 
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 text-[#304740]" />
                </a>
                <a 
                  href="https://wa.me/96596767536" 
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-6 h-6 text-[#304740]" />
                </a>
              </div>
              <p className="text-sm text-[#304740]/60">
                © 2025 Slots App. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WaitlistPage;