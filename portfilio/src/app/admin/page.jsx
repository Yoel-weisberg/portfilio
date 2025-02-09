import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';
import AdminDashboard from '@/components/AdminDashboard';
export default async function AdminPage() {
  // Get the session using headers to ensure proper cookie handling
  const session = await getSession(headers());
  if (!session) {
    return (<p>No session found</p>)
  }
  if (!session.user.roleType.includes('admin')) {
    return (<p>You are not allowed to acsses this part {session.user.email}</p>)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin area, {session.user.email}!</p>
      <AdminDashboard />
    </div>
  );
}