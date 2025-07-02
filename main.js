        function toggleProfileDropdown() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('active');
        }
    
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('profileDropdown');
            const profileSection = document.querySelector('.student-profile');
            if (!profileSection.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
        let chatHistory = [];
        let currentMenu = 'main';

        function toggleAssistant() {
            const container = document.getElementById('assistantContainer');
            container.style.display = container.style.display === 'flex' ? 'none' : 'flex';
        }

        function handleOption(option) {
            const chatMessages = document.getElementById('chatMessages');
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = option.replace('-', ' ');
            chatMessages.appendChild(userMessage);

            // Process option
            switch(option) {
                case 'study-material':
                    showStudyMaterialOptions();
                    break;
                case 'courses':
                    showCourseOptions();
                    break;
                case 'back':
                    showMainMenu();
                    break;
                // Add more cases as needed
            }

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showMainMenu() {
            const quickActions = document.getElementById('quickActions');
            quickActions.innerHTML = `
                <button class="action-btn" onclick="handleOption('study-material')">
                    Study Material
                </button>
                <button class="action-btn" onclick="handleOption('courses')">
                    Course Guidance
                </button>
                <button class="action-btn" onclick="handleOption('progress')">
                    Progress Tracking
                </button>
                <button class="action-btn" onclick="handleOption('settings')">
                    Account Help
                </button>
            `;
            currentMenu = 'main';
        }

        function showStudyMaterialOptions() {
            const chatMessages = document.getElementById('chatMessages');
            const quickActions = document.getElementById('quickActions');
            
            // Add assistant response
            const assistantMessage = document.createElement('div');
            assistantMessage.className = 'message assistant-message';
            assistantMessage.innerHTML = `
                Select your education level:
                <div style="margin-top: 10px">
                    <button class="action-btn" onclick="handleGradeSelection('kg')">KG</button>
                    <button class="action-btn" onclick="handleGradeSelection('1-10')">1st-10th</button>
                    <button class="action-btn" onclick="handleGradeSelection('11-12')">11th-12th</button>
                    <button class="action-btn" onclick="handleGradeSelection('Postgraduate')">Postgraduate</button>
                    <button class="action-btn" onclick="handleGradeSelection('Undergraduate')">Undergraduate</button>
                </div>
            `;
            chatMessages.appendChild(assistantMessage);


            // Update quick actions
            quickActions.innerHTML = `
                <button class="action-btn" onclick="handleOption('back')">
                    ← Back
                </button>
            `;
        }

        // Add more functions for different options

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            const assistantContainer = document.getElementById('assistantContainer');
            const trigger = document.querySelector('.assistant-trigger');
            
            if (!assistantContainer.contains(event.target) && 
                !trigger.contains(event.target)) {
                assistantContainer.style.display = 'none';
            }
        });
    // Search Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        const allResources = document.querySelectorAll('.resource-card, .course-card');
        const noResultsMessage = document.createElement('div');
        
        // Create no results message
        noResultsMessage.className = 'no-results';
        noResultsMessage.style.display = 'none';
        noResultsMessage.textContent = 'No matching resources found.';
        document.querySelector('.resource-grid').parentNode.appendChild(noResultsMessage);
    
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let hasMatches = false;
    
            allResources.forEach(resource => {
                const title = resource.querySelector('h3').textContent.toLowerCase();
                const description = resource.querySelector('p').textContent.toLowerCase();
                const matches = title.includes(searchTerm) || description.includes(searchTerm);
                
                resource.style.display = matches ? 'block' : 'none';
                if(matches) hasMatches = true;
            });
    
            // Show/hide no results message
            noResultsMessage.style.display = hasMatches ? 'none' : 'block';
        }
    
        // Event Listeners
        searchInput.addEventListener('input', function() {
            performSearch();
        });
    
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    
        // Allow Enter key
        searchInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    });
// Student Profile Data (You can fetch this from backend)
const studentData = {
    name: "Sarju Desai",
    email: "sarjudesai75@gmail.com",
    level: "Undergraduate",
    courses: 5,
    avatar: "sarju.jpeg"
};

// Profile Panel Functions
function showStudentProfile() {
    // Update profile data
    document.getElementById('profileName').textContent = studentData.name;
    document.getElementById('profileEmail').textContent = studentData.email;
    document.getElementById('profileLevel').textContent = studentData.level;
    document.getElementById('profileCourses').textContent = studentData.courses;
    document.querySelector('.profile-avatar img').src = studentData.avatar;

    // Show panel
    const panel = document.getElementById('studentProfilePanel');
    panel.classList.add('active');
    
    // Close profile dropdown
    document.getElementById('profileDropdown').classList.remove('active');
}

function closeProfile() {
    document.getElementById('studentProfilePanel').classList.remove('active');
}

// Close profile when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('studentProfilePanel');
    const profileBtn = document.querySelector('.student-profile');
    
    if (!panel.contains(event.target) && !profileBtn.contains(event.target)) {
        closeProfile();
    }
});

// Update the My Profile link in dropdown menu
document.querySelector('.dropdown-menu li:first-child a').onclick = function(e) {
    e.preventDefault();
    showStudentProfile();
};
// Chatbot Logic
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');

// Toggle Chatbot
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotContainer.classList.toggle('active');
}

// Send Message
function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chat
    addMessage(userMessage, 'user');

    // Process user message
    setTimeout(() => {
        const response = getResponse(userMessage);
        addMessage(response, 'assistant');
    }, 500); // Simulate a delay for the bot's response

    // Clear input
    chatbotInput.value = '';
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Add Message to Chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.innerHTML = message; // Use innerHTML to render links
    chatbotMessages.appendChild(messageElement);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get Response from Chatbot
function getResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello! How can I assist you today?";
    }

    if (lowerCaseMessage.includes('java')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('lkg')) {
        return "Here are some courses you might be interested in: <a href='lkg.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('ukg')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('10th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('1st')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('2nd')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('3rd')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('4th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('ai ds')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('6th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('7th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('8th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('9th')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('1st pu science')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('2nd pu science')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('1st pu commerce')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('2nd pu commerce')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('1st pu arts')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('2nd pu arts')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('engineering')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('business')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('arts')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('undergraduation')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('postgraduation')) {
        return "Here are some courses you might be interested in: <a href='java.html' target='_blank'>View Courses</a>";
    }

    if (lowerCaseMessage.includes('i want to logout')) {
        return "ok click logout: <a href='login.html' target='_blank'>log out</a>";
    }


    if (lowerCaseMessage.includes('python')) {
        return "You can find study resources here: <a href='python.html' target='_blank'>View Resources</a>";
    }

    if (lowerCaseMessage.includes('html')) {
        return "You can find study resources here: <a href='Html.html' target='_blank'>View Resources</a>";
    }

    if (lowerCaseMessage.includes('css')) {
        return "You can find study resources here: <a href='css.html' target='_blank'>View Resources</a>";
    }
    
    if (lowerCaseMessage.includes('javascript')) {
        return "You can find study resources here: <a href='javascript.html' target='_blank'>View Resources</a>";
    }

    if (lowerCaseMessage.includes('contact')) {
        return "You can contact us at support@edusphere.com.";
    }

    return "I'm sorry, I didn't understand that. Can you please rephrase?";
}