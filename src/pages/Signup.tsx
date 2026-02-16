import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name || "Demo User", email, password, role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-hero-gradient flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">ExamPro</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start your exam preparation journey</p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-8">
          <div className="flex gap-2 mb-6">
            {(["student", "teacher"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  role === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {role === "student" && (
              <div>
                <Label htmlFor="exam-type">Exam Category</Label>
                <select id="exam-type" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select your exam</option>
                  <option value="ssc">SSC</option>
                  <option value="hsc">HSC</option>
                  <option value="admission">University Admission</option>
                  <option value="job">Job Preparation</option>
                  <option value="bcs">BCS</option>
                </select>
              </div>
            )}
            <Button className="w-full" size="lg">Create Account</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
