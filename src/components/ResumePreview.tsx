"use client"

import { useRef } from "react"
import { ResumeData } from "@/src/types/resume"
import TemplateClassic from "./templates/TemplateClassic"
import TemplateModern from "./templates/TemplateModern"
import TemplateMinimal from "./templates/TemplateMinimal"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

type ResumeProps = {
  resume: ResumeData | null
}

export default function ResumePreview({ resume }: ResumeProps) {
  const resumeRef = useRef<HTMLDivElement>(null)

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-border rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 animate-pulse transition-all">
        <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-slate-400 font-medium">Your preview will appear here</p>
      </div>
    )
  }

  const handleDownload = async () => {
    if (!resumeRef.current) return

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
    })
    
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgProps = (pdf as any).getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`)
  }

  const renderTemplate = () => {
    switch (resume.template) {
      case "modern":
        return <TemplateModern data={resume} />
      case "minimal":
        return <TemplateMinimal data={resume} />
      case "classic":
      default:
        return <TemplateClassic data={resume} />
    }
  }

  return (
    <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-border">
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleDownload} 
          className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-800 p-8 flex justify-center overflow-auto max-h-[800px]">
        <div className="transform scale-[0.5] sm:scale-[0.8] lg:scale-100 origin-top shadow-2xl" ref={resumeRef}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}