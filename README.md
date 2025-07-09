# AI Chatbot

A simple, modern chatbot interface that uses OpenAI's GPT models. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 🤖 Real-time chat with multiple OpenAI models
- 🎨 Modern, responsive UI design
- 🔧 Easy configuration with config.js file
- 📋 Model selection dropdown (GPT-3.5, GPT-4, GPT-4o, etc.)
- 💾 Model preference saved in browser
- ⌨️ Send messages with Enter key or button click
- 🔄 Loading animations and notifications
- 📱 Mobile-responsive design

## Available Models

- **GPT-3.5 Turbo**: Fast and cost-effective for most tasks
- **GPT-4**: More capable for complex reasoning
- **GPT-4 Turbo**: Latest and most capable GPT-4 model
- **GPT-4o**: Latest and fastest model with multimodal capabilities
- **GPT-4o Mini**: Fast and efficient for most use cases

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Create a new API key
5. Copy your API key (it starts with `sk-`)

### 2. Configure Your API Key

1. Open `config.js` in a text editor
2. Replace `'your-api-key-here'` with your actual OpenAI API key
3. Save the file

### 3. Run the Chatbot

1. Open `index.html` in your web browser
2. Select your preferred model from the dropdown
3. Start chatting immediately!

## File Structure

```
chatbot-project/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── config.js           # API key configuration
├── .gitignore          # Security: prevents sharing API keys
└── README.md           # This file
```

## How to Use

1. **Configure your API key**: Edit `config.js` and replace `'your-api-key-here'` with your actual OpenAI API key.

2. **Select a model**: Choose from the dropdown in the header:
   - **GPT-3.5 Turbo**: Best for general use, fast responses
   - **GPT-4**: Better for complex reasoning tasks
   - **GPT-4 Turbo**: Most capable, good for detailed analysis
   - **GPT-4o**: Latest model with multimodal capabilities
   - **GPT-4o Mini**: Fast and efficient for most tasks

3. **Start chatting**: Open `index.html` in your browser and start typing messages.

4. **Model preference**: Your selected model will be remembered for future sessions.

## Model Comparison

| Model | Speed | Capability | Cost | Best For |
|-------|-------|------------|------|----------|
| GPT-3.5 Turbo | Fast | Good | Low | General chat, quick responses |
| GPT-4 | Medium | Better | Medium | Complex reasoning, analysis |
| GPT-4 Turbo | Medium | Best | High | Detailed analysis, coding |
| GPT-4o | Fast | Excellent | Medium | Multimodal tasks, general use |
| GPT-4o Mini | Very Fast | Good | Low | Quick responses, efficiency |

## Security Notes

- Your API key is stored in the `config.js` file locally on your computer
- The key is never sent to any server other than OpenAI's API
- **Important**: Keep your `config.js` file secure and don't share it publicly
- Consider adding `config.js` to your `.gitignore` file if using version control
- Model preferences are stored locally in your browser

## Troubleshooting

### Common Issues

1. **"Please update your API key in config.js file"**
   - Make sure you've updated the API key in `config.js`
   - Verify the key starts with `sk-`

2. **"Error: Invalid API key"**
   - Verify your API key is correct and starts with `sk-`
   - Check that your OpenAI account has sufficient credits

3. **"Error: Rate limit exceeded"**
   - You've hit OpenAI's rate limits. Wait a moment and try again

4. **"Error: Insufficient credits"**
   - Add credits to your OpenAI account

5. **Model not available**
   - Some models may require specific access. Check your OpenAI account permissions.

### Browser Compatibility

This chatbot works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

You can customize the chatbot by modifying:

- **AI behavior**: Edit the system message in `script.js` (line 108)
- **Styling**: Modify `styles.css` to change colors, fonts, and layout
- **Available models**: Add or remove models from the dropdown in `index.html`
- **API key**: Update the key in `config.js`

## API Usage

The chatbot uses OpenAI's Chat Completions API with the following settings:
- Model: User-selected from dropdown
- Max tokens: 1000
- Temperature: 0.7

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please check the troubleshooting section above or refer to OpenAI's API documentation. 