import EdiText from 'react-editext'
import { useDispatch } from 'react-redux'
import $api from '../../http/request'
import { fileActions } from '../../redux/file'

function EditName({ file }) {
  const dispatch = useDispatch()

  const onSaveFileName = (fileName) => {
    $api
      .patch(`/api/file/rename`, {
        fileId: file.id,
        name: fileName,
        isFolder: file.isFolder,
      })
      .then(() => {
        dispatch(
          fileActions.renameFile({
            id: file.id,
            isFolder: file.isFolder,
            name: fileName,
          })
        )
      })
      .catch((err) => console.log(err))
  }
  return (
    <EdiText
      type="text"
      value={file.name}
      onSave={(fileName) => {
        onSaveFileName(fileName)
      }}
      startEditingOnFocus={true}
      submitOnUnfocus={true}
      showButtonsOnHover={true}
      editButtonProps={{ style: { visibility: 'hidden' } }}
      hideIcons={true}
      editOnViewClick={true}
      saveButtonClassName="saveBtn"
      cancelButtonClassName="cancelBtn"
      inputProps={{
        style: {
          backgroundColor: '#233C51',
          color: '#E6ECF1',
          minWidth: 'auto',
        },
      }}
    />
  )
}

export default EditName
