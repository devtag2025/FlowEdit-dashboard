import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// ─── CLIENT: Fetch own projects ───
export async function fetchClientProjects(userId) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ─── CONTRACTOR: Fetch assigned projects ───
export async function fetchContractorProjects(userId) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      client:profiles!client_id(id, name, email, avatar_url)
    `)
    .eq("contractor_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ─── ADMIN: Fetch all projects ───
export async function fetchAllProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      client:profiles!client_id(id, name, email, avatar_url),
      contractor:profiles!contractor_id(id, name, email, avatar_url)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ─── ALL ROLES: Fetch single project with details ───
export async function fetchProjectById(id) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      client:profiles!client_id(id, name, email, avatar_url),
      contractor:profiles!contractor_id(id, name, email, avatar_url),
      comments:project_comments(
        id, content, created_at,
        author:profiles!author_id(id, name, avatar_url)
      ),
      versions:project_versions(
        id, version_number, video_url, notes, status, created_at,
        uploader:profiles!uploaded_by(id, name, avatar_url)
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ─── CLIENT: Create new project ───
export async function createProject({
  title,
  description,
  platform,
  desired_length,
  priority = "medium",
  style_preferences,
  asset_links = [],
  apply_branding = false,
  additional_notes,
  deadline,
  client_id,
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      platform,
      desired_length,
      priority,
      style_preferences,
      asset_links,
      apply_branding,
      additional_notes,
      deadline: deadline || null,
      client_id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── UPDATE: Project status ───
export async function updateProjectStatus(id, status) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── ADMIN: Assign contractor ───
export async function assignContractor(projectId, contractorId, adminId) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      contractor_id: contractorId,
      assigned_by: adminId,
      status: "in_progress",
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── CONTRACTOR: Update posting details ───
export async function updatePostingDetails(id, { final_video_url, caption, hashtags, posting_notes }) {
  const { data, error } = await supabase
    .from("projects")
    .update({ final_video_url, caption, hashtags, posting_notes })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── CONTRACTOR: Mark ready to post ───
export async function markReadyToPost(id) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status: "ready_to_post" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── ADMIN: Mark as posted ───
export async function markPosted(id, publishedUrl) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      published_url: publishedUrl,
      posted_at: new Date().toISOString(),
      status: "posted",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── CLIENT: Approve project ───
export async function approveProject(id, userId) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      approved_at: new Date().toISOString(),
      approved_by: userId,
      status: "completed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── COMMENTS ───
export async function fetchComments(projectId) {
  const { data, error } = await supabase
    .from("project_comments")
    .select(`
      id, content, created_at,
      author:profiles!author_id(id, name, avatar_url)
    `)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addComment(projectId, authorId, content) {
  const { data, error } = await supabase
    .from("project_comments")
    .insert({ project_id: projectId, author_id: authorId, content })
    .select(`
      id, content, created_at,
      author:profiles!author_id(id, name, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data;
}

// ─── VERSIONS ───
export async function fetchVersions(projectId) {
  const { data, error } = await supabase
    .from("project_versions")
    .select(`
      id, version_number, video_url, notes, status, created_at,
      uploader:profiles!uploaded_by(id, name, avatar_url)
    `)
    .eq("project_id", projectId)
    .order("version_number", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createVersion(projectId, { video_url, notes, uploaded_by }) {
  // Get next version number
  const { data: existing } = await supabase
    .from("project_versions")
    .select("version_number")
    .eq("project_id", projectId)
    .order("version_number", { ascending: false })
    .limit(1);

  const nextVersion = existing && existing.length > 0 ? existing[0].version_number + 1 : 1;

  const { data, error } = await supabase
    .from("project_versions")
    .insert({
      project_id: projectId,
      version_number: nextVersion,
      video_url,
      notes,
      uploaded_by,
    })
    .select(`
      id, version_number, video_url, notes, status, created_at,
      uploader:profiles!uploaded_by(id, name, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data;
}

// ─── PROFILE: Fetch user profile ───
export async function fetchUserProfile() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
  if (!data) return null;

  return { ...data, auth_id: user.id };
}
