'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X } from 'lucide-react'
import { useContacts } from '@/hooks/use-crm'
import { toast } from 'sonner'

interface AddContactDialogProps {
  onContactAdded?: () => void
}

export function AddContactDialogSimple({ onContactAdded }: AddContactDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { createContact } = useContacts()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    title: '',
    island: '',
    contact_type: 'prospect',
    company_name: '',
    notes: '',
    linkedin_url: '',
    twitter_handle: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await createContact(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Contact added successfully!')
        setOpen(false)
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          title: '',
          island: '',
          contact_type: 'prospect',
          company_name: '',
          notes: '',
          linkedin_url: '',
          twitter_handle: ''
        })
        onContactAdded?.()
      }
    } catch {
      toast.error('Failed to add contact')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!open) {
    return (
      <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200 cursor-pointer" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 text-gray-600" />
      </div>
    )
  }

  const dialogContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          zIndex: 100001,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        className="relative"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>Add New Contact</h2>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setOpen(false)}
            style={{ width: '32px', height: '32px' }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>
          Enter the contact information below to add them to your CRM.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="CTO"
              />
            </div>
            <div>
              <Label htmlFor="island">Island</Label>
              <Select value={formData.island || "none"} onValueChange={(value) => handleInputChange('island', value === "none" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select island" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Island</SelectItem>
                  <SelectItem value="new-providence">New Providence</SelectItem>
                  <SelectItem value="grand-bahama">Grand Bahama</SelectItem>
                  <SelectItem value="abaco">Abaco</SelectItem>
                  <SelectItem value="eleuthera">Eleuthera</SelectItem>
                  <SelectItem value="exuma">Exuma</SelectItem>
                  <SelectItem value="andros">Andros</SelectItem>
                  <SelectItem value="bimini">Bimini</SelectItem>
                  <SelectItem value="cat-island">Cat Island</SelectItem>
                  <SelectItem value="long-island">Long Island</SelectItem>
                  <SelectItem value="san-salvador">San Salvador</SelectItem>
                  <SelectItem value="rum-cay">Rum Cay</SelectItem>
                  <SelectItem value="crooked-island">Crooked Island</SelectItem>
                  <SelectItem value="acklins">Acklins</SelectItem>
                  <SelectItem value="mayaguana">Mayaguana</SelectItem>
                  <SelectItem value="inagua">Inagua</SelectItem>
                  <SelectItem value="berry-islands">Berry Islands</SelectItem>
                  <SelectItem value="harbour-island">Harbour Island</SelectItem>
                  <SelectItem value="spanish-wells">Spanish Wells</SelectItem>
                  <SelectItem value="green-turtle-cay">Green Turtle Cay</SelectItem>
                  <SelectItem value="treasure-cay">Treasure Cay</SelectItem>
                  <SelectItem value="marsh-harbour">Marsh Harbour</SelectItem>
                  <SelectItem value="hope-town">Hope Town</SelectItem>
                  <SelectItem value="man-o-war-cay">Man-O-War Cay</SelectItem>
                  <SelectItem value="great-guppy">Great Guppy</SelectItem>
                  <SelectItem value="little-guppy">Little Guppy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={formData.company_name || ''}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label htmlFor="contact_type">Contact Type</Label>
            <Select value={formData.contact_type} onValueChange={(value) => handleInputChange('contact_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select contact type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="twitter_handle">Twitter Handle</Label>
              <Input
                id="twitter_handle"
                value={formData.twitter_handle}
                onChange={(e) => handleInputChange('twitter_handle', e.target.value)}
                placeholder="@johndoe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this contact..."
              rows={3}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Contact'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return mounted && typeof document !== 'undefined' ? createPortal(dialogContent, document.body) : null
} 