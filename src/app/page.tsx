import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">

      <h1 className="text-4xl font-bold text-center mb-12">
        AI Resume Tools
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link href="/build-resume" className="border p-6 rounded-lg hover:shadow">
          <h2 className="text-xl font-semibold">Build Resume</h2>
          <p>Create a professional resume using AI</p>
        </Link>

        <Link href="/ats-score" className="border p-6 rounded-lg hover:shadow">
          <h2 className="text-xl font-semibold">Check ATS Score</h2>
          <p>Analyze resume for ATS systems</p>
        </Link>

        <Link href="/review-resume" className="border p-6 rounded-lg hover:shadow">
          <h2 className="text-xl font-semibold">Review Resume</h2>
          <p>Get AI feedback on your resume</p>
        </Link>

      </div>

    </div>
  )
}