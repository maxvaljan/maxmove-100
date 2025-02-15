
-- Create a new storage bucket for vehicle icons
INSERT INTO storage.buckets (id, name)
VALUES ('vehicles', 'vehicles')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vehicles');

CREATE POLICY "Admin Insert/Update/Delete"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'vehicles' 
  AND EXISTS (
    SELECT 1 FROM auth.users
    JOIN public.profiles ON profiles.id = auth.users.id
    WHERE auth.uid() = profiles.id
    AND profiles.role = 'admin'
  )
);
