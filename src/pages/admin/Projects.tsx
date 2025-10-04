import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Plus, Eye, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  duration: string;
  subscriptionDate: string;
  reportingPeriod: string;
  manager: string;
  email: string;
}

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Community Garden Initiative",
      duration: "12 months",
      subscriptionDate: "2024-01-15",
      reportingPeriod: "Monthly",
      manager: "Maria Garcia",
      email: "maria@example.com",
    },
    {
      id: "2",
      name: "Youth Education Program",
      duration: "18 months",
      subscriptionDate: "2024-02-20",
      reportingPeriod: "Quarterly",
      manager: "John Smith",
      email: "john@example.com",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    focusAreas: [] as string[],
    indicators: [] as string[],
    otherFocusArea: "",
    otherIndicator: "",
  });

  const focusAreaOptions = [
    "Environment",
    "Nutrition",
    "Education",
    "Entrepreneurship",
    "Gender Equity",
  ];

  const indicatorOptions = [
    "Number of beneficiaries",
    "Resources distributed",
    "Training sessions",
    "Community engagement rate",
  ];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    setDeleteId(null);
    toast({
      title: "Project deleted",
      description: "The project has been successfully removed.",
    });
  };

  const toggleFocusArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const toggleIndicator = (indicator: string) => {
    setFormData((prev) => ({
      ...prev,
      indicators: prev.indicators.includes(indicator)
        ? prev.indicators.filter((i) => i !== indicator)
        : [...prev.indicators, indicator],
    }));
  };

  const handleCreate = () => {
    if (!formData.name || !formData.duration) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      duration: formData.duration,
      subscriptionDate: new Date().toISOString().split("T")[0],
      reportingPeriod: "Monthly",
      manager: "Admin",
      email: "admin@example.com",
    };

    setProjects([...projects, newProject]);
    setIsCreateOpen(false);
    setFormData({
      name: "",
      duration: "",
      focusAreas: [],
      indicators: [],
      otherFocusArea: "",
      otherIndicator: "",
    });
    
    toast({
      title: "Project created",
      description: "The project has been successfully added.",
    });
  };

  return (
    <PageLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage all projects across NGO organizations
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <Label htmlFor="projectName">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">
                    Project Duration <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 12 months"
                  />
                </div>

                <div>
                  <Label>Focus Areas Covered</Label>
                  <div className="space-y-3 mt-2">
                    {focusAreaOptions.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`focus-${area}`}
                          checked={formData.focusAreas.includes(area)}
                          onCheckedChange={() => toggleFocusArea(area)}
                        />
                        <Label htmlFor={`focus-${area}`} className="font-normal cursor-pointer">
                          {area}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="focus-other"
                        checked={!!formData.otherFocusArea}
                        onCheckedChange={(checked) => {
                          if (!checked) setFormData({ ...formData, otherFocusArea: "" });
                        }}
                      />
                      <Label htmlFor="focus-other" className="font-normal">
                        Other
                      </Label>
                      {formData.otherFocusArea !== undefined && (
                        <Input
                          placeholder="Specify other focus area"
                          value={formData.otherFocusArea}
                          onChange={(e) =>
                            setFormData({ ...formData, otherFocusArea: e.target.value })
                          }
                          className="ml-2"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Indicators</Label>
                  <div className="space-y-3 mt-2">
                    {indicatorOptions.map((indicator) => (
                      <div key={indicator} className="flex items-center space-x-2">
                        <Checkbox
                          id={`indicator-${indicator}`}
                          checked={formData.indicators.includes(indicator)}
                          onCheckedChange={() => toggleIndicator(indicator)}
                        />
                        <Label
                          htmlFor={`indicator-${indicator}`}
                          className="font-normal cursor-pointer"
                        >
                          {indicator}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="indicator-other"
                        checked={!!formData.otherIndicator}
                        onCheckedChange={(checked) => {
                          if (!checked) setFormData({ ...formData, otherIndicator: "" });
                        }}
                      />
                      <Label htmlFor="indicator-other" className="font-normal">
                        Other
                      </Label>
                      {formData.otherIndicator !== undefined && (
                        <Input
                          placeholder="Specify other indicator"
                          value={formData.otherIndicator}
                          onChange={(e) =>
                            setFormData({ ...formData, otherIndicator: e.target.value })
                          }
                          className="ml-2"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreate} className="flex-1">
                    Save Project
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateOpen(false);
                      setFormData({
                        name: "",
                        duration: "",
                        focusAreas: [],
                        indicators: [],
                        otherFocusArea: "",
                        otherIndicator: "",
                      });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Subscription Date</TableHead>
                <TableHead>Reporting Period</TableHead>
                <TableHead>Project Manager</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.duration}</TableCell>
                  <TableCell>{project.subscriptionDate}</TableCell>
                  <TableCell>{project.reportingPeriod}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                  <TableCell>{project.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(project.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default AdminProjects;
