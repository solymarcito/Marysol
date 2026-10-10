document.addEventListener('DOMContentLoaded', function() {
    const typingLeft = document.querySelectorAll('.typing-left');
    const typingRight = document.querySelector('.typing-right');
    const messages = document.querySelectorAll('.message');
    
    // Show first message after typing animation
    setTimeout(function() {
        typingLeft[0].classList.add('hidden');
        messages[0].style.display = 'block';
        
        // Show typing indicator on the right before second message
        setTimeout(function() {
            typingRight.classList.remove('hidden');
            
            // Show second message after typing animation
            setTimeout(function() {
                typingRight.classList.add('hidden');
                messages[1].style.display = 'block';
                
                // Show typing indicator on the left before third message
                setTimeout(function() {
                    typingLeft[1].classList.remove('hidden');
                    
                    // Show third message after typing animation
                    setTimeout(function() {
                        typingLeft[1].classList.add('hidden');
                        messages[2].style.display = 'block';
                        
                        // Fade out messages after last message
                        setTimeout(function() {
                            const messagesContainer = document.querySelector('.messages');
                            messagesContainer.classList.add('fade-out');
                            
                            // Hide messages after fade completes
                            setTimeout(function() {
                                messagesContainer.style.display = 'none';
                                window.location.href = 'desktop.html';
                            }, 500);
                        }, 1000);
                    }, 1500);
                }, 2000);
            }, 1500);
        }, 2000);
    }, 1500);
});

