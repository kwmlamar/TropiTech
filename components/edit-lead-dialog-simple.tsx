'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { useLeads } from '@/hooks/use-crm'
import { toast } from 'sonner'
import type { Lead } from '@/lib/crm-database'

interface EditLeadDialogProps {
  lead: Lead | null
  onLeadUpdated?: () => void
  onClose: () => void
}

export function EditLeadDialogSimple({ lead, onLeadUpdated, onClose }: EditLeadDialogProps) {
  const [loading, setLoading] = useState(false)
  const { updateLead } = useLeads()

  const [formData, setFormData] = useState({
    contact_name: '',
    email: '',
    phone: '',
    company_name: '',
    island: '',
    status: 'new',
    source: 'website',
    priority: 'medium',
    description: '',
    estimated_value: 0
  })

  // Populate form data when lead changes
  useEffect(() => {
    if (lead) {
      setFormData({
        contact_name: lead.contact_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company_name: lead.company_name || '',
        island: lead.island || '',
        status: lead.status || 'new',
        source: lead.source || 'website',
        priority: lead.priority || 'medium',
        description: lead.description || '',
        estimated_value: lead.estimated_value || 0
      })
    }
  }, [lead])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead) return
    
    setLoading(true)

    try {
      const result = await updateLead(lead.id, formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Lead updated successfully!')
        onClose()
        onLeadUpdated?.()
      }
    } catch {
      toast.error('Failed to update lead')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!lead || !mounted) {
    return null
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
        zIndex: 50,
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
          zIndex: 51,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>Edit Lead</h2>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onClose}
            style={{ width: '32px', height: '32px' }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>
          Update the lead information below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Label htmlFor="contact_name">Contact Name</Label>
            <Input
              id="contact_name"
              value={formData.contact_name}
              onChange={(e) => handleInputChange('contact_name', e.target.value)}
              placeholder="John Doe"
            />
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
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="island">Island</Label>
              <Select value={formData.island || "none"} onValueChange={(value) => handleInputChange('island', value === "none" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select island" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="New Providence">New Providence</SelectItem>
                  <SelectItem value="Grand Bahama">Grand Bahama</SelectItem>
                  <SelectItem value="Abaco">Abaco</SelectItem>
                  <SelectItem value="Eleuthera">Eleuthera</SelectItem>
                  <SelectItem value="Exuma">Exuma</SelectItem>
                  <SelectItem value="Andros">Andros</SelectItem>
                  <SelectItem value="Bimini">Bimini</SelectItem>
                  <SelectItem value="Cat Island">Cat Island</SelectItem>
                  <SelectItem value="Long Island">Long Island</SelectItem>
                  <SelectItem value="San Salvador">San Salvador</SelectItem>
                  <SelectItem value="Acklins">Acklins</SelectItem>
                  <SelectItem value="Crooked Island">Crooked Island</SelectItem>
                  <SelectItem value="Mayaguana">Mayaguana</SelectItem>
                  <SelectItem value="Inagua">Inagua</SelectItem>
                  <SelectItem value="Berry Islands">Berry Islands</SelectItem>
                  <SelectItem value="Harbour Island">Harbour Island</SelectItem>
                  <SelectItem value="Spanish Wells">Spanish Wells</SelectItem>
                  <SelectItem value="Ragged Island">Ragged Island</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="unqualified">Unqualified</SelectItem>
                  <SelectItem value="app_interested">App Interested</SelectItem>
                  <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                  <SelectItem value="trial_active">Trial Active</SelectItem>
                  <SelectItem value="app_converted">App Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label htmlFor="source">Source</Label>
              <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="cold_call">Cold Call</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="estimated_value">Estimated Value ($)</Label>
              <Input
                id="estimated_value"
                type="number"
                value={formData.estimated_value}
                onChange={(e) => handleInputChange('estimated_value', parseFloat(e.target.value) || 0)}
                placeholder="5000"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the lead, their needs, and any relevant information..."
              rows={3}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} style={{ backgroundColor: '#2563EB', color: 'white' }}>
              {loading ? 'Updating...' : 'Update Lead'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return mounted && typeof document !== 'undefined' ? createPortal(dialogContent, document.body) : null
} 