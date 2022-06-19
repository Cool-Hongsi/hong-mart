import styles from '../styles/componentStyles/Home.module.scss';
import { useSession } from "next-auth/react";
import { sessionCheck } from '../service/util/sessionCheck';
import { SESSION_STATUS } from '../service/const/generalConst';

const { LOADING_RESULT, UNAUTHENTICATED_RESULT, AUTHENTICATED_RESULT } = SESSION_STATUS;

const Home = () => {

  const { data: session, status } = useSession();

  const printUserName = (): string => {
    const currentSessionStatus = sessionCheck(session, status);

    if (currentSessionStatus === LOADING_RESULT || currentSessionStatus === UNAUTHENTICATED_RESULT) {
      return "Friend!";
    } else { // currentSessionStatus === AUTHENTICATED_RESULT
      return session!.user!.name!;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <div>
          Hello, {printUserName()}
        </div>
        <div>
          <span>HONG MART</span>
        </div>
      </div>
    </div>
  )
};

export default Home;