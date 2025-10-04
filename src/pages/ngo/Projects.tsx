import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Eye, Pencil, Trash2, Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  duration: string;
  subscriptionDate: string;
  reportingPeriod: string;
  manager: string;
  email: string;
  focusArea: string;
}

const NGOProjects = () => {
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
      focusArea: "Environment",
    },
    {
      id: "2",
      name: "Youth Education Program",
      duration: "18 months",
      subscriptionDate: "2024-02-20",
      reportingPeriod: "Quarterly",
      manager: "John Smith",
      email: "john@example.com",
      focusArea: "Education",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [focusArea, setFocusArea] = useState<string>("");
  
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    focusArea: "",
  });

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

  const handleCreate = () => {
    if (!formData.name || !formData.manager || !formData.focusArea) {
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
      duration: "12 months",
      subscriptionDate: new Date().toISOString().split("T")[0],
      reportingPeriod: "Monthly",
      manager: formData.manager,
      email: "email@example.com",
      focusArea: formData.focusArea,
    };

    setProjects([...projects, newProject]);
    setIsCreateOpen(false);
    setFormData({ name: "", manager: "", focusArea: "" });
    setFocusArea("");
    setSelectedMonth("");
    
    toast({
      title: "Project created",
      description: "The project has been successfully added.",
    });
  };

  const renderIndicators = () => {
    if (!focusArea) return null;

    switch (focusArea) {
      case "nutrition":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foodConsumption">Food suitable for consumption (Kg)</Label>
                <Input id="foodConsumption" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="immediateFood">Food for immediate consumption (Kg)</Label>
                <Input id="immediateFood" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="production">Production (Kg)</Label>
                <Input id="production" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="totalReceived">Total kilos received in the month</Label>
                <Input id="totalReceived" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="beneficiaries">Beneficiary Institutions (#)</Label>
                <Input id="beneficiaries" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="peopleFed">People fed monthly (#)</Label>
                <Input id="peopleFed" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="students">Number of students</Label>
                <Input id="students" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="teachers">Number of teachers</Label>
                <Input id="teachers" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="classrooms">Number of classrooms</Label>
                <Input id="classrooms" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="materials">Educational materials distributed</Label>
                <Input id="materials" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        );
      case "entrepreneurship":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businesses">Businesses supported</Label>
                <Input id="businesses" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="jobs">Jobs created</Label>
                <Input id="jobs" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="training">Training sessions conducted</Label>
                <Input id="training" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="revenue">Revenue generated ($)</Label>
                <Input id="revenue" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        );
      case "environment":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="treesPlanted">Trees planted</Label>
                <Input id="treesPlanted" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="wasteCollected">Waste collected (Kg)</Label>
                <Input id="wasteCollected" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="areaRestored">Area restored (m²)</Label>
                <Input id="areaRestored" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="volunteers">Number of volunteers</Label>
                <Input id="volunteers" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        );
      case "gender":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="womenSupported">Women supported</Label>
                <Input id="womenSupported" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="workshops">Workshops conducted</Label>
                <Input id="workshops" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="awareness">Awareness campaigns</Label>
                <Input id="awareness" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="participants">Total participants</Label>
                <Input id="participants" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout role="ngo">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's projects and track progress
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
                  <Label htmlFor="month">Select Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose month" />
                    </SelectTrigger>
                    <SelectContent>
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="projectManager">
                    Project Manager <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="projectManager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Enter manager name"
                  />
                </div>

                <div>
                  <Label htmlFor="focusArea">
                    Focus Area <span className="text-destructive">*</span>
                  </Label>
                  <Select value={focusArea} onValueChange={(value) => {
                    setFocusArea(value);
                    setFormData({ ...formData, focusArea: value });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="gender">Gender Equity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {renderIndicators()}

                <div className="pt-4 border-t">
                  <Button variant="outline" className="gap-2 w-full">
                    <Upload className="w-4 h-4" />
                    Upload Files
                  </Button>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreate} className="flex-1">
                    Save Project
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateOpen(false);
                      setFormData({ name: "", manager: "", focusArea: "" });
                      setFocusArea("");
                      setSelectedMonth("");
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
                <TableHead>Focus Area</TableHead>
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
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {project.focusArea}
                    </span>
                  </TableCell>
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

export default NGOProjects;
