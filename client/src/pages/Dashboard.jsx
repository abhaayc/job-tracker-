import { useEffect, useState } from "react";

import StatsCard from "../components/StatsCard";
import AddJobModal from "../components/AddJobModal";
import JobList from "../components/JobList";

import {
  getJobs,
  createJob,
  deleteJob,
  updateJobStatus,
} from "../services/jobService";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const data = await getJobs();
    setJobs(data);
  }

  async function addJob(job) {
    const created = await createJob(job);
    setJobs((prev) => [created, ...prev]);
  }

  async function removeJob(id) {
    await deleteJob(id);
    setJobs((prev) => prev.filter((job) => job.id !== id));

    if (selectedJobId === id) {
      setSelectedJobId(null);
    }
  }

  async function changeStatus(id, status) {
    const updatedJob = await updateJobStatus(id, status);

    setJobs((prev) =>
      prev.map((job) => (job.id === id ? updatedJob : job))
    );
  }

  function filterJobs(type) {
    setFilter(type);
  }

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((j) => j.status === filter);

  useEffect(() => {
    function handleKeyDown(e) {
      const tag = e.target.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "Escape") {
        setOpen(false);
        setSelectedJobId(null);
        return;
      }

      if (isTyping) return;

      const key = e.key.toLowerCase();

      if (e.altKey) {
        e.preventDefault();

        switch (key) {
          case "n":
            setOpen(true);
            break;

          case "1":
            filterJobs("All");
            break;

          case "2":
            filterJobs("Interview");
            break;

          case "3":
            filterJobs("Offer");
            break;

          case "4":
            filterJobs("Rejected");
            break;

          case "d":
            if (selectedJobId) {
              removeJob(selectedJobId);
            }
            break;

          default:
            break;
        }
      }

      if (key === "arrowdown" || key === "arrowup") {
        if (jobs.length === 0) return;

        const currentIndex = jobs.findIndex(
          (j) => j.id === selectedJobId
        );

        let nextIndex = 0;

        if (key === "arrowdown") {
          nextIndex =
            currentIndex < jobs.length - 1
              ? currentIndex + 1
              : 0;
        }

        if (key === "arrowup") {
          nextIndex =
            currentIndex > 0
              ? currentIndex - 1
              : jobs.length - 1;
        }

        setSelectedJobId(jobs[nextIndex].id);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [jobs, selectedJobId]);

  const stats = [
    { title: "Total", value: jobs.length },
    {
      title: "Interviews",
      value: jobs.filter((j) => j.status === "Interview").length,
    },
    {
      title: "Offers",
      value: jobs.filter((j) => j.status === "Offer").length,
    },
    {
      title: "Rejected",
      value: jobs.filter((j) => j.status === "Rejected").length,
    },
  ];

  return (
    <section className="min-h-screen bg-zinc-950 text-white max-w-5xl mx-auto px-4 py-8">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Dashboard</h2>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition"
        >
          + Add Job
        </button>
      </div>

       <p className="text-zinc-800/20 hover:text-zinc-400/60 text-sm mb-4 transition">
        Shortcuts: Alt+N (new), Alt+1-4 (filters), Esc (close)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <JobList
        jobs={filteredJobs}
        onDelete={removeJob}
        onStatusChange={changeStatus}
        selectedJobId={selectedJobId}
        onSelectJob={setSelectedJobId}
      />

      <AddJobModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={addJob}
      />
    </section>
  );
}

export default Dashboard;