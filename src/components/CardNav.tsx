import { Code2, User, BadgeCheck, Layers, Briefcase, Mail } from 'lucide-react';

const items = [
  { id: 'about', label: 'About', icon: User, color: 'from-neon-purple to-neon-blue' },
  { id: 'skills', label: 'Skills', icon: Layers, color: 'from-neon-blue to-neon-green' },
  { id: 'projects', label: 'Projects', icon: Code2, color: 'from-electric-cyan to-neon-purple' },
  { id: 'certificates', label: 'Certificates', icon: BadgeCheck, color: 'from-neon-green to-neon-blue' },
  { id: 'services', label: 'Services', icon: Briefcase, color: 'from-neon-purple to-electric-cyan' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-neon-blue to-neon-purple' },
];

const CardNav = () => {
  const onGo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="grid grid-flow-col auto-cols-[minmax(180px,1fr)] gap-4 px-4 md:px-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onGo(item.id)}
            className={`relative rounded-xl p-4 text-left bg-card/60 backdrop-blur neon-border hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] transition-transform duration-300 hover:-translate-y-1`}
          >
            <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-br ${item.color} opacity-10 pointer-events-none`} />
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-neon-purple">
                <item.icon size={22} />
              </span>
              <span className="font-inter font-semibold text-foreground">{item.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardNav;


