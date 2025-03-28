//to import  the hidden file that contain api-key 
import CONFIG from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const jobList = document.getElementById("job-list");

    //search only when you enter location and category of job
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const location = document.getElementById("location").value;
        const category = document.getElementById("category").value || "Software Engineer"; 
        const fulltime = document.getElementById("fulltime-checkbox").checked;
        const parttime = document.getElementById("parttime-checkbox").checked;

        //error when you search without enter location
        if (!location) {
            jobList.innerHTML = "<p class='error'>Please enter a location to search</p>";
            return;
        }
      //loading when you click on search jobs
        jobList.innerHTML = "<p>Searching jobs...</p>";
        
        try {
            const jobs = await fetchJobs(location, category, fulltime, parttime);
            displayJobs(jobs);
        } catch (error) {
            console.error("Search error:", error);
            jobList.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
        }
    });

    async function fetchJobs(location, category, fulltime, parttime) {
        //employment construct checkboxes
        let employmentTypes = [];
        if (fulltime) employmentTypes.push("fulltime");
        if (parttime) employmentTypes.push("parttime");
        
        //error if nothing selected
        if (employmentTypes.length === 0) {
            employmentTypes = ["fulltime", "parttime"];
        }

        //build querry according to what use ask for
        const query = `${category} in ${location}`;
        const params = new URLSearchParams({
            query: query,
            page: '1',
            num_pages: '1',
            date_posted: 'month',
            remote_jobs_only: location.toLowerCase() === 'remote',
            employment_types: employmentTypes.join(',')
        });
       //api  link and api-key section 
        const url = `https://jsearch.p.rapidapi.com/search?${params}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': CONFIG.API_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
       //error if api fail to fetch jobs
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`failed to fetch jobs: ${response.status}`);
        }
        return await response.json();
    }
    //error handling when api refuse all request all not working
    function displayJobs(jobs) {
        jobList.innerHTML = "";
        
        if (!jobs?.data?.length) {
            jobList.innerHTML = "<p>no job fund try other options</p>";
            return;
        }
           //job data section like company name , location and type of job
        jobs.data.forEach(job => {
            const jobItem = document.createElement("div");
            jobItem.classList.add("job-item");
            jobItem.innerHTML = `
                <h3>${job.job_title || 'No title'}</h3>
                <p><strong>Company:</strong> ${job.employer_name || 'Not specified'}</p>
                <p><strong>Location:</strong> ${job.job_city || ''} ${job.job_country || ''}</p>
                <p><strong>Type:</strong> ${job.job_employment_type || 'Not specified'}</p>
                <a href="${job.job_apply_link || '#'}" target="_blank" class="apply-btn">apply now</a>
            `;
            jobList.appendChild(jobItem);
        });
    }
    function clearsearch() {
        document.getElementById('category').innerHTML = "";
        document.getElementById('location').innerHTML = "";
        document.querySelector('.job-results').innerHTML = "";
    }
    document.getElementById('clear').addEventListener('click', function(){
        clearsearch();
    })
});