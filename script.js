import CONFIG from "./config.js"
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const jobList = document.getElementById("job-list");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        jobList.innerHTML = "<p>searching jobs ......</p>";

        const location = document.getElementById("location").value;
        const category = document.getElementById("category").value;
        const fulltime = document.getElementById("fulltime-checkbox").checked;
        const parttime = document.getElementById("parttime-checkbox").checked;

        const jobs = await fetchJobs(location, category, fulltime, parttime);
        displayJobs(jobs);
    });

    async function fetchJobs(location, category, fulltime, parttime) {
        const query = `${category} jobs in ${location}`;
        const url = `https://jsearch.p.rapidapi.com/search?query=software%20engineer&page=2&num_pages=3&date_posted=month&work_from_home=true&employment_types=FULLTIME%2C%20CONTRACTOR%2C%20PARTTIME%2C%20INTERN&job_requirements=under_3_years_experience%2C%20more_than_3_years_experience%2C%20no_experience%2C%20no_degree`; // Page 1

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'jsearch.p.rapidapi.com', // Removed trailing space
                'x-rapidapi-key': CONFIG.API_KEY
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.status}`);
            const data = await response.json();
            console.log(data); // Inspect the data
            return data;
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return { data: [] }; 
        }
    }

    function displayJobs(jobs) {
        jobList.innerHTML = "";
        if (!jobs || !jobs.data || jobs.data.length === 0) {
            jobList.innerHTML = "<p>there is no job found  so wait moment or try other option</p>";
            return;
        }

        jobs.data.forEach(job => {
            const jobItem = document.createElement("div");
            jobItem.classList.add("job-item");
            jobItem.innerHTML = `
                <h3>${job.job_title}</h3>
                <p><strong>Company:</strong> ${job.employer_name || 'N/A'}</p>
                
                <p><strong>Type:</strong> ${job.job_employment_type || 'N/A'}</p>
                <a href="${job.job_apply_link}" target="_blank">Apply now</a>
            `;
            jobList.appendChild(jobItem);
        });
    }
});