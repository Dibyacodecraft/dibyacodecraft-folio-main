import { Calendar, GraduationCap, Trophy, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const education = [
    {
      degree: "B-Tech",
      period: "2022–2026",
      institution: "Ajay Binay Institute Of Technology (BPUT)",
      status: "Current"
    },
    {
      degree: "Intermediate",
      period: "2020–2022",
      institution: "Ganesh Institute of Engineering & Technology (CHSE)",
      status: "Completed"
    },
    {
      degree: "Matriculation",
      period: "2019–2020",
      institution: "Madhukeswar Nodal Bidyapitha (BSE)",
      status: "Completed"
    }
  ];

  const highlights = [
    {
      icon: Trophy,
      title: "Hackathon Achievements",
      description: "ABIT Poster Presentation, ASBM APP STACK, Trident Environmental Challenge",
      color: "text-neon-purple"
    },
    {
      icon: GraduationCap,
      title: "IIT Bhubaneswar Programs",
      description: "Completed Data Science and Ethical Hacking programs",
      color: "text-neon-blue"
    },
    {
      icon: Users,
      title: "Industry Experience",
      description: "3-month internship at Kreative Timebox",
      color: "text-neon-green"
    }
  ];

  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            B-Tech student passionate about Python development, AI/ML, and creating innovative 
            solutions through code. Experienced in hackathons, cloud technologies, and real-world applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-orbitron font-bold text-foreground mb-8 flex items-center">
              <Calendar className="mr-3 text-neon-purple" />
              Education Timeline
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  {/* Timeline Line */}
                  {index !== education.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-neon-purple to-neon-blue"></div>
                  )}
                  
                  <Card className="spotlight-card hover-lift neon-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-neon-purple rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-orbitron font-bold text-lg text-foreground">
                              {edu.degree}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${
                              edu.status === 'Current' 
                                ? 'bg-neon-green/20 text-neon-green' 
                                : 'bg-neon-blue/20 text-neon-blue'
                            }`}>
                              {edu.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground font-inter mb-1">{edu.institution}</p>
                          <p className="text-sm text-neon-purple font-inter">{edu.period}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-8">
            <h3 className="text-2xl font-orbitron font-bold text-foreground mb-8">
              Key Highlights
            </h3>
            
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="spotlight-card hover-lift neon-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${highlight.color} mt-1`}>
                        <highlight.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-orbitron font-bold text-lg text-foreground mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground font-inter">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="spotlight-card hover-lift neon-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-orbitron font-bold text-lg text-foreground mb-4">
                  Summer Training & Certifications
                </h4>
                <ul className="space-y-2 text-muted-foreground font-inter">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-neon-purple rounded-full mr-3"></div>
                    Summer training in Python & AI/ML
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mr-3"></div>
                    Data Science certification from IIT Bhubaneswar
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full mr-3"></div>
                    Ethical Hacking certification from IIT Bhubaneswar
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;