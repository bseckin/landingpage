export type Language = 'de' | 'en';

export const translations = {
    de: {
        hero: {
            badge: "FÜR SHK-, PV- UND HANDWERKSBETRIEBE",
            headline: <>Während Sie auf der Baustelle sind,<br /><span className="text-secondary">geht keine Kundenanfrage mehr unter.</span></>,
            sub: <>Der WhatsApp-Assistent, der Anfragen vollständig erfasst und nur ernsthafte Aufträge auf Ihr Handy bringt.</>,
            ctaPrimary: "Kostenlosen Systemcheck buchen",
            ctaSecondary: "Fallstudien ansehen"
        },
        problem: {
            headline: "Die besten Aufträge kommen dann, wenn Sie nicht rangehen können.",
            description: "Handwerker verdienen ihr Geld auf der Baustelle – nicht im Büro. Aber genau dort gehen täglich Aufträge verloren.",
            cards: [
                {
                    tag: "DER FLASCHENHALS",
                    title: "Das Telefon klingelt, wenn Sie unterm Kessel liegen.",
                    description: "Sie können nicht rangehen. Der Kunde ruft den nächsten Installateur an. Der Auftrag ist weg."
                },
                {
                    tag: "ZEITFRESSER",
                    title: "Abends zwei Stunden Büro für halbfertige Anfragen.",
                    description: "Nach 10 Stunden Baustelle sitzen Sie vor E-Mails mit unvollständigen Infos. Sie schreiben zurück – der Kunde antwortet nicht mehr."
                },
                {
                    tag: "VERLORENE AUFTRÄGE",
                    title: "Sie wählen Aufträge aus – aber nicht die richtigen.",
                    description: "Ohne System landen alle Anfragen gleich in Ihrer Inbox. Das System holt fehlende Infos ein – Sie entscheiden."
                }
            ]
        },
        bridge: {
            headline: <>Die meisten Handwerksbetriebe arbeiten nicht falsch.<br />Sie arbeiten <span className="text-secondary">ohne System.</span></>
        },
        services: {
            principle: "Spitz schlägt generisch",
            headline: "Spezialisiert auf den Kundenanfragen-Eingang",
            sub: "Nicht noch eine Allround-Lösung. Ein erprobtes System für das kritischste Nadelöhr: den Moment, in dem aus einer Anfrage ein Auftrag wird.",
            cards: [
                {
                    tag: "AUSFALLSICHERHEIT",
                    title: "Redundanz, keine Ausreden",
                    desc: "Selbst wenn eine Website oder ein Dienst kurzzeitig nicht erreichbar ist, geht keine Kundenanfrage verloren. Das System puffert, wiederholt und alarmiert – automatisch."
                },
                {
                    tag: "NACHVOLLZIEHBARKEIT",
                    title: "Lückenlose Dokumentation",
                    desc: "Jeder Schritt wird protokolliert. Sie sehen genau, welche Kundenanfrage wann einging und wer sie bearbeitet hat – vom Kontakt bis zum Auftrag."
                },
                {
                    tag: "UNABHÄNGIGKEIT",
                    title: "Das System gehört Ihnen. Keine monatlichen Kosten.",
                    desc: "Bewährte Open-Source-Technologie (n8n) auf Ihren oder österreichischen Servern. Das System gehört Ihnen – nicht mir."
                }
            ]
        },
        process: {
            headline: "So funktioniert Ihr System",
            sub: "Vom Anfrage-Eingang zur Benachrichtigung auf Ihrem Handy – in unter 60 Sekunden.",
            steps: [
                {
                    title: 'Der kostenlose Systemcheck',
                    desc: '30 Minuten Live-Demo: Ich zeige Ihnen auf Ihrem eigenen Smartphone, wie sekundenschnelle Weiterleitung funktioniert. Keine Verpflichtung.',
                },
                {
                    title: 'Der Projekt-Bauplan mit Fixpreis',
                    desc: 'Nach der Analyse erhalten Sie einen glasklaren, schriftlichen Bauplan. Fixpreis ab 2.000 €. Keine Überraschungen.',
                },
                {
                    title: 'Schlüsselfertige Umsetzung',
                    desc: 'Ich baue das System in Ihrer Umgebung auf – Open Source (n8n), lokal gehostet, nach Enterprise-Standards. Ab Tag 1 produktiv.',
                },
                {
                    title: 'Dauerhafter Systemschutz',
                    desc: 'Ihr System läuft auch dann weiter, wenn Meta, Google oder WhatsApp Updates einspielen. Monitoring, Redundanz und Nachvollziehbarkeit inklusive.',
                }
            ],
            conclusion: {
                headline: "Ihr System läuft. Auch wenn Sie Feierabend haben.",
                description: "Jede Kundenanfrage wird erfasst, weitergeleitet und dokumentiert – völlig automatisch. Sie müssen nur noch antworten."
            }
        },
        about: {
            whoAmI: "SYSTEM-ARCHITEKT",
            description: "Ich habe Systeme für ORF und Bundesrechenzentrum gebaut – dort, wo Ausfall keine Option ist. Dieselbe Stabilität, abgestimmt auf Handwerksbetriebe, die keine Zeit für komplizierte Software haben. Kein Ausfall. Keine monatlichen Kosten. Das System gehört Ihnen.",
            badges: {
                code: { label: "ORF", sub: "Werbetechnologie" },
                term: { label: "BRZ", sub: "Requirement Engineer" }
            },
            status: "STATUS: SYSTEM AKTIV"
        },
        footer: {
            headline: "Jede Kundenanfrage ist ein Auftrag.",
            text: "Sehen Sie in 30 Minuten live auf Ihrem Handy, wie das System funktioniert. Kostenlos. Unverbindlich.",
            ctaButton: "Kostenlosen Systemcheck buchen",
            location: { label: "STANDORT", value: "Wien, AT" },
            timezone: { label: "ZEITZONE", value: "GMT+2" },
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
            badge: "LEAD-RESCUE SYSTEM",
            headline: <>Valuable customer inquiries<br /><span className="text-secondary">no longer slip through.</span></>,
            sub: <>Automatically captured — on your phone in seconds.<br className="hidden md:block" /> For businesses where expensive leads get lost in daily chaos.</>,
            ctaPrimary: "Book 30-Min Leak Analysis",
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
            principle: "Sharp beats generic",
            headline: "Specialized on Lead Intake",
            sub: "Not another allround solution. A proven system for the most critical bottleneck: the moment an inquiry must become a customer.",
            cards: [
                {
                    tag: "RESILIENCE",
                    title: "Redundancy, No Excuses",
                    desc: "Even if a website or service is temporarily unavailable, no inquiry is lost. The system buffers, retries and alerts – automatically."
                },
                {
                    tag: "TRACEABILITY",
                    title: "Complete Documentation",
                    desc: "Every step is logged. You see exactly which inquiry arrived when, who handled it and whether it was answered."
                },
                {
                    tag: "INDEPENDENCE",
                    title: "Your Data, Your Sovereignty",
                    desc: "Open Source (n8n) on your or Austrian servers. No vendor lock-in. You own the system – not me."
                }
            ]
        },
        process: {
            headline: "How Your Lead-Rescue Works",
            sub: "From inquiry arrival to phone notification – in under 60 seconds.",
            steps: [
                {
                    title: 'Free Leak Analysis',
                    desc: '30-minute live demo: I show you on your own smartphone how instant forwarding works. No obligation, just an experience.',
                },
                {
                    title: 'Project Blueprint with Fixed Price',
                    desc: 'After the analysis you receive a clear, written blueprint. Fixed price guarantee from €2,000. No surprises.',
                },
                {
                    title: 'Turnkey Implementation',
                    desc: 'I build the system in your environment – Open Source (n8n), locally hosted, enterprise-grade. Productive from day 1.',
                },
                {
                    title: 'Ongoing System Protection',
                    desc: 'Your system keeps running even when Meta, Google or WhatsApp push updates. Monitoring, redundancy and traceability included.',
                }
            ],
            conclusion: {
                headline: "Your Lead-Rescue runs. Even on weekends.",
                description: "Every inquiry is captured, forwarded and documented – fully automatic. All you have to do is reply."
            }
        },
        about: {
            whoAmI: "SYSTEM ARCHITECT",
            description: "The bridge between critical infrastructure and your business. I built systems that were critical for the state (ORF, BRZ). The same uncompromising stability, resilience and Austrian data protection now come to your operation.",
            badges: {
                code: { label: "ORF", sub: "Ad Technology" },
                term: { label: "BRZ", sub: "Requirement Engineer" }
            },
            status: "STATUS: SYSTEM ACTIVE"
        },
        footer: {
            headline: "Every inquiry is a revenue opportunity.",
            text: "See your Lead-Rescue in action on your phone – 30 minutes, free, no obligation.",
            ctaButton: "Book 30-Min Leak Analysis",
            location: { label: "LOCATION", value: "Vienna, AT" },
            timezone: { label: "TIMEZONE", value: "GMT+2" },
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