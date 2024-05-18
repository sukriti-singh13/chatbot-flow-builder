import './Toast.scss';
import { TToast } from './Toast.types';
const Toast = ({ message, type }: TToast) => {
  return (
    <div className={`toast ${type === 'success' ? 'success' : 'error'}`}>
      {message}
    </div>
  );
};

export default Toast;
