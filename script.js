class Chatbot {
    constructor() {
        this.apiKey = CONFIG.OPENAI_API_KEY;
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.modelSelect = document.getElementById('modelSelect');
        
        this.initializeEventListeners();
        this.validateApiKey();
        this.loadModelPreference();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Enable/disable send button based on input
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = !this.messageInput.value.trim();
        });
        
        // Save model preference when changed
        this.modelSelect.addEventListener('change', () => {
            this.saveModelPreference();
        });
    }
    
    loadModelPreference() {
        const savedModel = localStorage.getItem('selected_model');
        if (savedModel) {
            this.modelSelect.value = savedModel;
        }
    }
    
    saveModelPreference() {
        localStorage.setItem('selected_model', this.modelSelect.value);
    }
    
    validateApiKey() {
        if (!this.apiKey || this.apiKey === 'your-api-key-here') {
            this.showNotification('Please update your API key in config.js file.', 'error');
            this.sendButton.disabled = true;
            this.messageInput.disabled = true;
            this.messageInput.placeholder = 'API key not configured';
        }
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        if (!this.apiKey || this.apiKey === 'your-api-key-here') {
            this.showNotification('Please configure your OpenAI API key in config.js file.', 'error');
            return;
        }
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        // Show loading message
        const loadingMessage = this.addLoadingMessage();
        
        try {
            const response = await this.callOpenAI(message);
            this.removeLoadingMessage(loadingMessage);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeLoadingMessage(loadingMessage);
            this.addMessage(`Error: ${error.message}`, 'bot');
        }
    }
    
    async callOpenAI(message) {
        const selectedModel = this.modelSelect.value;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        
        messageContent.appendChild(paragraph);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    addLoadingMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.id = 'loading-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = `
            <span>AI is thinking</span>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messageContent.appendChild(loadingDiv);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
        return messageDiv;
    }
    
    removeLoadingMessage(loadingMessage) {
        if (loadingMessage && loadingMessage.parentNode) {
            loadingMessage.parentNode.removeChild(loadingMessage);
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            default:
                notification.style.background = '#3b82f6';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 