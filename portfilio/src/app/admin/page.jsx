import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import UploadImages from '@/components/FileUploed';

export default async function AdminPage() {
  // Get session securely
  const session = await getSession({ headers: headers() });

  // Redirect to login if no session exists
  if (!session || !session.user) {
    redirect('/api/auth/login');
  }

  // Check if user has the admin role
  if (!session.user.roleType?.includes('admin')) {
    return (
      <div className="p-4">
        <p className="dark:text-white">
          Access denied. You do not have administrator privileges.
          <br />
          Account: {session.user.email}
        </p>
      </div>
    );
  }

  try {
    // Render admin dashboard for authorized users
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="dark:text-white mb-4">
          Welcome to the admin area, {session.user.email}!
        </p>
        <UploadImages />
      </div>
    );
  } catch (error) {
    console.error('Error in admin page:', error);
    return (
      <div className="p-4">
        <p className="dark:text-white">
          An error occurred while loading the admin page. Please try again later.
        </p>
      </div>
    );
  }
}
