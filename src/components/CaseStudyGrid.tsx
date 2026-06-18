const CaseStudyGrid = () => {
  return (
    <section
      className="border-b border-outline-variant bg-background"
      id="cases"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32">
        <div className="mb-16 md:mb-20">
          <span className="label-caps text-on-surface-variant mb-4 block">
            Fallstudien
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black uppercase leading-tight">
            Das System in Aktion.
          </h3>
          <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-2xl">
            Die folgenden Szenarien zeigen den identischen Workflow – angewendet
            auf unterschiedliche Branchen.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px] bg-outline-variant gap-px">
        {/* Case 1: Speed-to-Lead */}
        <div className="relative group cursor-pointer overflow-hidden bg-surface">
          <div
            className="absolute inset-0 grayscale contrast-125 opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAESCVDmlhWMk_GHB6BpMIKJTcReiNgpmmMmACEQZmuH2o0zk8IoxD8b72KfilmPJWrGP8vB1ZGK_dtnkhl-AFXc2kbsUVu-o1g61lDWnUL5ycNv_o8UMbwygwBGgTP1ryV2vx5OBGocah_jrKklgVt5pzYgxXp7duWO7G0DkcERnvOSI3-EAL2JUgV6pqYMxPabzY2f-2nvL9QYyk40yiNBbw0OX_qOah5UFKszpJh-WG0C7lqX81fTyfPL76wZIDeArolRyXi3H8')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <span className="label-caps border border-on-surface text-on-surface px-3 py-1 self-start bg-white">
              VERTRIEB – SPEED TO LEAD
            </span>
            <div>
              <h4 className="text-2xl md:text-3xl font-display font-black mb-4 md:mb-6 uppercase tracking-tight">
                Der Lead-Retter für das High-End-Gewerbe
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Ein Interessent für eine Premium-Dienstleistung schickt
                Samstagnachmittag eine Anfrage. In unter 60 Sekunden landet die
                vollständige Benachrichtigung als WhatsApp auf Ihrem Handy –
                noch bevor der Kunde bei der Konkurrenz anruft.
              </p>
              <div className="bg-white border border-outline-variant p-4 shadow-technical group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-[#25D366]" />
                  <span className="label-caps text-[#25D366] text-[10px]">
                    WhatsApp Alarm
                  </span>
                </div>
                <p className="text-sm font-bold uppercase text-on-surface">
                  {'<'} 60 Sek. bis Erstkontakt
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case 2: Angebotserstellung */}
        <div className="relative group cursor-pointer overflow-hidden bg-surface">
          <div
            className="absolute inset-0 grayscale contrast-125 opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtIlUHqgnv4rLBG21h9Afe_jBGno5EmaN59R-FtcUgxnaAQkvW1S2k4WzYyT62KrwWZ4lp_dK1MYHq8d5wU-4pwdyPIjQEpPh1h2xl9PuwWuKpduAVekUacWCtKXT_jJ2Sm_a3KkqIgfHfN17VwGXVBcZ6eIsCR_OH5wg_6MmXN_fLdFF1hXbxZYFNgJ6747Y9RqAz_TXoR0Fnpo3TlQokDKgwZ_tuo1VvnlLlHMWwyc3rtaSLds8xxwGM5XD0EL1V5Dm2lcwAPT4')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <span className="label-caps border border-on-surface text-on-surface px-3 py-1 self-start bg-white">
              VERTRIEB-BESCHLEUNIGUNG
            </span>
            <div>
              <h4 className="text-2xl md:text-3xl font-display font-black mb-4 md:mb-6 uppercase tracking-tight">
                Fehlerfreie Angebote im Sekundentakt
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Das System fängt die eingehende Anfrage nicht nur, sondern
                erstellt im Hintergrund automatisch einen fehlerfreien
                Angebotsentwurf aus Ihren hinterlegten Preisen. Statt einer
                Stunde manueller Arbeit klicken Sie nur noch auf „Prüfen und
                Senden".
              </p>
              <div className="bg-white border border-outline-variant p-4 shadow-technical group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-primary" />
                  <span className="label-caps text-on-surface text-[10px]">
                    Auto-Generierung
                  </span>
                </div>
                <p className="text-sm font-bold uppercase text-on-surface">
                  Angebot in 4 Minuten
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case 3: Recruiting */}
        <div className="relative group cursor-pointer overflow-hidden bg-surface">
          <div
            className="absolute inset-0 grayscale contrast-125 opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIhXQMQjZvCliAQKzt_nhEY4IVGYGBH0DOixejGhjqSaYWT5a7t0hxIcCwL2fmtKh-teWWqXOxsKgU6kePBjZg8yJZGTg4EiWfIkoLBUyzFMfThm4FP_FxL03d7AG8-EWuLXPEnXQK2apoQrcPoS7N5arI-e4I1B_Cs3aWyTEOW6jxdFMHFv2ZM-6aGdDZF1rUf91YLsnIZC-EQ5vKHaDOukXh4No2HdyuQLAS2P7L1ux7NAsJRZQQF4YP49dyftHwK018UGQa1Xo')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <span className="label-caps border border-on-surface text-on-surface px-3 py-1 self-start bg-white">
              HR / RECRUITING
            </span>
            <div>
              <h4 className="text-2xl md:text-3xl font-display font-black mb-4 md:mb-6 uppercase tracking-tight">
                Schnelligkeit gewinnt den Fachkräfte-Kampf
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Eine Bewerbung trifft ein. Das System erkennt kritische
                Schlüsselqualifikationen, priorisiert die Meldung und schickt
                sie sofort per WhatsApp an Sie. Sie haben dem Top-Kandidaten
                längst geantwortet, bevor die Konkurrenz ihre E-Mails checkt.
              </p>
              <div className="bg-white border border-outline-variant p-4 shadow-technical group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-[#25D366]" />
                  <span className="label-caps text-[#25D366] text-[10px]">
                    Talent Alarm
                  </span>
                </div>
                <p className="text-sm font-bold uppercase text-on-surface">
                  Die besten Leute zuerst
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;