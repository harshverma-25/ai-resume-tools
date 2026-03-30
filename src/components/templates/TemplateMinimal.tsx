import { ResumeData } from "@/src/types/resume"

export default function TemplateMinimal({ data }: { data: ResumeData }) {
  const { personalInfo, education, skills, projects, experience } = data;

  return (
    <div className="bg-white text-black p-12 min-h-[1100px] font-sans shadow-xl mx-auto max-w-[800px] text-[13px] leading-relaxed tracking-tight">
      {/* Centered Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">{personalInfo.fullName}</h1>
        <div className="flex justify-center gap-4 text-gray-600 text-[12px] font-medium">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
        <div className="flex justify-center gap-4 mt-1 text-gray-500 text-[11px] font-bold">
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:text-black">LinkedIn</a>}
          {personalInfo.github && <a href={personalInfo.github} className="hover:text-black">GitHub</a>}
        </div>
      </header>

      {/* Sections with simple underlines */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-1 mb-4">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between font-bold text-gray-800">
              <span>{edu.school}</span>
              <span className="text-gray-500 font-medium">{edu.startDate} – {edu.endDate}</span>
            </div>
            <p className="text-gray-600 italic">{edu.degree}</p>
            {edu.description && <p className="mt-2 text-gray-700 leading-snug">{edu.description}</p>}
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-1 mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <span className="font-bold text-gray-800 w-24 shrink-0">{skill.category}:</span>
              <span className="text-gray-600">{skill.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-1 mb-4">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between font-bold text-gray-800">
                <span>{exp.company}</span>
                <span className="text-gray-500 font-medium">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="text-gray-900 font-bold mb-2">{exp.role}</p>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-1 mb-4">Projects</h2>
        {projects.map((proj, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="flex justify-between font-bold text-gray-800">
              <span>{proj.title}</span>
              <span className="text-gray-400 font-medium italic">{proj.technologies}</span>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
            {proj.link && <a href={proj.link} className="text-blue-600 hover:underline text-[11px] mt-2 inline-block">Project Link</a>}
          </div>
        ))}
      </section>
    </div>
  )
}
