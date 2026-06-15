const fs = require('fs');
let code = fs.readFileSync('src/pages/Login/Login.tsx', 'utf8');

// 1. Imports
code = code.replace(
  'import { useNavigate, useSearchParams } from "react-router";',
  'import { useNavigate, useSearchParams } from "react-router";\nimport { supabase } from "../../lib/supabaseClient";'
);

// 2. Add loading state to component
code = code.replace(
  'const [rememberMe, setRememberMe] = useState(false);',
  'const [rememberMe, setRememberMe] = useState(false);\n  const [isLoading, setIsLoading] = useState(false);\n  const [isSignup, setIsSignup] = useState(false);'
);

// 3. Update handleLoginSubmit
const newSubmitLogic = `
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const newErrors: ValidationErrors = { email: emailErr, password: passwordErr };
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (emailErr || passwordErr) {
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Sync user role with backend
        if (data.user) {
          await fetch((import.meta as any).env?.VITE_API_BASE_URL + "/api/auth/sync" || "http://localhost:5000/api/auth/sync", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              role: selectedRole === "manager" ? "MANAGER" : "COLLECTOR"
            })
          }).catch(console.error);
        }
        
        // Signed up successfully, you can login directly
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      
      localStorage.setItem("userRole", selectedRole);
      
      if (selectedRole === "collector") {
        navigate("/collector-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch(err: any) {
      setErrors({ email: err.message });
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };
`;

code = code.replace(
  /const handleLoginSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\}\s*else\s*\{\s*navigate\("\/dashboard"\);\s*\}\s*\};/,
  newSubmitLogic
);

// 4. Update the submit button to show loading and allow toggle to signup
code = code.replace(
  /<button\s+id="login-submit"[\s\S]*?LOGIN\s*<\/button>/,
  `<button
              id="login-submit"
              type="submit"
              disabled={isLoading || !isFormValid}
              className={\`h-12 w-full rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 \${
                isFormValid && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-600/10"
                  : "bg-slate-100 dark:bg-[#0f2942] text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent"
              }\`}
            >
              {isLoading ? "PLEASE WAIT..." : isSignup ? "SIGN UP" : "LOGIN"}
            </button>`
);

// Add the toggle right after the submit button
code = code.replace(
  /<div className="flex flex-col gap-4 items-center justify-center text-xs mt-2">/,
  `<div className="flex flex-col gap-4 items-center justify-center text-xs mt-2">
              <button type="button" onClick={() => setIsSignup(!isSignup)} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                {isSignup ? "Already have an account? Log in" : "Need an account? Sign up"}
              </button>`
);

fs.writeFileSync('src/pages/Login/Login.tsx', code);
console.log('Login.tsx patched.');
