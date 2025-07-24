import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  language: string;
}

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch all repositories from GitHub
        const response = await fetch('https://api.github.com/users/saifelibiary/repos?per_page=100');
        const allRepos = await response.json();
        
        if (Array.isArray(allRepos)) {
          // Filter projects that have a homepage (Vercel deployment)
          const vercelProjects = allRepos
            .filter(repo => 
              repo.homepage && 
              (repo.homepage.includes('vercel.app') || 
               repo.homepage.includes('.vercel.app') ||
               repo.homepage.includes('netlify.app') ||
               repo.homepage.includes('.netlify.app'))
            )
            .map(repo => ({
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description available',
              html_url: repo.html_url,
              homepage: repo.homepage,
              topics: repo.topics || [],
              language: repo.language || 'Unknown'
            }));
          
          setProjects(vercelProjects);
        } else {
          // Fallback to mock data if API fails
          const mockProjects: Project[] = [
            {
              id: 1,
              name: 'Portfolio Website',
              description: 'Personal portfolio website built with React and TypeScript',
              html_url: 'https://github.com/saifelibiary/portfolio',
              homepage: 'https://portfolio-demo.vercel.app',
              topics: ['react', 'typescript', 'tailwindcss', 'framer-motion'],
              language: 'TypeScript'
            },
            {
              id: 2,
              name: 'Task Manager',
              description: 'React-based task management application with modern UI',
              html_url: 'https://github.com/saifelibiary/task-manager',
              homepage: 'https://task-manager-demo.vercel.app',
              topics: ['react', 'typescript', 'tailwindcss'],
              language: 'TypeScript'
            }
          ];
          setProjects(mockProjects);
        }
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to mock data on error
        const mockProjects: Project[] = [
          {
            id: 1,
            name: 'Portfolio Website',
            description: 'Personal portfolio website built with React and TypeScript',
            html_url: 'https://github.com/saifelibiary/portfolio',
            homepage: 'https://portfolio-demo.vercel.app',
            topics: ['react', 'typescript', 'tailwindcss', 'framer-motion'],
            language: 'TypeScript'
          }
        ];
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('projectsTitle')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">{t('loading')}</span>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <Card className="glass-card hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-red-accent">
                  <CardContent>
                    {/* Project Image */}
                    {project.name === 'your-Edu-Mate' && (
                      <img src="/edumateee.png" alt="your-edu-mate" className="mt-4 mb-4 w-full h-40 object-cover rounded-lg" />
                    )}
                    {project.name === 'Reems-sweet-tasks' && (
                      <img src="/reee.png" alt="reems-sweet-tasks" className="mt-4 mb-4 w-full h-40 object-cover rounded-lg" />
                    )}
                    {project.name === 'SkillUp' && (
                      <img src="/skilllup.png" alt="SkillUp" className="mt-4 mb-4 w-full h-40 object-cover rounded-lg" />
                    )}
                    {project.name === 'Task-Flow' && (
                      <img src="/taskflowww.png" alt="task-flow" className="mt-4 mb-4 w-full h-40 object-cover rounded-lg" />
                    )}
                    {project.name === 'My-portfolio' && (
                      <img src="/myyyy.png" alt="task-flow" className="mt-4 mb-4 w-full h-40 object-cover rounded-lg" />
                    )}
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors mt-2">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mb-2">
                      {project.name === 'Reems-sweet-tasks'
                        ? "Reem's Sweet Tasks is a sleek and responsive task management app built with React, Vite, Tailwind CSS, and TypeScript. It features dynamic task creation, editing, deletion, smooth animations, and a light/dark mode toggle — all wrapped in a modern, user-friendly UI."
                        : ''}
                    </CardDescription>
                    <CardDescription className="text-muted-foreground mb-2">
                      {project.name === 'SkillUp'
                        ? "Skill Up is a 5-minute coding quiz platform that evaluates users' programming knowledge and provides instant feedback. Built with React, Tailwind CSS, and TypeScript, it offers a responsive and animated UI, highlights correct vs. incorrect answers, and displays the user's score and level at the end — ideal for practicing or self-assessment."
                        : ''}
                    </CardDescription>
                    <CardDescription className="text-muted-foreground mb-2">
                      {project.name === 'your-Edu-Mate'
                        ?"Your Edu Mate is an interactive education platform homepage designed to engage learners with a clean, modern interface. Built using React, Tailwind CSS, and TypeScript, it features smooth scroll navigation, responsive layout, animated sections, and a layout ready to scale into a full e-learning experience."
                        : ''}
                    </CardDescription>
                    <CardDescription className="text-muted-foreground mb-2">
                      {project.name === 'Task-Flow'
                        ? "Task Flow is a clean and responsive task management app built with React, TypeScript, Tailwind CSS, and ShadCN UI. It allows users to add, delete, and update tasks in real-time with smooth transitions and dark mode support. The interface is intuitive, optimized for both desktop and mobile, and focuses on simplicity and performance."
                        : ''}
                    </CardDescription>
                    <CardDescription className="text-muted-foreground mb-2">
                      {project.name === 'My-portfolio'
                        ? "My Portfolio is a fully responsive personal website showcasing my projects, skills, and contact information. Built with React, TypeScript, and Tailwind CSS, it features smooth animations, a light/dark mode toggle, and a clean modern design — crafted to reflect both creativity and technical skill in frontend development."
                        : ''}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>{project.language}</strong>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    {project.homepage && (
                      <Button
                        className="red-glow-button flex-1"
                        onClick={() => window.open(project.homepage, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('liveDemo')}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(project.html_url, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t('githubRepo')}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;