export type Language = 'de' | 'en';

export const translations = {
    de: {
        hero: {
            badge: "VERFÜGBAR FÜR NEUE PROJEKTE",
            headline: <>Ein System, das Sie<br /> <span className="text-secondary">nicht ständig braucht.</span></>,
            sub: <>Ich befreie Ihr Unternehmen von manueller Arbeit. <br className="hidden md:block" /> Für stabile Abläufe, weniger Fehler und echtes Wachstum.</>,
            ctaPrimary: "Potenzial-Gespräch vereinbaren",
            ctaSecondary: "Fallstudien ansehen"
        },
        problem: {
            headline: "Es funktioniert. Aber nur, solange Sie zusehen.",
            description: "Ihr Geschäft läuft, aber es hängt zu sehr von Ihrer persönlichen Anwesenheit ab. Wachstum fühlt sich deshalb stressig an.",
            cards: [
                {
                    tag: "DER FLASCHENHALS",
                    title: "Gefangen im Tagesgeschäft",
                    description: "Sie arbeiten im System statt am System. Wiederkehrende Aufgaben fressen Ihre Zeit und blockieren wichtigere Dinge."
                },
                {
                    tag: "RISIKO",
                    title: "Die stille Selbstsabotage",
                    description: "Eine vergessene Anfrage, eine falsche Rechnung. Jeder manuelle Schritt ist eine Fehlerquelle, die Ihren Ruf gefährdet."
                },
                {
                    tag: "WACHSTUMSSCHMERZEN",
                    title: "Die gläserne Decke",
                    description: "Mehr Kunden bedeuten aktuell nur eins: Mehr Chaos. Ihr Business wächst, aber Ihr Stresspegel wächst schneller."
                }
            ]
        },
        services: {
            headline: "Ergebnisse vor Technik",
            sub: "Unternehmen sollen besser arbeiten, bevor sie schneller arbeiten. Ich installiere Systeme, die Ihnen den Rücken freihalten.",
            cards: [
                {
                    tag: "VERNETZUNG",
                    title: "Nahtlose Verbindung",
                    desc: "Ihre Software-Tools arbeiten zusammen statt gegeneinander. Daten landen automatisch dort, wo sie gebraucht werden."
                },
                {
                    tag: "24/7 BETRIEB",
                    title: "Digitale Assistenten",
                    desc: "Intelligente Systeme, die Support und Verwaltung übernehmen. Zuverlässig, fehlerfrei und rund um die Uhr."
                },
                {
                    tag: "EIGENTUM",
                    title: "Volle Kontrolle",
                    desc: "Sie erhalten keine Black-Box, sondern besitzen die Technik selbst. Alle Zugänge und Rechte liegen zu 100% bei Ihnen."
                }
            ]
        },
        process: {
            headline: "Vom Chaos zum System",
            sub: "Von der Analyse bis zur digitalen Freiheit in vier Schritten.",
            steps: [
                {
                    title: 'Die Analyse',
                    desc: 'Wir finden heraus, wo Sie Zeit und Geld verlieren. Schwarz auf weiß sehen Sie, was Sie Ihre aktuellen Abläufe kosten.',
                },
                {
                    title: 'Der Bauplan',
                    desc: 'Ein technisches Konzept statt theoretischer Beratung. Dieser Plan gehört Ihnen, unabhängig von der Umsetzung.',
                },
                {
                    title: 'Die Umsetzung',
                    desc: 'Ich baue stabile Lösungen, die ab Tag 1 funktionieren. Keine Experimente, sondern bewährte Standards.',
                },
                {
                    title: 'Sichere Übergabe',
                    desc: 'Sie erhalten alle Zugänge. Ihr Business läuft automatisch – und Sie behalten die volle Kontrolle.',
                }
            ]
        },
        about: {
            whoAmI: "WHO_AM_I",
            description: "Die Brücke zwischen Betriebswirtschaft und IT. Ich verstehe nicht nur Code, sondern Ihre Zahlen. Ich baue keine technischen Spielereien, sondern nützliche Lösungen für Ihr Wachstum.",
            badges: {
                code: { label: "CODE", sub: "Full Stack" },
                term: { label: "TERM", sub: "n8n Expert" }
            },
            status: "STATUS: DEPLOYING"
        },
        footer: {
            headline: "Schluss mit Raten.",
            text: "Finden Sie heraus, wo Sie Zeit und Geld verlieren. Ein Gespräch von Unternehmer zu Unternehmer.",
            ctaButton: "Gespräch anfragen",
            location: { label: "STANDORT", value: "Chiang Mai, TH" },
            timezone: { label: "ZEITZONE", value: "GMT+7" },
            form: {
                name: "IHR NAME",
                email: "IHRE EMAIL",
                message: "IHRE NACHRICHT",
                successHeadline: "Nachricht gesendet!",
                successText: "Ich melde mich in Kürze bei Ihnen.",
                newMessage: "Neue Nachricht",
                error: "Es gab einen Fehler. Bitte versuchen Sie es später erneut."
            }
        },
        caseStudies: {
            viewButton: "Fallstudie ansehen",
            backButton: "Zurück zur Übersicht",
            recentWork: "Ausgewählte Arbeiten"
        }
    },
    en: {
        hero: {
            badge: "AVAILABLE FOR NEW PROJECTS",
            headline: <>A system that doesn't<br /><span className="text-secondary">constantly need you.</span></>,
            sub: <>I liberate your business from manual work. <br className="hidden md:block" /> For stable workflows, fewer errors, and real growth.</>,
            ctaPrimary: "Schedule Consultation",
            ctaSecondary: "View Case Studies"
        },
        problem: {
            headline: "It works. But only as long as you're watching.",
            description: "Your business runs, but it depends too much on your personal presence. Growth therefore feels stressful.",
            cards: [
                {
                    tag: "THE BOTTLENECK",
                    title: "Trapped in Daily Operations",
                    description: "You work in the system instead of on the system. Recurring tasks eat up your time and block more important things."
                },
                {
                    tag: "RISK",
                    title: "Silent Self-Sabotage",
                    description: "A forgotten inquiry, a wrong invoice. Every manual step is a source of error that endangers your reputation."
                },
                {
                    tag: "GROWTH PAINS",
                    title: "The Glass Ceiling",
                    description: "More clients currently mean only one thing: More chaos. Your business grows, but your stress level grows faster."
                }
            ]
        },
        services: {
            headline: "Results before Technology",
            sub: "Businesses should work better before they work faster. I install systems that keep your back free.",
            cards: [
                {
                    tag: "CONNECTION",
                    title: "Seamless Connection",
                    desc: "Your software tools work together instead of against each other. Data automatically lands where it is needed."
                },
                {
                    tag: "24/7 OPERATION",
                    title: "Digital Assistants",
                    desc: "Intelligent systems that take over support and administration. Reliable, error-free, and around the clock."
                },
                {
                    tag: "OWNERSHIP",
                    title: "Full Control",
                    desc: "You don't receive a black box, but own the technology yourself. All access and rights belong 100% to you."
                }
            ]
        },
        process: {
            headline: "From Chaos to System",
            sub: "From analysis to digital freedom in four steps.",
            steps: [
                {
                    title: 'The Analysis',
                    desc: 'We find out where you lose time and money. You see in black and white what your current workflows cost you.',
                },
                {
                    title: 'The Blueprint',
                    desc: 'A technical concept instead of theoretical advice. This plan belongs to you, independent of the implementation.',
                },
                {
                    title: 'The Implementation',
                    desc: 'I build stable solutions that work from day 1. No experiments, but proven standards.',
                },
                {
                    title: 'Secure Handover',
                    desc: 'You receive all access. Your business runs automatically – and you keep full control.',
                }
            ]
        },
        about: {
            whoAmI: "WHO_AM_I",
            description: "The bridge between business administration and IT. I understand not just code, but your numbers. I don't build technical toys, but useful solutions for your growth.",
            badges: {
                code: { label: "CODE", sub: "Full Stack" },
                term: { label: "TERM", sub: "n8n Expert" }
            },
            status: "STATUS: DEPLOYING"
        },
        footer: {
            headline: "Stop Guessing.",
            text: "Find out where you lose time and money. A conversation from entrepreneur to entrepreneur.",
            ctaButton: "Request Conversation",
            location: { label: "LOCATION", value: "Chiang Mai, TH" },
            timezone: { label: "TIMEZONE", value: "GMT+7" },
            form: {
                name: "YOUR NAME",
                email: "YOUR EMAIL",
                message: "YOUR MESSAGE",
                successHeadline: "Message sent!",
                successText: "I will get back to you shortly.",
                newMessage: "New Message",
                error: "There was an error. Please try again later."
            }
        },
        caseStudies: {
            viewButton: "View Case Study",
            backButton: "Back to Overview",
            recentWork: "Selected Work"
        }
    }
};
