document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');

    // Run active data collection handshake sequence with the local system service
    fetch('http://localhost:5000/api/projects')
        .then(response => {
            if (!response.ok) throw new Error('API interface offline.');
            return response.json();
        })
        .then(projectsArray => {
            projectsGrid.innerHTML = ''; // Dismiss the terminal parsing string

            projectsArray.forEach(project => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('project-card');

                cardDiv.innerHTML = `
                    <div>
                        <span class="tech-tags">// SYSTEM MODULE :: ${project.tech_stack || 'CORE ENVIRONMENT'}</span>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                    <a href="${project.live_url || '#'}" target="_blank" class="live-link">Execute Protocol &rarr;</a>
                `;

                projectsGrid.appendChild(cardDiv);
            });
        })
        .catch(err => {
            console.error(err);
            projectsGrid.innerHTML = `
                <p style="color: #ef4444; font-family: 'CommitMono', monospace; font-size: 0.9rem;">
                    > [CRITICAL EXCEPTION] Connection timed out. Validate backend system runtime via "node server.js".
                </p>`;
        });
});