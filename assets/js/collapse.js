// Panel collapse functionality
const panelHeading = document.querySelectorAll('.panel-heading');
const panelBody = document.querySelectorAll('.panel-body');

// Loop through headings to build event listeners
for (var i = 0, len = panelHeading.length; i < len; i++) {
    panelHeading[i].addEventListener('click', function(e) {
        // Set a variable for the heading that matched the one clicked
        const selectedDiv = document.querySelector('[data-body="' + e.target.dataset.toggle + '"]');
        
        // For each heading also loop through all bodies
        for (var i = 0, len = panelBody.length; i < len; i++) {
            // If the body does not belong to the heading that was clicked then close it
            if (panelBody[i].dataset.body != e.target.dataset.toggle) {
                panelBody[i].style.height = 0;
                panelHeading[i].className = 'panel-heading';
            }
        }
        
        // Change the height of the body of the clicked heading to collapse or expand it
        if (selectedDiv.clientHeight) {
            selectedDiv.style.height = 0;
        } else {
            selectedDiv.style.height = selectedDiv.scrollHeight + "px";
        }
        
        // Toggle the hover class on the clicked heading
        document.querySelector('[data-toggle="' + e.target.dataset.toggle + '"]').classList.toggle('panel-heading-hover');
    });
}

// Sequential news timeline functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle current year expansion
    const currentYearToggle = document.querySelector('.current-year-toggle');
    const firstPreviousYearBtn = document.querySelector('.expand-year-btn');
    
    if (currentYearToggle) {
        currentYearToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            const showMore = this.querySelector('.show-more');
            const showLess = this.querySelector('.show-less');
            
            if (targetElement && showMore && showLess) {
                if (targetElement.classList.contains('show')) {
                    // Collapsing current year - hide previous year button
                    targetElement.classList.remove('show');
                    showMore.style.display = 'inline';
                    showLess.style.display = 'none';
                    this.setAttribute('aria-expanded', 'false');
                    
                    // Hide first previous year button
                    if (firstPreviousYearBtn) {
                        firstPreviousYearBtn.style.display = 'none';
                    }
                } else {
                    // Expanding current year - show previous year button
                    targetElement.classList.add('show');
                    showMore.style.display = 'none';
                    showLess.style.display = 'inline';
                    this.setAttribute('aria-expanded', 'true');
                    
                    // Show first previous year button
                    if (firstPreviousYearBtn) {
                        firstPreviousYearBtn.style.display = 'inline-block';
                    }
                }
            }
        });
    }
    
    // Handle "Show [year]" buttons for previous years
    const expandYearButtons = document.querySelectorAll('.expand-year-btn');
    
    expandYearButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            const year = this.getAttribute('data-year');
            
            if (targetElement) {
                // Show the target year
                targetElement.classList.add('show');
                
                // Hide this button
                this.style.display = 'none';
                
                // Find and show the next year button if it exists
                const nextYear = parseInt(year) - 1;
                const nextButton = document.querySelector(`.expand-year-btn[data-year="${nextYear}"]`);
                if (nextButton) {
                    nextButton.style.display = 'inline-block';
                }
            }
        });
    });
});