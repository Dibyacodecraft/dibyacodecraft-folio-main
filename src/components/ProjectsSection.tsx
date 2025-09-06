import { useState } from 'react';
import { ExternalLink, Github, Code, Shield, MessageSquare, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/spotlight-card';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Disaster Management App",
      description: "A comprehensive tool for aiding communities during natural disasters using modern web technologies. Features real-time alerts, resource tracking, and emergency communication.",
      icon: Shield,
      technologies: ["Python", "Streamlit", "AI/ML", "Real-time Data"],
      features: [
        "Real-time disaster alerts",
        "Resource allocation system",
        "Emergency communication hub",
        "Predictive analytics"
      ],
      color: "text-neon-purple",
      gradient: "from-neon-purple to-neon-blue",
      status: "Live",
      github: "https://github.com/Dibyacodecraft",
      live: "#"
    },
    {
      title: "Emotion Detection System",
      description: "Real-time emotion analysis using OpenCV and ML models. Capable of detecting and analyzing human emotions through facial recognition technology.",
      icon: Code,
      technologies: ["OpenCV", "TensorFlow", "Python", "Computer Vision"],
      features: [
        "Real-time emotion detection",
        "Facial recognition technology",
        "Multiple emotion categories",
        "Analytics dashboard"
      ],
      color: "text-neon-blue",
      gradient: "from-neon-blue to-neon-green",
      status: "Completed",
      github: "https://github.com/Dibyacodecraft",
      live: "#"
    },
    {
      title: "AI Chat Bot",
      description: "Conversational agent powered by Hugging Face transformers. Features natural language processing and contextual understanding for meaningful conversations.",
      icon: MessageSquare,
      technologies: ["Hugging Face", "Transformers", "Python", "NLP"],
      features: [
        "Natural language processing",
        "Contextual understanding",
        "Multi-language support",
        "Learning capabilities"
      ],
      color: "text-neon-green",
      gradient: "from-neon-green to-electric-cyan",
      status: "Live",
      github: "https://github.com/Dibyacodecraft",
      live: "#"
    },
    {
      title: "Scientific Calculator",
      description: "GUI-based calculator supporting complex operations using Tkinter. Features advanced mathematical functions and a user-friendly interface.",
      icon: Calculator,
      technologies: ["Python", "Tkinter", "Mathematics", "GUI"],
      features: [
        "Complex mathematical operations",
        "Scientific functions",
        "User-friendly GUI",
        "History tracking"
      ],
      color: "text-electric-cyan",
      gradient: "from-electric-cyan to-neon-purple",
      status: "Completed",
      github: "https://github.com/Dibyacodecraft",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Innovative solutions built with cutting-edge technology and creative problem-solving
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <SpotlightCard
              key={index}
              spotlightColor={index % 3 === 0 ? 'rgba(139, 92, 246, 0.4)' : index % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(34, 197, 94, 0.4)'}
              className="cursor-target transition-all duration-500 hover:scale-105 group"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="p-8 relative overflow-hidden h-full flex flex-col">
                {/* Background Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 transition-opacity duration-300 ${
                    hoveredProject === index ? 'opacity-20' : ''
                  }`}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`${project.color} transition-all duration-300 ${
                      hoveredProject === index ? 'scale-110' : ''
                    }`}>
                      <project.icon size={40} />
                    </div>
                    
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-2xl text-foreground mb-4">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground font-inter leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-inter font-semibold text-sm text-foreground mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-muted/50 rounded-full text-xs font-inter text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="font-inter font-semibold text-sm text-foreground mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm font-inter text-muted-foreground">
                            <div className={`w-1.5 h-1.5 ${project.color.replace('text-', 'bg-')} rounded-full mr-3`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 neon-border hover-lift font-inter group"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Code
                    </Button>
                    
                    <Button
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${project.gradient} hover-lift font-inter group`}
                      onClick={() => window.open(project.live, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Live Demo
                    </Button>
                  </div>
                </div>

                {/* Animated Corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.gradient} opacity-10 rounded-bl-full transition-all duration-500 ${
                  hoveredProject === index ? 'scale-150 opacity-20' : ''
                }`} />
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="neon-border hover-lift font-inter group"
            onClick={() => window.open('https://github.com/Dibyacodecraft', '_blank')}
          >
            <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;