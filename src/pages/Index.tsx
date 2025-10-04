import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            NGO Management Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline project tracking, monitor impact, and manage NGO operations
            with our comprehensive dashboard solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>NGO Portal</CardTitle>
              <CardDescription>
                Access your organization's projects, track indicators, and submit reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/ngo/projects">
                <Button className="w-full">
                  Enter NGO Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Administrator Portal</CardTitle>
              <CardDescription>
                Manage NGOs, oversee all projects, and view comprehensive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/dashboard">
                <Button className="w-full">
                  Enter Admin Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Trusted by NGOs across Ecuador to track and manage their social impact projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
