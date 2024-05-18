import { IoArrowBackOutline } from 'react-icons/io5';
import './Setting.scss';
import { TSettig } from './Setting.types';

const Setting = ({
  setShowSettings,
  onTextChange,
  selectedNodeText,
}: TSettig) => {
  return (
    <div className='setting_panel'>
      <div className='settings_header'>
        <IoArrowBackOutline
          className='back'
          onClick={() => setShowSettings(false)}
        />
        <p>Message</p>
      </div>
      <div className='settings_input_label'>
        <label>Text</label>
        <textarea
          value={selectedNodeText}
          onChange={(e) => {
            onTextChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Setting;
