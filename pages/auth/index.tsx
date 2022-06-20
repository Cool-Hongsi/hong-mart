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
    <section className={styles.container}>
      <div className={styles.auth_list_container}>
        <p className={styles.auth_intro}>
          This is personal project.
        </p>
        <p className={styles.auth_intro}>
          Please simply sign in with 2 OAuth providers.
        </p>
        <Link href={'/api/auth/signin'}>
          <a onClick={(e) => {
            e.preventDefault();
            signIn('github', {
              callbackUrl: HOME
            });
          }}>
            <p className={styles.oauth_container}>
              <GitHubIcon /><span>Sign in with Github</span>
            </p>
          </a>
        </Link>

        <Link href={'/api/auth/signin'}>
          <a onClick={(e) => {
            e.preventDefault();
            signIn('google', {
              callbackUrl: HOME
            });
          }}>
            <p className={styles.oauth_container}>
              <GoogleIcon /><span>Sign in with Google</span>
            </p>
          </a>
        </Link>
      </div>
    </section>
  )
};

export default Auth;

// To prevent typing '/auth' in url directly
// getSession can use in getServerSideProps (Not getStaticProps)
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