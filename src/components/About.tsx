import { motion } from 'framer-motion';
import { Mail, MapPin, Code, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { label: 'Projects Completed', value: '20+', icon: Code },
    { label: 'Coffee Consumed', value: '1000+', icon: Coffee },
    { label: 'Years Experience', value: '1+', icon: MapPin },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('aboutTitle')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder - Left Side */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto glass-card rounded-2xl flex items-center justify-center overflow-hidden group">
                <img
                  src="/photo_5767373216141135597_y.jpg"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-3 h-3 bg-red-accent rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 left-0 w-2 h-2 bg-red-glow rounded-full"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* About Content - Right Side */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8 rounded-lg">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('bio')}
              </p>
              
              <div className="flex items-center space-x-3 text-primary">
                <Mail className="w-5 h-5" />
                <a 
                  href="mailto:saifelibiary896@gmail.com"
                  className="hover:text-primary-foreground transition-colors"
                >
                  saifelibiary896@gmail.com
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-4 rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;