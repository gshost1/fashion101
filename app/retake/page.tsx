import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RetakePage() {
    const cookieStore = await cookies();
    cookieStore.delete('user_style');
    redirect('/');
}
