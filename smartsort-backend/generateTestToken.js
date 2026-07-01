const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || "https://xcewrpvxfjsxmwdocxqh.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZXdycHZ4ZmpzeG13ZG9jeHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTc2MTksImV4cCI6MjA5NDY3MzYxOX0.6h_q5VokTNKlteK62qkkgmqY219j-khDx7JhsofE1VY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const email = process.argv[2] || 'testadmin@smartsort.com';
const password = process.argv[3] || 'P@ssword123!';

async function run() {
  console.log(`Generating test token for user: ${email}...`);
  
  // Try to sign in
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
      console.log('User does not exist or requires signup. Attempting to sign up...');
      // Try to sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error('Sign up failed:', signUpError.message);
        process.exit(1);
      }

      console.log('User signed up successfully. Retrying sign in...');
      if (signUpData.session) {
        data = signUpData;
      } else {
        const retry = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (retry.error) {
          console.error('Retry sign in failed:', retry.error.message);
          process.exit(1);
        }
        data = retry.data;
      }
    } else {
      console.error('Sign in failed:', error.message);
      process.exit(1);
    }
  }

  console.log('\n--- SUCCESS ---');
  console.log('Access Token (JWT):');
  console.log(data.session.access_token);
  console.log('----------------\n');
}

run();
