"use client"

import { useState } from "react"
import { ResumeData, Skill, Education, Project, Experience } from "@/src/types/resume"

type Props = {
  setResume: (data: ResumeData) => void
}

export default function ResumeForm({ setResume }: Props) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: ""
    },
    education: [{ school: "", degree: "", startDate: "", endDate: "", description: "" }],
    skills: [{ category: "Technical Skills", items: [""] }],
    projects: [{ title: "", technologies: "", description: "", link: "" }],
    experience: [],
    template: "classic"
  })

  const handleChange = (e: any, section: string, index?: number, field?: string) => {
    const value = e.target.value
    
    if (section === "personalInfo") {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [field!]: value }
      })
    } else if (index !== undefined && field) {
      const updatedList = [...(formData as any)[section]]
      updatedList[index][field] = value
      setFormData({ ...formData, [section]: updatedList })
    }
  }

  const handleListChange = (index: number, value: string, section: string) => {
    const updatedSkills = [...formData.skills]
    updatedSkills[index].items = value.split(",").map(s => s.trim())
    setFormData({ ...formData, skills: updatedSkills })
  }

  const addItem = (section: string, defaultItem: any) => {
    setFormData({ ...formData, [section]: [...(formData as any)[section], defaultItem] })
  }

  const removeItem = (section: string, index: number) => {
    const updatedList = [...(formData as any)[section]]
    updatedList.splice(index, 1)
    setFormData({ ...formData, [section]: updatedList })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        return
      }
    
      const parsed = JSON.parse(data.data)
      setResume(parsed)
    } catch (err) {
      console.error("AI Generation Error:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-border">
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Personal Info */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Personal Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="Full Name" 
              value={formData.personalInfo.fullName} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "fullName")} 
            />
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="Email" 
              value={formData.personalInfo.email} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "email")} 
            />
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="Phone" 
              value={formData.personalInfo.phone} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "phone")} 
            />
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="Location" 
              value={formData.personalInfo.location} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "location")} 
            />
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="LinkedIn URL" 
              value={formData.personalInfo.linkedin} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "linkedin")} 
            />
            <input 
              className="input-field border border-border p-3 rounded-xl bg-slate-50 dark:bg-slate-800" 
              placeholder="GitHub URL" 
              value={formData.personalInfo.github} 
              onChange={(e) => handleChange(e, "personalInfo", 0, "github")} 
            />
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            <button type="button" onClick={() => addItem("education", { school: "", degree: "", startDate: "", endDate: "", description: "" })} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              + Add Education
            </button>
          </div>
          {formData.education.map((edu, i) => (
            <div key={i} className="mb-6 p-4 border border-border rounded-2xl relative">
              <button type="button" onClick={() => removeItem("education", i)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="School" value={edu.school} onChange={(e) => handleChange(e, "education", i, "school")} />
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, "education", i, "degree")} />
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleChange(e, "education", i, "startDate")} />
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="End Date" value={edu.endDate} onChange={(e) => handleChange(e, "education", i, "endDate")} />
                <textarea className="col-span-2 input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Details (GPA, Honors, etc.)" value={edu.description} onChange={(e) => handleChange(e, "education", i, "description")} />
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Skills</h3>
            </div>
            <button type="button" onClick={() => addItem("skills", { category: "", items: [""] })} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              + Add Category
            </button>
          </div>
          {formData.skills.map((skill, i) => (
            <div key={i} className="mb-4 flex gap-4 items-start">
              <input 
                className="w-1/3 input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" 
                placeholder="Category (e.g. Languages)" 
                value={skill.category} 
                onChange={(e) => handleChange(e, "skills", i, "category")} 
              />
              <input 
                className="w-full input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" 
                placeholder="Skills (comma separated)" 
                value={skill.items.join(", ")} 
                onChange={(e) => handleListChange(i, e.target.value, "skills")} 
              />
            </div>
          ))}
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Experience (Optional)</h3>
            </div>
            <button type="button" onClick={() => addItem("experience", { company: "", role: "", startDate: "", endDate: "", description: "" })} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              + Add Experience
            </button>
          </div>
          {formData.experience.map((exp, i) => (
            <div key={i} className="mb-6 p-4 border border-border rounded-2xl relative bg-slate-50/50">
              <button type="button" onClick={() => removeItem("experience", i)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input className="input-field bg-white dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, "experience", i, "company")} />
                <input className="input-field bg-white dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Role" value={exp.role} onChange={(e) => handleChange(e, "experience", i, "role")} />
                <input className="input-field bg-white dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleChange(e, "experience", i, "startDate")} />
                <input className="input-field bg-white dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="End Date" value={exp.endDate} onChange={(e) => handleChange(e, "experience", i, "endDate")} />
                <textarea className="col-span-2 input-field bg-white dark:bg-slate-800 p-3 rounded-xl border border-border h-32" placeholder="Responsibilities & Achievements... (Be descriptive, AI will improve it!)" value={exp.description} onChange={(e) => handleChange(e, "experience", i, "description")} />
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4m-4-4l-4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Projects</h3>
            </div>
            <button type="button" onClick={() => addItem("projects", { title: "", technologies: "", description: "", link: "" })} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              + Add Project
            </button>
          </div>
          {formData.projects.map((proj, i) => (
            <div key={i} className="mb-6 p-4 border border-border rounded-2xl relative">
              <button type="button" onClick={() => removeItem("projects", i)} className="absolute top-4 right-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Project Title" value={proj.title} onChange={(e) => handleChange(e, "projects", i, "title")} />
                <input className="input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Technologies Used" value={proj.technologies} onChange={(e) => handleChange(e, "projects", i, "technologies")} />
                <input className="col-span-2 input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border" placeholder="Project Link" value={proj.link} onChange={(e) => handleChange(e, "projects", i, "link")} />
                <textarea className="col-span-2 input-field bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-border h-24" placeholder="Tell us what you built... (AI will make it sound elite!)" value={proj.description} onChange={(e) => handleChange(e, "projects", i, "description")} />
              </div>
            </div>
          ))}
        </section>

        {/* Template Selection */}
        <section>
          <h3 className="text-xl font-bold mb-6">Choose Template</h3>
          <div className="grid grid-cols-3 gap-4">
            {["classic", "modern", "minimal"].map((tmp) => (
              <label key={tmp} className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${formData.template === tmp ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                <input type="radio" name="template" value={tmp} className="hidden" checked={formData.template === tmp} onChange={(e) => setFormData({ ...formData, template: tmp })} />
                <div className="text-center">
                  <p className="font-bold capitalize">{tmp}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary py-4 text-lg bg-gradient-to-r from-primary to-secondary relative overflow-hidden group"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Wait, AI is cooking...
            </div>
          ) : (
            <>
              Generate Elite Resume
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </>
          )}
        </button>
      </form>
    </div>
  )
}