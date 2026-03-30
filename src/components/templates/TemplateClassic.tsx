import { ResumeData } from "@/src/types/resume"

export default function TemplateClassic({ data }: { data: ResumeData }) {
  const { personalInfo, education, skills, projects, experience } = data;

  return (
    <div className="bg-white text-black p-10 min-h-[1100px] font-serif shadow-xl mx-auto max-w-[800px] text-[12px] leading-snug">
      {/* Header */}
      <header className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{personalInfo.fullName}</h1>
        <div className="flex justify-center gap-3 text-[11px] font-medium">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
        </div>
        <div className="flex justify-center gap-3 text-[11px] mt-1 text-gray-700">
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
          {personalInfo.github && <a href={personalInfo.github} className="hover:underline">GitHub</a>}
        </div>
      </header>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>{edu.school}</span>
              <span>{edu.startDate} – {edu.endDate}</span>
            </div>
            <p className="italic">{edu.degree}</p>
            {edu.description && <p className="mt-1">{edu.description}</p>}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Skills</h2>
        <div className="space-y-1">
          {skills.map((skill, index) => (
            <p key={index}>
              <span className="font-bold">{skill.category}: </span>
              {skill.items.join(", ")}
            </p>
          ))}
        </div>
      </section>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between font-bold">
                <span>{exp.company}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="italic mb-1">{exp.role}</p>
              <p className="whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Projects</h2>
        {projects.map((proj, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>{proj.title}</span>
              <span className="text-gray-600 font-normal italic">{proj.technologies}</span>
            </div>
            <p className="mt-1 whitespace-pre-line">{proj.description}</p>
            {proj.link && <a href={proj.link} className="text-blue-700 underline text-[10px] mt-1 block">Project Link</a>}
          </div>
        ))}
      </section>
    </div>
  )
}
