import { BarChart3, Bot, Headphones, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/spotlight-card';

const ServicesSection = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Streamlit Dashboards",
      description: "Clean, interactive data visualization tools using Python. Perfect for presenting complex data insights through beautiful, user-friendly interfaces.",
      features: [
        "Interactive data visualizations",
        "Real-time dashboard updates",
        "Custom analytics solutions",
        "Responsive design"
      ],
      color: "text-neon-purple",
      gradient: "from-neon-purple to-neon-blue",
      contact: "Contact for Quote"
    },
    {
      icon: Bot,
      title: "AI Agent Workflows (N8N)",
      description: "Build custom workflows integrating AI tasks. Automate complex processes with intelligent decision-making capabilities.",
      features: [
        "Custom AI automation",
        "Workflow optimization",
        "API integrations",
        "Scalable solutions"
      ],
      color: "text-neon-blue",
      gradient: "from-neon-blue to-neon-green",
      contact: "Contact for Details"
    },
    {
      icon: Headphones,
      title: "Tech Support & Consulting",
      description: "For students, freelancers, and tech projects. Get expert guidance on Python development, AI/ML implementation, and technical architecture.",
      features: [
        "1-on-1 consultation",
        "Code review & optimization",
        "Architecture planning",
        "Learning roadmaps"
      ],
      color: "text-neon-green",
      gradient: "from-neon-green to-electric-cyan",
      contact: "Get in Touch"
    },
    {
      icon: Code,
      title: "Freelance Development",
      description: "Full-stack development services specializing in Python applications, AI/ML solutions, and modern web technologies.",
      features: [
        "Custom web applications",
        "AI/ML model development",
        "API development",
        "Database design"
      ],
      color: "text-electric-cyan",
      gradient: "from-electric-cyan to-neon-purple",
      contact: "Reach Out Now"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">
            Services & Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Professional services to bring your ideas to life with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <SpotlightCard
              key={index}
              spotlightColor={index % 4 === 0 ? 'rgba(139, 92, 246, 0.3)' : 
                            index % 4 === 1 ? 'rgba(6, 182, 212, 0.3)' : 
                            index % 4 === 2 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(251, 191, 36, 0.3)'}
              className="cursor-target transition-all duration-500 hover:scale-105 group"
            >
              <div className="p-8 relative overflow-hidden h-full flex flex-col">
                {/* Background Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-300`}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${service.color} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon size={40} />
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-inter font-medium bg-gradient-to-r ${service.gradient} text-background`}>
                      {service.contact}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-2xl text-foreground mb-4">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground font-inter leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="font-inter font-semibold text-sm text-foreground mb-4">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm font-inter text-muted-foreground">
                            <div className={`w-2 h-2 ${service.color.replace('text-', 'bg-')} rounded-full mr-3 animate-pulse`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full bg-gradient-to-r ${service.gradient} hover-lift font-inter font-semibold group`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
                    <div className="ml-2 group-hover:translate-x-1 transition-transform">→</div>
                  </Button>
                </div>

                {/* Animated Corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} opacity-10 rounded-bl-full group-hover:scale-150 group-hover:opacity-20 transition-all duration-500`} />
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-orbitron font-bold text-foreground mb-12">
            How I Work
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your needs and goals" },
              { step: "02", title: "Planning", desc: "Creating detailed project roadmap" },
              { step: "03", title: "Development", desc: "Building with best practices" },
              { step: "04", title: "Delivery", desc: "Testing, deployment, and support" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center text-background font-orbitron font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h4 className="font-orbitron font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground font-inter">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;