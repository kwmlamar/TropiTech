-- Create tropibrain_ideas table for Idea Hub
-- This table stores app ideas with comprehensive metrics and AI assistance tracking

CREATE TABLE IF NOT EXISTS tropibrain_ideas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Basic idea information
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    industry TEXT NOT NULL,
    target_market TEXT,
    problem_solved TEXT,
    solution TEXT,
    
    -- Scoring metrics (0-100)
    market_size INTEGER DEFAULT 0 CHECK (market_size >= 0 AND market_size <= 100),
    competition_level INTEGER DEFAULT 0 CHECK (competition_level >= 0 AND competition_level <= 100),
    development_complexity INTEGER DEFAULT 0 CHECK (development_complexity >= 0 AND development_complexity <= 100),
    revenue_potential INTEGER DEFAULT 0 CHECK (revenue_potential >= 0 AND revenue_potential <= 100),
    bahamas_relevance INTEGER DEFAULT 0 CHECK (bahamas_relevance >= 0 AND bahamas_relevance <= 100),
    
    -- AI and team ratings
    ai_rating INTEGER DEFAULT 0 CHECK (ai_rating >= 0 AND ai_rating <= 100),
    team_rating INTEGER DEFAULT 0 CHECK (team_rating >= 0 AND team_rating <= 100),
    
    -- Status and tracking
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'approved', 'rejected', 'in_development')),
    ai_assisted BOOLEAN DEFAULT FALSE,
    created_by TEXT NOT NULL,
    
    -- Tags and metadata
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tropibrain_ideas_industry ON tropibrain_ideas(industry);
CREATE INDEX IF NOT EXISTS idx_tropibrain_ideas_status ON tropibrain_ideas(status);
CREATE INDEX IF NOT EXISTS idx_tropibrain_ideas_created_at ON tropibrain_ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tropibrain_ideas_ai_assisted ON tropibrain_ideas(ai_assisted);
CREATE INDEX IF NOT EXISTS idx_tropibrain_ideas_tags ON tropibrain_ideas USING GIN(tags);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_tropibrain_ideas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_update_tropibrain_ideas_updated_at
    BEFORE UPDATE ON tropibrain_ideas
    FOR EACH ROW
    EXECUTE FUNCTION update_tropibrain_ideas_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE tropibrain_ideas ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow all authenticated users to read ideas
CREATE POLICY "Allow authenticated users to read tropibrain_ideas" ON tropibrain_ideas
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert their own ideas
CREATE POLICY "Allow authenticated users to insert tropibrain_ideas" ON tropibrain_ideas
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own ideas or all ideas if they're admin
CREATE POLICY "Allow users to update tropibrain_ideas" ON tropibrain_ideas
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow users to delete their own ideas or all ideas if they're admin
CREATE POLICY "Allow users to delete tropibrain_ideas" ON tropibrain_ideas
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample data for testing
INSERT INTO tropibrain_ideas (
    title,
    description,
    industry,
    target_market,
    problem_solved,
    solution,
    market_size,
    competition_level,
    development_complexity,
    revenue_potential,
    bahamas_relevance,
    ai_rating,
    team_rating,
    status,
    ai_assisted,
    created_by,
    tags,
    notes
) VALUES 
(
    'Bahamas Local Tourism Experience Platform',
    'A mobile app connecting tourists with authentic local experiences, guides, and hidden gems across the Bahamas',
    'Tourism & Hospitality',
    'International tourists, local tour guides',
    'Tourists struggle to find authentic local experiences beyond typical tourist attractions',
    'Platform connecting verified local guides with tourists for personalized experiences',
    85,
    45,
    65,
    90,
    95,
    88,
    0,
    'draft',
    true,
    'ai',
    ARRAY['tourism', 'local experiences', 'mobile app', 'guides'],
    'AI-generated idea based on tourism market analysis'
),
(
    'Bahamas Construction Project Management Suite',
    'Comprehensive project management platform specifically designed for Bahamian construction companies',
    'Construction',
    'Bahamian construction companies, contractors, project managers',
    'Construction projects lack proper digital management tools adapted to local regulations',
    'Integrated platform with project tracking, compliance management, and local supplier network',
    75,
    60,
    70,
    80,
    90,
    82,
    0,
    'approved',
    true,
    'ai',
    ARRAY['construction', 'project management', 'compliance', 'local'],
    'Addresses specific needs of Bahamian construction industry'
),
(
    'Bahamas Financial Services Marketplace',
    'Digital marketplace connecting local businesses with financial services and banking solutions',
    'Financial Services',
    'Bahamian businesses, entrepreneurs, financial institutions',
    'Small businesses struggle to access appropriate financial services and banking solutions',
    'Platform matching businesses with suitable financial products and services',
    70,
    55,
    60,
    75,
    85,
    78,
    0,
    'analyzing',
    false,
    'user',
    ARRAY['fintech', 'banking', 'marketplace', 'business'],
    'Focuses on improving financial access for local businesses'
);

-- Create a view for easy querying of idea statistics
CREATE OR REPLACE VIEW tropibrain_ideas_stats AS
SELECT 
    COUNT(*) as total_ideas,
    COUNT(*) FILTER (WHERE ai_assisted = true) as ai_generated_ideas,
    COUNT(*) FILTER (WHERE status = 'in_development') as in_development,
    COUNT(*) FILTER (WHERE status = 'approved') as approved,
    COUNT(*) FILTER (WHERE status = 'analyzing') as analyzing,
    COUNT(*) FILTER (WHERE status = 'draft') as draft,
    COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
    AVG(market_size + revenue_potential + bahamas_relevance - competition_level - development_complexity) / 5 as avg_overall_score,
    COUNT(DISTINCT industry) as industries_covered
FROM tropibrain_ideas;

-- Grant necessary permissions
GRANT ALL ON tropibrain_ideas TO authenticated;
GRANT ALL ON tropibrain_ideas_stats TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE tropibrain_ideas IS 'Stores app ideas for TropiTech development across all industries in the Bahamas';
COMMENT ON COLUMN tropibrain_ideas.market_size IS 'Market size score (0-100)';
COMMENT ON COLUMN tropibrain_ideas.revenue_potential IS 'Revenue potential score (0-100)';
COMMENT ON COLUMN tropibrain_ideas.bahamas_relevance IS 'Relevance to Bahamas market (0-100)';
COMMENT ON COLUMN tropibrain_ideas.competition_level IS 'Competition level score (0-100)';
COMMENT ON COLUMN tropibrain_ideas.development_complexity IS 'Development complexity score (0-100)';
COMMENT ON COLUMN tropibrain_ideas.ai_assisted IS 'Whether the idea was generated with AI assistance';
COMMENT ON COLUMN tropibrain_ideas.tags IS 'Array of tags for categorizing and searching ideas'; 