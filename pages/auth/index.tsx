import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styles from '../../styles/componentStyles/Auth.module.scss';
import { getSession, signIn } from "next-auth/react";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { ROUTE_CONST } from '../../service/const/routeConst';

const { HOME } = ROUTE_CONST;

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.auth_list_container}>
        <div className={styles.auth_intro}>
          This is personal project.
        </div>
        <div className={styles.auth_intro}>
          You can simply sign in with 2 OAuth providers.
        </div>
        <Link href={'/api/auth/signin'}>
          <a onClick={(e) => {
            e.preventDefault();
            signIn('github', {
              callbackUrl: HOME
            });
          }}>
            <div className={styles.oauth_container}>
              <GitHubIcon /><span>Sign in with Github</span>
            </div>
          </a>
        </Link>

        <Link href={'/api/auth/signin'}>
          <a onClick={(e) => {
            e.preventDefault();
            signIn('google', {
              callbackUrl: HOME
            });
          }}>
            <div className={styles.oauth_container}>
              <GoogleIcon /><span>Sign in with Google</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
};

export default Auth;

// SignIn 후 '/auth'로 직접 타이핑할 시, Auth Page로 가는 에러를 막기 위해.
// getSession은 getServerSideProps 써야 함
// Client에서 Session Check 해서 Redirect해도 되는데, Server에서 하는 이유는
// Client에서는 '/auth' page로 이동해서 화면을 살짝보여주고, 확인 후 다시 Redirect하고
// Server에서는 화면에 보여주기 전에 확인을 하면서 '/auth' page로 이동없이 Redirect 해준다.
export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: HOME,
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
};