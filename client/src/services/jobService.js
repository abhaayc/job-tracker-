const URL = "http://localhost:5000/jobs";

export async function getJobs() {
  const res = await fetch(URL);
  return res.json();
}

export async function createJob(job) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return res.json();
}

export async function deleteJob(id) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateJobStatus(id, status) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}