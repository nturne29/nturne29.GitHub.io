document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        {
            letter: "N",
            item: "Necklace",
            desc: "First letter in 'Nik'",
            src: "images/slideshow/necklace.jpg"
        },
        {
            letter: "I",
            item: "Ice",
            desc: "Second letter in 'Nik'",
            src: "images/slideshow/ice.jpg"
        },
        {
            letter: "K",
            item: "Kettle",
            desc: "Third letter in 'Nik'",
            src: "images/slideshow/kettle.jpg"
        },
        {
            letter: "T",
            item: "Telescope",
            desc: "First letter in 'Turner'",
            src: "images/slideshow/telescope.jpg"
        },
        {
            letter: "U",
            item: "Ukulele",
            desc: "Second letter in 'Turner'",
            src: "images/slideshow/ukulele.jpg"
        },
        {
            letter: "R",
            item: "Rose",
            desc: "Third letter in 'Turner'",
            src: "images/slideshow/rose.jpg"
        },
        {
            letter: "N",
            item: "Notebook",
            desc: "Fourth letter in 'Turner'",
            src: "images/slideshow/notebook.jpg"
        },
        {
            letter: "E",
            item: "Earrings",
            desc: "Fifth letter in 'Turner'",
            src: "images/slideshow/earrings.jpg"
        },
        {
            letter: "R",
            item: "Raspberry",
            desc: "Sixth letter in 'Turner'",
            src: "images/slideshow/raspberry.jpg"
        }
    ];

    const container = document.querySelector('.slideshow-container');
    const thumbRow = document.querySelector('.thumbnail-row');
    let currentSlide = 0;

    const showSlide = (n) => {
        const slideElements = document.getElementsByClassName('mySlides');
        const thumbs = document.getElementsByClassName('thumbnail');
        
        if (n >= slideElements.length) n = 0;
        if (n < 0) n = slideElements.length - 1;
        
        for (let i = 0; i < slideElements.length; i++) {
            slideElements[i].style.display = 'none';
            thumbs[i].classList.remove('active');
        }
        
        slideElements[n].style.display = 'block';
        thumbs[n].classList.add('active');
        currentSlide = n;
    };

    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'mySlides';
        slideDiv.innerHTML = `
            <div class="slide-image-container">
                <img src="${slide.src}" alt="${slide.item}">
            </div>
            <div class="caption">${slide.letter} - ${slide.item} (${slide.desc})</div>
        `;
        container.appendChild(slideDiv);

        const thumb = document.createElement('img');
        thumb.src = slide.src;
        thumb.alt = slide.item;
        thumb.className = 'thumbnail';
        thumb.addEventListener('click', () => {
            showSlide(index);
        });
        thumbRow.appendChild(thumb);
    });

    const prev = document.createElement('a');
    prev.className = 'prev';
    prev.innerHTML = '❮';
    prev.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    container.appendChild(prev);

    const next = document.createElement('a');
    next.className = 'next';
    next.innerHTML = '❯';
    next.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    container.appendChild(next);

    showSlide(0);

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});
