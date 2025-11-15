"use client";
import React, { useState } from "react";

const JobsPage: React.FC = () => {
  const [responsibilities, setResponsibilities] = useState("");
  const [email, setEmail] = useState("");

  const [formState, setFormState] = useState({
    jobType: "development",
    role: "frontend-developer",
    level: "mid",
    employmentType: "full-time",
    workMode: "remote",
    location: "remote-india",
    salaryRange: "6-10",
    techStack: [] as string[],
    designTools: [] as string[],
    perks: [] as string[],
  });

  const handleCheckboxChange = (
    group: "techStack" | "designTools" | "perks",
    value: string
  ) => {
    setFormState((prev) => {
      const alreadySelected = prev[group].includes(value);
      return {
        ...prev,
        [group]: alreadySelected
          ? prev[group].filter((item) => item !== value)
          : [...prev[group], value],
      };
    });
  };

  const handleChange = (
    field:
      | "jobType"
      | "role"
      | "level"
      | "employmentType"
      | "workMode"
      | "location"
      | "salaryRange",
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formState,
      responsibilities,
      email,
    };

    console.log("Job Post Payload:", payload);
    alert("Job post created (check console for payload).");
  };

  const isDesignRole =
    formState.role === "ui-ux-designer" || formState.jobType === "design";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-gray-800 flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white/90 border border-gray-200 rounded-3xl shadow-2xl backdrop-blur-xl p-6 md:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Post a New Job
            </h1>
            <p className="text-gray-600 mt-3 max-w-xl text-sm md:text-base leading-relaxed">
              Create a stunning job post for your next{" "}
              <span className="font-semibold text-blue-600">
                Developer, Designer, or Web Engineer
              </span>{" "}
              with our intuitive form. Most details are just a click away!
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium text-sm">
              ⚡ Admin • Hiring Portal
            </span>
            <span className="text-gray-500 text-sm">
              Job visibility:{" "}
              <span className="font-semibold text-gray-800">Public</span>
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left: Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Type & Role */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">Basic Details</h2>
                <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                  Choose job type & role
                </span>
              </div>

              {/* Job Type */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Job Category
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "development", label: "Development", icon: "💻" },
                    { value: "design", label: "Design", icon: "🎨" },
                    { value: "fullstack", label: "Full-Stack", icon: "⚡" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => handleChange("jobType", item.value)}
                      className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        formState.jobType === item.value
                          ? "bg-blue-50 text-blue-700 border-blue-500 shadow-md scale-105"
                          : "bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Role
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      value: "frontend-developer",
                      label: "Frontend Developer",
                      emoji: "🌐",
                    },
                    {
                      value: "backend-developer",
                      label: "Backend Developer",
                      emoji: "🔧",
                    },
                    {
                      value: "fullstack-developer",
                      label: "Fullstack Developer",
                      emoji: "🚀",
                    },
                    {
                      value: "mobile-developer",
                      label: "Mobile App Developer",
                      emoji: "📱",
                    },
                    { value: "ui-ux-designer", label: "UI/UX Designer", emoji: "✨" },
                    { value: "web-designer", label: "Web Designer", emoji: "🎯" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-3 text-sm px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formState.role === item.value
                          ? "bg-purple-50 border-purple-500 text-purple-700 shadow-md"
                          : "bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:shadow-md"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={item.value}
                        checked={formState.role === item.value}
                        onChange={(e) =>
                          handleChange("role", e.target.value)
                        }
                        className="h-4 w-4 accent-purple-500"
                      />
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-medium">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Job Settings */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Job Settings</h2>

              {/* Level & Employment Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Seniority Level
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "junior", label: "Junior", color: "green" },
                      { value: "mid", label: "Mid", color: "blue" },
                      { value: "senior", label: "Senior", color: "purple" },
                      { value: "lead", label: "Lead", color: "orange" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => handleChange("level", item.value)}
                        className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                          formState.level === item.value
                            ? `bg-${item.color}-500 text-white border-${item.color}-500 shadow-lg scale-105`
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Employment Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "full-time", label: "Full Time" },
                      { value: "part-time", label: "Part Time" },
                      { value: "contract", label: "Contract" },
                      { value: "internship", label: "Internship" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() =>
                          handleChange("employmentType", item.value)
                        }
                        className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                          formState.employmentType === item.value
                            ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work mode & location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Work Mode
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "remote", label: "Remote", icon: "🏠" },
                      { value: "hybrid", label: "Hybrid", icon: "🔀" },
                      { value: "onsite", label: "On-site", icon: "🏢" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => handleChange("workMode", item.value)}
                        className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                          formState.workMode === item.value
                            ? "bg-indigo-500 text-white border-indigo-500 shadow-lg scale-105"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md"
                        }`}
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    Location
                  </p>
                  <select
                    value={formState.location}
                    onChange={(e) =>
                      handleChange("location", e.target.value)
                    }
                    className="w-full rounded-xl bg-white border-2 border-gray-300 text-sm px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="remote-india">🌍 Remote • India</option>
                    <option value="noida-up">🏙️ Noida, Uttar Pradesh</option>
                    <option value="bangalore">💻 Bangalore, Karnataka</option>
                    <option value="mumbai">🌊 Mumbai, Maharashtra</option>
                    <option value="other-india">📍 Other (India)</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Salary Range (LPA)
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "3-6", label: "3 - 6 LPA" },
                    { value: "6-10", label: "6 - 10 LPA" },
                    { value: "10-15", label: "10 - 15 LPA" },
                    { value: "15-25", label: "15 - 25 LPA" },
                    { value: "negotiable", label: "💰 Negotiable" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() =>
                        handleChange("salaryRange", item.value)
                      }
                      className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${
                        formState.salaryRange === item.value
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-gray-900">Skills & Tools</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select the technologies and tools required for this role.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Dev stack */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Development Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript", "TypeScript", "React", "Next.js", 
                      "React Native", "Node.js", "Express", "MongoDB", 
                      "PostgreSQL", "REST API", "GraphQL"
                    ].map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-gray-300 bg-white cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                      >
                        <input
                          type="checkbox"
                          value={tech}
                          checked={formState.techStack.includes(tech)}
                          onChange={() =>
                            handleCheckboxChange("techStack", tech)
                          }
                          className="h-4 w-4 accent-blue-500"
                        />
                        <span className="font-medium">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Design tools */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    Design Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Figma", "Adobe XD", "Illustrator", "Photoshop", 
                      "Prototyping", "Design Systems"
                    ].map((tool) => (
                      <label
                        key={tool}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-full border cursor-pointer transition-all ${
                          isDesignRole
                            ? "border-gray-300 bg-white hover:border-pink-400 hover:bg-pink-50"
                            : "border-gray-200 bg-gray-100 opacity-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={tool}
                          disabled={!isDesignRole}
                          checked={formState.designTools.includes(tool)}
                          onChange={() =>
                            handleCheckboxChange("designTools", tool)
                          }
                          className="h-4 w-4 accent-pink-500"
                        />
                        <span className="font-medium">{tool}</span>
                      </label>
                    ))}
                  </div>
                  {!isDesignRole && (
                    <p className="mt-3 text-xs text-gray-500 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                      💡 Enable design tools by selecting a designer role or Design category above.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Responsibilities & Email */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-gray-900">
                Responsibilities & Contact
              </h2>
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                ✨ Only this section requires typing. Everything else is based on quick selections.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={5}
                  placeholder="Describe the main responsibilities, e.g.:
- Build and maintain responsive UI in React/Next.js
- Collaborate with designers and backend engineers
- Write clean, tested, and reusable code
- Participate in code reviews and architecture discussions"
                  className="w-full rounded-xl bg-white border-2 border-gray-300 text-sm px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Contact Email for Applicants{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hr@yourcompany.com"
                  className="w-full rounded-xl bg-white border-2 border-gray-300 text-sm px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 transition-all"
                />
              </div>
            </section>
          </div>

          {/* Right: Preview / Perks */}
          <aside className="space-y-6">
            {/* Perks */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🎁 Perks & Benefits
              </h3>
              <p className="text-sm text-gray-600">
                Select what your company offers for this role.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "5-day work week", "Remote-friendly", "Flexible timing",
                  "Health insurance", "Learning budget", "Performance bonus",
                  "Paid leaves", "Macbook/Equipment", "ESOPs"
                ].map((perk) => (
                  <label
                    key={perk}
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-full border border-gray-300 bg-white cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    <input
                      type="checkbox"
                      value={perk}
                      checked={formState.perks.includes(perk)}
                      onChange={() => handleCheckboxChange("perks", perk)}
                      className="h-3 w-3 accent-green-500"
                    />
                    <span className="font-medium">{perk}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Live Summary */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 flex items-center justify-between">
                👀 Job Preview
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white border border-blue-600">
                  Live Preview
                </span>
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-bold text-lg text-blue-800 capitalize">
                  {formState.role.replace(/-/g, " ")}
                </p>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {formState.jobType === "development"
                      ? "💻 Development"
                      : formState.jobType === "design"
                      ? "🎨 Design"
                      : "⚡ Full-Stack"}
                  </p>
                  <p>
                    <span className="font-semibold">Level:</span>{" "}
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs font-bold">
                      {formState.level}
                    </span>{" "}
                    · <span className="font-semibold">Type:</span>{" "}
                    <span className="capitalize">{formState.employmentType.replace("-", " ")}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Work Mode:</span>{" "}
                    <span className="capitalize">{formState.workMode}</span> ·{" "}
                    <span className="font-semibold">Location:</span>{" "}
                    {formState.location.replace("-", " ")}
                  </p>
                  <p>
                    <span className="font-semibold">Salary:</span>{" "}
                    {formState.salaryRange === "negotiable"
                      ? "💰 Negotiable"
                      : `₹${formState.salaryRange} LPA`}
                  </p>
                  {formState.techStack.length > 0 && (
                    <p>
                      <span className="font-semibold">🛠️ Tech:</span>{" "}
                      {formState.techStack.join(", ")}
                    </p>
                  )}
                  {formState.designTools.length > 0 && (
                    <p>
                      <span className="font-semibold">🎨 Design:</span>{" "}
                      {formState.designTools.join(", ")}
                    </p>
                  )}
                  {formState.perks.length > 0 && (
                    <p>
                      <span className="font-semibold">✅ Perks:</span>{" "}
                      {formState.perks.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 border-t border-blue-200 pt-4">
                <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
                  Once you click{" "}
                  <span className="font-bold text-blue-800">
                    "Publish Job"
                  </span>
                  , this information will be visible on your careers page and shared with potential candidates.
                </p>
              </div>
            </section>

            {/* Submit */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-lg">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-lg">🚀</span>
                Publish Job
              </button>
              <p className="text-xs text-gray-500 text-center">
                You can edit or close this job later from the Jobs dashboard.
              </p>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default JobsPage;