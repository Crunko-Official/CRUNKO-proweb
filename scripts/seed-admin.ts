import { config } from "dotenv";
config({ path: ".env" });
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase credentials in environment variables.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedAdmin() {
  const email = "admin@crunko.local";
  const password = "admin123";

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already exists")) {
      console.log("Admin user already exists.");
    } else {
      console.error("Error creating admin user:", error.message);
      process.exit(1);
    }
  } else {
    console.log("Admin user created successfully:", data.user.email);
  }
}

seedAdmin();
