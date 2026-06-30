import { useState, useRef, useEffect } from "react";


function AddJobModal({ open, onClose, onCreate }) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")

  const companyRef = useRef(null)
  const roleRef = useRef(null)

  if (!open) return null

    function handleSubmit() {
    const cleanCompany = company.trim()
    const cleanRole = role.trim()

    if (!cleanCompany || !cleanRole) {
      setError("Please fill both fields")
      return
    }

    onCreate({
      id: Date.now(),
      company: cleanCompany,
      role: cleanRole,
      status: "Applied",
    })

    setCompany("")
    setRole("")
    setError("")
    onClose()
  }

  function handleKeyDown(e, field) {
    setError("")

    // ⬇️ Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (field === "company") {
        roleRef.current?.focus()
      }
    }

    // ⬆️ Arrow Up
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (field === "role") {
        companyRef.current?.focus()
      }
    }

    // ⏎ Enter behavior
    if (e.key === "Enter") {
      e.preventDefault()

      if (field === "company") {
        roleRef.current?.focus()
        return
      }

      if (field === "role") {
        handleSubmit()
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl w-[420px]">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Job</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">

          <input
            ref={companyRef}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "company")}
            placeholder="Company"
            className="w-full p-3 rounded-xl bg-zinc-800"
          />

          <input
            ref={roleRef}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "role")}
            placeholder="Role"
            className="w-full p-3 rounded-xl bg-zinc-800"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full p-3 rounded-xl bg-white text-black"
          >
            Create
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddJobModal