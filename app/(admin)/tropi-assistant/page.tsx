'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, MessageCircle, Users, Target, Building2 } from 'lucide-react'

export default function TropiAssistantDemo() {
  const examples = [
    {
      title: "Add Contact",
      description: "Create a new contact with natural language",
      examples: [
        "Add contact John Doe, email john@example.com, phone +1-555-1234",
        "Create contact Sarah Smith from ABC Company, title Manager",
        "New contact Mike Wilson, email mike@xyz.com, island New Providence"
      ],
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Add Lead",
      description: "Create a new lead with source and value",
      examples: [
        "Add lead Jane Smith from XYZ Company, email jane@xyz.com, source website",
        "Create lead Bob Johnson, email bob@abc.com, value $25,000",
        "Add lead KJ Construction Co Ltd - Lower Bodue, Eleuthera - (242) 335-1092",
        "Add leads: ABC Construction - Nassau, New Providence - (242) 123-4567; XYZ Builders - Freeport, Grand Bahama - (242) 234-5678"
      ],
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Add Deal",
      description: "Create a new deal with company and value",
      examples: [
        "Add deal Construction Project for ABC Company, value $50,000",
        "Create deal Software Implementation for XYZ Corp, stage qualified",
        "New deal Website Redesign, company DEF Inc, value $75,000"
      ],
      icon: Building2,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">TropiAssistant Demo</h1>
          <p className="text-muted-foreground">AI-powered chatbot for CRM data entry</p>
        </div>
      </div>

      {/* Description */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            How to Use TropiAssistant
          </CardTitle>
          <CardDescription>
            TropiAssistant is an AI chatbot that can help you add contacts, leads, and deals to your CRM using natural language. 
            Look for the chat bubble in the bottom-right corner of any page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Step 1</Badge>
              <span>Click the chat bubble in the bottom-right corner</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Step 2</Badge>
              <span>Type your request in natural language</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Step 3</Badge>
              <span>The AI will parse your request and create the entry</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {examples.map((example, index) => {
          const IconComponent = example.icon
          return (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IconComponent className={`w-5 h-5 ${example.color}`} />
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {example.examples.map((ex, exIndex) => (
                    <div key={exIndex} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Example {exIndex + 1}:</p>
                      <p className="text-sm text-muted-foreground mt-1">"{ex}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>
            TropiAssistant understands natural language and can extract information from your requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Contact Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Name (first and last)</li>
                <li>• Email address</li>
                <li>• Phone number</li>
                <li>• Company name</li>
                <li>• Job title</li>
                <li>• Island location</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Lead Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• All contact information</li>
                <li>• Lead source</li>
                <li>• Estimated value</li>
                <li>• Description</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Deal Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Deal name</li>
                <li>• Company/client</li>
                <li>• Deal value</li>
                <li>• Stage/status</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">AI Capabilities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Natural language processing</li>
                <li>• Context understanding</li>
                <li>• Data validation</li>
                <li>• Error handling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">💡</Badge>
              <div>
                <p className="font-medium">Be specific</p>
                <p className="text-sm text-muted-foreground">Include as much information as possible in your request</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">💡</Badge>
              <div>
                <p className="font-medium">Use natural language</p>
                <p className="text-sm text-muted-foreground">Talk to the AI like you would talk to a person</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">💡</Badge>
              <div>
                <p className="font-medium">Include context</p>
                <p className="text-sm text-muted-foreground">Mention the company, source, or other relevant details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">💡</Badge>
              <div>
                <p className="font-medium">Ask for help</p>
                <p className="text-sm text-muted-foreground">Type "help" to see what the assistant can do</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 