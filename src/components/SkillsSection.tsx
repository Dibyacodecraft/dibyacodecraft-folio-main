import { useState } from 'react';
import { Code, Brain, Database, Zap, Bot, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SpotlightCard from '@/components/ui/spotlight-card';
import TiltedCard from '@/components/ui/tilted-card';

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skills = [
    {
      icon: Code,
      name: "Python Programming",
      description: "Advanced Python development for web applications, automation, and data processing",
      color: "text-neon-blue",
      gradient: "from-neon-blue to-neon-purple"
    },
    {
      icon: Brain,
      name: "Artificial Intelligence",
      description: "AI model development, neural networks, and machine learning algorithms",
      color: "text-neon-purple",
      gradient: "from-neon-purple to-neon-green"
    },
    {
      icon: BarChart3,
      name: "Machine Learning",
      description: "Supervised and unsupervised learning, data modeling, and predictive analytics",
      color: "text-neon-green",
      gradient: "from-neon-green to-neon-blue"
    },
    {
      icon: Database,
      name: "Data Science",
      description: "Data analysis, visualization, and statistical modeling with modern tools",
      color: "text-electric-cyan",
      gradient: "from-electric-cyan to-neon-purple"
    },
    {
      icon: Zap,
      name: "Streamlit",
      description: "Interactive web applications and data dashboards for ML models",
      color: "text-neon-blue",
      gradient: "from-neon-blue to-neon-green"
    },
    {
      icon: Bot,
      name: "N8N Automation",
      description: "Workflow automation and AI agent development with n8n platform",
      color: "text-neon-purple",
      gradient: "from-neon-purple to-electric-cyan"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Specialized in cutting-edge technologies that power the future of innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SpotlightCard
              key={index}
              spotlightColor={index % 2 === 0 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(6, 182, 212, 0.3)'}
              className="cursor-target transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="p-6">
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`${skill.color} mb-4 transition-all duration-300 ${
                    hoveredSkill === index ? 'scale-110' : ''
                  }`}>
                    <skill.icon size={40} />
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-orbitron font-bold text-xl text-foreground mb-3">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-orbitron font-bold text-foreground mb-8">
            Additional Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'TensorFlow', icon: '🧠' },
              { name: 'PyTorch', icon: '🔥' },
              { name: 'Pandas', icon: '🐼' },
              { name: 'NumPy', icon: '🔢' },
              { name: 'OpenCV', icon: '👁️' },
              { name: 'Scikit-learn', icon: '📊' },
              { name: 'FastAPI', icon: '⚡' },
              { name: 'Django', icon: '🌐' },
              { name: 'Git', icon: '🌟' },
              { name: 'Docker', icon: '🐳' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Google Cloud', icon: '🌩️' }
            ].map((tech, index) => (
              <TiltedCard
                key={tech.name}
                rotateAmplitude={8}
                scaleOnHover={1.02}
                showTooltip={false}
                showOverlayContent={false}
                className="cursor-target h-20"
              >
                <div className="flex flex-col items-center justify-center h-full p-2">
                  <span className="text-2xl mb-1">{tech.icon}</span>
                  <span className="text-xs font-inter text-center text-muted-foreground">
                    {tech.name}
                  </span>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;