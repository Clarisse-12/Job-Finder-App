document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const jobList = document.getElementById("job-list");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        jobList.innerHTML = "<p>Searching for jobs...</p>";

        const Location = document.getElementById("Location").value;
        const Category = document.getElementById("Category").value;
        const Remote = document.getElementById("Remote-checkbox").checked;
        const Onsite = document.getElementById("Onsite-checkbox").checked;

        const jobs = await fetchJobs(location, category, remote, onsite);
        displayJobs(jobs);
    });

    async function fetchJobs(location, category, remote, onsite) {
        const url = `https://active-jobs-db.p.rapidapi.com/active-ats-expired?q=${encodeURIComponent(category)}&l=${encodeURIComponent(location)}&remote=${remote}&onsite=${onsite}&format=json`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-host": "active-jobs-db.p.rapidapi.com",
                "x-rapidapi-key": "",
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Failed to fetch jobs");
            return await response.json();
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return [];
        }
    }

    function displayJobs(jobs) {
        jobList.innerHTML = "";
        if (jobs.length === 0) {
            jobList.innerHTML = "<p>No jobs found. Try a different search.</p>";
            return;
        }

        jobs.forEach(job => {
            const jobItem = document.createElement("div");
            jobItem.classList.add("job-item");
            jobItem.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Type:</strong> ${job.remote ? "Remote" : "On-site"}</p>
                <a href="${job.url}" target="_blank">Apply Now</a>
            `;
            jobList.appendChild(jobItem);
        });
    }
});