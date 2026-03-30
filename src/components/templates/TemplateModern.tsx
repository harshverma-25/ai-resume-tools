import { ResumeData } from "@/src/types/resume"

export default function TemplateModern({ data }: { data: ResumeData }) {
  const { personalInfo, education, skills, projects, experience } = data;

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1100px] font-sans shadow-xl mx-auto max-w-[800px] text-[13px] leading-relaxed">
      {/* Header with sidebar-like color block */}
      <header className="flex justify-between items-start mb-10 pb-6 border-b-4 border-primary">
        <div className="max-w-[60%]">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">{personalInfo.fullName}</h1>
          <p className="text-slate-600 font-medium text-[12px]">{personalInfo.location}</p>
        </div>
        <div className="text-right space-y-1 text-slate-500 font-medium text-[11px]">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <div className="flex justify-end gap-3 mt-2 font-bold text-primary">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="hover:underline">GitHub</a>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Education & Skills */}
        <aside className="col-span-4 space-y-8 border-r border-slate-100 pr-4">
          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-4">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <p className="font-bold text-slate-900 mb-1">{skill.category}</p>
                  <p className="text-slate-600 leading-normal">{skill.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold text-slate-900 leading-snug">{edu.school}</p>
                <p className="text-slate-600 italic">{edu.degree}</p>
                <p className="text-slate-500 text-[11px] mt-1">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </section>
        </aside>

        {/* Right Column: Experience & Projects */}
        <main className="col-span-8 space-y-8">
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-4">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-[14px]">{exp.company}</h3>
                    <span className="text-slate-500 text-[11px] font-medium">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-primary font-bold italic mb-2 text-[12px]">{exp.role}</p>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-4">Projects</h2>
            {projects.map((proj, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-[14px]">{proj.title}</h3>
                  <span className="text-slate-400 text-[11px] italic font-medium">{proj.technologies}</span>
                </div>
                <p className="text-slate-600 whitespace-pre-line mb-1 leading-relaxed">{proj.description}</p>
                {proj.link && <a href={proj.link} className="text-primary hover:underline text-[11px] font-bold">View Source</a>}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
