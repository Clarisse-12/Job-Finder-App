Job Finder Application

## Overview
This Job Finder Application is designed to help job seekers easily search for jobs and apply without navigating multiple job websites. It provides a seamless experience for users to find job opportunities, build resumes, and prepare for interviews.

## Features
1. Easy Job Search: Users can enter their desired job type and location to get relevant job listings within seconds.
2. Simplified Application Process: The app allows users to directly access job applications from search results.
3. Career Resources: Users can learn how to:
   - Build an effective resume
   - Prepare for job interviews
   - Follow key steps for job applications

## PART ONE OF PROJECT
Technologies Used
- HTML: Used to structure the web pages.
- CSS: Applied for styling and ensuring a responsive, user-friendly design.
- JavaScript: Integrated to fetch job listings from an external job search API.
- Rapid API: Used to fetch job listings from APIs such as: [JSearchAPI]https://rapidapi.com/search?term=jsearch&sortBy=ByRelevance

  

 ## How It Works
1. User Input: Users enter the job type and location.
2. API Request: The app sends a request to the job search API.
3. Display Results: Job listings are displayed within seconds.
4. Job Application: Users can apply directly from the results page.


## How to Run the Project
1. Clone this repository:
   ```bash
   git clone https://github.com/Clarisse-12/job-finder-app.git

## directory structure

JOB-FINDER-APP/
├── index.html
├── style.css
├── script.js
└── README.md

** PART TWO **
    
    
 ## Demo video
https://youtu.be/wZIgsZbkuiU
## deployment Process

1. first all i start with copy my work from desktop to servers where i use to save it while i was working my project on visual studio code here is the code i use to copy:
   - $ scp -r <application_directory> user@Web01:/var/www/html/
2. then after to copy my work i start to edit my configirution file of web01 and web02
here is how it's look:
  - server {
    listen 80;
    server_name your domain name www.your domain name;
    error_page 404 /404.html;
    add_header X-Served-By $hostname;

    location = /404.html {
        root /var/www/html;
    }

    location / {
	directory path;
    }

    location /redirect_me {
        return 301 https://www.youtube.com/watch?v=dQw4w9WgXcQ;
    }
}

server {
    listen 80;
    server_name your domain name;
    add_header X-Served-By $hostname;

    location / {
        your work directory;
    }
}

3. after to edit my web servers i start to edit my configuration file of l01 
The load balancer (Lb01) was configured to distribute traffic between Web01 and Web02 using the following steps:
  -install  and configure load balancer software: then i choose to use haproxy, For HAProxy, the configuration was done in /etc/haproxy/haproxy.cfg
  here example of haproxy file 
          frontend http-in
            bind *:80
            bind *:443 ssl crt /etc/letsencrypt/live/www.aziza24.tech/ca.pem
        mode http
            default_backend servers

        backend servers
            balance roundrobin
            server web01 <Web01_IP_Address>:80 check
            server web02 <Web02_IP_Address>:80 check
        
    * Example Nginx configuration:
        
        http {
            upstream backend {
                server <Web01_IP_Address>:80;
                server <Web02_IP_Address>:80;
 }

            server {
                listen 80;
                location / {
                    proxy_pass http://backend;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }
            }
        }
     testing 
     I try to access my application by using my domain name .
