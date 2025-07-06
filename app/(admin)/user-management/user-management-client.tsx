/* eslint-env browser */
/* global Blob, window, document */
'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDistanceToNow } from "date-fns"
import { Search, Filter, Eye, Edit, MoreHorizontal, Building2, User, Calendar, Download, CheckSquare, Square } from "lucide-react"

interface UserData {
  id: string
  full_name: string | null
  email: string
  role: string | null
  status: string | null
  last_login: string | null
  created_at: string
  company_id: string | null
  companies: {
    id: string
    name: string
    status: string | null
  } | null
  source?: 'TropiTech' | 'TropiTrack'
}

interface UserManagementClientProps {
  users: UserData[]
}

export default function UserManagementClient({ users }: UserManagementClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companies?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    
    const matchesRole = roleFilter === "all" || user.role?.toLowerCase() === roleFilter
    const matchesStatus = statusFilter === "all" || user.status?.toLowerCase() === statusFilter
    const matchesCompany = companyFilter === "all" || user.companies?.id === companyFilter
    const matchesSource = sourceFilter === "all" || user.source === sourceFilter
    
    return matchesSearch && matchesRole && matchesStatus && matchesCompany && matchesSource
  })

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>
    
    return status === "active" 
      ? <Badge className="bg-success text-success-foreground">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>
  }

  const getRoleBadge = (role: string | null) => {
    if (!role) return <Badge variant="outline">No Role</Badge>
    
    const variants = {
      admin: "bg-primary text-primary-foreground",
      manager: "bg-accent text-accent-foreground", 
      user: "bg-secondary text-secondary-foreground"
    }
    return <Badge className={variants[role as keyof typeof variants] || "bg-secondary text-secondary-foreground"}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  }

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return "Never"
    return formatDistanceToNow(new Date(lastLogin), { addSuffix: true })
  }

  const formatCreatedAt = (createdAt: string) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  }

  // Get unique companies for filter
  // const companies = Array.from(new Set(users.map(user => user.companies?.id).filter(Boolean))) // Unused variable
  const companyOptions = users
    .filter(user => user.companies)
    .reduce((acc, user) => {
      if (user.companies && !acc.find(c => c.id === user.companies!.id)) {
        acc.push(user.companies!)
      }
      return acc
    }, [] as Array<{ id: string; name: string; status: string | null }>)

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers(new Set())
      setSelectAll(false)
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)))
      setSelectAll(true)
    }
  }

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedUsers(newSelected)
    setSelectAll(newSelected.size === filteredUsers.length)
  }

  // Export functionality
  const exportUsers = () => {
    const usersToExport = selectedUsers.size > 0 
      ? filteredUsers.filter(user => selectedUsers.has(user.id))
      : filteredUsers

    const csvContent = [
      ['Name', 'Email', 'Company', 'Role', 'Status', 'Source', 'Last Login', 'Created'],
      ...usersToExport.map(user => [
        user.full_name || 'No Name',
        user.email,
        user.companies?.name || 'No Company',
        user.role || 'No Role',
        user.status || 'Unknown',
        user.source || 'TropiTech',
        user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never',
        new Date(user.created_at).toLocaleDateString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          User Directory
        </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="md:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
                      <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="md:w-48">
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companyOptions.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="md:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="TropiTech">TropiTech</SelectItem>
                <SelectItem value="TropiTrack">TropiTrack</SelectItem>
              </SelectContent>
            </Select>
          <Button 
            variant="outline" 
            onClick={exportUsers}
            disabled={filteredUsers.length === 0}
            className="md:ml-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Export {selectedUsers.size > 0 ? `(${selectedUsers.size})` : ''}
          </Button>
          <Button>
            <User className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-4 w-4 p-0"
                  >
                    {selectAll ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectUser(user.id)}
                        className="h-4 w-4 p-0"
                      >
                        {selectedUsers.has(user.id) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.full_name || 'No Name'}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {user.companies?.name || 'No Company'}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <Badge variant={user.source === 'TropiTrack' ? 'secondary' : 'default'}>
                        {user.source || 'TropiTech'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatLastLogin(user.last_login)}
                      </div>
                    </TableCell>
                    <TableCell>{formatCreatedAt(user.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No users found matching your criteria</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Showing {filteredUsers.length} of {users.length} users
            {selectedUsers.size > 0 && (
              <span className="ml-2 text-primary">
                • {selectedUsers.size} selected
              </span>
            )}
          </div>
          {selectedUsers.size > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="outline" size="sm">
                Send Message
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 