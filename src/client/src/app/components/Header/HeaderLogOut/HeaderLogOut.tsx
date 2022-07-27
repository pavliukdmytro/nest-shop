import { logOut } from '@store/features/auth/auth';
import { useAppDispatch } from '@store/hooks';

const HeaderLogOut = () => {
  const dispatch = useAppDispatch();

  return(
    <button
      onClick={ () => dispatch( logOut()) }
      type="button"
      className="btn btn-light"
    >
      log out
    </button>
  )
}

export default HeaderLogOut;