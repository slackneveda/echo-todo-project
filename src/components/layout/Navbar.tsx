
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CheckSquare size={24} className="text-primary" />
          <span className="font-semibold text-xl">TaskMaster</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <p className="text-sm hidden md:block">
                Hi, <span className="font-medium">{user?.name}</span>
              </p>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={18} />
                <span className="ml-2 hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
