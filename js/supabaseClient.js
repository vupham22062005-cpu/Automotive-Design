const SUPABASE_URL = "https://mwllzkxnbeopfihdbtya.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bGx6a3huYmVvcGZpaGRidHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTQ0MzIsImV4cCI6MjEwMzMzMDQzMn0.w6ftaoqR9dxX9iSRIPi8HAYVlKePARVGwXsPDyl1Mf4";

// Gán trực tiếp vào window để đảm bảo app.js luôn nhận diện được
window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);