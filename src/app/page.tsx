import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-background min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-slate-50 dark:bg-slate-900">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        {/* Hero Section */}
        <div className="text-center space-y-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold shadow-lg shadow-primary/5">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
            AI-POWERED RESUME BUILDER
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Build Resumes That <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Actually Get Hired.</span>
          </h1>

          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Stop sending weak resumes. Use Gemini AI to rewrite your bullet points into <span className="text-slate-900 dark:text-white font-bold">measurable achievements</span>, check your ATS score, and get roasted (or toasted) by our AI review.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/build-resume" className="btn-primary py-5 px-10 text-xl font-black bg-gradient-to-r from-primary to-secondary w-full sm:w-auto shadow-2xl hover:scale-105 transition-all">
              Build My Resume Free
            </Link>
            <Link href="/ats-score" className="p-5 px-10 text-xl font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-all flex items-center gap-2 group">
              Check ATS Score
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
            title="Elite Builder"
            description="Our AI doesn't just format; it rewrites. Turn 'I made a web app' into 'Architected high-scale systems'."
            color="primary"
            link="/build-resume"
          />
          <FeatureCard 
            icon={<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
            title="ATS Optimizer"
            description="Paste your target job and see if you pass the screeners. Get exact keywords you're missing."
            color="secondary"
            link="/ats-score"
          />
          <FeatureCard 
            icon={<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
            title="SWOT + Roast"
            description="Professional analysis meet Gen Z memes. Find your weaknesses or get roasted if your resume is tatti."
            color="accent"
            link="/review-resume"
          />
        </div>
      </div>

      {/* Social Proof / Stats Section */}
      <div className="max-w-5xl mx-auto px-4 py-20 border-t border-border mt-20 text-center animate-fade-in group">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Trusted by students at</h3>
        <div className="flex flex-wrap items-center justify-center gap-12 mt-12 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
           <span className="text-2xl font-black text-slate-900 dark:text-white">TECH</span>
           <span className="text-2xl font-black text-slate-900 dark:text-white">BUILDERS</span>
           <span className="text-2xl font-black text-slate-900 dark:text-white">DEVELOPERS</span>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, color, link }: any) {
  const colors: any = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
  }

  return (
    <Link href={link} className="card group hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden relative">
      <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative ${colors[color]}`}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon.props.d} />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-4 relative">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed relative">{description}</p>
      <div className="mt-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        Try Feature
        <svg className="w-4 h-4 translate-x-[-4px] opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}