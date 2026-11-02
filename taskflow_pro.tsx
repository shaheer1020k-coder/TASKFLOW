import React, { useState, useMemo } from 'react';
import {
  Layers,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns3,
  ListTodo,
  Users,
  Activity,
  BarChart3,
  UserCircle,
  Settings,
  ShieldCheck,
  Building2,
  Plus,
  Search,
  Moon,
  Sun,
  LogOut,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Trash2,
  Archive,
  UserPlus,
  UserMinus,
  Send,
  Edit3,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const INITIAL_USERS = [
  {
    _id: 'u_admin',
    name: 'Zainab Tariq',
    email: 'admin@taskflow.pro',
    password: 'AdminPassword123!',
    globalRole: 'admin',
    jobTitle: 'VP of Engineering & Platform Admin',
    initials: 'ZT',
    avatarColor: '#6366F1',
    bio: 'Oversees engineering operations, security compliance, and workspace administration.',
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    _id: 'u_manager',
    name: 'Hamza Siddiqui',
    email: 'manager@taskflow.pro',
    password: 'ManagerPassword123!',
    globalRole: 'project_manager',
    jobTitle: 'Senior Technical Project Manager',
    initials: 'HS',
    avatarColor: '#4338CA',
    bio: 'Leads agile delivery across SaaS core products and customer onboarding initiatives.',
    createdAt: '2026-09-05T10:00:00Z',
  },
  {
    _id: 'u_ayesha',
    name: 'Ayesha Khan',
    email: 'ayesha@taskflow.pro',
    password: 'MemberPassword123!',
    globalRole: 'team_member',
    jobTitle: 'Senior Frontend Engineer',
    initials: 'AK',
    avatarColor: '#10B981',
    bio: 'Specializes in React design systems, accessibility, and interactive data visualizations.',
    createdAt: '2026-09-10T10:00:00Z',
  },
  {
    _id: 'u_bilal',
    name: 'Bilal Ahmed',
    email: 'bilal@taskflow.pro',
    password: 'MemberPassword123!',
    globalRole: 'team_member',
    jobTitle: 'Backend Systems Engineer',
    initials: 'BA',
    avatarColor: '#0EA5E9',
    bio: 'Focuses on Node.js microservices, MongoDB aggregation performance, and API security.',
    createdAt: '2026-09-12T10:00:00Z',
  },
  {
    _id: 'u_sara',
    name: 'Sara Mahmood',
    email: 'sara@taskflow.pro',
    password: 'MemberPassword123!',
    globalRole: 'team_member',
    jobTitle: 'QA & DevOps Specialist',
    initials: 'SM',
    avatarColor: '#F59E0B',
    bio: 'Maintains automated integration suites, CI/CD pipelines, and release quality gates.',
    createdAt: '2026-09-15T10:00:00Z',
  },
];

const INITIAL_PROJECTS = [
  {
    _id: 'p_cloud',
    title: 'FlowSync Cloud Migration & v3 API',
    description:
      'Migrate multi-tenant customer workspaces to zero-downtime Atlas clusters and ship v3 REST endpoints with strict RBAC.',
    owner: 'u_manager',
    status: 'Active',
    startDate: '2026-10-10',
    dueDate: '2026-11-24',
    members: [
      { user: 'u_manager', projectRole: 'manager' },
      { user: 'u_ayesha', projectRole: 'member' },
      { user: 'u_bilal', projectRole: 'member' },
      { user: 'u_sara', projectRole: 'member' },
    ],
  },
  {
    _id: 'p_design',
    title: 'Planora Design System & Kanban 2.0',
    description:
      'Unify SaaS dashboard components, dark-mode tokens, drag-and-drop Kanban workflows, and real-time Recharts analytics.',
    owner: 'u_manager',
    status: 'Active',
    startDate: '2026-10-15',
    dueDate: '2026-11-30',
    members: [
      { user: 'u_manager', projectRole: 'manager' },
      { user: 'u_ayesha', projectRole: 'member' },
      { user: 'u_sara', projectRole: 'member' },
    ],
  },
  {
    _id: 'p_sec',
    title: 'SOC2 Type II Security & Audit Readiness',
    description:
      'Harden HTTP-only cookie sessions, rate limiters, audit log retention, and automated penetration testing.',
    owner: 'u_admin',
    status: 'Planned',
    startDate: '2026-10-25',
    dueDate: '2026-12-15',
    members: [
      { user: 'u_admin', projectRole: 'manager' },
      { user: 'u_bilal', projectRole: 'member' },
      { user: 'u_sara', projectRole: 'member' },
    ],
  },
];

const INITIAL_TASKS = [
  {
    _id: 't_1',
    title: 'Design MongoDB compound indexes for tasks & activity logs',
    description:
      'Optimize query execution plans for dashboard aggregations and project-scoped task filtering.',
    project: 'p_cloud',
    assignee: 'u_bilal',
    createdBy: 'u_manager',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-28',
    updatedAt: '2026-10-28',
  },
  {
    _id: 't_2',
    title: 'Implement JWT HTTP-only cookie refresh & CSRF double-submit guard',
    description:
      'Ensure cross-origin cookie safety and strict role verification middleware across all protected routes.',
    project: 'p_cloud',
    assignee: 'u_bilal',
    createdBy: 'u_manager',
    status: 'In Review',
    priority: 'Urgent',
    dueDate: '2026-11-06',
    updatedAt: '2026-10-30',
  },
  {
    _id: 't_3',
    title: 'Build responsive Drag-and-Drop Kanban board with optimistic updates',
    description:
      'Support dragging task cards across To Do, In Progress, In Review, and Completed columns.',
    project: 'p_design',
    assignee: 'u_ayesha',
    createdBy: 'u_manager',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-11-09',
    updatedAt: '2026-10-31',
  },
  {
    _id: 't_4',
    title: 'Create Recharts analytics widgets for status & priority breakdown',
    description:
      'Connect dashboard charts to MongoDB aggregation endpoints with responsive containers.',
    project: 'p_design',
    assignee: 'u_ayesha',
    createdBy: 'u_manager',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-29',
    updatedAt: '2026-10-29',
  },
  {
    _id: 't_5',
    title: 'Write Supertest integration suite for RBAC & unauthorized access denial',
    description:
      'Verify that team members cannot modify unrelated projects or escalate their global roles.',
    project: 'p_cloud',
    assignee: 'u_sara',
    createdBy: 'u_manager',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-11-08',
    updatedAt: '2026-11-01',
  },
  {
    _id: 't_6',
    title: 'Audit legacy webhook endpoints for rate-limiting compliance',
    description:
      'Configure express-rate-limit thresholds and verify 429 response payloads under burst traffic.',
    project: 'p_sec',
    assignee: 'u_bilal',
    createdBy: 'u_admin',
    status: 'To Do',
    priority: 'Urgent',
    dueDate: '2026-10-30',
    updatedAt: '2026-11-01',
  },
  {
    _id: 't_7',
    title: 'Document REST API request/response schemas in README',
    description:
      'Provide complete curl/Postman examples, status code tables, and Windows VS Code local setup steps.',
    project: 'p_sec',
    assignee: 'u_sara',
    createdBy: 'u_admin',
    status: 'To Do',
    priority: 'Low',
    dueDate: '2026-11-18',
    updatedAt: '2026-11-02',
  },
];

const INITIAL_COMMENTS = [
  {
    _id: 'c_1',
    task: 't_2',
    author: 'u_bilal',
    body: 'Added HTTP-only + SameSite cookie flags and verified X-CSRF-Token header validation. Ready for security review.',
    createdAt: '2026-11-01T11:20:00Z',
  },
  {
    _id: 'c_2',
    task: 't_2',
    author: 'u_manager',
    body: 'Great work Bilal! Sara is running the automated Supertest suite against the auth endpoints today.',
    createdAt: '2026-11-01T14:05:00Z',
  },
  {
    _id: 'c_3',
    task: 't_3',
    author: 'u_ayesha',
    body: 'Kanban column transitions are wired to PATCH /api/tasks/:id with instant UI feedback.',
    createdAt: '2026-11-02T09:15:00Z',
  },
];

const INITIAL_ACTIVITY = [
  {
    _id: 'a_1',
    project: 'p_cloud',
    actor: 'u_manager',
    action: 'created project "FlowSync Cloud Migration & v3 API"',
    createdAt: '2026-10-28T09:00:00Z',
  },
  {
    _id: 'a_2',
    project: 'p_cloud',
    actor: 'u_bilal',
    action: 'moved "Design MongoDB compound indexes" to Completed',
    createdAt: '2026-10-29T16:30:00Z',
  },
  {
    _id: 'a_3',
    project: 'p_design',
    actor: 'u_ayesha',
    action: 'commented on "Build responsive Drag-and-Drop Kanban board"',
    createdAt: '2026-11-02T09:15:00Z',
  },
];

const BADGE_STYLES = {
  'To Do': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  'In Progress': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
  'In Review': 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
  Low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Medium: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300',
  High: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
  Urgent: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300',
  Planned: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300',
  Active: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
  'On Hold': 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
  Archived: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  admin: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300',
  project_manager: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
  team_member: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
};

const ROLE_LABELS = {
  admin: 'Administrator',
  project_manager: 'Project Manager',
  team_member: 'Team Member',
};

const STATUS_COLORS = ['#64748B', '#6366F1', '#F59E0B', '#22C55E'];
const PRIORITY_COLORS = ['#94A3B8', '#0EA5E9', '#F59E0B', '#EF4444'];
const KANBAN_COLUMNS = ['To Do', 'In Progress', 'In Review', 'Completed'];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITY);

  const [currentUserId, setCurrentUserId] = useState('u_admin');
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState('p_cloud');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Filters & Modals
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  const [taskProjectFilter, setTaskProjectFilter] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('');
  const [kanbanProjectFilter, setKanbanProjectFilter] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    description: '',
    status: 'Active',
    startDate: '2026-11-02',
    dueDate: '2026-12-05',
    memberIds: ['u_ayesha', 'u_bilal'],
  });

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    project: 'p_cloud',
    assignee: 'u_bilal',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-11-12',
  });

  const [authForm, setAuthForm] = useState({
    email: 'admin@taskflow.pro',
    password: 'AdminPassword123!',
    name: '',
    jobTitle: '',
  });

  const currentUser = useMemo(
    () => users.find((u) => u._id === currentUserId) || null,
    [users, currentUserId]
  );

  const notify = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const getUser = (id) => users.find((u) => u._id === id);
  const getProject = (id) => projects.find((p) => p._id === id);

  const canAccessProject = (proj, user = currentUser) => {
    if (!proj || !user) return false;
    if (user.globalRole === 'admin') return true;
    if (proj.owner === user._id) return true;
    return proj.members.some((m) => m.user === user._id);
  };

  const canManageProject = (proj, user = currentUser) => {
    if (!proj || !user) return false;
    if (user.globalRole === 'admin') return true;
    if (proj.owner === user._id) return true;
    const entry = proj.members.find((m) => m.user === user._id);
    return entry?.projectRole === 'manager';
  };

  const accessibleProjects = useMemo(
    () => projects.filter((p) => canAccessProject(p, currentUser)),
    [projects, currentUser]
  );

  const accessibleProjectIds = useMemo(
    () => new Set(accessibleProjects.map((p) => p._id)),
    [accessibleProjects]
  );

  const accessibleTasks = useMemo(
    () => tasks.filter((t) => accessibleProjectIds.has(t.project)),
    [tasks, accessibleProjectIds]
  );

  const enrichedProjects = useMemo(() => {
    return accessibleProjects.map((p) => {
      const pTasks = tasks.filter((t) => t.project === p._id);
      const completed = pTasks.filter((t) => t.status === 'Completed').length;
      const pct = pTasks.length > 0 ? Math.round((completed / pTasks.length) * 100) : 0;
      return {
        ...p,
        totalTasks: pTasks.length,
        completedTasks: completed,
        completionPercentage: pct,
      };
    });
  }, [accessibleProjects, tasks]);

  const recordActivity = (projectId, actionText) => {
    setActivities((prev) => [
      {
        _id: `a_${Date.now()}`,
        project: projectId,
        actor: currentUser?._id || 'u_admin',
        action: actionText,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;
    const proj = getProject(task.project);
    const isManager = canManageProject(proj);
    const isAssignee = task.assignee === currentUser?._id;
    if (!isManager && !isAssignee) {
      notify('Permission denied: Only the assignee or project manager can update this task.');
      return;
    }
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : t
      )
    );
    recordActivity(task.project, `moved "${task.title}" from ${task.status} to ${newStatus}`);
    notify(`Task moved to ${newStatus}`);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.title.trim()) return;
    const newId = `p_${Date.now()}`;
    const members = [
      { user: currentUser._id, projectRole: 'manager' },
      ...newProjectForm.memberIds
        .filter((id) => id !== currentUser._id)
        .map((id) => ({ user: id, projectRole: 'member' })),
    ];
    const proj = {
      _id: newId,
      title: newProjectForm.title.trim(),
      description: newProjectForm.description.trim(),
      owner: currentUser._id,
      status: newProjectForm.status,
      startDate: newProjectForm.startDate,
      dueDate: newProjectForm.dueDate,
      members,
    };
    setProjects((prev) => [proj, ...prev]);
    recordActivity(newId, `created project "${proj.title}"`);
    notify('Project created successfully!');
    setSelectedProjectId(newId);
    setActivePage('project-details');
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title.trim()) return;
    const proj = getProject(newTaskForm.project);
    if (!canManageProject(proj)) {
      notify('Only Project Managers or Admins can create tasks.');
      return;
    }
    const newTask = {
      _id: `t_${Date.now()}`,
      title: newTaskForm.title.trim(),
      description: newTaskForm.description.trim(),
      project: newTaskForm.project,
      assignee: newTaskForm.assignee || null,
      createdBy: currentUser._id,
      status: newTaskForm.status,
      priority: newTaskForm.priority,
      dueDate: newTaskForm.dueDate,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [newTask, ...prev]);
    recordActivity(newTask.project, `created task "${newTask.title}" [${newTask.priority}]`);
    setIsNewTaskModalOpen(false);
    setNewTaskForm({ ...newTaskForm, title: '', description: '' });
    notify('Task created and assigned!');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeTaskModal) return;
    const newComment = {
      _id: `c_${Date.now()}`,
      task: activeTaskModal._id,
      author: currentUser._id,
      body: commentInput.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
    recordActivity(activeTaskModal.project, `commented on "${activeTaskModal.title}"`);
    setCommentInput('');
    notify('Comment posted');
  };

  // Dashboard & Analytics Computed Data
  const stats = useMemo(() => {
    const totalProjects = enrichedProjects.length;
    const activeProjects = enrichedProjects.filter((p) => p.status === 'Active').length;
    const totalTasks = accessibleTasks.length;
    const completedTasks = accessibleTasks.filter((t) => t.status === 'Completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const overdueTasks = accessibleTasks.filter(
      (t) => t.status !== 'Completed' && t.dueDate && new Date(t.dueDate) < new Date('2026-11-02')
    ).length;
    return {
      totalProjects,
      activeProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    };
  }, [enrichedProjects, accessibleTasks]);

  const statusChartData = useMemo(() => {
    return KANBAN_COLUMNS.map((status) => ({
      name: status,
      value: accessibleTasks.filter((t) => t.status === status).length,
    }));
  }, [accessibleTasks]);

  const priorityChartData = useMemo(() => {
    return ['Low', 'Medium', 'High', 'Urgent'].map((priority) => ({
      name: priority,
      value: accessibleTasks.filter((t) => t.priority === priority).length,
    }));
  }, [accessibleTasks]);

  // Public Pages (Landing / Login / Register)
  if (!currentUser || ['landing', 'login', 'register'].includes(activePage)) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans">
          <header className="max-w-7xl w-full mx-auto px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActivePage('landing')}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                TaskFlow <span className="text-indigo-400">Pro</span>
              </span>
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActivePage('login')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActivePage('register')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold"
              >
                Register
              </button>
              {currentUser && (
                <button
                  type="button"
                  onClick={() => setActivePage('dashboard')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
                >
                  Open Workspace
                </button>
              )}
            </div>
          </header>

          {activePage === 'landing' && (
            <main className="flex-1 max-w-6xl mx-auto px-6 py-16 text-center space-y-8">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs">
                <Lock className="w-3.5 h-3.5" /> Full-Stack MERN Project & Team Management SaaS
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
                Manage engineering projects, Kanban workflows, and team velocity in one place
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Built with React, Tailwind CSS, Express, MongoDB, JWT HTTP-only cookies, and
                Role-Based Access Control across Admin, Project Manager, and Team Member roles.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) setCurrentUserId('u_admin');
                    setActivePage('dashboard');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm shadow-lg shadow-indigo-600/30"
                >
                  Launch Interactive Dashboard <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm border border-slate-700"
                >
                  Sign In Screen
                </button>
              </div>
            </main>
          )}

          {activePage === 'login' && (
            <main className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-5">
                <h2 className="text-xl font-bold text-center">Sign in to TaskFlow Pro</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const found = users.find(
                      (u) => u.email.toLowerCase() === authForm.email.toLowerCase()
                    );
                    if (!found) {
                      notify('Invalid email or password');
                      return;
                    }
                    setCurrentUserId(found._id);
                    setActivePage('dashboard');
                    notify(`Welcome back, ${found.name}!`);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
                  >
                    Sign In
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-[11px] text-slate-400 text-center mb-2">
                    One-Click Demo Role Accounts
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserId('u_admin');
                        setActivePage('dashboard');
                      }}
                      className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserId('u_manager');
                        setActivePage('dashboard');
                      }}
                      className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs"
                    >
                      Manager
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserId('u_ayesha');
                        setActivePage('dashboard');
                      }}
                      className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs"
                    >
                      Member
                    </button>
                  </div>
                </div>
              </div>
            </main>
          )}

          {activePage === 'register' && (
            <main className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
                <h2 className="text-xl font-bold text-center">Create Team Member Account</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!authForm.name.trim() || !authForm.email.trim()) return;
                    const newId = `u_${Date.now()}`;
                    const parts = authForm.name.trim().split(/\s+/);
                    const initials = parts
                      .slice(0, 2)
                      .map((p) => p[0].toUpperCase())
                      .join('');
                    const created = {
                      _id: newId,
                      name: authForm.name.trim(),
                      email: authForm.email.trim().toLowerCase(),
                      globalRole: 'team_member',
                      jobTitle: authForm.jobTitle || 'Software Engineer',
                      initials,
                      avatarColor: '#10B981',
                      bio: '',
                      createdAt: new Date().toISOString(),
                    };
                    setUsers((prev) => [...prev, created]);
                    setCurrentUserId(newId);
                    setActivePage('dashboard');
                    notify('Account registered as Team Member!');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      placeholder="Omar Farooq"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      placeholder="omar@taskflow.pro"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={authForm.jobTitle}
                      onChange={(e) => setAuthForm({ ...authForm, jobTitle: e.target.value })}
                      placeholder="Full-Stack Developer"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'All Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Task Management', icon: CheckSquare },
    { id: 'kanban', label: 'Kanban Board', icon: Columns3 },
    { id: 'my-tasks', label: 'My Tasks', icon: ListTodo },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'activity', label: 'Activity History', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'User Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminItems =
    currentUser.globalRole === 'admin'
      ? [
          { id: 'admin-users', label: 'User Management', icon: ShieldCheck },
          { id: 'admin-org', label: 'Organization Overview', icon: Building2 },
        ]
      : [];

  const activeProjectObj =
    enrichedProjects.find((p) => p._id === selectedProjectId) || enrichedProjects[0];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans">
        {/* Toast Banner */}
        {toastMsg && (
          <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Sidebar */}
        <aside
          className={`bg-[#111827] text-white border-r border-slate-800 flex flex-col transition-all duration-200 shrink-0 ${
            sidebarCollapsed ? 'w-16' : 'w-60'
          }`}
        >
          <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActivePage('landing')}
              className="flex items-center gap-2.5 overflow-hidden"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="font-bold text-base truncate">
                  TaskFlow <span className="text-indigo-400">Pro</span>
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}

            {adminItems.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-800 space-y-1">
                {!sidebarCollapsed && (
                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                    Admin Controls
                  </p>
                )}
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation Bar with Role Switcher */}
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {ROLE_LABELS[currentUser.globalRole]} • {currentUser.jobTitle}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Interactive Role Switcher for Testing RBAC */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Switch User:</span>
                <select
                  value={currentUser._id}
                  onChange={(e) => {
                    setCurrentUserId(e.target.value);
                    notify('Switched active user session');
                  }}
                  className="bg-transparent font-semibold text-xs focus:outline-none"
                  aria-label="Switch user role"
                >
                  {users.map((u) => (
                    <option key={u._id} value={u._id} className="text-slate-900">
                      {u.name} ({ROLE_LABELS[u.globalRole]})
                    </option>
                  ))}
                </select>
              </div>

              {['admin', 'project_manager'].includes(currentUser.globalRole) && (
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> New Task
                </button>
              )}

              <button
                type="button"
                onClick={() => setDarkMode((d) => !d)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActivePage('login')}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Dynamic Page Body */}
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
            {/* DASHBOARD PAGE */}
            {activePage === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold">Executive SaaS Dashboard</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Role-aware metrics calculated from your accessible projects and tasks.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePage('kanban')}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      Open Kanban Board
                    </button>
                    {['admin', 'project_manager'].includes(currentUser.globalRole) && (
                      <button
                        type="button"
                        onClick={() => setActivePage('create-project')}
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                      >
                        + Create Project
                      </button>
                    )}
                  </div>
                </div>

                {/* 6 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {[
                    { label: 'Total Projects', val: stats.totalProjects, icon: FolderKanban },
                    { label: 'Active Projects', val: stats.activeProjects, icon: Layers },
                    { label: 'Total Tasks', val: stats.totalTasks, icon: Activity },
                    { label: 'Completed Tasks', val: stats.completedTasks, icon: CheckCircle2 },
                    { label: 'Pending Tasks', val: stats.pendingTasks, icon: Clock },
                    { label: 'Overdue Tasks', val: stats.overdueTasks, icon: AlertCircle },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.label}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-slate-500">
                            {card.label}
                          </span>
                          <Icon className="w-4 h-4 text-indigo-500" />
                        </div>
                        <p className="text-2xl font-bold mt-2">{card.val}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Task Status Distribution</h3>
                    <div className="relative h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                          >
                            {statusChartData.map((entry, idx) => (
                              <Cell key={entry.name} fill={STATUS_COLORS[idx]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Task Priority Distribution</h3>
                    <div className="relative h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priorityChartData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {priorityChartData.map((entry, idx) => (
                              <Cell key={entry.name} fill={PRIORITY_COLORS[idx]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Recent Projects & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Active Projects Progress</h3>
                    <div className="space-y-3">
                      {enrichedProjects.map((p) => (
                        <div
                          key={p._id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProjectId(p._id);
                                setActivePage('project-details');
                              }}
                              className="font-semibold hover:text-indigo-600 text-left"
                            >
                              {p.title}
                            </button>
                            <span className="font-bold text-indigo-600">
                              {p.completionPercentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${p.completionPercentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Recent Audit Activity</h3>
                    <div className="space-y-2.5">
                      {activities.slice(0, 5).map((act) => {
                        const actor = getUser(act.actor);
                        return (
                          <div
                            key={act._id}
                            className="flex items-center gap-2.5 text-xs border-b border-slate-100 dark:border-slate-800 pb-2 last:border-none"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                              style={{ backgroundColor: actor?.avatarColor || '#6366F1' }}
                            >
                              {actor?.initials || 'U'}
                            </div>
                            <span className="truncate">
                              <strong>{actor?.name}</strong> {act.action}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ALL PROJECTS PAGE */}
            {activePage === 'projects' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold">Projects Portfolio</h1>
                    <p className="text-xs text-slate-500">
                      Click any project to inspect tasks, members, and completion metrics.
                    </p>
                  </div>
                  {['admin', 'project_manager'].includes(currentUser.globalRole) && (
                    <button
                      type="button"
                      onClick={() => setActivePage('create-project')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                    >
                      + Create Project
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <select
                    value={projectStatusFilter}
                    onChange={(e) => setProjectStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="">All Statuses</option>
                    <option value="Planned">Planned</option>
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrichedProjects
                    .filter(
                      (p) =>
                        (!projectStatusFilter || p.status === projectStatusFilter) &&
                        (!projectSearch ||
                          p.title.toLowerCase().includes(projectSearch.toLowerCase()))
                    )
                    .map((proj) => (
                      <div
                        key={proj._id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProjectId(proj._id);
                                setActivePage('project-details');
                              }}
                              className="text-sm font-bold hover:text-indigo-600 text-left"
                            >
                              {proj.title}
                            </button>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                                BADGE_STYLES[proj.status]
                              }`}
                            >
                              {proj.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                            {proj.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Completion</span>
                            <span className="font-semibold">
                              {proj.completionPercentage}% ({proj.completedTasks}/{proj.totalTasks})
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${proj.completionPercentage}%` }}
                            />
                          </div>
                          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                            <span>Due {proj.dueDate}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProjectId(proj._id);
                                setActivePage('project-details');
                              }}
                              className="text-indigo-600 dark:text-indigo-400 font-semibold"
                            >
                              Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* CREATE PROJECT PAGE */}
            {activePage === 'create-project' && (
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <h1 className="text-lg font-bold">Create New Project</h1>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={newProjectForm.title}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, title: e.target.value })
                      }
                      placeholder="e.g., Q4 Mobile App Release"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newProjectForm.description}
                      onChange={(e) =>
                        setNewProjectForm({ ...newProjectForm, description: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newProjectForm.startDate}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, startDate: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Due Date</label>
                      <input
                        type="date"
                        value={newProjectForm.dueDate}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, dueDate: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePage('projects')}
                      className="px-4 py-2 text-xs rounded-xl border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white"
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PROJECT DETAILS PAGE */}
            {activePage === 'project-details' && activeProjectObj && (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-xl font-bold">{activeProjectObj.title}</h1>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          BADGE_STYLES[activeProjectObj.status]
                        }`}
                      >
                        {activeProjectObj.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{activeProjectObj.description}</p>
                  </div>
                  {canManageProject(activeProjectObj) && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProjects((prev) =>
                            prev.map((p) =>
                              p._id === activeProjectObj._id
                                ? {
                                    ...p,
                                    status: p.status === 'Archived' ? 'Active' : 'Archived',
                                  }
                                : p
                            )
                          );
                          notify('Updated project archive status');
                        }}
                        className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        {activeProjectObj.status === 'Archived' ? 'Restore' : 'Archive'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="text-sm font-semibold">Associated Tasks</h3>
                    {tasks
                      .filter((t) => t.project === activeProjectObj._id)
                      .map((t) => (
                        <div
                          key={t._id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <button
                              type="button"
                              onClick={() => setActiveTaskModal(t)}
                              className="font-semibold hover:text-indigo-600 text-left"
                            >
                              {t.title}
                            </button>
                            <p className="text-[11px] text-slate-400">
                              Assignee: {getUser(t.assignee)?.name || 'Unassigned'} • Due {t.dueDate}
                            </p>
                          </div>
                          <select
                            value={t.status}
                            onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                          >
                            {KANBAN_COLUMNS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="text-sm font-semibold">Project Members</h3>
                    {activeProjectObj.members.map((m) => {
                      const u = getUser(m.user);
                      return (
                        <div
                          key={m.user}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs"
                        >
                          <span>
                            <strong>{u?.name}</strong> ({m.projectRole})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TASK MANAGEMENT PAGE */}
            {activePage === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">Task Management</h1>
                  {['admin', 'project_manager'].includes(currentUser.globalRole) && (
                    <button
                      type="button"
                      onClick={() => setIsNewTaskModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                    >
                      + Create Task
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    value={taskSearch}
                    onChange={(e) => setTaskSearch(e.target.value)}
                    placeholder="Search tasks..."
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <select
                    value={taskProjectFilter}
                    onChange={(e) => setTaskProjectFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="">All Projects</option>
                    {enrichedProjects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={taskStatusFilter}
                    onChange={(e) => setTaskStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="">All Statuses</option>
                    {KANBAN_COLUMNS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <select
                    value={taskPriorityFilter}
                    onChange={(e) => setTaskPriorityFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="">All Priorities</option>
                    {['Low', 'Medium', 'High', 'Urgent'].map((pr) => (
                      <option key={pr} value={pr}>
                        {pr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                        <th className="py-3 px-4">Task</th>
                        <th className="py-3 px-4">Project</th>
                        <th className="py-3 px-4">Assignee</th>
                        <th className="py-3 px-4">Priority</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {accessibleTasks
                        .filter(
                          (t) =>
                            (!taskProjectFilter || t.project === taskProjectFilter) &&
                            (!taskStatusFilter || t.status === taskStatusFilter) &&
                            (!taskPriorityFilter || t.priority === taskPriorityFilter) &&
                            (!taskSearch ||
                              t.title.toLowerCase().includes(taskSearch.toLowerCase()))
                        )
                        .map((t) => (
                          <tr key={t._id}>
                            <td className="py-3 px-4 font-semibold">
                              <button
                                type="button"
                                onClick={() => setActiveTaskModal(t)}
                                className="hover:text-indigo-600 text-left"
                              >
                                {t.title}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {getProject(t.project)?.title}
                            </td>
                            <td className="py-3 px-4">
                              {getUser(t.assignee)?.name || 'Unassigned'}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] ${
                                  BADGE_STYLES[t.priority]
                                }`}
                              >
                                {t.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={t.status}
                                onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                                className="px-2 py-1 rounded-lg border bg-white dark:bg-slate-900"
                              >
                                {KANBAN_COLUMNS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{t.dueDate}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* KANBAN BOARD PAGE */}
            {activePage === 'kanban' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold">Interactive Kanban Board</h1>
                    <p className="text-xs text-slate-500">
                      Drag and drop cards across columns or click any task to view comments.
                    </p>
                  </div>
                  <select
                    value={kanbanProjectFilter}
                    onChange={(e) => setKanbanProjectFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="">All Accessible Projects</option>
                    {enrichedProjects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {KANBAN_COLUMNS.map((colStatus) => {
                    const colTasks = accessibleTasks.filter(
                      (t) =>
                        t.status === colStatus &&
                        (!kanbanProjectFilter || t.project === kanbanProjectFilter)
                    );
                    return (
                      <div
                        key={colStatus}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedTaskId) {
                            handleUpdateTaskStatus(draggedTaskId, colStatus);
                            setDraggedTaskId(null);
                          }
                        }}
                        className="bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 min-h-[420px] flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between px-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${BADGE_STYLES[colStatus]}`}
                          >
                            {colStatus}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {colTasks.length}
                          </span>
                        </div>

                        {colTasks.map((t) => {
                          const assignee = getUser(t.assignee);
                          return (
                            <div
                              key={t._id}
                              draggable
                              onDragStart={() => setDraggedTaskId(t._id)}
                              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs cursor-grab space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                    BADGE_STYLES[t.priority]
                                  }`}
                                >
                                  {t.priority}
                                </span>
                                <span className="text-[11px] text-slate-400">{t.dueDate}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveTaskModal(t)}
                                className="text-xs font-semibold hover:text-indigo-600 text-left block"
                              >
                                {t.title}
                              </button>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                                <span className="truncate max-w-[130px]">
                                  {getProject(t.project)?.title}
                                </span>
                                {assignee && (
                                  <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                                    style={{ backgroundColor: assignee.avatarColor }}
                                  >
                                    {assignee.initials}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MY TASKS PAGE */}
            {activePage === 'my-tasks' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">My Assigned Tasks</h1>
                <div className="space-y-3">
                  {accessibleTasks
                    .filter((t) => t.assignee === currentUser._id)
                    .map((t) => (
                      <div
                        key={t._id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div>
                          <button
                            type="button"
                            onClick={() => setActiveTaskModal(t)}
                            className="text-sm font-semibold hover:text-indigo-600 text-left"
                          >
                            {t.title}
                          </button>
                          <p className="text-xs text-slate-500">
                            {getProject(t.project)?.title} • Due {t.dueDate}
                          </p>
                        </div>
                        <select
                          value={t.status}
                          onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                          className="px-3 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800"
                        >
                          {KANBAN_COLUMNS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TEAM MEMBERS PAGE */}
            {activePage === 'team' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">Team Directory & Workload</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((u) => {
                    const uTasks = tasks.filter((t) => t.assignee === u._id);
                    const done = uTasks.filter((t) => t.status === 'Completed').length;
                    return (
                      <div
                        key={u._id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: u.avatarColor }}
                          >
                            {u.initials}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold">{u.name}</h3>
                            <p className="text-xs text-slate-500">{u.jobTitle}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Assigned</span>
                            <strong>{uTasks.length}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Completed</span>
                            <strong className="text-emerald-600">{done}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Active</span>
                            <strong className="text-indigo-600">{uTasks.length - done}</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTIVITY HISTORY PAGE */}
            {activePage === 'activity' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">Audit Activity History</h1>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800">
                  {activities.map((a) => {
                    const actor = getUser(a.actor);
                    return (
                      <div key={a._id} className="p-4 flex items-center gap-3 text-xs">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: actor?.avatarColor || '#6366F1' }}
                        >
                          {actor?.initials}
                        </div>
                        <div>
                          <p>
                            <strong>{actor?.name}</strong> {a.action}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {new Date(a.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ANALYTICS PAGE */}
            {activePage === 'analytics' && (
              <div className="space-y-5">
                <h1 className="text-xl font-bold">MongoDB Aggregation Analytics</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Project Completion (%)</h3>
                    <div className="relative h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={enrichedProjects.map((p) => ({
                            name: p.title.slice(0, 18),
                            progress: p.completionPercentage,
                          }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="progress" fill="#6366F1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-semibold mb-3">Task Completion Trend</h3>
                    <div className="relative h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { date: 'Oct 28', completed: 1, active: 5 },
                            { date: 'Oct 30', completed: 2, active: 4 },
                            { date: 'Nov 01', completed: 2, active: 5 },
                            { date: 'Nov 02', completed: stats.completedTasks, active: stats.pendingTasks },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2.5} />
                          <Line type="monotone" dataKey="active" stroke="#6366F1" strokeWidth={2.5} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE & SETTINGS PAGES */}
            {(activePage === 'profile' || activePage === 'settings') && (
              <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <h1 className="text-lg font-bold">
                  {activePage === 'profile' ? 'User Profile' : 'Account & Theme Settings'}
                </h1>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: currentUser.avatarColor }}
                  >
                    {currentUser.initials}
                  </div>
                  <div>
                    <p className="font-bold">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{currentUser.bio}</p>
                <button
                  type="button"
                  onClick={() => setDarkMode((d) => !d)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Toggle {darkMode ? 'Light' : 'Dark'} Theme
                </button>
              </div>
            )}

            {/* ADMIN: USER MANAGEMENT */}
            {activePage === 'admin-users' && currentUser.globalRole === 'admin' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">User & Role Administration (Admin Only)</h1>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Global Role</th>
                        <th className="py-3 px-4 text-right">Modify Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {users.map((u) => (
                        <tr key={u._id}>
                          <td className="py-3 px-4 font-semibold">{u.name}</td>
                          <td className="py-3 px-4 text-slate-500">{u.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] ${
                                BADGE_STYLES[u.globalRole]
                              }`}
                            >
                              {ROLE_LABELS[u.globalRole]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={u.globalRole}
                              disabled={u._id === currentUser._id}
                              onChange={(e) => {
                                const newRole = e.target.value;
                                setUsers((prev) =>
                                  prev.map((item) =>
                                    item._id === u._id ? { ...item, globalRole: newRole } : item
                                  )
                                );
                                notify(`Updated ${u.name}'s role to ${ROLE_LABELS[newRole]}`);
                              }}
                              className="px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900"
                            >
                              <option value="team_member">Team Member</option>
                              <option value="project_manager">Project Manager</option>
                              <option value="admin">Administrator</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN: ORGANIZATION OVERVIEW */}
            {activePage === 'admin-org' && currentUser.globalRole === 'admin' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">Organization Governance Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400">Total Registered Users</p>
                    <p className="text-2xl font-bold mt-1">{users.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400">Organization Projects</p>
                    <p className="text-2xl font-bold mt-1">{projects.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400">Audit Events Logged</p>
                    <p className="text-2xl font-bold mt-1">{activities.length}</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Task Details & Comments Modal */}
        {activeTaskModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold">{activeTaskModal.title}</h3>
                <button
                  type="button"
                  onClick={() => setActiveTaskModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {activeTaskModal.description}
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                <h4 className="text-xs font-bold">Comments</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {comments
                    .filter((c) => c.task === activeTaskModal._id)
                    .map((c) => {
                      const author = getUser(c.author);
                      return (
                        <div
                          key={c._id}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs"
                        >
                          <span className="font-semibold">{author?.name}: </span>
                          <span>{c.body}</span>
                        </div>
                      );
                    })}
                </div>
                <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {isNewTaskModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Create New Task</h3>
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="p-1 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateTask} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Task Title *</label>
                  <input
                    type="text"
                    required
                    value={newTaskForm.title}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Project</label>
                  <select
                    value={newTaskForm.project}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, project: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {enrichedProjects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Assignee</label>
                    <select
                      value={newTaskForm.assignee}
                      onChange={(e) =>
                        setNewTaskForm({ ...newTaskForm, assignee: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      {users.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Priority</label>
                    <select
                      value={newTaskForm.priority}
                      onChange={(e) =>
                        setNewTaskForm({ ...newTaskForm, priority: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      {['Low', 'Medium', 'High', 'Urgent'].map((pr) => (
                        <option key={pr} value={pr}>
                          {pr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewTaskModalOpen(false)}
                    className="px-4 py-1.5 text-xs rounded-xl border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}