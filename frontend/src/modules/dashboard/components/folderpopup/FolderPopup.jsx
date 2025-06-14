import ReactDOM from 'react-dom';
import styles from './FolderPopup.module.css';
import LinkItem from '../link/LinkItem';
import FolderItem from '../folder/FolderItem';

const FolderPopup = ({ position, folder = {}, onClose }) => {
  if (!folder || typeof folder !== 'object') return null;

  const contents = Array.isArray(folder.items)
  ? folder.items
  : Array.isArray(folder.contents)
  ? folder.contents
  : [];

  const popup = (
    <div
      className={styles.popup}
      style={{
        top: `${position?.y ?? 0}px`,
        left: `${position?.x ?? 0}px`,
        position: 'absolute',
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.content}>
        {contents.length === 0 ? (
          <p className={styles.empty}>Esta carpeta está vacía</p>
        ) : (
          contents.map((item) => {
            if (item.type === 'link') {
              return <LinkItem key={item.id} {...item} />;
            } else if (item.type === 'folder') {
              return (
                <FolderItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  contents={item.contents}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(popup, document.getElementById('popup-root'));
};

export default FolderPopup;
