// Simple in-memory database for comments
let comments = [];

// Function to add a new comment
function addComment() {
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentText');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (!name || !text) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    // Check for verified users
    const isVerified = name.toLowerCase() === 'snike' || name.toLowerCase() === 'rakanoot';
    const isGoldVerified = name.toLowerCase() === 'mak_sim';
    
    const comment = {
        name: name,
        text: text,
        verified: isVerified,
        goldVerified: isGoldVerified,
        date: new Date().toLocaleString()
    };
    
    comments.push(comment);
    displayComments();
    
    // Clear inputs
    nameInput.value = '';
    textInput.value = '';
}

// Function to display comments
function displayComments() {
    const commentsContainer = document.getElementById('commentsList');
    commentsContainer.innerHTML = '';
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        let verifiedBadge = '';
        if (comment.goldVerified) {
            verifiedBadge = '<span class="verified-badge gold"><i class="fas fa-check-circle"></i></span>';
        } else if (comment.verified) {
            verifiedBadge = '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>';
        }
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-name">${comment.name}</span>
                ${verifiedBadge}
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        `;
        
        commentsContainer.appendChild(commentElement);
    });
}

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});