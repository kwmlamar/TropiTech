'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Send, Bot, User, Loader2, X } from 'lucide-react'
import { useContacts, useLeads, useDeals } from '@/hooks/use-crm'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  data?: Record<string, unknown>
}

interface AssistantProps {
  className?: string
}

export function TropiAssistant({ className }: AssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm TropiAssistant, your AI helper for TropiTech CRM. I can help you add contacts, leads, deals, and more. What would you like to do?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { createContact } = useContacts()
  const { createLead } = useLeads()
  const { createDeal } = useDeals()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (type: 'user' | 'assistant', content: string, data?: Record<string, unknown>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      data
    }
    setMessages(prev => [...prev, newMessage])
  }

  const parseContactData = (text: string) => {
    const patterns = {
      name: /(?:name|called|is)\s+(?:is\s+)?([A-Za-z\s]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      email: /(?:email|e-mail)\s+(?:is\s+)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi,
      phone: /(?:phone|number|tel)\s+(?:is\s+)?([+]?[\d\s\-()]+)/gi,
      company: /(?:company|works\s+at|from)\s+(?:is\s+)?([A-Za-z\s&]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      title: /(?:title|position|job|role)\s+(?:is\s+)?([A-Za-z\s]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      island: /(?:island|location)\s+(?:is\s+)?([A-Za-z\s-]+?)(?:\s+(?:and|with|,|\.|$))/gi
    }

    const data: Record<string, string | number> = {}
    
    // Extract name
    const nameMatch = text.match(patterns.name)
    if (nameMatch) {
      const fullName = nameMatch[0].replace(/(?:name|called|is)\s+(?:is\s+)?/i, '').trim()
      const nameParts = fullName.split(' ')
      if (nameParts.length >= 2) {
        data.first_name = nameParts[0]
        data.last_name = nameParts.slice(1).join(' ')
      } else {
        data.first_name = fullName
      }
    }

    // Extract email
    const emailMatch = text.match(patterns.email)
    if (emailMatch) {
      data.email = emailMatch[1]
    }

    // Extract phone
    const phoneMatch = text.match(patterns.phone)
    if (phoneMatch) {
      data.phone = phoneMatch[1]
    }

    // Extract company
    const companyMatch = text.match(patterns.company)
    if (companyMatch) {
      data.company_name = companyMatch[1].trim()
    }

    // Extract title
    const titleMatch = text.match(patterns.title)
    if (titleMatch) {
      data.title = titleMatch[1].trim()
    }

    // Extract island
    const islandMatch = text.match(patterns.island)
    if (islandMatch) {
      data.island = islandMatch[1].trim().toLowerCase().replace(/\s+/g, '-')
    }

    return data
  }

  const parseLeadData = (text: string) => {
    const contactData = parseContactData(text)
    const patterns = {
      source: /(?:source|found|came\s+from)\s+(?:is\s+)?([A-Za-z\s]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      value: /(?:value|worth|estimated)\s+(?:is\s+)?(\$?[\d,]+)/gi,
      description: /(?:description|about|details)\s+(?:is\s+)?([^.]+)/gi,
      // New pattern for company - location - phone format
      companyLocationPhone: /(?:^|\s)([^-]+)\s*-\s*([^-]+)\s*-\s*\(?(\d{3})\)?\s*(\d{3})-(\d{4})$/i
    }

    const data: Record<string, string | number> = {}

    // Check for the specific format: "Company - Location - Phone"
    const companyLocationPhoneMatch = text.match(patterns.companyLocationPhone)
    if (companyLocationPhoneMatch) {
      const [, company, location, areaCode, prefix, suffix] = companyLocationPhoneMatch
      // Clean up company name by removing common prefixes
      let cleanCompany = company.trim()
      cleanCompany = cleanCompany.replace(/^(add|create|new)\s+lead\s+/i, '')
      data.company_name = cleanCompany
      data.island = location.trim().toLowerCase().replace(/\s+/g, '-')
      data.phone = `(${areaCode}) ${prefix}-${suffix}`
      data.contact_name = cleanCompany // Use company name as contact name for now
      data.source = 'other'
      return data
    }

    // Alternative: Check for the pattern anywhere in the text
    const companyLocationPattern = /([^-]+)\s*-\s*([^-]+)\s*-\s*\(?(\d{3})\)?\s*(\d{3})-(\d{4})/i
    const altMatch = text.match(companyLocationPattern)
    if (altMatch) {
      const [, company, location, areaCode, prefix, suffix] = altMatch
      // Clean up company name by removing common prefixes
      let cleanCompany = company.trim()
      cleanCompany = cleanCompany.replace(/^(add|create|new)\s+lead\s+/i, '')
      data.company_name = cleanCompany
      data.island = location.trim().toLowerCase().replace(/\s+/g, '-')
      data.phone = `(${areaCode}) ${prefix}-${suffix}`
      data.contact_name = cleanCompany // Use company name as contact name for now
      data.source = 'other'
      return data
    }

    // Map contact data to lead schema (existing logic)
    if (contactData.first_name && contactData.last_name) {
      data.contact_name = `${contactData.first_name} ${contactData.last_name}`
    } else if (contactData.first_name) {
      data.contact_name = contactData.first_name
    }

    if (contactData.email) data.email = contactData.email
    if (contactData.phone) data.phone = contactData.phone
    if (contactData.company_name) data.company_name = contactData.company_name
    if (contactData.island) data.island = contactData.island

    // Extract source
    const sourceMatch = text.match(patterns.source)
    if (sourceMatch) {
      data.source = sourceMatch[1].trim().toLowerCase()
    }

    // Extract value
    const valueMatch = text.match(patterns.value)
    if (valueMatch) {
      data.estimated_value = parseFloat(valueMatch[1].replace(/[$,]/g, ''))
    }

    // Extract description
    const descMatch = text.match(patterns.description)
    if (descMatch) {
      data.description = descMatch[1].trim()
    }

    return data
  }

  const parseDealData = (text: string) => {
    const patterns = {
      name: /(?:deal|opportunity|project)\s+(?:name|called|is)\s+(?:is\s+)?([A-Za-z\s]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      company: /(?:company|client)\s+(?:is\s+)?([A-Za-z\s&]+?)(?:\s+(?:and|with|,|\.|$))/gi,
      value: /(?:value|worth|amount)\s+(?:is\s+)?(\$?[\d,]+)/gi,
      stage: /(?:stage|status)\s+(?:is\s+)?([A-Za-z\s]+?)(?:\s+(?:and|with|,|\.|$))/gi
    }

    const data: Record<string, string | number> = {}

    // Extract deal name
    const nameMatch = text.match(patterns.name)
    if (nameMatch) {
      data.title = nameMatch[1].trim()
    }

    // Extract company - deals table uses company_id, so we'll store company name in description for now
    const companyMatch = text.match(patterns.company)
    if (companyMatch) {
      const companyName = companyMatch[1].trim()
      data.description = data.description ? `${data.description} - Company: ${companyName}` : `Company: ${companyName}`
    }

    // Extract value
    const valueMatch = text.match(patterns.value)
    if (valueMatch) {
      data.value = parseFloat(valueMatch[1].replace(/[$,]/g, ''))
    }

    // Extract stage
    const stageMatch = text.match(patterns.stage)
    if (stageMatch) {
      data.stage = stageMatch[1].trim().toLowerCase()
    }

    return data
  }

  const processUserInput = async (input: string) => {
    setIsProcessing(true)
    const lowerInput = input.toLowerCase()

    try {
      // Contact creation
      if (lowerInput.includes('add contact') || lowerInput.includes('new contact') || lowerInput.includes('create contact')) {
        const contactData = parseContactData(input)
        
        if (!contactData.first_name && !contactData.email) {
          addMessage('assistant', "I need more information to create a contact. Please provide at least a name or email address. For example: 'Add contact John Doe, email john@example.com, phone +1-555-1234'")
          return
        }

        const result = await createContact(contactData)
        
        if (result.error) {
          addMessage('assistant', `Sorry, I couldn't create the contact: ${result.error}`)
        } else {
          addMessage('assistant', `✅ Contact created successfully! I've added ${contactData.first_name || contactData.email} to your CRM.`, result.data)
        }
        return
      }

      // Lead creation (single or multiple)
      if (lowerInput.includes('add lead') || lowerInput.includes('new lead') || lowerInput.includes('create lead')) {
        // Check for multiple leads pattern
        const multipleLeadsPattern = /(?:add|create|new)\s+leads?\s*:\s*([\s\S]+)/i
        const multipleMatch = input.match(multipleLeadsPattern)
        
        if (multipleMatch) {
          // Handle multiple leads
          const leadsText = multipleMatch[1]
          // Split by semicolon or newline, but be more careful about commas
          const leadEntries = leadsText.split(/[;\n]/).filter(entry => entry.trim())
          
          if (leadEntries.length === 0) {
            addMessage('assistant', "I couldn't find any lead entries. Please provide leads in the format: 'Add leads: Company A - Location A - Phone A; Company B - Location B - Phone B'")
            return
          }

          let successCount = 0
          let errorCount = 0
          const results = []

          for (const entry of leadEntries) {
            const trimmedEntry = entry.trim()
            if (!trimmedEntry) continue

            const leadData = parseLeadData(trimmedEntry)
            
            if (!leadData.contact_name && !leadData.email) {
              errorCount++
              continue
            }

            try {
              const result = await createLead(leadData)
              if (result.error) {
                errorCount++
              } else {
                successCount++
                results.push(result.data)
              }
            } catch {
              errorCount++
            }
          }

          if (successCount > 0) {
            addMessage('assistant', `✅ Successfully created ${successCount} lead${successCount > 1 ? 's' : ''}! ${errorCount > 0 ? `${errorCount} failed.` : ''}`, { created_leads: results })
          } else {
            addMessage('assistant', `❌ Failed to create any leads. Please check the format and try again.`)
          }
          return
        }

        // Handle single lead (existing logic)
        const leadData = parseLeadData(input)
        
        if (!leadData.contact_name && !leadData.email) {
          addMessage('assistant', "I need more information to create a lead. Please provide at least a name or email address. For example: 'Add lead John Doe from ABC Company, email john@abc.com, source website'")
          return
        }

        const result = await createLead(leadData)
        
        if (result.error) {
          addMessage('assistant', `Sorry, I couldn't create the lead: ${result.error}`)
        } else {
          addMessage('assistant', `✅ Lead created successfully! I've added ${leadData.contact_name || leadData.email} to your pipeline.`, result.data)
        }
        return
      }

      // Deal creation
      if (lowerInput.includes('add deal') || lowerInput.includes('new deal') || lowerInput.includes('create deal')) {
        const dealData = parseDealData(input)
        
        if (!dealData.title) {
          addMessage('assistant', "I need more information to create a deal. Please provide a deal name. For example: 'Add deal Construction Project for ABC Company, value $50,000'")
          return
        }

        const result = await createDeal(dealData)
        
        if (result.error) {
          addMessage('assistant', `Sorry, I couldn't create the deal: ${result.error}`)
        } else {
          addMessage('assistant', `✅ Deal created successfully! I've added ${dealData.title} to your pipeline.`, result.data)
        }
        return
      }

      // Help command
      if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
        addMessage('assistant', `I can help you with these tasks:

📝 **Add Contacts**: "Add contact John Doe, email john@example.com, phone +1-555-1234, company ABC Corp, title Manager"

🎯 **Add Leads**: 
  • Single: "Add lead Sarah Smith from XYZ Company, email sarah@xyz.com, source website, value $25,000"
  • Single: "Add lead KJ Construction Co Ltd - Lower Bodue, Eleuthera - (242) 335-1092"
  • Multiple: "Add leads: Company A - Location A - Phone A; Company B - Location B - Phone B (use semicolon or newline to separate)"

💼 **Add Deals**: "Add deal Construction Project for ABC Company, value $50,000, stage qualified"

Just tell me what you'd like to do in natural language!`)
        return
      }

      // Default response
      addMessage('assistant', "I'm not sure how to help with that. Try saying 'help' to see what I can do, or ask me to add a contact, lead, or deal.")

    } catch {
      addMessage('assistant', 'Sorry, something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    const userInput = inputValue.trim()
    setInputValue('')
    addMessage('user', userInput)
    
    await processUserInput(userInput)
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-96 max-h-[600px] ${className}`}>
      <Card className="shadow-xl border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">TropiAssistant</CardTitle>
              <Badge variant="secondary" className="text-xs">AI</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.data && (
                    <div className="mt-2 p-2 bg-background/50 rounded text-xs">
                      <p className="font-medium">Created:</p>
                      <pre className="whitespace-pre-wrap">{JSON.stringify(message.data, null, 2)}</pre>
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isProcessing}
                className="flex-1"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputValue.trim() || isProcessing}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 