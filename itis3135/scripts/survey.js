document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('introForm');
    const coursesContainer = document.getElementById('coursesContainer');
    const addCourseBtn = document.getElementById('addCourse');
    const resultsDiv = document.getElementById('results');

    const displayResults = (imageData) => {
        const formData = new FormData(form);
        
        let html = `
            <section>
                <h3>Your Introduction Page</h3>
                <figure class="image-container">
                    ${imageData ? `<img src="${imageData}" alt="${formData.get('caption')}">` : ''}
                    <figcaption class="subtitle"><i>${formData.get('caption')}</i></figcaption>
                </figure>
                
                <section>
                    <h3>About You</h3>
                    <p><strong>Personal Background:</strong> ${formData.get('personal')}</p>
                    <p><strong>Professional Background:</strong> ${formData.get('professional')}</p>
                    <p><strong>Academic Background:</strong> ${formData.get('academic')}</p>
                    <p><strong>Background in Web Development:</strong> ${formData.get('webdev')}</p>
                    <p><strong>Primary Computer Platform:</strong> ${formData.get('platform')}</p>
                </section>
                
                <section>
                    <h3>Courses You're Taking</h3>
                    <ul>
        `;
        
        formData.getAll('course[]').forEach((course) => {
            if (course.trim() !== '') {
                html += `<li>${course}</li>`;
            }
        });
        
        html += `
                    </ul>
                </section>
                
                <section>
                    <h3>Fun Facts</h3>
                    <p><strong>Funny/Interesting Item:</strong> ${formData.get('funny')}</p>
                    <p><strong>Anything Else:</strong> ${formData.get('anything')}</p>
                </section>
                
                <p><a href="#" id="resetForm">Create Another Introduction</a></p>
            </section>
        `;
        
        resultsDiv.innerHTML = html;
        form.style.display = 'none';
        
        document.getElementById('resetForm').addEventListener('click', (e) => {
            e.preventDefault();
            form.reset();
            form.style.display = 'block';
            resultsDiv.innerHTML = '';
        });
    };

    const generateIntroPage = () => {
        const formData = new FormData(form);
        const reader = new FileReader();
        
        if (document.getElementById('image').files.length > 0) {
            reader.readAsDataURL(document.getElementById('image').files[0]);
            reader.onload = () => {
                displayResults(reader.result);
            };
        } else {
            displayResults(null);
        }
    };

    addCourseBtn.addEventListener('click', () => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-entry';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'course';
        input.name = 'course[]';
        input.required = true;
        input.placeholder = "e.g., ITIS3135 - Web Design";
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            courseDiv.remove();
        });
        
        courseDiv.appendChild(input);
        courseDiv.appendChild(deleteBtn);
        coursesContainer.appendChild(courseDiv);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const imageInput = document.getElementById('image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a JPG or PNG image');
                return;
            }
        }
        
        generateIntroPage();
    });
});