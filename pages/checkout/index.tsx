import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { ROUTE_CONST } from '../../service/const/routeConst';
import styles from '../../styles/componentStyles/Checkout.module.scss';

const { AUTH } = ROUTE_CONST;

const Checkout = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <div className={styles.check_greeting}>Hello! {session!.user!.name}</div>
          Checkout page is currently on construction
        </div>
      </div>
    )
  }
};

export default Checkout;

// Checkout page can render after signed in.
// Auth session check in server side (Prevent typing '/checkout' directly in url)
export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: AUTH,
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
};