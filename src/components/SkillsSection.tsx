import { useState } from 'react';
import { Code, Brain, Database, Zap, Bot, BarChart3, Terminal } from 'lucide-react';
import AwsLogo from '@/assets/logos/aws.svg';
import DockerLogo from '@/assets/logos/docker.svg';
import GithubLogo from '@/assets/logos/github.svg';
import PythonLogo from '@/assets/logos/python.svg';
import ReactLogo from '@/assets/logos/react.svg';
import TensorflowLogo from '@/assets/logos/tensorflow.svg';
import PytorchLogo from '@/assets/logos/pytorch.svg';
import PandasLogo from '@/assets/logos/pandas.svg';
import NumpyLogo from '@/assets/logos/numpy.svg';
import OpenCVLogo from '@/assets/logos/opencv.svg';
import ScikitLogo from '@/assets/logos/scikit-learn.svg';
import FastAPILogo from '@/assets/logos/fastapi.svg';
import DjangoLogo from '@/assets/logos/django.svg';
import GCloudLogo from '@/assets/logos/google-cloud.svg';
import { Card, CardContent } from '@/components/ui/card';
import SpotlightCard from '@/components/ui/spotlight-card';
import TiltedCard from '@/components/ui/tilted-card';
// removed DomeGallery - using a simple responsive logo grid instead

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

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
    ,
    {
      icon: Terminal,
      name: "Garuda Linux",
      description: "Arch-based Linux expertise: configuration, performance tuning, theming, and system management",
      color: "text-neon-green",
      gradient: "from-neon-green to-neon-blue"
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

        {/* Additional Technologies - Logo grid with nicer animation */}
        <div className="mt-16">
          <h3 className="text-2xl text-center font-orbitron font-bold text-foreground mb-8">Additional Technologies</h3>
            <div className="max-w-4xl mx-auto">
              <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-8 items-center justify-center" role="list" aria-label="Additional Technologies">
                {[
                  { name: 'TensorFlow', logo: TensorflowLogo },
                  { name: 'PyTorch', logo: PytorchLogo },
                  { name: 'Pandas', logo: PandasLogo },
                  { name: 'NumPy', logo: NumpyLogo },
                  { name: 'OpenCV', logo: OpenCVLogo },
                  { name: 'Scikit-learn', logo: ScikitLogo },
                  { name: 'FastAPI', logo: FastAPILogo },
                  { name: 'Django', logo: DjangoLogo },
                  { name: 'Git', logo: GithubLogo },
                  { name: 'Docker', logo: DockerLogo },
                  { name: 'AWS', logo: AwsLogo },
                  { name: 'Google Cloud', logo: GCloudLogo },
                  { name: 'Python', logo: PythonLogo },
                  { name: 'React', logo: ReactLogo }
                ].map((it) => (
                  <li key={it.name} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 flex items-center justify-center bg-card/60 rounded-lg shadow hover:scale-105 transition-transform">
                      <img src={it.logo} alt={it.name} className="max-h-16 w-auto mx-auto" />
                    </div>
                    <span className="mt-3 text-sm font-medium text-foreground">{it.name}</span>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;