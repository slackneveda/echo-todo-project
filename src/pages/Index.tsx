
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-muted/30 dark:from-background dark:to-background/60">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="mb-6">
            <CheckSquare size={64} className="text-primary mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TaskMaster
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            The simple, effective way to organize your tasks and boost productivity.
            Get started today and take control of your to-do list.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="px-8"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="px-8"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need for effective task management
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Simple Task Creation</h3>
              <p className="text-muted-foreground">
                Quickly add new tasks with titles, descriptions, and due dates.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Task Organization</h3>
              <p className="text-muted-foreground">
                Filter and search your tasks to focus on what matters most.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Access</h3>
              <p className="text-muted-foreground">
                Your tasks are protected with secure user authentication.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get organized?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their productivity with TaskMaster.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="px-8"
          >
            Start Using TaskMaster
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
