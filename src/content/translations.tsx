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
        bridge: {
            headline: <>Die meisten Unternehmen arbeiten nicht falsch.<br />Sie arbeiten <span className="text-secondary">ohne System.</span></>
        },
        services: {
            principle: "Erst Ordnung. Dann Geschwindigkeit.",
            headline: "Ergebnisse vor Technik",
            sub: "Ich analysiere Ihre Abläufe und schaffe klare Strukturen, die verlässlich funktionieren.",
            cards: [
                {
                    tag: "INTEGRATION",
                    title: "Verbundene Systeme",
                    desc: "Isolierte Tools werden verknüpft. Daten fließen automatisch und fehlerfrei zwischen Ihren Anwendungen."
                },
                {
                    tag: "STABILITÄT",
                    title: "Verlässliche Routinen",
                    desc: "Wiederkehrende Aufgaben werden fest definiert und automatisiert. Der Betrieb läuft unabhängig von Tagesform und Anwesenheit."
                },
                {
                    tag: "TRANSPARENZ",
                    title: "Volle Kontrolle",
                    desc: "Keine Black-Box. Sie erhalten dokumentierte, nachvollziehbare Logik und behalten die Hoheit über Ihre Systeme."
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
            ],
            conclusion: {
                headline: "Alles läuft. Auch ohne Sie.",
                description: "Manuelle Arbeit ist ersetzt – Ihr Geschäft funktioniert, auch wenn Sie gerade nicht hinschauen."
            }
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
        },
        impressum: {
            headline: "Impressum",
            content: "Inhalt wird geladen..."
        },
        datenschutz: {
            headline: "Datenschutzerklärung",
            content: "Inhalt wird geladen..."
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
        bridge: {
            headline: <>Most companies don't work incorrectly.<br />They work <span className="text-secondary">without a system.</span></>
        },
        services: {
            principle: "First Order. Then Speed.",
            headline: "Results before Technology",
            sub: "I analyze your workflows and create clear structures that function reliably.",
            cards: [
                {
                    tag: "INTEGRATION",
                    title: "Connected Systems",
                    desc: "Isolated tools are linked. Data flows automatically and without errors between your applications."
                },
                {
                    tag: "STABILITY",
                    title: "Reliable Routines",
                    desc: "Recurring tasks are strictly defined and automated. Operations run independently of daily performance or presence."
                },
                {
                    tag: "TRANSPARENCY",
                    title: "Full Control",
                    desc: "No black box. You receive documented, traceable logic and retain sovereignty over your systems."
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
            ],
            conclusion: {
                headline: "Everything runs. Even without you.",
                description: "Manual work is replaced – your business works, even when you're not looking."
            }
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
        },
        impressum: {
            headline: "Legal Notice",
            content: "Loading content..."
        },
        datenschutz: {
            headline: "Privacy Policy",
            content: "Loading content..."
        }
    }
};
