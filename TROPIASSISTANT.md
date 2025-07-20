# TropiAssistant - AI Chatbot for CRM

TropiAssistant is an AI-powered chatbot that helps you add contacts, leads, and deals to your TropiTech CRM using natural language commands.

## 🚀 Features

- **Natural Language Processing**: Understands conversational commands
- **Contact Management**: Add contacts with names, emails, phones, companies, titles, and locations
- **Lead Management**: Create leads with sources, values, and descriptions
- **Deal Management**: Add deals with companies, values, and stages
- **Real-time Feedback**: Shows created data and confirmation messages
- **Error Handling**: Provides helpful error messages and suggestions

## 📍 How to Access

The TropiAssistant is available on every page of your TropiTech CRM:

1. Look for the chat bubble icon in the bottom-right corner
2. Click to open the chat interface
3. Type your request in natural language
4. The AI will process your request and create the entry

## 💬 Example Commands

### Adding Contacts
```
Add contact John Doe, email john@example.com, phone +1-555-1234
Create contact Sarah Smith from ABC Company, title Manager
New contact Mike Wilson, email mike@xyz.com, island New Providence
```

### Adding Leads
```
# Single Lead
Add lead Jane Smith from XYZ Company, email jane@xyz.com, source website
Create lead Bob Johnson, email bob@abc.com, value $25,000
Add lead KJ Construction Co Ltd - Lower Bogue, Eleuthera - (242) 335-1092

# Multiple Leads
Add leads: ABC Construction - Nassau, New Providence - (242) 123-4567; XYZ Builders - Freeport, Grand Bahama - (242) 234-5678

### Adding Deals
```
Add deal Construction Project for ABC Company, value $50,000
Create deal Software Implementation for XYZ Corp, stage qualified
New deal Website Redesign, company DEF Inc, value $75,000
```

## 🔧 Technical Details

### Supported Fields

**Contacts:**
- First and last name
- Email address
- Phone number
- Company name
- Job title
- Island location

**Leads:**
- All contact fields
- Lead source
- Estimated value
- Description

**Deals:**
- Deal name
- Company/client
- Deal value
- Stage/status

### Natural Language Processing

The chatbot uses regex patterns to extract information from natural language:

- **Names**: "name is", "called", "is [name]"
- **Emails**: "email is", "e-mail"
- **Phones**: "phone is", "number is", "tel"
- **Companies**: "company is", "works at", "from"
- **Titles**: "title is", "position is", "job is", "role is"
- **Islands**: "island is", "location is"
- **Sources**: "source is", "found", "came from" (defaults to 'other' for manual entries)
- **Values**: "value is", "worth", "estimated"
- **Stages**: "stage is", "status is"

## 🎯 Use Cases

### Quick Data Entry
Instead of filling out forms, simply tell the AI what you want to add:
```
"Add contact John from ABC Construction, he's a project manager, email john@abc.com"
```

### Batch Operations
You can add multiple pieces of information in one command:
```
"Add lead Sarah from XYZ Corp, email sarah@xyz.com, phone +1-555-9876, source website, value $30,000"
```

### Context-Aware
The AI understands context and can handle variations:
```
"Create a new contact for Bob Wilson who works at DEF Company as a supervisor"
```

## 🛠️ Development

### Component Structure
- `TropiAssistant` - Main chatbot component
- `parseContactData()` - Extracts contact information
- `parseLeadData()` - Extracts lead information  
- `parseDealData()` - Extracts deal information
- `processUserInput()` - Main processing logic

### Integration Points
- Uses existing CRM hooks (`useContacts`, `useLeads`, `useDeals`)
- Integrates with existing database functions
- Follows existing error handling patterns

### Adding New Features

To add support for new entity types:

1. Create a new parse function (e.g., `parseCompanyData()`)
2. Add regex patterns for the new fields
3. Add processing logic in `processUserInput()`
4. Update the help message with examples

## 🎨 UI/UX Features

- **Floating Chat Bubble**: Always accessible
- **Conversation History**: Maintains chat context
- **Loading States**: Shows processing feedback
- **Success Confirmations**: Displays created data
- **Error Messages**: Helpful error guidance
- **Responsive Design**: Works on all screen sizes

## 🔮 Future Enhancements

- **Voice Input**: Speech-to-text capabilities
- **Advanced NLP**: More sophisticated language understanding
- **Bulk Operations**: Add multiple entries at once
- **Integration**: Connect with TropiBrain for insights
- **Analytics**: Track usage patterns and improvements

## 📱 Demo Page

Visit `/admin/tropi-assistant` to see examples and learn how to use the chatbot effectively.

---

*TropiAssistant is part of the TropiTech AI suite, designed to make CRM data entry faster and more intuitive.* 