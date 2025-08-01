-- Create todos table for TropiTech (main database)
-- This table will store todo items for users

-- Create todo status enum
CREATE TYPE todo_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create todo priority enum
CREATE TYPE todo_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

-- Create todos table
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status todo_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_created_at ON todos(created_at);



-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view all todos
CREATE POLICY "Users can view todos" ON todos
    FOR SELECT USING (true);

-- Users can insert todos
CREATE POLICY "Users can create todos" ON todos
    FOR INSERT WITH CHECK (true);

-- Users can update todos
CREATE POLICY "Users can update todos" ON todos
    FOR UPDATE USING (true);

-- Users can delete todos
CREATE POLICY "Users can delete todos" ON todos
    FOR DELETE USING (true);

-- Insert sample data
INSERT INTO todos (title, description, status) VALUES
('Complete project documentation', 'Update all project documentation for the new features', 'pending'),
('Review time tracking reports', 'Analyze weekly time tracking reports for accuracy', 'in_progress'),
('Setup new client account', 'Create and configure new client account in TropiTrack', 'pending'),
('Update payroll calculations', 'Review and update payroll calculation formulas', 'completed'),
('Prepare weekly meeting agenda', 'Create agenda for the weekly team meeting', 'pending'); 