-- MediPrecision India - Supabase Schema
-- Run this SQL in your Supabase SQL Editor

-- Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  company TEXT,
  product_interest TEXT,
  message TEXT NOT NULL,
  enquiry_type TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  assigned_to TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: allow inserts from anyone (contact form submissions)
CREATE POLICY "Allow public insert" ON public.enquiries
  FOR INSERT WITH CHECK (true);

-- Policy: allow select for authenticated users (admin)
CREATE POLICY "Allow authenticated select" ON public.enquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: allow update for authenticated users (admin)
CREATE POLICY "Allow authenticated update" ON public.enquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Index for status filtering
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
