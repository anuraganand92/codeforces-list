document.addEventListener("DOMContentLoaded", function() {
    const problemsTable = document.getElementById('problemsTable');
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');

    let problems = [];
    let debounceTimer;

    fetch('https://codeforces.com/api/problemset.problems')
        .then(response => response.json())
        .then(jsonData => {
            problems = jsonData.result.problems;
            populateTable(problems);
        });

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProblems = filterProblems(searchTerm);
            populateTable(filteredProblems);
        }, 300); // Delay in milliseconds (adjust as needed)
    });

    function populateTable(problems) {
        tableBody.innerHTML = '';

        for (let i = 0; i < problems.length; i++) {
            const problem = problems[i];
            const tags = problem.tags ? problem.tags.map(tag => tag) : [];

            const row = document.createElement('tr');
            const contestIdCell = document.createElement('td');
            const indexCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const typeCell = document.createElement('td');
            const tagsCell = document.createElement('td');

            contestIdCell.textContent = problem.contestId;
            indexCell.textContent = problem.index;
            nameCell.textContent = problem.name;
            typeCell.textContent = problem.type;
            tagsCell.textContent = tags.join(', ');

            row.appendChild(contestIdCell);
            row.appendChild(indexCell);
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(tagsCell);

            tableBody.appendChild(row);
        }
    }

    function filterProblems(searchTerm) {
        if (searchTerm === '') {
            return problems;
        }

        return problems.filter(problem => {
            const tags = problem.tags ? problem.tags.map(tag => tag.toLowerCase()) : [];
            return tags.some(tag => tag.includes(searchTerm));
        });
    }
});
