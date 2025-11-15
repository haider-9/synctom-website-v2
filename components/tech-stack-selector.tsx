"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiTailwindcss,
  SiReact,
  SiHtml5,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiGoogleads,
  SiNodedotjs,
  SiTypescript,
  SiVuedotjs,
  SiAngular,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiSlack,
  SiNotion,
  SiStripe,
  SiPaypal,
} from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TechStack {
  name: string;
  icon: string;
  color: string;
  category: "design" | "frontend" | "backend";
}

const availableTech = [
  // Design Tools
  { name: "Figma", icon: "SiFigma", color: "text-purple-600", category: "design" as const },
  { name: "Photoshop", icon: "SiAdobephotoshop", color: "text-blue-600", category: "design" as const },
  { name: "Illustrator", icon: "SiAdobeillustrator", color: "text-orange-600", category: "design" as const },
  
  // Frontend
  { name: "React", icon: "SiReact", color: "text-blue-500", category: "frontend" as const },
  { name: "Next.js", icon: "SiNextdotjs", color: "text-black dark:text-white", category: "frontend" as const },
  { name: "Vue.js", icon: "SiVuedotjs", color: "text-green-500", category: "frontend" as const },
  { name: "Angular", icon: "SiAngular", color: "text-red-600", category: "frontend" as const },
  { name: "TypeScript", icon: "SiTypescript", color: "text-blue-600", category: "frontend" as const },
  { name: "JavaScript", icon: "SiJavascript", color: "text-yellow-500", category: "frontend" as const },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "text-cyan-500", category: "frontend" as const },
  { name: "HTML5", icon: "SiHtml5", color: "text-orange-500", category: "frontend" as const },
  { name: "Flutter", icon: "SiFlutter", color: "text-blue-400", category: "frontend" as const },
  { name: "Dart", icon: "SiDart", color: "text-blue-600", category: "frontend" as const },
  
  // Backend
  { name: "Node.js", icon: "SiNodedotjs", color: "text-green-600", category: "backend" as const },
  { name: "Express", icon: "SiExpress", color: "text-gray-800 dark:text-gray-300", category: "backend" as const },
  { name: "Python", icon: "SiPython", color: "text-blue-500", category: "backend" as const },
  { name: "MongoDB", icon: "SiMongodb", color: "text-green-600", category: "backend" as const },
  { name: "MySQL", icon: "SiMysql", color: "text-blue-600", category: "backend" as const },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "text-blue-700", category: "backend" as const },
  { name: "Redis", icon: "SiRedis", color: "text-red-600", category: "backend" as const },
  { name: "Firebase", icon: "SiFirebase", color: "text-orange-500", category: "backend" as const },
  { name: "TensorFlow", icon: "SiTensorflow", color: "text-orange-600", category: "backend" as const },
  { name: "OpenAI", icon: "SiOpenai", color: "text-gray-800 dark:text-gray-300", category: "backend" as const },
  { name: "Docker", icon: "SiDocker", color: "text-blue-500", category: "backend" as const },
  { name: "Kubernetes", icon: "SiKubernetes", color: "text-blue-600", category: "backend" as const },
  { name: "AWS", icon: "SiAmazonaws", color: "text-orange-500", category: "backend" as const },
  { name: "Google Cloud", icon: "SiGooglecloud", color: "text-blue-500", category: "backend" as const },
  { name: "Azure", icon: "SiMicrosoftazure", color: "text-blue-600", category: "backend" as const },
  
  // Social/Marketing
  { name: "Facebook", icon: "SiFacebook", color: "text-blue-600", category: "frontend" as const },
  { name: "Instagram", icon: "SiInstagram", color: "text-pink-600", category: "frontend" as const },
  { name: "LinkedIn", icon: "SiLinkedin", color: "text-blue-700", category: "frontend" as const },
  { name: "Google Ads", icon: "SiGoogleads", color: "text-yellow-500", category: "frontend" as const },
  
  // Other
  { name: "Git", icon: "SiGit", color: "text-orange-600", category: "backend" as const },
  { name: "GitHub", icon: "SiGithub", color: "text-gray-800 dark:text-gray-300", category: "backend" as const },
  { name: "GitLab", icon: "SiGitlab", color: "text-orange-600", category: "backend" as const },
  { name: "Stripe", icon: "SiStripe", color: "text-purple-600", category: "backend" as const },
  { name: "PayPal", icon: "SiPaypal", color: "text-blue-600", category: "backend" as const },
];

const iconMap: Record<string, React.ElementType> = {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiTailwindcss,
  SiReact,
  SiHtml5,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiGoogleads,
  SiNodedotjs,
  SiTypescript,
  SiVuedotjs,
  SiAngular,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiSlack,
  SiNotion,
  SiStripe,
  SiPaypal,
};

export function getIconComponent(iconName: string) {
  return iconMap[iconName];
}

interface TechStackSelectorProps {
  value: TechStack[];
  onChange: (value: TechStack[]) => void;
  category?: "design" | "frontend" | "backend";
  label?: string;
}

export default function TechStackSelector({
  value,
  onChange,
  category,
  label = "Technologies",
}: TechStackSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("");

  const filteredTech = availableTech.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || tech.category === category;
    const notAlreadyAdded = !value.find((v) => v.name === tech.name);
    return matchesSearch && matchesCategory && notAlreadyAdded;
  });

  const handleAdd = () => {
    const tech = availableTech.find((t) => t.name === selectedTech);
    if (tech && !value.find((v) => v.name === tech.name)) {
      onChange([...value, tech]);
      setSelectedTech("");
      setSearchQuery("");
    }
  };

  const handleRemove = (techName: string) => {
    onChange(value.filter((t) => t.name !== techName));
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium block">{label}</label>
      
      {/* Selected Technologies */}
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-lg">
        {value.length === 0 ? (
          <span className="text-sm text-muted-foreground">No technologies selected</span>
        ) : (
          value.map((tech) => {
            const Icon = getIconComponent(tech.icon);
            return (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
              >
                {Icon && <Icon className={`${tech.color} text-base`} />}
                <span>{tech.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(tech.name)}
                  className="hover:text-primary/70"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Technology */}
      <div className="flex gap-2">
        <Select value={selectedTech} onValueChange={setSelectedTech}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select technology..." />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2"
              />
            </div>
            {filteredTech.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No technologies found
              </div>
            ) : (
              filteredTech.map((tech) => {
                const Icon = getIconComponent(tech.icon);
                return (
                  <SelectItem key={tech.name} value={tech.name}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className={`${tech.color} text-lg`} />}
                      <span>{tech.name}</span>
                    </div>
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
        <Button type="button" onClick={handleAdd} disabled={!selectedTech}>
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
