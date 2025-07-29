"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Globe,
  Plus,
  Search,
  BarChart3,
  Sparkles,
  GitCompare,
  Star,
  Building2,
  Car,
  Utensils,
  ShoppingBag,
  Heart,
  GraduationCap,
  Wifi,
  Ship,
  Plane
} from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

type AppIdea = {
  id: string
  title: string
  description: string
  industry: string
  target_market: string
  problem_solved: string
  solution: string
  market_size: number
  competition_level: number
  development_complexity: number
  revenue_potential: number
  bahamas_relevance: number
  ai_assisted: boolean
  created_by: string
  status: 'draft' | 'analyzing' | 'approved' | 'rejected' | 'in_development'
  created_at: string
  updated_at: string
  tags: string[]
  team_rating: number
  ai_rating: number
  notes: string
}

type Industry = {
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

const industries: Industry[] = [
  { name: 'Tourism & Hospitality', icon: <Heart className="w-4 h-4" />, color: 'text-pink-600', description: 'Hotels, restaurants, attractions, travel services' },
  { name: 'Financial Services', icon: <DollarSign className="w-4 h-4" />, color: 'text-green-600', description: 'Banking, insurance, fintech, investment' },
  { name: 'Real Estate', icon: <Building2 className="w-4 h-4" />, color: 'text-blue-600', description: 'Property management, real estate services' },
  { name: 'Transportation', icon: <Car className="w-4 h-4" />, color: 'text-orange-600', description: 'Logistics, delivery, transportation services' },
  { name: 'Education', icon: <GraduationCap className="w-4 h-4" />, color: 'text-purple-600', description: 'Schools, training, educational technology' },
  { name: 'Healthcare', icon: <Heart className="w-4 h-4" />, color: 'text-red-600', description: 'Medical services, health tech, wellness' },
  { name: 'Retail & E-commerce', icon: <ShoppingBag className="w-4 h-4" />, color: 'text-indigo-600', description: 'Online shopping, retail management' },
  { name: 'Food & Beverage', icon: <Utensils className="w-4 h-4" />, color: 'text-yellow-600', description: 'Restaurants, food delivery, catering' },
  { name: 'Maritime', icon: <Ship className="w-4 h-4" />, color: 'text-cyan-600', description: 'Fishing, boating, marine services' },
  { name: 'Aviation', icon: <Plane className="w-4 h-4" />, color: 'text-sky-600', description: 'Air travel, aviation services' },
  { name: 'Technology', icon: <Wifi className="w-4 h-4" />, color: 'text-emerald-600', description: 'Software, IT services, digital solutions' },
  { name: 'Construction', icon: <Building2 className="w-4 h-4" />, color: 'text-gray-600', description: 'Building, renovation, project management' }
]

export default function TropiBrain() {
  const [ideas, setIdeas] = useState<AppIdea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<AppIdea[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([])
  const [editingIdea, setEditingIdea] = useState<AppIdea | null>(null)
  const [viewingIdea, setViewingIdea] = useState<AppIdea | null>(null)
  const [generating, setGenerating] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    industry: '',
    target_market: '',
    problem_solved: '',
    solution: '',
    market_size: 0,
    competition_level: 0,
    development_complexity: 0,
    revenue_potential: 0,
    bahamas_relevance: 0,
    status: 'draft' as 'draft' | 'analyzing' | 'approved' | 'rejected' | 'in_development',
    tags: [] as string[],
    notes: ''
  })

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('tropibrain_ideas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setIdeas(data || [])
    } catch {
      toast.error("Failed to fetch ideas from database")
    }
  }



  useEffect(() => {
    const filterIdeas = () => {
      let filtered = ideas

      if (selectedIndustry !== 'all') {
        filtered = filtered.filter(idea => idea.industry === selectedIndustry)
      }

      if (searchTerm) {
        filtered = filtered.filter(idea => 
          idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }

      setFilteredIdeas(filtered)
    }

    filterIdeas()
  }, [ideas, selectedIndustry, searchTerm])

  const addNewIdea = async () => {
    if (!newIdea.title || !newIdea.description || !newIdea.industry) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const supabase = await createClient()
      const ideaData = {
        ...newIdea,
        status: 'draft',
        created_by: 'user', // Replace with actual user ID
        ai_assisted: false,
        team_rating: 0,
        ai_rating: 0
      }

      const { data, error } = await supabase
        .from('tropibrain_ideas')
        .insert([ideaData])
        .select()

      if (error) throw error
      
      if (data) {
        setIdeas([data[0], ...ideas])
        setShowAddDialog(false)
        setNewIdea({
          title: '',
          description: '',
          industry: '',
          target_market: '',
          problem_solved: '',
          solution: '',
          market_size: 0,
          competition_level: 0,
          development_complexity: 0,
          revenue_potential: 0,
          bahamas_relevance: 0,
          status: 'draft',
          tags: [],
          notes: ''
        })
        toast.success("Idea added successfully!")
      }
    } catch {
      toast.error("Failed to add idea")
    }
  }

  const editIdea = async () => {
    if (!editingIdea || !editingIdea.title || !editingIdea.description || !editingIdea.industry) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('tropibrain_ideas')
        .update({
          title: editingIdea.title,
          description: editingIdea.description,
          industry: editingIdea.industry,
          target_market: editingIdea.target_market,
          problem_solved: editingIdea.problem_solved,
          solution: editingIdea.solution,
          market_size: editingIdea.market_size,
          competition_level: editingIdea.competition_level,
          development_complexity: editingIdea.development_complexity,
          revenue_potential: editingIdea.revenue_potential,
          bahamas_relevance: editingIdea.bahamas_relevance,
          status: editingIdea.status,
          tags: editingIdea.tags,
          notes: editingIdea.notes
        })
        .eq('id', editingIdea.id)
        .select()

      if (error) throw error
      
      if (data) {
        setIdeas(ideas.map(idea => idea.id === editingIdea.id ? data[0] : idea))
        setShowEditDialog(false)
        setEditingIdea(null)
        toast.success("Idea updated successfully!")
      }
    } catch {
      toast.error("Failed to update idea")
    }
  }

  const openEditDialog = (idea: AppIdea) => {
    setEditingIdea(idea)
    setShowEditDialog(true)
  }

  const openViewDialog = (idea: AppIdea) => {
    setViewingIdea(idea)
    setShowViewDialog(true)
  }



  const generateAIIdea = async () => {
    setGenerating(true)
    try {
      // Simulate AI idea generation
      await new Promise(resolve => window.setTimeout(resolve, 2000))
      
      const aiGeneratedIdea = {
        title: "Bahamas Local Tourism Experience Platform",
        description: "A mobile app connecting tourists with authentic local experiences, guides, and hidden gems across the Bahamas",
        industry: "Tourism & Hospitality",
        target_market: "International tourists, local tour guides",
        problem_solved: "Tourists struggle to find authentic local experiences beyond typical tourist attractions",
        solution: "Platform connecting verified local guides with tourists for personalized experiences",
        market_size: 85,
        competition_level: 45,
        development_complexity: 65,
        revenue_potential: 90,
        bahamas_relevance: 95,
        tags: ['tourism', 'local experiences', 'mobile app', 'guides'],
        notes: 'AI-generated idea based on tourism market analysis',
        status: 'draft',
        created_by: 'ai',
        ai_assisted: true,
        team_rating: 0,
        ai_rating: 88
      }

      const supabase = await createClient()
      const { data, error } = await supabase
        .from('tropibrain_ideas')
        .insert([aiGeneratedIdea])
        .select()

      if (error) throw error
      
      if (data) {
        setIdeas([data[0], ...ideas])
        toast.success("AI generated a new idea!")
      }
    } catch {
      toast.error("Failed to generate AI idea")
    } finally {
      setGenerating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      "in_development": "bg-primary text-primary-foreground",
      "approved": "bg-success text-success-foreground",
      "analyzing": "bg-warning text-warning-foreground",
      "rejected": "bg-destructive text-destructive-foreground",
      "draft": "bg-muted text-muted-foreground"
    }
    return <Badge className={variants[status as keyof typeof variants] || "bg-muted"}>{status}</Badge>
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const calculateOverallScore = (idea: AppIdea) => {
    return Math.round(
      (idea.market_size + idea.revenue_potential + idea.bahamas_relevance - idea.competition_level - idea.development_complexity) / 5
    )
  }

  const topIdeas = filteredIdeas
    .sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))
    .slice(0, 5)

  const industryBreakdown = industries.map(industry => ({
    ...industry,
    count: ideas.filter(idea => idea.industry === industry.name).length,
    avgScore: Math.round(
      ideas.filter(idea => idea.industry === industry.name)
        .reduce((sum, idea) => sum + calculateOverallScore(idea), 0) / 
        Math.max(ideas.filter(idea => idea.industry === industry.name).length, 1)
    )
  }))

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Idea Hub</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddDialog(true)} className="bg-gray-900 hover:bg-gray-800 text-white rounded-3xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Idea
          </Button>
          <Button onClick={generateAIIdea} disabled={generating} className="bg-gray-900 hover:bg-gray-800 text-white rounded-3xl">
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? "Generating..." : "AI Generate"}
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total Ideas</CardTitle>
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{ideas.length}</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              {ideas.filter(i => i.ai_assisted).length} AI-generated
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">In Development</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success">{ideas.filter(i => i.status === 'in_development').length}</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              {ideas.filter(i => i.status === 'approved').length} approved
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Avg Score</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">
              {ideas.length > 0 ? Math.round(ideas.reduce((sum, idea) => sum + calculateOverallScore(idea), 0) / ideas.length) : 0}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Overall potential score
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Industries</CardTitle>
            <Globe className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">
              {new Set(ideas.map(i => i.industry)).size}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Industries covered
            </p>
          </CardContent>
        </Card>
      </div>

            {/* Filters and Search */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry.name} value={industry.name}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setShowCompareDialog(true)}
              disabled={selectedIdeas.length < 2}
              className="flex items-center gap-2"
            >
              <GitCompare className="w-4 h-4" />
              Compare ({selectedIdeas.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Ideas */}
      {topIdeas.length > 0 && (
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Top Rated Ideas
            </CardTitle>
            <CardDescription>Highest scoring ideas across all industries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topIdeas.map((idea) => (
                <Card key={idea.id} className="relative hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">
                          {idea.description}
                        </CardDescription>
                      </div>
                      <Badge className={`ml-2 bg-blue-100 text-blue-800 border border-blue-200`}>
                        {calculateOverallScore(idea)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-2">
                      {industries.find(i => i.name === idea.industry)?.icon}
                      <span className="text-sm text-muted-foreground">{idea.industry}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Market: {idea.market_size}%</div>
                      <div>Revenue: {idea.revenue_potential}%</div>
                      <div>Bahamas: {idea.bahamas_relevance}%</div>
                      <div>Complexity: {idea.development_complexity}%</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button variant="outline" size="sm">Promote</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Industry Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Ideas by Industry
            </CardTitle>
            <CardDescription>Distribution and average scores by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {industryBreakdown
                .filter(industry => industry.count > 0)
                .sort((a, b) => b.count - a.count)
                .map(industry => (
                  <div key={industry.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`${industry.color}`}>
                        {industry.icon}
                      </div>
                      <div>
                        <div className="font-medium">{industry.name}</div>
                        <div className="text-xs text-muted-foreground">{industry.count} ideas</div>
                      </div>
                    </div>
                    <div className={`font-bold ${getScoreColor(industry.avgScore)}`}>
                      {industry.avgScore}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Development Pipeline
            </CardTitle>
            <CardDescription>Status breakdown of all ideas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { status: 'in_development', label: 'In Development', color: 'text-primary' },
                { status: 'approved', label: 'Approved', color: 'text-green-600' },
                { status: 'analyzing', label: 'Analyzing', color: 'text-yellow-600' },
                { status: 'draft', label: 'Draft', color: 'text-muted-foreground' },
                { status: 'rejected', label: 'Rejected', color: 'text-red-600' }
              ].map(({ status, label, color }) => {
                const count = ideas.filter(i => i.status === status).length
                return (
                  <div key={status} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">{label}</div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${color}`}>{count}</span>
                      {getStatusBadge(status)}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Table */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>All Ideas</CardTitle>
          <CardDescription>Complete list of app ideas with detailed metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIdeas(filteredIdeas.map(i => i.id))
                        } else {
                          setSelectedIdeas([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Market Size</TableHead>
                  <TableHead>Revenue Potential</TableHead>
                  <TableHead>Bahamas Relevance</TableHead>
                  <TableHead>Overall Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIdeas.map((idea) => (
                  <TableRow key={idea.id}>
                    <TableCell>
                      <input 
                        type="checkbox" 
                        checked={selectedIdeas.includes(idea.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIdeas([...selectedIdeas, idea.id])
                          } else {
                            setSelectedIdeas(selectedIdeas.filter(id => id !== idea.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{idea.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {idea.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {industries.find(i => i.name === idea.industry)?.icon}
                        <span className="text-sm">{idea.industry}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getScoreColor(idea.market_size)}`}>
                        {idea.market_size}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getScoreColor(idea.revenue_potential)}`}>
                        {idea.revenue_potential}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getScoreColor(idea.bahamas_relevance)}`}>
                        {idea.bahamas_relevance}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getScoreColor(calculateOverallScore(idea))}`}>
                        {calculateOverallScore(idea)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(idea.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openViewDialog(idea)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(idea)}
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Idea Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New App Idea</DialogTitle>
            <DialogDescription>
              Create a new app idea for development across any industry in the Bahamas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                  placeholder="App idea title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Industry *</label>
                <Select value={newIdea.industry} onValueChange={(value) => setNewIdea({...newIdea, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry.name} value={industry.name}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={newIdea.description}
                onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                placeholder="Describe your app idea..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Target Market</label>
                <Input
                  value={newIdea.target_market}
                  onChange={(e) => setNewIdea({...newIdea, target_market: e.target.value})}
                  placeholder="Who is the target audience?"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Problem Solved</label>
                <Input
                  value={newIdea.problem_solved}
                  onChange={(e) => setNewIdea({...newIdea, problem_solved: e.target.value})}
                  placeholder="What problem does this solve?"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium">Market Size (%)</label>
                <Input
                  type="number"
                  value={newIdea.market_size}
                  onChange={(e) => setNewIdea({...newIdea, market_size: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Revenue Potential (%)</label>
                <Input
                  type="number"
                  value={newIdea.revenue_potential}
                  onChange={(e) => setNewIdea({...newIdea, revenue_potential: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bahamas Relevance (%)</label>
                <Input
                  type="number"
                  value={newIdea.bahamas_relevance}
                  onChange={(e) => setNewIdea({...newIdea, bahamas_relevance: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Competition Level (%)</label>
                <Input
                  type="number"
                  value={newIdea.competition_level}
                  onChange={(e) => setNewIdea({...newIdea, competition_level: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Development Complexity (%)</label>
                <Input
                  type="number"
                  value={newIdea.development_complexity}
                  onChange={(e) => setNewIdea({...newIdea, development_complexity: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
                              <Select value={newIdea.status || 'draft'} onValueChange={(value) => setNewIdea({...newIdea, status: value as 'draft' | 'analyzing' | 'approved' | 'rejected' | 'in_development'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="analyzing">Analyzing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="in_development">In Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addNewIdea}>
                Add Idea
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Idea Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit App Idea</DialogTitle>
            <DialogDescription>
              Update the details of your app idea
            </DialogDescription>
          </DialogHeader>
          {editingIdea && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={editingIdea.title}
                    onChange={(e) => setEditingIdea({...editingIdea, title: e.target.value})}
                    placeholder="App idea title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry *</label>
                  <Select value={editingIdea.industry} onValueChange={(value) => setEditingIdea({...editingIdea, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry.name} value={industry.name}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={editingIdea.description}
                  onChange={(e) => setEditingIdea({...editingIdea, description: e.target.value})}
                  placeholder="Describe your app idea..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Target Market</label>
                  <Input
                    value={editingIdea.target_market}
                    onChange={(e) => setEditingIdea({...editingIdea, target_market: e.target.value})}
                    placeholder="Who is the target audience?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Problem Solved</label>
                  <Input
                    value={editingIdea.problem_solved}
                    onChange={(e) => setEditingIdea({...editingIdea, problem_solved: e.target.value})}
                    placeholder="What problem does this solve?"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Solution</label>
                <Textarea
                  value={editingIdea.solution}
                  onChange={(e) => setEditingIdea({...editingIdea, solution: e.target.value})}
                  placeholder="How does your app solve the problem?"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Market Size (%)</label>
                  <Input
                    type="number"
                    value={editingIdea.market_size}
                    onChange={(e) => setEditingIdea({...editingIdea, market_size: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Revenue Potential (%)</label>
                  <Input
                    type="number"
                    value={editingIdea.revenue_potential}
                    onChange={(e) => setEditingIdea({...editingIdea, revenue_potential: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bahamas Relevance (%)</label>
                  <Input
                    type="number"
                    value={editingIdea.bahamas_relevance}
                    onChange={(e) => setEditingIdea({...editingIdea, bahamas_relevance: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Competition Level (%)</label>
                  <Input
                    type="number"
                    value={editingIdea.competition_level}
                    onChange={(e) => setEditingIdea({...editingIdea, competition_level: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Development Complexity (%)</label>
                  <Input
                    type="number"
                    value={editingIdea.development_complexity}
                    onChange={(e) => setEditingIdea({...editingIdea, development_complexity: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={editingIdea.status} onValueChange={(value) => setEditingIdea({...editingIdea, status: value as 'draft' | 'analyzing' | 'approved' | 'rejected' | 'in_development'})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="analyzing">Analyzing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="in_development">In Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={editingIdea.notes}
                  onChange={(e) => setEditingIdea({...editingIdea, notes: e.target.value})}
                  placeholder="Additional notes or thoughts..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={editIdea}>
                  Update Idea
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Idea Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View App Idea</DialogTitle>
            <DialogDescription>
              Review idea details and update status
            </DialogDescription>
          </DialogHeader>
          {viewingIdea && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <div className="text-lg font-semibold mt-1">{viewingIdea.title}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <div className="flex items-center gap-2 mt-1">
                    {industries.find(i => i.name === viewingIdea.industry)?.icon}
                    <span className="text-lg">{viewingIdea.industry}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                  {viewingIdea.description}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Target Market</label>
                  <div className="mt-1">{viewingIdea.target_market || 'Not specified'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Problem Solved</label>
                  <div className="mt-1">{viewingIdea.problem_solved || 'Not specified'}</div>
                </div>
              </div>

              {viewingIdea.solution && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Solution</label>
                  <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                    {viewingIdea.solution}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{viewingIdea.market_size}%</div>
                  <div className="text-sm text-muted-foreground">Market Size</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{viewingIdea.revenue_potential}%</div>
                  <div className="text-sm text-muted-foreground">Revenue Potential</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{viewingIdea.bahamas_relevance}%</div>
                  <div className="text-sm text-muted-foreground">Bahamas Relevance</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{viewingIdea.competition_level}%</div>
                  <div className="text-sm text-muted-foreground">Competition</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{viewingIdea.development_complexity}%</div>
                  <div className="text-sm text-muted-foreground">Complexity</div>
                </div>
              </div>

              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {calculateOverallScore(viewingIdea)}
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(viewingIdea.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <div className="mt-1">{new Date(viewingIdea.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              {viewingIdea.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <div className="mt-1 p-3 bg-muted/30 rounded-lg">
                    {viewingIdea.notes}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setViewingIdea(viewingIdea)
                  setShowViewDialog(false)
                  setShowEditDialog(true)
                }}>
                  Edit Idea
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Ideas Dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compare Ideas</DialogTitle>
            <DialogDescription>
              Side-by-side comparison of selected app ideas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedIdeas.length >= 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedIdeas.slice(0, 2).map(ideaId => {
                  const idea = ideas.find(i => i.id === ideaId)
                  if (!idea) return null
                  
                  return (
                    <Card key={idea.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <CardDescription>{idea.industry}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm font-medium">Description</div>
                          <div className="text-sm text-muted-foreground">{idea.description}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Market Size: <span className="font-medium">{idea.market_size}%</span></div>
                          <div>Revenue: <span className="font-medium">{idea.revenue_potential}%</span></div>
                          <div>Bahamas: <span className="font-medium">{idea.bahamas_relevance}%</span></div>
                          <div>Complexity: <span className="font-medium">{idea.development_complexity}%</span></div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {calculateOverallScore(idea)}
                          </div>
                          <div className="text-xs text-muted-foreground">Overall Score</div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
                             <div className="text-center py-8 text-muted-foreground">
                 <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                 <p>Select at least 2 ideas to compare</p>
               </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}