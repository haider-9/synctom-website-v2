"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2, X, Users as UsersIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  email: string | null;
  order: number;
  status: string;
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    linkedin: "",
    twitter: "",
    github: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();

      if (data.success) {
        setTeamMembers(data.teamMembers);
      } else {
        toast.error("Failed to load team members");
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const savePromise = (async () => {
      let imageUrl = formData.image;

      // If there's a new image file, convert to base64
      if (imageFile) {
        const reader = new FileReader();
        imageUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      const url = editingMember ? `/api/team/${editingMember.id}` : "/api/team";
      const method = editingMember ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to save team member");
      }

      await fetchTeamMembers();
      resetForm();
      return data;
    })();

    toast.promise(savePromise, {
      loading: editingMember ? "Updating team member..." : "Adding team member...",
      success: editingMember ? "Team member updated!" : "Team member added!",
      error: (err) => err.message || "Failed to save team member",
      finally: () => setIsSubmitting(false),
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      image: member.image || "",
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
      github: member.github || "",
      email: member.email || "",
    });
    setImagePreview(member.image || "");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    setDeletingId(id);

    const deletePromise = (async () => {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete team member");
      }

      await fetchTeamMembers();
      return data;
    })();

    toast.promise(deletePromise, {
      loading: "Deleting team member...",
      success: "Team member deleted successfully",
      error: (err) => err.message || "Failed to delete team member",
      finally: () => setDeletingId(null),
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      linkedin: "",
      twitter: "",
      github: "",
      email: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingMember(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Team Management</h1>
              <p className="text-sm text-muted-foreground">
                {teamMembers.length} team member{teamMembers.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="size-4" />
            Add Member
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading team members...</div>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-20">
            <UsersIcon className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team members yet</h3>
            <p className="text-muted-foreground mb-6">Add your first team member to get started</p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="size-4" />
              Add Team Member
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-900 border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xl">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>

                {member.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                )}

                {(member.email || member.linkedin || member.twitter || member.github) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Email
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="flex-1 gap-2"
                    disabled={deletingId === member.id}
                  >
                    <Edit className="size-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    disabled={deletingId === member.id}
                  >
                    <Trash2 className="size-4" />
                    {deletingId === member.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={resetForm}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="size-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      type="url"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="github"
                      type="url"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1" disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
