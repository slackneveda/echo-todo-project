
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { CheckSquare } from "lucide-react";

const Auth: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <CheckSquare size={42} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">TaskMaster</h1>
          <p className="text-muted-foreground mt-2">
            Your personal task management solution
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
