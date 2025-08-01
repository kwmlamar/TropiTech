"use client"

import { useState } from "react"
import { Plus, Filter, Download, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

interface Todo {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  created_at: string
}

interface TodoClientProps {
  todos: Todo[]
}

export default function TodoClient({ todos }: TodoClientProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'in_progress' | 'completed'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null)

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) {
      toast.error("Title is required")
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('todos')
        .insert([{
          title: newTodo.title.trim(),
          description: newTodo.description.trim(),
          status: newTodo.status
        }])

      if (error) throw error

      toast.success("Todo added successfully")
      setShowAddDialog(false)
      setNewTodo({ title: '', description: '', status: 'pending' })
      // Refresh the page to show new data
      window.location.reload()
    } catch {
      toast.error("Failed to add todo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTodo = async () => {
    if (!editingTodo || !editingTodo.title.trim()) {
      toast.error("Title is required")
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('todos')
        .update({
          title: editingTodo.title.trim(),
          description: editingTodo.description.trim(),
          status: editingTodo.status
        })
        .eq('id', editingTodo.id)

      if (error) throw error

      toast.success("Todo updated successfully")
      setShowEditDialog(false)
      setEditingTodo(null)
      // Refresh the page to show updated data
      window.location.reload()
    } catch {
      toast.error("Failed to update todo")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditDialog = (todo: Todo) => {
    setEditingTodo({ ...todo })
    setShowEditDialog(true)
  }

  const handleDeleteTodo = async (todoId: string) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return
    }

    setDeletingTodoId(todoId)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId)

      if (error) throw error

      toast.success("Todo deleted successfully")
      // Refresh the page to show updated data
      window.location.reload()
    } catch {
      toast.error("Failed to delete todo")
    } finally {
      setDeletingTodoId(null)
    }
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Todo List</CardTitle>
            <p className="text-sm text-muted-foreground">Manage your tasks and priorities</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200 cursor-pointer">
                  <Plus className="h-4 w-4 text-gray-600" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Todo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      placeholder="Enter todo title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTodo.description}
                      onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                      placeholder="Enter todo description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newTodo.status}
                      onValueChange={(value: 'pending' | 'in_progress' | 'completed') => 
                        setNewTodo({ ...newTodo, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleAddTodo}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? "Adding..." : "Add Todo"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddDialog(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200 cursor-pointer">
              <Filter className="h-4 w-4 text-gray-600" />
            </div>
            <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200 cursor-pointer">
              <Download className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className="font-medium">
                    <div className="font-medium text-gray-900">{todo.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 max-w-md truncate">
                      {todo.description || 'No description'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={todo.status === 'completed' ? 'default' : 
                              todo.status === 'in_progress' ? 'secondary' : 'outline'} 
                      className="text-xs capitalize"
                    >
                      {todo.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {format(new Date(todo.created_at), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(todo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTodo(todo.id)}
                        disabled={deletingTodoId === todo.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {deletingTodoId === todo.id ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm">No todos found</p>
                    <p className="text-xs text-gray-400 mt-1">Click the + button to add your first todo</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          {editingTodo && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingTodo.title}
                  onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  placeholder="Enter todo title"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTodo.description}
                  onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                  placeholder="Enter todo description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingTodo.status}
                  onValueChange={(value: 'pending' | 'in_progress' | 'completed') => 
                    setEditingTodo({ ...editingTodo, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleEditTodo}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Updating..." : "Update Todo"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
} 