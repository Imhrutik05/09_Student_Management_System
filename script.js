// This will hold our original, complete list of 100 students.
    // We keep it separate so we never lose the original data when we search or sort.
    let masterData = [];
    
    // This function's only job is to render a table based on the student data array it receives
    // This function takes an array of student objects...
    function renderTable(studentData) {
        const tbody = document.querySelector("tbody");
        let allRows = "";   // this will hold all the structure of table body along with data

        // ...and builds the HTML for the table rows
        studentData.forEach(student => {
            const fullName = `${student.first_name} ${student.last_name}`;
            allRows += `
                <tr>
                    <td class="id">${student.id}</td>
                    <td class="name"><img src="${student.img_src}" alt="${fullName}">${fullName}</td>
                    <td class="gender">${student.gender}</td>
                    <td class="class">${student.class}</td>
                    <td class="marks">${student.marks}</td>
                    <td class="passing">${student.passing ? "passing" : "failed"}</td>
                    <td class="email">${student.email}</td>
                </tr>
            `;
        });
        // Finally, it updates the table body with the new rows
        tbody.innerHTML = allRows;
    }

    // It runs when the page loads... this is our main data collection and initial UI rendering function
    async function setup(){
        // Fetching the student data from the provided URL
        const response = await fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json");
        const data = await response.json();

        // Store the fetched data in our masterData variable for later use
        masterData = data;

        // Perform the initial render of the table with the full, original data
        renderTable(masterData);

    }
    

    // ---- SEARCH FUNCITONALITY ----
    
    const searchInput = document.querySelector('input[type="text"]');
    const searchBtn = document.getElementById('searchBtn');

    // This function handles the actual filtering logic
    function handleSearch () {
        // first get the searchTerm (actual text)
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredData = masterData.filter((student) => {
            const fname = student.first_name.toLowerCase();
            const lname = student.last_name.toLowerCase();
            const email = student.email.toLowerCase();            
            return fname.includes(searchTerm) || 
                   lname.includes(searchTerm) || 
                   email.includes(searchTerm);
        });

        renderTable(filteredData);
    }
    
    // Add eventhandlers to both searchBtn and searchInput
    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("click", handleSearch);


    // ---- SORTING FUNCTIONALITY ----
    // 1 --> A to Z

    // take the sortAZ button
    const sortAZBtn = document.getElementById('a2z');

    // add event listener and write the logic inside an arrow function as a callback
    sortAZBtn.addEventListener("click", () => {
        
        // Created a copy of the masterData array using the spread operator (...)
        // This is imp so we don't permanently change the original order.
        const sortedData = [...masterData].sort((a,b) => {
            const nameA = `${a.first_name} ${a.last_name}`;
            const nameB = `${b.first_name} ${b.last_name}`;

            // localeCompare is the standard way to compare strings alphabetically
            return nameA.localeCompare(nameB);
        })

        // Render the table with the newly sorted data
        renderTable(sortedData);

    });


    // 2 --> Z to A
    const sortZABtn = document.getElementById('z2a');

    sortZABtn.addEventListener('click', () => {

        // create a copy of masterData using spread operator, so that we don't accedently modify the original data
        // then apply sort function on that
        const sortedData = [...masterData].sort((a,b) => {
            const nameA = `${a.first_name} ${a.last_name}`;
            const nameB = `${b.first_name} ${b.last_name}`;
            return nameB.localeCompare(nameA);
        });

        // Render the table with the newly sorted data
        renderTable(sortedData);

    });


    // 3 --> Sort By Marks (Ascending)
    const sortByMarksBtn = document.getElementById('sortByMarks');

    sortByMarksBtn.addEventListener("click", () => {

        const sortedData = [...masterData].sort((a,b) => a.marks - b.marks);

        // Render the table with the newly sorted data
        renderTable(sortedData);

    });


    // 4 --> Sort By Passing (show only results with stutus "passing")
    const sortByPassingBtn = document.getElementById('sortByPassing');

    sortByPassingBtn.addEventListener("click", sortByPassing);

    function sortByPassing(){
        const passingStudents = masterData.filter((student) => {
            return student.passing === true;
        });
        
        // render the table with the new data
        renderTable(passingStudents);

    }


    // 5 --> Sort By Class (Ascending)
    const sortByClassBtn = document.getElementById('sortByClass');

    sortByClassBtn.addEventListener("click", () => {

        const sortedData = [...masterData].sort((a,b) => a.class - b.class);

        // Render the table with the newly sorted data
        renderTable(sortedData);
        
    });


    // 6 --> Sort By Gender ()
    document.getElementById('sortByGender').addEventListener("click", sortByGender);
    function sortByGender() {
        const femaleStudents = masterData.filter(student => student.gender === 'Female');
        const maleStudents = masterData.filter(student => student.gender === 'Male');

        // Render female students first
        renderTable(femaleStudents);

        // Append male students below the first table
        const tbody = document.querySelector("tbody");
        let allRows = "";
        maleStudents.forEach(student => {
            const fullName = `${student.first_name} ${student.last_name}`;
            allRows += `
                <tr>
                    <td class="id">${student.id}</td>
                    <td class="name"><img src="${student.img_src}" alt="${fullName}">${fullName}</td>
                    <td class="gender">${student.gender}</td>
                    <td class="class">${student.class}</td>
                    <td class="marks">${student.marks}</td>
                    <td class="passing">${student.passing ? "passing" : "failed"}</td>
                    <td class="email">${student.email}</td>
                </tr>
            `;
        });
        tbody.innerHTML += allRows;
    }
    


    // run the setup function when the script loads
    setup();
