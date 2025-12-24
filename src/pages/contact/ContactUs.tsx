import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactUs = () => {
    // Animation variants
    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const slideInLeft = {
        initial: { x: -60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const slideInRight = {
        initial: { x: 60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    // Custom hook for intersection observer
    const useAnimatedSection = (threshold = 0.1) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: threshold,
        });
        return { ref, inView };
    };

    const { ref: heroRef, inView: heroInView } = useAnimatedSection();
    const { ref: contactRef, inView: contactInView } = useAnimatedSection();
    const { ref: formRef, inView: formInView } = useAnimatedSection();

    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Our Office",
            details: ["123 Innovation Drive", "Tech Valley, CA 94025"],
            description: "Come visit our modern workspace"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
            description: "Mon-Fri from 8am to 6pm"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["hello@company.com", "support@company.com"],
            description: "We'll respond within 24 hours"
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 9:00 - 18:00", "Saturday: 10:00 - 16:00"],
            description: "Closed on Sundays"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-muted/50 to-primary/5 overflow-hidden">
                <motion.div
                    ref={heroRef}
                    initial="initial"
                    animate={heroInView ? "animate" : "initial"}
                    variants={staggerContainer}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div variants={fadeInUp}>
                            <Badge variant="secondary" className="mb-6">
                                Get In Touch
                            </Badge>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl lg:text-6xl font-bold tracking-tight mb-6"
                        >
                            Let's Start a
                            <span className="block text-primary">Conversation</span>
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
                        >
                            Ready to transform your ideas into reality? We're here to listen,
                            collaborate, and build something extraordinary together.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Background Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
            </section>

            {/* Contact Info & Form Section */}
            <section className="py-20">
                <motion.div
                    ref={contactRef}
                    initial="initial"
                    animate={contactInView ? "animate" : "initial"}
                    variants={staggerContainer}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <motion.div variants={slideInLeft}>
                            <div className="space-y-8">
                                <div>
                                    <Badge variant="outline" className="mb-4">
                                        Contact Information
                                    </Badge>
                                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                                        Get in touch with our team
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We're here to help you with any questions about our services,
                                        partnerships, or how we can work together to achieve your goals.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="border-border hover:border-primary/30 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                            <item.icon className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold mb-2">{item.title}</h3>
                                                            <div className="space-y-1 mb-2">
                                                                {item.details.map((detail, idx) => (
                                                                    <p key={idx} className="text-sm text-muted-foreground">
                                                                        {detail}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-primary">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={slideInRight}>
                            <Card className="border-border">
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <Badge variant="outline" className="mb-4">
                                            Send us a message
                                        </Badge>
                                        <h3 className="text-2xl font-bold tracking-tight mb-2">
                                            Let's talk about your project
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Fill out the form and we'll get back to you within 24 hours.
                                        </p>
                                    </div>

                                    <motion.form
                                        ref={formRef}
                                        initial="initial"
                                        animate={formInView ? "animate" : "initial"}
                                        variants={staggerContainer}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="John"
                                                    className="focus:border-primary"
                                                />
                                            </motion.div>
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Doe"
                                                    className="focus:border-primary"
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="focus:border-primary"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                id="company"
                                                placeholder="Your Company Name"
                                                className="focus:border-primary"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                placeholder="How can we help you?"
                                                className="focus:border-primary"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp} className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your project, goals, or any questions you might have..."
                                                rows={6}
                                                className="resize-none focus:border-primary"
                                            />
                                        </motion.div>

                                        <motion.div variants={fadeInUp}>
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full gap-2"
                                            >
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </Button>
                                        </motion.div>

                                        <motion.p
                                            variants={fadeInUp}
                                            className="text-xs text-muted-foreground text-center"
                                        >
                                            By submitting this form, you agree to our privacy policy and terms of service.
                                        </motion.p>
                                    </motion.form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/30">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 lg:px-8"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">
                            FAQ
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Quick answers to common questions
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                question: "How quickly do you respond to inquiries?",
                                answer: "We typically respond within 2-4 hours during business hours, and always within 24 hours maximum."
                            },
                            {
                                question: "Do you offer custom solutions?",
                                answer: "Yes, we specialize in creating tailored solutions that fit your specific business needs and requirements."
                            },
                            {
                                question: "What industries do you work with?",
                                answer: "We work across various industries including tech, finance, healthcare, education, and e-commerce."
                            },
                            {
                                question: "Can I schedule a consultation call?",
                                answer: "Absolutely! You can schedule a free 30-minute consultation call through our booking system."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="border-border hover:border-primary/30 transition-colors h-full">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 lg:px-8 text-center"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                            Ready to start your project?
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Let's discuss how we can help you achieve your goals and bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="secondary" className="gap-2">
                                    <Phone className="w-4 h-4" />
                                    Schedule a Call
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/20">
                                    View Our Work
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactUs;