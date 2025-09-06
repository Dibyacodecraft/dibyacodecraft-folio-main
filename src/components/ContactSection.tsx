import { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dibya4096@gmail.com",
      href: "mailto:dibya4096@gmail.com",
      color: "text-neon-purple"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Dibyacodecraft",
      href: "https://github.com/Dibyacodecraft",
      color: "text-neon-blue"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "dibyaranjan-jena-184659316",
      href: "https://linkedin.com/in/dibyaranjan-jena-184659316",
      color: "text-neon-green"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-6">
                Get In Touch
              </h3>
              <p className="text-muted-foreground font-inter leading-relaxed mb-8">
                Whether you're looking to build a new application, need help with existing projects, 
                or want to discuss potential collaborations, I'm here to help. Let's turn your vision into reality.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="spotlight-card hover-lift neon-border bg-card/50 backdrop-blur-sm group cursor-pointer"
                  onClick={() => window.open(info.href, '_blank')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-orbitron font-bold text-foreground">
                          {info.label}
                        </h4>
                        <p className="text-muted-foreground font-inter text-sm">
                          {info.value}
                        </p>
                      </div>
                      <div className="text-muted-foreground group-hover:text-neon-purple transition-colors">
                        →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Availability */}
            <Card className="neon-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-orbitron font-bold text-foreground mb-4">
                  Availability
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-muted-foreground">Response Time:</span>
                    <span className="font-inter font-medium text-neon-green">Within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-muted-foreground">Project Start:</span>
                    <span className="font-inter font-medium text-neon-blue">1-2 weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-muted-foreground">Consultation:</span>
                    <span className="font-inter font-medium text-neon-purple">Free initial call</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="spotlight-card neon-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-orbitron font-bold text-foreground mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-inter font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="neon-border bg-background/50 font-inter"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-inter font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="neon-border bg-background/50 font-inter"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="neon-border bg-background/50 font-inter"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="neon-border bg-background/50 font-inter resize-none"
                      placeholder="Tell me about your project, requirements, timeline, and any specific details..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover-lift font-inter font-semibold group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground font-inter text-center">
                    I'll get back to you within 24 hours. Looking forward to working together!
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;