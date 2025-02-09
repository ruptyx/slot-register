import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Clock } from 'lucide-react';

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setSubmitted(true);
    setEmail('');
  };

  const faqs = [
    {
      question: "What is Slot app?",
      answer: "Slot is an innovative scheduling application that helps you manage your time more effectively. It uses AI to automatically find the best times for your meetings and appointments."
    },
    {
      question: "When will Slot be available?",
      answer: "We're currently in beta testing and plan to launch soon. Join our waitlist to be among the first to try it out!"
    },
    {
      question: "Is Slot free to use?",
      answer: "Slot will offer both free and premium tiers. Waitlist members will get extended access to premium features."
    },
    {
      question: "Which platforms will Slot support?",
      answer: "Slot will be available on iOS, Android, and as a web application, ensuring you can manage your schedule from any device."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF9ED' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#FBF9ED' }}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#1d1d1d' }}>
            Schedule Smarter with Slot
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#1d1d1d' }}>
            Join thousands of professionals using AI-powered scheduling to take control of their time.
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" style={{ color: '#304740' }} />
              <span style={{ color: '#1d1d1d' }}>Smart Scheduling</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-2" style={{ color: '#304740' }} />
              <span style={{ color: '#1d1d1d' }}>Cross-platform</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2" style={{ color: '#304740' }} />
              <span style={{ color: '#1d1d1d' }}>Calendar Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" style={{ backgroundColor: '#FBF9ED' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#1d1d1d' }}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" style={{ color: '#1d1d1d' }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: '#1d1d1d' }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16" style={{ backgroundColor: '#FBF9ED' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#1d1d1d' }}>
            Join the Waitlist
          </h2>
          <div className="max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#304740', color: '#FBF9ED' }}>
                <p>Thanks for joining! We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  style={{ backgroundColor: '#FBF9ED', color: '#1d1d1d', borderColor: '#304740' }}
                />
                <Button 
                  type="submit" 
                  className="w-full text-white hover:opacity-90"
                  style={{ backgroundColor: '#304740' }}
                >
                  Join Waitlist
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaitlistPage;