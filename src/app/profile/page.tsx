import { redirect } from 'next/navigation';

const ProfilePageRedirect = () => {
  redirect('/profile/my-gpus');
};

export default ProfilePageRedirect;
